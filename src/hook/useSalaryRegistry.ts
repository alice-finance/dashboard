import { useCallback, useContext, useEffect, useState } from "react";
import { ChainContext } from "../contexts/ChainContext";
import { ethers } from "ethers";
import useStoredWallet from "./useStoredWallet";

const useSalaryRegistry = () => {
    const { loomChain } = useContext(ChainContext);
    const [registry, setRegistry] = useState<ethers.Contract | null>(null);
    const [ready, setReady] = useState(false);
    const { getAliceAddress } = useStoredWallet();
    const [aliceAddress] = useState(getAliceAddress());

    useEffect(() => {
        if (loomChain !== null) {
            const registry = new ethers.Contract(
                require("@alice-finance/dao-contracts/networks/SalaryRegistry.json")[loomChain.config.chainId].address,
                require("@alice-finance/dao-contracts/abis/SalaryRegistry.json"),
                loomChain.getSigner()
            );
            console.log(registry.address);

            setRegistry(registry);
            setReady(true);
        }
    }, [loomChain]);

    const contractAddress = useCallback(async () => {
        if (registry) {
            const address = await registry.contractOf(aliceAddress);
            if (address !== "0x0000000000000000000000000000000000000000") {
                return address;
            }
        }

        return null;
    }, [aliceAddress, registry]);

    const getSalary = useCallback(
        async (address: string = "") => {
            if (registry && loomChain) {
                if (!address) {
                    address = await registry.contractOf(aliceAddress);
                }
                if (address !== "0x0000000000000000000000000000000000000000" && address.length === 42) {
                    return new ethers.Contract(
                        address,
                        require("@alice-finance/dao-contracts/abis/Salary.json"),
                        loomChain.getSigner()
                    );
                }
            }
            return null;
        },
        [registry, loomChain, aliceAddress]
    );

    const getClosedSalary = useCallback(async () => {
        if (registry && loomChain) {
            const addressList = await registry.closedContractsOf(aliceAddress);
            if (addressList.length > 0) {
                return addressList.map((address: string) => {
                    return new ethers.Contract(
                        address,
                        require("@alice-finance/dao-contracts/abis/Salary.json"),
                        loomChain.getSigner()
                    );
                });
            }
        }
        return [];
    }, [registry, loomChain, aliceAddress]);

    return {
        contractAddress,
        getSalary,
        getClosedSalary,
        ready
    };
};

export default useSalaryRegistry;
