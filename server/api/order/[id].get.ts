import { sendError } from "h3";
import { getOrderById } from "~~/server/db/orders";

export default defineEventHandler(async (event) => {
    const { id } = event.context.params

    if (!id) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Missing id requirement",
            })
        )
    }

    const order = await getOrderById(id as string)

    if (!order) {
        return sendError(
            event,
            createError({
                statusCode: 404,
                statusMessage: "No Order found",
            })
        )
    }

    return {
        order
    }
})