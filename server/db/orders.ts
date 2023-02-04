import { AccountStatus, OrderStatus } from "@prisma/client";
import { prisma } from ".";

export const createOrder = async (data: any) => {
    return prisma.order.create({
        data: {
            billingEmail: data.billingEmail,
            quantity: data.quantity,
            ...!data.skin && {
                product: {
                    connect: {
                        slug: data.productSlug,
                    }
                }
            },
            ...data.skin && {
                skin: {
                    connect: {
                        name: data.productSlug,
                    }
                }
            },
            status: 'CREATED',
            total: parseFloat(data.total),
        },
    })
};

export const createPaymentSession = async (data: any) => {
    return prisma.paymentSession.create({
        data: {
            sessionId: data.sessionId,
            paymentMethod: data.paymentMethod,
            order: {
                connect: {
                    id: data.orderId,
                }
            },
        },
    })
}

export const getOrderById = async (id: string) => {
    return prisma.order.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            status: true,
            billingEmail: true,
            quantity: true,
            total: true,
            product: {
                select: {
                    name: true,
                    image: true,
                    region: true,
                    uniqueIdentifier: true,
                    category: true,
                }
            },
            skin: {
                select: {
                    name: true,
                    image: true,
                    rarity: true,
                },
            },
        }
    })
}

export const getOrderByOrderIdWebhook = async (id: string) => {
    return prisma.order.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            status: true,
            billingEmail: true,
            quantity: true,
            total: true,
            accounts: {
                select: {
                    id: true,
                    status: true,
                    license: {
                        select: {
                            username: true,
                            password: true,
                        }
                    }
                }
            },
            product: {
                select: {
                    name: true,
                    image: true,
                    region: true,
                    uniqueIdentifier: true,
                    category: true,
                    slug: true,
                }
            },
            skin: {
                select: {
                    name: true,
                    image: true,
                    rarity: true,
                },
            },
            paymentSession: {
                select: {
                    paymentMethod: true,
                    sessionId: true,
                }
            }
        }
    })
}

export const updateOrderStatusFailed = async (id: string) => {
    return prisma.order.update({
        where: {
            id: id,
        },
        data: {
            status: 'CANCELLED',
            accounts: {
                updateMany: {
                    where: {
                        status: 'PENDING',
                    },
                    data: {
                        status: 'AVAILABLE',
                    }
                }
            }
        },
    })
}

export const getAccountsByProductSlug = async (slug: string, quantity: number) => {
    return prisma.account.findMany({
        where: {
            Product: {
                slug: slug,
            },
            status: 'AVAILABLE',
        },
        take: quantity,
        orderBy: {
            createdAt: 'desc',
        }
    })
}

export const updateOrderAccount = async (id: string, accountId: string, orderStatus: OrderStatus, accountStatus: AccountStatus) => {
    return prisma.$transaction([
        prisma.account.update({
            where: {
                id: accountId,
            },
            data: {
                Order: {
                    connect: {
                        id: id,
                    },
                    update: {
                        status: orderStatus,
                    }
                },
                status: accountStatus
            },
        }),
    ])
}