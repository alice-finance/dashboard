const useSessionStorage = () => {
    const getKey = (key: string): string => {
        return "__session_" + key;
    };

    const get = (key: string): any => {
        const value = sessionStorage.getItem(getKey(key));
        if (value) {
            return JSON.parse(value);
        }
        return null;
    };

    const set = (key: string, data: any): void => {
        const value = JSON.stringify(data);
        sessionStorage.setItem(getKey(key), value);
    };

    const remove = (key: string) => {
        sessionStorage.removeItem(getKey(key));
    };

    const clear = () => {
        sessionStorage.clear();
    };

    return {
        set,
        get,
        remove,
        clear
    };
};

export default useSessionStorage;
