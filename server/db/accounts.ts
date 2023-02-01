import { prisma } from ".";
import CryptoJS from "crypto-js";

export const createManyAccounts = async (supplier: any, accounts: any[]) => {
    const config = useRuntimeConfig();
    return prisma.$transaction(accounts.map((account: any) => (
        prisma.account.create({
            data: {
                Product: {
                    connect: {
                        slug: account.slug,
                    },
                },
                Supplier: {
                    connect: {
                        name: supplier.name,
                    }
                },
                license: {
                    create: {
                        username: account.user,
                        password: CryptoJS.AES.encrypt(account.pass, config.aesKey).toString(),
                    }
                },
                ...account.skins && account.skins.length !== 0 && {
                    Skins: {
                        createMany: {
                            data: account.skins
                        },
                    },
                },
                be: parseInt(account.be),
            }
        })
    ))
    )
}
