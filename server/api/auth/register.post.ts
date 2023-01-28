import { hashSync } from "bcrypt"
import filter from "leo-profanity"
import { createRefreshToken } from "~~/server/db/refreshTokens"
import { createUser, getUserByEmail } from "~~/server/db/users"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { email, password } = body

    if (!email || !password) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }))
    }

    if (filter.check(email) || filter.check(password)) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'No Bad Words Allowed' }))
    }

    const user = await getUserByEmail(email)

    if (user) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'User already exists' }))
    }

    const newUser = await createUser({ email, password: hashSync(password, 10) })

    const { accessToken, refreshToken } = generateTokens(newUser)

    await createRefreshToken({ token: refreshToken, userId: newUser.id })

    sendRefreshToken(event, refreshToken)

    return { access_token: accessToken, user: exclude(newUser, 'password', 'createdAt', 'updatedAt', 'id') }
})