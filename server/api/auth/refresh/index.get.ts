import { sendError } from "h3"
import { decodeRefreshToken, sendRefreshToken } from "~~/server/utils/jwt"
import { getRefreshTokenByToken } from "../../../db/refreshTokens"
import { getUserById } from "../../../db/users"
import { generateTokens } from "../../../utils/jwt"
import { RefreshToken, User } from '@prisma/client';

export default defineEventHandler(async (event) => {
    const refresh_token = getCookie(event, 'refresh_token')

    if (!refresh_token) {
        return { access_token: null }
    }

    const rToken = await getRefreshTokenByToken(refresh_token)

    if (!rToken) {
        return { access_token: null }
    }

    const token = decodeRefreshToken(refresh_token)

    if (!token) {
        sendRefreshToken(event, null)

        return { access_token: null }
    }

    try {
        const user = await getUserById((token as RefreshToken).userId)

        const { accessToken } = generateTokens(user as User)

        return { access_token: accessToken }
    } catch (err) {
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Something went wrong",
            })
        )
    }
})