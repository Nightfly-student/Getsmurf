import { deleteBlog } from "~~/server/db/blogs";
import { isAdminOrAbove } from "~~/server/db/roleManager";

export default defineEventHandler(async (event) => {
    isAdminOrAbove(event.context.auth?.user, event)

    const queries = getQuery(event)

    const { id } = queries

    if (!id) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Missing id requirement",
            })
        )
    }

    try {
        const blog = await deleteBlog(id as string)

        return {
            message: "Post Deleted"
        }
    } catch (err: any) {
        return sendError(
            event,
            createError({ statusCode: 500, statusMessage: err.message })
        );
    }
});