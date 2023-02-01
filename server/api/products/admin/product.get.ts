import { sendError } from "h3";
import { getImportantInfo } from "~~/server/db/products";
import { isAdminOrAbove } from "~~/server/db/roleManager";

export default defineEventHandler(async (event) => {
    isAdminOrAbove(event.context.auth?.user, event)

    const queries = getQuery(event);

    const { slug } = queries;

    if (!slug) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Missing slug requirement",
            })
        );
    }

    const product = await getImportantInfo(slug as string);

    if (!product) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "Product not found",
            })
        );
    }
    if (!product[0]) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "Product not found",
            })
        );
    }

    (product[0].Accounts as any) = product[0]?.Accounts.length

    return {
        product: product[0],
        sold: product[1],
        orders: product[2],
    }
})