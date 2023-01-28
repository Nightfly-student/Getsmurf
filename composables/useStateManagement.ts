import { User } from "@prisma/client"

export const useAuthToken = () => useState<String | null>("auth_token", () => null)
export const useForceRedirect = () => useState<Boolean | null>("force_redirect", () => false)
export const useAuthUser = () => useState<User | null>("auth_user", () => null)