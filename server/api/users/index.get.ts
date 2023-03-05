import { sendError } from "h3";
import { isAdminOrAbove } from "~~/server/db/roleManager";
import { getUsers } from "~~/server/db/users";

export default defineEventHandler(async (event) => {
    isAdminOrAbove(event.context.auth?.user, event)
    const queries = getQuery(event);

    const { page, q, get } = queries;

    if (!page || !get) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Missing page, get or q requirement",
            })
        );
    }

    var take = parseInt(get as string)
    var skip = (take * (parseInt(page.toString()))) - take

    if (skip < 0) {
        skip = 0
    }

    const orders = await getUsers(q as string, take, skip)

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