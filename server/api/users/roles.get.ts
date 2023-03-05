import { sendError } from "h3";
import { isAdminOrAbove } from "~~/server/db/roleManager";
import { getRoles, getUsers } from "~~/server/db/users";

export default defineEventHandler(async (event) => {
    isAdminOrAbove(event.context.auth?.user, event)
    const queries = getQuery(event);

    const { q } = queries;

    const orders = await getRoles(q as string)

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
    }

})