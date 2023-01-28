import { removeRefreshToken } from "~~/server/db/refreshTokens"
import { sendRefreshToken } from "~~/server/utils/jwt"

export default defineEventHandler(async (event) => {
    try {
        const refreshToken = getCookie(event, 'refresh_token')
        await removeRefreshToken(refreshToken as string)
    } catch (error) {
        return { message: 'Done' }
    }

    sendRefreshToken(event, null)

    return {
        message: 'Done'
    }
})