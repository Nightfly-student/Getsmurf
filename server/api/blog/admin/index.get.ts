import { sendError } from "h3"
import { findManyAdminPosts } from "~~/server/db/blogs";
import { isAdminOrAbove } from "~~/server/db/roleManager";
import redis from "~~/server/utils/redis";

export default defineEventHandler(async (event) => {
    isAdminOrAbove(event.context.auth?.user, event)

    const queries = getQuery(event)

    const { page, q, get } = queries

    if (!page || !get) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Missing page requirement",
            })
        )
    }

    var take = parseInt(get as string)
    var skip = (take * (parseInt(page.toString()))) - take

    if (skip < 0) {
        skip = 0
    }

    const cached = await redis.get(`getsmurf:admin:posts:${page}:${take}:${q}`)

    if (cached) {
        return JSON.parse(cached)
    }

    var blogPosts = await findManyAdminPosts(take, parseInt(skip.toString()), q as string)

    if (blogPosts[0] === 0) {
        return {
            items: [],
            count: 0,
            page: page,
            pages: 0
        }
    }

    await redis.setex(`getsmurf:admin:posts:${page}:${take}:${q}`, 60 * 60 * 72, JSON.stringify(
        {
            items: blogPosts[1],
            count: blogPosts[0],
            page: page,
            pages: Math.ceil(blogPosts[0] / take)
        }
    ))

    return {
        items: blogPosts[1],
        count: blogPosts[0],
        page: page,
        pages: Math.ceil(blogPosts[0] / take)
    }
})