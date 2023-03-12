import { getAffiliate } from "~~/server/db/affiliates";
import { isAffiliate } from "~~/server/db/roleManager";

export default defineEventHandler(async (event) => {
    isAffiliate(event.context.auth?.user, event)

    const affiliate = await getAffiliate(event.context.auth?.user?.id)

    if (!affiliate) {
        return sendError(
            event,
            createError({ statusCode: 404, statusMessage: "Affiliate not found" })
        )
    }

    return affiliate
});