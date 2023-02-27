import { AccountStatus, Region } from "@prisma/client";
import { prisma } from ".";
import CryptoJS from "crypto-js";

export const createManyAccounts = async (supplier: any, accounts: any[]) => {
    const config = useRuntimeConfig();
    return prisma.$transaction(accounts.map((account: any) => (
        prisma.account.create({
            data: {
                Product: {
                    connect: {
                        uniqueIdentifier: account.slug,
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


export const getAccountBySlug = async (productSlug: string) => {
    return prisma.account.findFirst({
        where: {
            AND: [
                {
                    status: 'AVAILABLE',
                },
                {
                    ProductSlug: productSlug
                }
            ]
        },
        include: {
            Skins: true,
            Product: true,
            license: true,
        }
    })
}

export const getAccountBySkinAndRegion = async (region: Region, skinIdentifier: string) => {
    return prisma.account.findFirst({
        where: {
            AND: [
                {
                    status: 'AVAILABLE'
                },
                {
                    Skins: {
                        some: {
                            skin: {
                                identifier: skinIdentifier
                            }
                        }
                    }
                },
                {
                    Product: {
                        region
                    }
                }
            ]
        },
        select: {
            id: true,
            status: true,
            license: {
                select: {
                    username: true,
                    password: true,
                },
            },
            Skins: {
                where: {
                    skin: {
                        identifier: skinIdentifier
                    }
                }
            },
            Product: {
                select: {
                    name: true,
                    region: true,
                }
            },
            Order: {
                select: {
                    id: true,
                    skin: {
                        select: {
                            name: true,
                        }
                    }
                }
            },
        },
    })
}

export const updateStatusOfAccount = async (accountId: string, status: AccountStatus) => {
    return prisma.account.update({
        where: {
            id: accountId
        },
        data: {
            status
        }
    })
}