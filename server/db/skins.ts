import { prisma } from ".";

export const upsertSkins = async (skins: any) => {
    return prisma.$transaction(
        skins.map((skin: any) => (
            prisma.skin.upsert({
                where: {
                    identifier: skin.identifier,
                },
                update: {
                    name: skin.name,
                    image: skin.image,
                    rarity: skin.rarity,
                    key: skin.key,
                },
                create: {
                    identifier: skin.identifier,
                    name: skin.name,
                    image: skin.image,
                    rarity: skin.rarity,
                    key: skin.key,
                },
            })
        ))
    )

}