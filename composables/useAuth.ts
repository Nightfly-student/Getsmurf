import useFetchApi from "./useFetchApi";
import {
    useAuthUser,
    useAuthToken,
    useForceRedirect,
} from "./useStateManagement";

export default () => {
    const authToken = useAuthToken();
    const authUser = useAuthUser();
    const forcedRedirect = useForceRedirect();

    const setToken = (newToken: any) => {
        authToken.value = newToken;
    };

    const setUser = (newUser: any) => {
        authUser.value = newUser;
    };

    const setForcedRedirect = (redirect: boolean) => {
        forcedRedirect.value = redirect;
    };

    const login = (email: string, password: string) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await $fetch("/api/auth/login", {
                    method: "POST",
                    body: {
                        email,
                        password,
                    },
                });
                setToken(data.access_token);
                setUser(data.user);

                resolve(true);
            } catch (err) {
                reject(err);
            }
        });
    };

    const register = (
        email: string,
        password: string,
    ) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await $fetch("/api/auth/register", {
                    method: "POST",
                    body: {
                        email,
                        password,
                    },
                });
                setToken(data.access_token);
                setUser(data.user);

                resolve(true);
            } catch (err) {
                reject(err);
            }
        });
    };

    const getUser = async () => {
        if (authToken.value != null) {
            try {
                const data = await $fetch("/api/auth/user", {
                    headers: {
                        Authorization: `Bearer ${authToken.value}`,
                    },
                });
                setUser(data.user);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const oAuthRefreshToken = (token: string) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await $fetch("/api/auth/refresh", {
                    method: "POST",
                    body: token,
                });
                setToken(data.access_token);
                resolve(true);
            } catch (err) {
                reject(err);
            }
        });
    };

    const clientSideRefreshToken = async () => {
        try {
            const data = await $fetch("/api/auth/refresh");
            setToken(data.access_token);
        } catch (err: any) {
            console.log(err);
        }
    };

    const refreshToken = async () => {
        try {
            const data = await $fetch("/api/auth/refresh", {
                headers: useRequestHeaders(["cookie"]) as HeadersInit
            });
            setToken(data.access_token);
        } catch (err: any) {
            console.log(err);
        }
    };

    const reRefreshAccessToken = async () => {
        if (!authToken.value) {
            return;
        }

        const newRefreshTime = 300000;

        setTimeout(async () => {
            await clientSideRefreshToken();
            reRefreshAccessToken();
        }, newRefreshTime);
    };

    const initAuth = async () => {
        if (!authUser.value) {
            try {
                await refreshToken();
                await getUser();
            } catch (error) {
                setUser(null);
                setToken(null);
            }
        }
    };

    const isLogged = () => {
        const authToken = useAuthToken();
        const user = useAuthUser();

        if (user.value && authToken.value) {
            return true;
        }

        return false;
    };

    const logout = () => {
        return new Promise(async (resolve, reject) => {
            try {
                await useFetchApi("/api/auth/logout", {
                    method: "POST",
                });

                setToken(null);
                setUser(null);

                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    };

    const forgotPassword = (email: string) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data: any = await $fetch("/api/auth/forgot", {
                    method: "POST",
                    body: {
                        email,
                    },
                });
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    };

    const changeEmailAddress = (email: string, password: string) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data: any = await useFetchApi("/api/auth/email", {
                    method: "POST",
                    body: {
                        email,
                        password,
                    },
                });
                setUser(data.user);
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    };

    const checkForgotPassword = (code: string) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data: any = await $fetch(`/api/auth/forgot?code=${code}`, {});
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    };

    const resetForgottenPassword = (code: string, password: string) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data: any = await $fetch(`/api/auth/forgot/reset`, {
                    method: "POST",
                    body: {
                        code,
                        password,
                    },
                });
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    };

    return {
        login,
        register,
        isLogged,
        logout,
        useAuthUser,
        useAuthToken,
        setUser,
        oAuthRefreshToken,
        initAuth,
        forgotPassword,
        checkForgotPassword,
        resetForgottenPassword,
        changeEmailAddress,
        useForceRedirect,
        setForcedRedirect,
        reRefreshAccessToken,
    };
};