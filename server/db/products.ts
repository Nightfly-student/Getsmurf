import { Region } from "@prisma/client";
import { prisma } from ".";

export const createProduct = async (data: any) => {
    return prisma.product.create({
        data: {
            name: data.title,
            description: data.description,
            price: parseFloat(data.price),
            image: data.image,
            category: data.category,
            region: data.region,
            uniqueIdentifier: data.identifier,
            slug: data.slug,
        }
    })
}

export const getProducts = async () => {
    return prisma.product.findMany({
        select: {
            slug: true,
            name: true,
            price: true,
            image: true,
            category: true,
            region: true,
            quantity: true,
        },
        orderBy: [
            {
                price: 'asc'
            },
            {
                region: 'asc'
            }
        ]
    })
}

export const getProductsByRegion = async (region: Region) => {
    return prisma.product.findMany({
        where: {
            region
        },
        select: {
            slug: true,
            name: true,
            price: true,
            image: true,
            category: true,
            region: true,
            quantity: true,
        },
        orderBy: {
            price: 'asc'
        }
    })
}