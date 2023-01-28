export default defineNuxtRouteMiddleware(async (to, from) => {
    const { useAuthUser } = useAuth()
    const user = useAuthUser()

    if (user.value) {
        if (process.server) {
            return navigateTo({ path: "/" })
        }


        return abortNavigation()
    }
})