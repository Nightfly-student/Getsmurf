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

export const getRoles = async (q: string) => {
    return prisma.$transaction([
        prisma.role.count({
            where: {
                OR: [
                    {
                        name: {
                            contains: q,
                            mode: 'insensitive'
                        }
                    },
                ]
            }
        }),
        prisma.role.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: q,
                            mode: 'insensitive'
                        }
                    },
                ]
            },
            select: {
                name: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    ])
}

export const upsertRole = async (email: string, role: string) => {
    return prisma.user.update({
        where: {
            email
        },
        data: {
            roles: {
                create: {
                    roleName: role
                }
            }
        }
    })
}

export const deleteRole = async (email: string, role: string) => {
    return prisma.roleItem.delete({
        where: {
            userEmail_roleName: {
                userEmail: email,
                roleName: role
            }
        }
    })
}