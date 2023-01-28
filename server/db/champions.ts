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