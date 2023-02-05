import { BlogCategory, BlogStatus } from "@prisma/client";
import { prisma } from ".";

export const createBlog = (blogData: any) => {
    return prisma.blog.upsert({
        where: {
            slug: blogData.id,
        },
        create: {
            title: blogData.title,
            content: blogData.content,
            slug: blogData.title.replaceAll(' ', '-').toLowerCase(),
            status: blogData.status as BlogStatus,
            category: blogData.category as BlogCategory,
            image: blogData.image,
            author: {
                connect: {
                    id: blogData.userId
                }
            },
            meta: {
                create: {
                    title: blogData.metaTitle,
                    description: blogData.metaDescription,
                    image: blogData.image,
                },
            },
        },
        update: {
            title: blogData.title,
            content: blogData.content,
            slug: blogData.title.replaceAll(' ', '-').toLowerCase(),
            status: blogData.status as BlogStatus,
            category: blogData.category as BlogCategory,
            image: blogData.image,
            meta: {
                update: {
                    title: blogData.metaTitle,
                    description: blogData.metaDescription,
                    image: blogData.image,
                },
            },
        },
    });
};

export const findManyPosts = (take: number, skip: number, q: string) => {
    return prisma.$transaction([
        prisma.blog.count({
            where: {
                OR: [
                    { title: { contains: q, mode: 'insensitive' } },
                    { content: { contains: q, mode: 'insensitive' } },
                ],
                status: 'PUBLISHED',
            },
        }),
        prisma.blog.findMany({
            where: {
                OR: [
                    { title: { contains: q, mode: 'insensitive' } },
                    { content: { contains: q, mode: 'insensitive' } },
                ],
            },
            take,
            skip,
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                slug: true,
                title: true,
                meta: {
                    select: {
                        description: true,
                    }
                },
                createdAt: true,
                image: true,
            }
        })
    ])
};

export const findManyAdminPosts = (take: number, skip: number, q: string) => {
    return prisma.$transaction([
        prisma.blog.count({
            where: {
                OR: [
                    { title: { contains: q, mode: 'insensitive' } },
                    { content: { contains: q, mode: 'insensitive' } },
                ],
                status: 'PUBLISHED',
            },
        }),
        prisma.blog.findMany({
            where: {
                OR: [
                    { title: { contains: q, mode: 'insensitive' } },
                    { content: { contains: q, mode: 'insensitive' } },
                ],
            },
            take,
            skip,
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                slug: true,
                title: true,
                meta: {
                    select: {
                        description: true,
                    }
                },
                createdAt: true,
                image: true,
                id: true,
            }
        })
    ])
}

export const getPostBySlug = (slug: string) => {
    return prisma.blog.findUnique({
        where: {
            slug,
        },
        select: {
            slug: true,
            title: true,
            content: true,
            image: true,
            meta: {
                select: {
                    title: true,
                    description: true,
                    image: true,
                },
            },
            category: true,
            status: true,
            createdAt: true,
            updatedAt: true,
        }
    })
};

export const deleteBlog = (id: string) => {
    return prisma.blog.delete({
        where: {
            id,
        },
    })
}