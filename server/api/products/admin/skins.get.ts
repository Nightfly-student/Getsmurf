import { Region } from "@prisma/client";
import { sendError } from "h3";
import { getImportantInfo, getProductsByRegion, getSkinsByRegion } from "~~/server/db/products";
import { isAdminOrAbove } from "~~/server/db/roleManager";

export default defineEventHandler(async (event) => {
    isAdminOrAbove(event.context.auth?.user, event)

    const queries = getQuery(event);

    const { region } = queries;

    if (!region) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Missing slug requirement",
            })
        );
    }

    const skins = await getSkinsByRegion(region as Region);

    if (!skins) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "Skins not found",
            })
        );
    }

    return skins
})