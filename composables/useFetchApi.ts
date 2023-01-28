import { useAuthToken } from './useStateManagement';

export default (url: string, options: any = {}) => {
    const authToken = useAuthToken()

    return $fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${authToken.value}`
        }
    })
}