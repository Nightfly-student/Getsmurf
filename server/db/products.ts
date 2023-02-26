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
            Accounts: {
                where: {
                    status: 'AVAILABLE'
                },
                select: {
                    id: true,
                },
            },
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
            rank: true,
            region: true,
            Accounts: {
                where: {
                    status: 'AVAILABLE'
                },
                select: {
                    id: true,
                },
            },
        },
        orderBy: {
            price: 'asc'
        }
    })
}

export const getProductBySlug = async (slug: string) => {
    return prisma.product.findUnique({
        where: {
            slug
        },
        select: {
            slug: true,
            name: true,
            price: true,
            image: true,
            category: true,
            region: true,
            description: true,
            uniqueIdentifier: true,
            Accounts: {
                where: {
                    status: 'AVAILABLE'
                },
                select: {
                    id: true,
                },
            },
        }
    })
}

export const getImportantInfo = async (slug: string) => {
    return prisma.$transaction([
        prisma.product.findUnique({
            where: {
                slug
            },
            select: {
                slug: true,
                name: true,
                price: true,
                image: true,
                category: true,
                region: true,
                description: true,
                uniqueIdentifier: true,
                updatedAt: true,
                AvgCostOfAccount: true,
                Accounts: {
                    select: {
                        id: true,
                    },
                },
            }
        }),
        prisma.account.count({
            where: {
                AND: [
                    {
                        Product: {
                            slug
                        },
                    },
                    {
                        status: 'SOLD'
                    }
                ]
            }
        }),
        prisma.order.findMany({
            where: {
                product: {
                    slug
                }
            },
            select: {
                id: true,
                billingEmail: true,
                status: true,
            },
            take: 4,
            orderBy: {
                updatedAt: 'desc'
            }
        })
    ])
}

export const getProductBySkinName = async (skinName: string, region: string) => {
    return prisma.account.findFirst({
        where: {
            AND: [
                {
                    Product: {
                        region: region as Region
                    }
                },
                {
                    Skins: {
                        some: {
                            skin: {
                                name: skinName
                            }
                        }
                    }
                }
            ]
        },
        select: {
            id: true,
            Skins: {
                where: {
                    skin: {
                        name: skinName
                    }
                },
                select: {
                    skin: {
                        select: {
                            name: true,
                            rarity: true,
                        }
                    }
                }
            },
        }
    })
}

export const getSkinsByRegion = async (region: Region) => {
    return prisma.skin.findMany({
        where: {
            AND: [

                {
                    SkinItem: {
                        some: {
                            account: {
                                status: 'AVAILABLE',
                            }
                        }
                    },
                },
                {
                    SkinItem: {
                        some: {
                            account: {
                                Product: {
                                    region
                                }
                            }
                        }
                    },
                }
            ],
        },
        select: {
            name: true,
            identifier: true,
        },
        orderBy: {
            name: 'asc'
        }
    })
}