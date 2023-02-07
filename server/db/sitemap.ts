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