import { prisma } from ".";

export const getUserById = async (id: string) => {
    return prisma.user.findUnique({
        where: {
            id
        }
    })
}

export const getUserByEmail = async (email: string) => {
    return prisma.user.findFirst({
        where: {
            email: email
        }
    })
}

export const createUser = async (data: { email: string, password: string }) => {
    return prisma.user.create({
        data
    })
}
