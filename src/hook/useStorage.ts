const useStorage = () => {
    const getKey = (key: string): string => {
        return "__storage_" + key;
    };

    const get = (key: string): any => {
        const value = localStorage.getItem(getKey(key));
        if (value) {
            return JSON.parse(value);
        }
        return null;
    };

    const set = (key: string, data: any): void => {
        const value = JSON.stringify(data);
        localStorage.setItem(getKey(key), value);
    };

    const remove = (key: string) => {
        localStorage.removeItem(getKey(key));
    };

    const clear = () => {
        localStorage.clear();
    };

    return {
        set,
        get,
        remove,
        clear
    };
};

export default useStorage;
