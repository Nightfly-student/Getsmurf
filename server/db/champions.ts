import { Region } from "@prisma/client";
import { prisma } from ".";

export const upsertChampions = async (champions: any) => {
    return prisma.$transaction(champions.map((champion: any) => (
        prisma.champion.upsert({
            where: {
                identifier: champion.identifier,
            },
            update: {
                name: champion.name,
                image: champion.image,
            },
            create: {
                identifier: champion.identifier,
                name: champion.name,
                image: champion.image,
            },
        })
    ))
    )
}

export const getChampions = async () => {
    return prisma.champion.findMany({
        select: {
            identifier: true,
            name: true,
            image: true,
        },
        orderBy: {
            name: 'asc'
        }
    })
}

export const getChampionAndSkinsAndAvailableSkins = async (champion: string, region: string) => {
    return prisma.$transaction([
        prisma.champion.findUnique({
            where: {
                name: champion,
            },
            select: {
                identifier: true,
                name: true,
                image: true,
                Skins: {
                    select: {
                        identifier: true,
                        name: true,
                        image: true,
                        rarity: true,
                    },
                    orderBy: {
                        name: 'asc'
                    }
                }
            }
        }),
        prisma.account.findMany({
            where: {
                Product: {
                    region: region as Region,
                },
                Skins: {
                    some: {
                        skin: {
                            champion: {
                                name: champion,
                            }
                        }
                    }
                }
            },
            select: {
                Skins: {
                    where: {
                        skin: {
                            champion: {
                                name: champion,
                            }
                        }
                    },
                    select: {
                        skin: {
                            select: {
                                name: true,
                                identifier: true,
                            }
                        }
                    }
                }
            }
        })
    ])

}