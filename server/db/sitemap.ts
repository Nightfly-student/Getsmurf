import { prisma } from ".";

export const getRoutesBlogPosts = async () => {
    return await prisma.blog.findMany({
        where: {
            status: "PUBLISHED",
        },
        select: {
            slug: true,
        },
    });
}

export const getRoutesProducts = async () => {
    return await prisma.product.findMany({
        select: {
            slug: true,
        },
    });
}