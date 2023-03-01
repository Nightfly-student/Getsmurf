import Stripe from "stripe";
import { H3Event } from "h3";
import { sendError } from "h3";
import { getAccountsByProductSlug, getOrderByOrderIdWebhook, updateOrderAccount, updateOrderStatusFailed } from "../db/orders";
import { getProductBySkinName } from "../db/products";
import { sendOrderProcessingEmail } from "./mailing/orderPending";
import { sendOrderFailedEmail } from "./mailing/orderFail";
import { sendOrderSuccessEmail } from "./mailing/orderSuccess";
import { updateCouponUses } from "../db/coupons";
import { deleteMultipleKeys } from "./redis/deleteMultiple";

const stripe = () => {
    const config = useRuntimeConfig();
    return new Stripe(config.stripePrivateKey, {
        apiVersion: "2022-11-15",
        typescript: true,
    });
};

export const createStripeCheckoutSession = async (data: any) => {
    const config = useRuntimeConfig();

    const session = await stripe().checkout.sessions.create({
        payment_method_types: [
            "card",
            "ideal",
            "sofort",
            "p24",
            "bancontact",
            "giropay",
            "eps",
        ],
        line_items: [
            {
                price_data: {
                    currency: "eur",
                    product_data: {
                        name: data.skin ? `${data.product.Skins[0].skin.name} - ${data.region}` : data.product.name,
                    },
                    unit_amount: data.skin ? ((parseFloat(data.total) * 100).toFixed(0) as any) : data.product.price * 100,
                },
                quantity: data.order.quantity,
            },
        ],
        payment_intent_data: {
            metadata: {
                orderId: data.order.id,
                skin: data.skin,
                ...data.skin && { skinName: data.product.Skins[0].skin.name },
                region: data.region
            },
        },
        metadata: {
            orderId: data.order.id,
            skin: data.skin,
            ...data.skin && { skinName: data.product.Skins[0].skin.name },
            region: data.region
        },
        mode: "payment",
        success_url: `${config.appUrl}/orders/${data.order.id}`,
        cancel_url: `${config.appUrl}/orders/${data.order.id}`,
    });
    return session;
};

export const constructStripeCheckoutSession = async (
    body: any,
    sig: string
) => {
    const config = useRuntimeConfig();
    try {
        return stripe().webhooks.constructEvent(body, sig, config.stripeSigSecret);
    } catch (err: any) {
        return null;
    }
};

export const handleStripeEvent = async (
    stripeEvent: Stripe.Event,
    event: H3Event
) => {
    const config = useRuntimeConfig();
    let order = await getOrderByOrderIdWebhook(
        (stripeEvent.data.object as any).metadata.orderId
    );

    if (!order) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Stripe webhook error | Order not found",
            })
        );
    }

    switch (stripeEvent.type) {
        case "payment_intent.payment_failed":
            console.log("payment_intent.payment_failed");
            try {
                await updateOrderStatusFailed(order.id)
                await sendOrderFailedEmail(order.billingEmail, order.id, `${config.appUrl}/orders/${order.id}`)

                return "Stripe webhook success";
            } catch (err: any) {
                return sendError(
                    event,
                    createError({
                        statusCode: 500,
                        statusMessage:
                            "Stripe webhook error | payment_intent.payment_failed",
                    })
                );
            }

        case "payment_intent.processing":
            console.log("payment_intent.processing");
            try {
                if ((stripeEvent.data.object as any).metadata.skin) {
                    const account = await getProductBySkinName((stripeEvent.data.object as any).metadata.skinName, (stripeEvent.data.object as any).metadata.region)

                    if (!account) {
                        return sendError(
                            event,
                            createError({
                                statusCode: 500,
                                statusMessage: "Stripe webhook error | payment_intent.processing | Account not found",
                            })
                        );
                    }

                    await updateOrderAccount(order.id, account.id, 'PENDING', 'PENDING')
                } else {
                    const accounts = await getAccountsByProductSlug((order.product as any).slug, order.quantity)

                    for (const account of accounts) {
                        await updateOrderAccount(order.id, account.id, 'PENDING', 'PENDING')
                    }
                }
                deleteMultipleKeys('getsmurf:products*')
                deleteMultipleKeys('getsmurf:product*')

                await sendOrderProcessingEmail(order.billingEmail, order.id, `${config.appUrl}/orders/${order.id}`)
                return "Stripe webhook success";
            } catch (err: any) {
                return sendError(
                    event,
                    createError({
                        statusCode: 500,
                        statusMessage: "Stripe webhook error | payment_intent.processing",
                    })
                );
            }

        case "payment_intent.succeeded":
            console.log("payment_intent.succeeded");
            if (order.status === 'PAID') return "Stripe Already succeeded";
            try {

                if (order.accounts.length === 0) {
                    if ((stripeEvent.data.object as any).metadata.skin) {
                        const account = await getProductBySkinName((stripeEvent.data.object as any).metadata.skinName, (stripeEvent.data.object as any).metadata.region)

                        if (!account) {
                            return sendError(
                                event,
                                createError({
                                    statusCode: 500,
                                    statusMessage: "Stripe webhook error | payment_intent.processing | Account not found",
                                })
                            );
                        }

                        await updateOrderAccount(order.id, account.id, 'PAID', 'SOLD')
                    } else {
                        const accounts = await getAccountsByProductSlug((order.product as any).slug, order.quantity)

                        for (const account of accounts) {
                            await updateOrderAccount(order.id, account.id, 'PAID', 'SOLD')
                        }
                    }
                } else {
                    for (const account of order.accounts) {
                        await updateOrderAccount(order.id, account.id, 'PAID', 'SOLD')
                    }
                }

                order = await getOrderByOrderIdWebhook((stripeEvent.data.object as any).metadata.orderId)

                if (!order) {
                    return sendError(
                        event,
                        createError({
                            statusCode: 500,
                            statusMessage: "Stripe webhook error | payment_intent.succeeded | Order not found",
                        })
                    );
                }

                if (order.coupon) {
                    await updateCouponUses(order.coupon.code)
                }

                await sendOrderSuccessEmail(
                    order.billingEmail,
                    order.id,
                    order.accounts,
                    order.product ? order.product?.name : `${order.skin?.name} - ${(stripeEvent.data.object as any).metadata.region}`,
                    `${config.appUrl}/orders/${order.id}`
                )

                deleteMultipleKeys('getsmurf:products*')
                deleteMultipleKeys('getsmurf:product*')

                return "Stripe webhook success";
            } catch (err: any) {
                return sendError(
                    event,
                    createError({
                        statusCode: 500,
                        statusMessage: "Stripe webhook error | payment_intent.succeeded",
                    })
                );
            }
        default:
            return "Stripe webhook not returned anything";
    }
};

export const getStripeSession = async (sessionId: string) => {
    return stripe().checkout.sessions.retrieve(sessionId);
};