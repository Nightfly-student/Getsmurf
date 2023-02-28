import { prisma } from ".";

export const getCollectionBySlug = async (slug: string) => {
    return await prisma.collection.findFirst({
        where: {
            slug,
        },
        select: {
            id: true,
            name: true,
            slug: true,
            description: true,
            Products: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    image: true,
                    price: true,
                    region: true,
                    uniqueIdentifier: true,
                },
            },
        },
    });
};