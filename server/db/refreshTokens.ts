import { prisma } from ".";

export const getRefreshTokenByToken = async (token: string) => {
    return prisma.refreshToken.findUnique({
        where: {
            token
        }
    })
}

export const removeRefreshToken = async (token: string) => {
    return prisma.refreshToken.delete({
        where: {
            token
        }
    })
}

export const createRefreshToken = async (data: { token: string, userId: string }) => {
    return prisma.refreshToken.upsert({
        where: {
            userId: data.userId
        },
        update: {
            token: data.token
        },
        create: {
            token: data.token,
            userId: data.userId
        }
    })
}
