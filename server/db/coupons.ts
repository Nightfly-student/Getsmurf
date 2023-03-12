import { prisma } from ".";

export const getCouponsAdmin = async (q: string, take: number, skip: number) => {
    return prisma.$transaction([
        prisma.coupon.count({
            where: {
                OR: [
                    {
                        code: {
                            contains: q,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
        }),
        prisma.coupon.findMany({
            where: {
                OR: [
                    {
                        code: {
                            contains: q,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
            take: take,
            skip: skip,
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                code: true,
                discount: true,
                uses: true,
                maxUses: true,
                expiresAt: true,
            }
        }),
    ]);
}

export const createCoupon = async (code: string, discount: number, maxUses: number, expiresAt: Date) => {
    return prisma.coupon.create({
        data: {
            code,
            discount,
            maxUses,
            expiresAt,
        },
    });
}

export const getCouponByCode = async (code: string) => {
    return prisma.coupon.findFirst({
        where: {
            AND: [
                {
                    code: {
                        equals: code,
                        mode: 'insensitive',
                    }
                },
            ]
        },
        select: {
            code: true,
            maxUses: true,
            uses: true,
            expiresAt: true,
            discount: true,
            affiliate: {
                select: {
                    name: true,
                }
            }
        }
    });
}

export const updateCouponUses = async (code: string) => {
    return prisma.coupon.update({
        where: {
            code: code,
        },
        data: {
            uses: {
                increment: 1,
            },
        },
    });
}

export const deleteCoupon = async (code: string) => {
    return prisma.coupon.delete({
        where: {
            code: code,
        },
    });
}