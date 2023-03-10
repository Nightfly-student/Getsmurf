import { sendError } from "h3";
import { number, object, string } from "yup"
import { getAffiliateByNameOrder } from "~~/server/db/affiliates";
import { createAffiliateOrder, createOrder, createPaymentSession } from "~~/server/db/orders";
import { getProductBySkinName, getProductBySlug } from "~~/server/db/products";
import { createStripeCheckoutSession } from "~~/server/utils/stripe";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const { productSlug, billingEmail, paymentMethod, quantity, skin, region, coupon, affiliate } = body;

    if (!productSlug || !billingEmail || !paymentMethod || !quantity) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }))
    }

    try {
        await createOrderSchema.validate({ productSlug, billingEmail, paymentMethod, quantity });
    } catch (error) {
        return sendError(event, createError({ statusCode: 400, statusMessage: '' + error }))
    }

    var product = null
    var orderData = null

    if (skin) {
        product = await getProductBySkinName(productSlug, region)

        if (!product) {
            return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid product' }))
        }

        orderData = {
            billingEmail,
            quantity: parseInt(quantity),
            productSlug,
            total: product.Skins[0].skin.rarity === 'kLegendary' ? 14.99 : product.Skins[0].skin.rarity === 'kEpic' ? 10.49 : product.Skins[0].skin.rarity === 'kRare' ? 9.99 : product.Skins[0].skin.rarity === 'kMythic' ? 12.49 : 8.95,
            skin,
            region,
            coupon,
            affiliate
        }

    } else {
        product = await getProductBySlug(productSlug);

        if (!product) {
            return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid product' }))
        }

        if (product.Accounts.length < quantity) {
            return sendError(event, createError({ statusCode: 400, statusMessage: 'Not enough accounts' }))
        }

        orderData = {
            billingEmail,
            quantity: parseInt(quantity),
            productSlug,
            total: product.price * quantity,
            region,
            coupon,
            affiliate
        }
    }

    if (orderData.coupon) {
        const coupon = await $fetch(`/api/coupon/${orderData.coupon}`)

        if (coupon) {
            orderData.total = (orderData.total - (orderData.total / 100 * (coupon.discount)).toFixed(2))
            product.price = (product.price - (product.price / 100 * (coupon.discount)).toFixed(2))
        }
    }

    try {
        const order = await createOrder(orderData)

        if (!order) {
            return sendError(event, createError({ statusCode: 400, statusMessage: 'Failed to create order' }))
        }

        if (orderData.affiliate) {
            const affiliate = await getAffiliateByNameOrder(orderData.affiliate)

            if (affiliate) {
                const recievingAmount = (orderData.total / 100 * (affiliate.percent)).toFixed(2)
                await createAffiliateOrder(affiliate.name, order.id, parseFloat(recievingAmount))
            }
        }


        if (order && paymentMethod === 'STRIPE') {
            const session = await createStripeCheckoutSession({
                product: product,
                order: order,
                skin: skin,
                region: region,
                total: orderData.total
            })
            await createPaymentSession({ sessionId: session.id, paymentMethod, orderId: order.id })
            return session.url
        }
    } catch (error) {
        return sendError(event, createError({ statusCode: 400, statusMessage: '' + error }))
    }





})

const createOrderSchema = object({
    productSlug: string().required("Product Slug is required"),
    quantity: number().required("Quantity is required"),
    billingEmail: string().email("Invalid email").required("Billing email is required"),
    paymentMethod: string().required("Payment method is required")
});