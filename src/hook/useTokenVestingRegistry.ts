import { useContext, useEffect, useState } from "react";
import { ChainContext } from "../contexts/AliceContext";
import { ethers } from "ethers";
import useStoredWallet from "./useStoredWallet";

const useTokenVestingRegistry = () => {
    const { ethereumChain } = useContext(ChainContext);
    const [registry, setRegistry] = useState<ethers.Contract | null>(null);
    const [ready, setReady] = useState(false);
    const { getAliceAddress } = useStoredWallet();

    useEffect(() => {
        if (ethereumChain !== null) {
            const registry = new ethers.Contract(
                require("@alice-finance/dao-contracts/networks/TokenVestingRegistry.json")[
                    ethereumChain.config.chainId
                ],
                require("@alice-finance/dao-contracts/abis/TokenVestingRegistry.json"),
                ethereumChain.getSigner()
            );

            setRegistry(registry);
            setReady(true);
        }
    }, [ethereumChain]);

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
        ready,
        set,
        get,
        remove,
        clear
    };
};

export default useTokenVestingRegistry;
