export function exclude(any: any, ...keys: any[]) {
    for (let key of keys) {
        delete any[key]
    }
    return any
}