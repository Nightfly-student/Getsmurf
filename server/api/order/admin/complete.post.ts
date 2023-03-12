import { sendError } from "h3";
import { updateAffiliateOrderBalance } from "~~/server/db/affiliates";
import { updateCouponUses } from "~~/server/db/coupons";
import { getAccountsByProductSlug, getOrderAdmin, getOrderByOrderIdWebhook, updateOrderAccount } from "~~/server/db/orders";
import { getProductBySkinName } from "~~/server/db/products";
import { isAdminOrAbove } from "~~/server/db/roleManager";
import { sendOrderCompletedAffiliateMail } from "~~/server/utils/mailing/orderCompletedAffiliate";
import { sendOrderSuccessEmail } from "~~/server/utils/mailing/orderSuccess";
import { deleteMultipleKeys } from "~~/server/utils/redis/deleteMultiple";

export default defineEventHandler(async (event) => {
    isAdminOrAbove(event.context.auth?.user, event)

    const config = useRuntimeConfig()

    const body = await readBody(event);

    const { id } = body;

    if (!id) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Missing requirement",
            })
        );
    }

    var order = await getOrderByOrderIdWebhook(id as string)

    if (!order) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "Order not found",
            })
        );
    }

    if (!order.paymentSession) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "Order not found",
            })
        );
    }

    if (order.status === 'PAID') {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "Order already paid",
            })
        );
    }

    try {
        const session = await getStripeSession(order.paymentSession.sessionId)

        if (!session) {
            return sendError(
                event,
                createError({
                    statusCode: 500,
                    statusMessage: "Session not found",
                })
            );
        }

        if (order.accounts.length === 0) {
            if ((session.metadata as any).skin) {
                const account = await getProductBySkinName((session.metadata as any).skinName, (session.metadata as any).region)

                if (!account) {
                    return sendError(
                        event,
                        createError({
                            statusCode: 500,
                            statusMessage: "Account not found",
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

        order = await getOrderByOrderIdWebhook(id as string)

        if (!order) {
            return sendError(
                event,
                createError({
                    statusCode: 500,
                    statusMessage: "Order not found",
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
            order.product ? order.product?.name : `${order.skin?.name} - ${(session.metadata as any).region}`,
            `${config.appUrl}/orders/${order.id}`
        )

        if (order.affiliateOrder) {
            await updateAffiliateOrderBalance(order.affiliateOrder.affiliate.name, order.affiliateOrder.recievingAmount)
            await sendOrderCompletedAffiliateMail(order.affiliateOrder.affiliate.user.email, order.affiliateOrder.affiliate.name, order.affiliateOrder.recievingAmount)
        }

        deleteMultipleKeys('getsmurf:products*')
        deleteMultipleKeys('getsmurf:product*')

        const updatedOrder = await getOrderAdmin(order.id)

        if (!updatedOrder) {
            return sendError(
                event,
                createError({
                    statusCode: 404,
                    statusMessage: "Order not found",
                })
            );
        }

        for (const account of updatedOrder.accounts) {
            const decrypted = CryptoJS.AES.decrypt(account.license.password, config.aesKey as string).toString(CryptoJS.enc.Utf8)
            account.license.password = decrypted
        }

        return updatedOrder
    } catch (err: any) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Order completion failed",
            })
        );
    }
})