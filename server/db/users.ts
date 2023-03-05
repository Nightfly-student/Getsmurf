import { prisma } from ".";

export const getUserById = async (id: string) => {
    return prisma.user.findUnique({
        where: {
            id
        },
        include: {
            roles: true
        }
    })
}

export const getUserByEmail = async (email: string) => {
    return prisma.user.findFirst({
        where: {
            email: email
        },
        include: {
            roles: true
        }
    })
}

export const createUser = async (data: { email: string, password: string }) => {
    return prisma.user.upsert({
        where: {
            email: data.email
        },
        update: {
            password: data.password,
            roles: {
                create: {
                    roleName: 'USER'
                }
            }
        },
        create: {
            email: data.email,
            password: data.password,
            roles: {
                create: {
                    roleName: 'USER'
                }
            }
        },
    })
}

export const getUsers = async (q: string, take: number, skip: number) => {
    return prisma.$transaction([
        prisma.user.count({
            where: {
                OR: [
                    {
                        email: {
                            contains: q,
                            mode: 'insensitive'
                        }
                    },
                ]
            }
        }),
        prisma.user.findMany({
            where: {
                OR: [
                    {
                        email: {
                            contains: q,
                            mode: 'insensitive'
                        }
                    },
                ]
            },
            take,
            skip,
            select: {
                id: true,
                email: true,
                roles: {
                    select: {
                        roleName: true
                    }
                },
                createdAt: true,
                updatedAt: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    ])
}
