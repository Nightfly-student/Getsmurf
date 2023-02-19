import { sendError } from "h3";
import { getOrdersAdminByEmail } from "~~/server/db/orders";
import { isAdminOrAbove } from "~~/server/db/roleManager";

export default defineEventHandler(async (event) => {
    isAdminOrAbove(event.context.auth?.user, event)
    const queries = getQuery(event);

    const { page, email, get, id } = queries;

    if (!page || !get || !email || !id) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Missing page, get, id or email requirement",
            })
        );
    }

    var take = parseInt(get as string)
    var skip = (take * (parseInt(page.toString()))) - take

    if (skip < 0) {
        skip = 0
    }

    const orders = await getOrdersAdminByEmail(email as string, take, skip, id as string)

    if (orders[0] === 0) {
        return {
            items: [],
            count: 0,
            page: 0,
            pages: 0
        }
    }

    return {
        items: orders[1],
        count: orders[0],
        page: page,
        pages: Math.ceil(orders[0] / take)
    }

})