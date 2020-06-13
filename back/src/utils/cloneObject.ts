export const cloneObject = <T extends object>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
}