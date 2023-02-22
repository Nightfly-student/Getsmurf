import { Region } from "@prisma/client";
import { sendError } from "h3";
import { getImportantInfo, getProductsByRegion } from "~~/server/db/products";
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

    const products = await getProductsByRegion(region as Region);

    if (!products) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "Products not found",
            })
        );
    }

    const filteredProducts = products.filter(product => product.Accounts.length > 0)

    return filteredProducts
})