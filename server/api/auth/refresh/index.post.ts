import { RefreshToken, User } from '@prisma/client';
import { sendError } from "h3";
import { getRefreshTokenByToken } from "~~/server/db/refreshTokens";
import { getUserById } from "~~/server/db/users";
import { decodeRefreshToken, generateTokens, sendRefreshToken } from "~~/server/utils/jwt";

export default defineEventHandler(async (event) => {
    const token = await readBody(event);
    if (!token) {
        return sendError(
            event,
            createError({ statusCode: 404, statusMessage: "No token provided" })
        );
    }

    const rToken = await getRefreshTokenByToken(token);

    if (!rToken) {
        return sendError(
            event,
            createError({
                statusCode: 401,
                statusMessage: "Refresh token is invalid",
            })
        );
    }

    const decodedToken = decodeRefreshToken(token);

    try {
        const user = await getUserById((decodedToken as RefreshToken).userId)

        const { accessToken } = generateTokens(user as User)
        sendRefreshToken(event, token)

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

});