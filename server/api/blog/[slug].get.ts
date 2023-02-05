import { getPostBySlug } from '~~/server/db/blogs';

export default defineEventHandler(async (event) => {
    const { slug } = event.context.params;

    if (!slug) {
        return sendError(
            event,
            createError({ statusCode: 404, statusMessage: "Slug not found" })
        )
    }

    const getPost = await getPostBySlug(slug as string)

    if (!getPost) {
        return sendError(
            event,
            createError({ statusCode: 404, statusMessage: "Post not found" })
        )
    }

    return getPost
});