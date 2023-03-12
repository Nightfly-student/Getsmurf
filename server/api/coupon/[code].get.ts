import { sendError } from "h3";
import { getChampionAndSkinsAndAvailableSkins } from "~~/server/db/champions";
import { getCouponByCode } from "~~/server/db/coupons";

export default defineEventHandler(async (event) => {
    const { code } = event.context.params;

    if (!code) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "No coupon code provided",
            })
        )
    }

    const coupon = await getCouponByCode(code);

    if (!coupon) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "Coupon not found",
            })
        )
    }

    if (coupon.uses >= coupon.maxUses) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "Coupon has reached max uses",
            })
        )
    }

    if (coupon.expiresAt < new Date()) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "Coupon has expired",
            })
        )
    }

    return {
        code: coupon.code,
        discount: coupon.discount,
        affiliate: coupon.affiliate ? coupon.affiliate.name : null,
    }
})