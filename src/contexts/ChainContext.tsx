import React, { useEffect, useState } from "react";

import EthereumChain from "@alice-finance/alice.js/dist/chains/EthereumChain";
import LoomChain from "@alice-finance/alice.js/dist/chains/LoomChain";
import { EMPTY_MNEMONIC } from "../constants/bip39";
import useStoredWallet from "../hook/useStoredWallet";
import Alice from "@alice-finance/alice.js/dist";
import { useTestnet } from "../constants/environment";

export const ChainContext = React.createContext({
    isReadOnly: false,
    mnemonic: null as string | null,
    setMnemonic: (mnemonic: string | null) => {},
    loomChain: null as (LoomChain | null),
    setLoomChain: (connector: LoomChain | null) => {},
    ethereumChain: null as (EthereumChain | null),
    setEthereumChain: (connector: EthereumChain | null) => {}
});

export const ChainProvider: React.FC = ({ children }) => {
    const { getEthPrivateKey, getAlicePrivateKey } = useStoredWallet();
    const [ready, setReady] = useState(false);

    const [mnemonic, setMnemonic] = useState<string | null>(null);
    const [loomChain, setLoomChain] = useState<LoomChain | null>(null);
    const [ethereumChain, setEthereumChain] = useState<EthereumChain | null>(null);

    useEffect(() => {
        const ethereumPrivateKey = getEthPrivateKey();
        const alicePrivateKey = getAlicePrivateKey();
        if (ethereumPrivateKey !== null && alicePrivateKey !== null && !ready) {
            const alice = new Alice(ethereumPrivateKey, alicePrivateKey, useTestnet);
            setReady(true);
            setEthereumChain(alice.getEthereumChain());
            setLoomChain(alice.getLoomChain());
        }
    }, [ready]);

    return (
        <ChainContext.Provider
            value={{
                isReadOnly: mnemonic === EMPTY_MNEMONIC,
                mnemonic,
                setMnemonic,
                loomChain,
                setLoomChain,
                ethereumChain,
                setEthereumChain
            }}>
            {children}
        </ChainContext.Provider>
    );
};

export const ChainConsumer = ChainContext.Consumer;
