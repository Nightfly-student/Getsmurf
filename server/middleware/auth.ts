import UrlPattern from 'url-pattern'
import { decodeAccessToken } from '../utils/jwt';
import { sendError } from "h3"
import { getUserById } from '../db/users';

export default defineEventHandler(async (event) => {
    const endpoints = [
        '/api/auth/user',
        '/api/products/new',
        '/api/products/admin/product',
        '/api/accounts/admin',
        '/api/blog/admin',
        '/api/blog/create',
        '/api/order/admin',
        '/api/order/admin/item',
        '/api/order/admin/email',
        '/api/order/admin/complete',
        '/api/coupon/admin',
    ]

    const isHandledByThisMiddleware = endpoints.some(endpoint => {
        const pattern = new UrlPattern(endpoint)

        return pattern.match(event.node.req.url?.split('?')[0] as string)
    })

    if (!isHandledByThisMiddleware) {
        return
    }

    const token = getHeader(event, 'authorization')?.split(' ')[1]

    const decoded = decodeAccessToken(token as string)

    if (!decoded) {
        return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }))
    }

    try {
        const userId = decoded.userId

        const user = await getUserById(userId)

        event.context.auth = { user }
    } catch (err) {
        return
    }
})