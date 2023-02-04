import { prisma } from ".";

export const getLicensesByOrderId = async (id: string) => {
    return prisma.license.findMany({
        where: {
            AND: [
                {
                    Account: {
                        status: 'SOLD'
                    }
                },
                {
                    Account: {
                        Order: {
                            id
                        }
                    }
                }
            ]
        },
        select: {
            username: true,
            password: true,
        }
    })
}