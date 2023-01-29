import bcrypt from "bcrypt"
import { sendError } from "h3"
import { createRefreshToken } from "~~/server/db/refreshTokens"
import { getUserByEmail } from "~~/server/db/users"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { email, password } = body

    if (!email || !password) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }))
    }

    const user = await getUserByEmail(email)

    if (!user) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid credentials' }))
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid credentials' }))
    }

    const { accessToken, refreshToken } = generateTokens(user)

    await createRefreshToken({ token: refreshToken, userId: user.id })

    sendRefreshToken(event, refreshToken)

    return { access_token: accessToken, user: exclude(user, 'password', 'createdAt', 'updatedAt', 'id') }

})