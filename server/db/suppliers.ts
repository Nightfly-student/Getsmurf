import { prisma } from ".";

export const upsertSupplier = async (supplier: any) => {
    return prisma.supplier.upsert({
        where: {
            name: supplier.name,
        },
        update: {
            source: supplier.source,
        },
        create: {
            name: supplier.name,
            source: supplier.source,
        },
    })
}