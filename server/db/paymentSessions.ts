import { prisma } from ".";

export const getPaymentSessionByOrderId = async (id: string) => {
    return prisma.order.findFirst({
        where: {
            id,
        },
        select: {
            id: true,
            paymentSession: {
                select: {
                    sessionId: true,
                    paymentMethod: true,
                    id: true,
                }
            }
        }
    })
}