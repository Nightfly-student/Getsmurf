import { sendError } from "h3";
import { deleteCoupon, getCouponsAdmin } from "~~/server/db/coupons";
import { getOrdersAdmin } from "~~/server/db/orders";
import { isAdminOrAbove } from "~~/server/db/roleManager";

export default defineEventHandler(async (event) => {
    isAdminOrAbove(event.context.auth?.user, event)

    const queries = getQuery(event);
    const { code } = queries;

    if (!code) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }))
    }
    try {
        await deleteCoupon(code as string)
        return 'Coupon deleted'
    }
    catch (error) {
        return sendError(event, createError({ statusCode: 400, statusMessage: error as string }))
    }

})