import { sendError } from "h3";
import { getProductBySlug } from "~~/server/db/products";

export default defineEventHandler(async (event) => {
    const { slug } = event.context.params;

    if (!slug) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Missing slug requirement",
            })
        );
    }

    const product = await getProductBySlug(slug);

    if (!product) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "Product not found",
            })
        );
    }

    (product.Accounts as any) = product.Accounts.length;

    return product
});