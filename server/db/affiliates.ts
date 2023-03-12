import { prisma } from ".";

export const createAffiliate = async (name: string, coupon: string, userId: string) => {
    return prisma.affiliate.create({
        data: {
            name,
            coupon: {
                create: {
                    code: coupon,
                    discount: 10,
                    maxUses: 99999,
                    expiresAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 965),
                },
            },
            userId
        },
    });
}

export const getAffiliate = async (userId: string) => {
    return prisma.affiliate.findUnique({
        where: {
            userId
        },
        include: {
            coupon: true,
        },
    });
}

export const getAffiliateByName = async (name: string) => {
    return prisma.affiliate.findUnique({
        where: {
            name
        },
    });
}

export const getAffiliateByNameOrder = async (name: string) => {
    return prisma.affiliate.findUnique({
        where: {
            name
        },
        select: {
            name: true,
            percent: true,
        }
    });
}

export const updateAffiliateOrderBalance = async (name: string, amount: number) => {
    return prisma.affiliate.update({
        where: {
            name
        },
        data: {
            balance: {
                increment: amount,
            },
        },
    });
}