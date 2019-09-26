import { useCallback, useContext, useEffect, useState } from "react";
import { ChainContext } from "../contexts/ChainContext";
import { ethers } from "ethers";
import useStoredWallet from "./useStoredWallet";

const useSalaryRegistry = () => {
    const { loomChain } = useContext(ChainContext);
    const [registry, setRegistry] = useState<ethers.Contract | null>(null);
    const [ready, setReady] = useState(false);
    const { getAliceAddress } = useStoredWallet();
    const [salaryAddress, setSalaryAddress] = useState<string | null>(null);
    const [aliceAddress] = useState(getAliceAddress());

    useEffect(() => {
        if (loomChain !== null) {
            const registry = new ethers.Contract(
                require("@alice-finance/dao-contracts/networks/SalaryRegistry.json")[loomChain.config.chainId].address,
                require("@alice-finance/dao-contracts/abis/SalaryRegistry.json"),
                loomChain.getSigner()
            );

            setRegistry(registry);
            setReady(true);
        }
    }, [loomChain]);

    const getSalaryAddress = useCallback(async () => {
        if (registry) {
            const address = await registry.contractOf(aliceAddress);
            if (address !== "0x0000000000000000000000000000000000000000") {
                setSalaryAddress(address);
                return address;
            }
        }

        setSalaryAddress(null);
        return null;
    }, [aliceAddress, registry]);

    const getClosedSalaryAddressList = useCallback(async () => {
        if (registry) {
            return await registry.closedContractsOf(aliceAddress);
        }

        return [];
    }, [aliceAddress, registry]);

    useEffect(() => {
        if (registry) {
            // noinspection JSIgnoredPromiseFromCall
            getSalaryAddress();
        }
    }, [registry, getSalaryAddress]);

    return {
        salaryAddress,
        getSalaryAddress,
        getClosedSalaryAddressList,
        ready
    };
};

export default useSalaryRegistry;
