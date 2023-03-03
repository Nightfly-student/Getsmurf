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
            ...data.coupon && {
                coupon: {
                    connect: {
                        code: data.coupon,
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
            },
            coupon: {
                select: {
                    code: true,
                    discount: true,
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

export const getOrdersAdmin = async (q: string, take: number, skip: number) => {
    return prisma.$transaction([
        prisma.order.count({
            where: {
                OR: [
                    {
                        billingEmail: {
                            contains: q,
                            mode: 'insensitive',
                        },
                    },
                    {
                        id: {
                            contains: q,
                            mode: 'insensitive',
                        },
                    },
                    {
                        product: {
                            name: {
                                contains: q,
                                mode: 'insensitive',
                            },
                        },
                    },
                    {
                        skin: {
                            name: {
                                contains: q,
                                mode: 'insensitive',
                            },
                        },
                    },
                    {
                        ...Object.values(OrderStatus).includes(q.toUpperCase() as OrderStatus)
                        && {
                            status: q.toUpperCase() as OrderStatus,
                        }
                    }
                ],
            },
        }),
        prisma.order.findMany({
            where: {
                OR: [
                    {
                        billingEmail: {
                            contains: q,
                            mode: 'insensitive',
                        },
                    },
                    {
                        id: {
                            contains: q,
                            mode: 'insensitive',
                        },
                    },
                    {
                        product: {
                            name: {
                                contains: q,
                                mode: 'insensitive',
                            },
                        },
                    },
                    {
                        skin: {
                            name: {
                                contains: q,
                                mode: 'insensitive',
                            },
                        },
                    },
                    {
                        ...Object.values(OrderStatus).includes(q.toUpperCase() as OrderStatus)
                        && {
                            status: q.toUpperCase() as OrderStatus,
                        }
                    }
                ],
            },
            take: take,
            skip: skip,
            orderBy: {
                createdAt: 'desc',
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
                    }
                },
                skin: {
                    select: {
                        name: true,
                    },
                },
            },
        })
    ])

}

export const getOrderAdmin = async (id: string) => {
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
                    description: true,
                }
            },
            skin: {
                select: {
                    name: true,
                    image: true,
                    rarity: true,
                },
            },
            accounts: {
                select: {
                    id: true,
                    status: true,
                    license: {
                        select: {
                            username: true,
                            password: true,
                        },
                    },
                    Product: {
                        select: {
                            name: true,
                            region: true,
                        }
                    },
                    Order: {
                        select: {
                            id: true,
                            skin: {
                                select: {
                                    name: true,
                                }
                            }
                        }
                    }
                }
            },
            couponCode: true,
            updatedAt: true,
            createdAt: true,
        }
    })
}

export const getOrdersAdminByEmail = async (email: string, take: number, skip: number, id: string) => {
    return prisma.$transaction([
        prisma.order.count({
            where: {
                AND: [
                    {
                        billingEmail: {
                            equals: email,
                            mode: 'insensitive',
                        },
                    },
                    {
                        id: {
                            not: id,
                            mode: 'insensitive',
                        },
                    }
                ]
            },
        }),
        prisma.order.findMany({
            where: {
                AND: [
                    {
                        billingEmail: {
                            equals: email,
                            mode: 'insensitive',
                        },
                    },
                    {
                        id: {
                            not: id,
                            mode: 'insensitive',
                        },
                    }
                ]
            },
            take: take,
            skip: skip,
            orderBy: {
                createdAt: 'desc',
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
                    }
                },
                skin: {
                    select: {
                        name: true,
                    },
                },
            },
        })
    ])

}

export const addAccountToOrder = async (id: string, accountId: string) => {
    return prisma.order.update({
        where: {
            id: id,
        },
        data: {
            accounts: {
                connect: {
                    id: accountId,
                },
            },
        },
    })
}

export const updateOrderSkin = async (id: string, skinId: string) => {
    return prisma.order.update({
        where: {
            id: id,
        },
        data: {
            skin: {
                connect: {
                    id: skinId,
                },
            },
        },
    })
}

export const getRevenue = async (start: Date, end: Date) => {
    return prisma.$transaction([
        prisma.order.aggregate({
            where: {
                AND: [
                    {
                        createdAt: {
                            gte: start,
                        },
                    },
                    {
                        createdAt: {
                            lte: end,
                        },
                    },
                    {
                        status: 'PAID'
                    }
                ],
            },
            _sum: {
                total: true,
            },
        }),
        // prisma get all paid orders for each day in range separated by day
        prisma.order.findMany({
            where: {
                AND: [
                    {
                        createdAt: {
                            gte: start,
                        },
                    },
                    {
                        createdAt: {
                            lte: end,
                        },
                    },
                    {
                        status: 'PAID'
                    }
                ],
            },
            orderBy: {
                createdAt: 'asc',
            },
            select: {
                createdAt: true,
                total: true,
            },
        }),
    ])
}