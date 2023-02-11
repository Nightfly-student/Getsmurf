import { sendError } from "h3";
import { createCoupon } from "~~/server/db/coupons";
import { isAdminOrAbove } from "~~/server/db/roleManager";

export default defineEventHandler(async (event) => {
    isAdminOrAbove(event.context.auth?.user, event)
    const body = await readBody(event);

    const { code, discount, uses, expireAt } = body;

    if (!code || !discount || !uses || !expireAt) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "Missing Fields",
            })
        );
    }

    const expiresAt = new Date(expireAt);

    const coupon = await createCoupon(code, parseFloat(discount), parseInt(uses), expiresAt);

    if (!coupon) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Failed to create coupon",
            })
        );
    }

    return 'Successfully created a coupon'
});
