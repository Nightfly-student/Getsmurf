import { createAffiliate } from "~~/server/db/affiliates"
import { isAffiliate } from "~~/server/db/roleManager"

export default defineEventHandler(async (event) => {
    isAffiliate(event.context.auth?.user, event)

    const body = await readBody(event)

    const { name, coupon } = body

    if (!name || !coupon) {
        return sendError(event, createError({ statusCode: 500, statusMessage: "Missing name or coupon" }))
    }

    if (event.context.auth.user.affiliate) {
        return sendError(event, createError({ statusCode: 500, statusMessage: "You already have an affiliate account" }))
    }

    const affiliate = await createAffiliate(name, coupon, event.context.auth?.user?.id)

    if (!affiliate) {
        return sendError(event, createError({ statusCode: 500, statusMessage: "Failed to create affiliate" }))
    }

    return affiliate

})
