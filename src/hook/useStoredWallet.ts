import useStorage from "./useStorage";
import SecureLS from "secure-ls";
import useSessionStorage from "./useSessionStorage";

const useStoredWallet = () => {
    const storage = useStorage();
    const session = useSessionStorage();

    const reset = () => {
        localStorage.clear();
    };

    const setAliceAddress = (address: string) => {
        storage.set("alice-address", address);
    };

    const setEthAddress = (address: string) => {
        storage.set("eth-address", address);
    };

    const getAliceAddress = () => {
        return storage.get("alice-address");
    };

    const getEthAddress = () => {
        return storage.get("eth-address");
    };

    const getMnemonicWithPassword = (password: string) => {
        const sstore = new SecureLS({ encodingType: "aes", isCompression: false, encryptionSecret: password });
        return sstore.get("mnemonic");
    };

    const setMnemonicWithPassword = (mnemonic: string, password: string) => {
        const sstore = new SecureLS({ encodingType: "aes", isCompression: false, encryptionSecret: password });
        sstore.set("mnemonic", mnemonic);
    };

    const setEthPrivateKey = (privateKey: string) => {
        session.set("eth-key", privateKey);
    };

    const setAlicePrivateKey = (privateKey: string) => {
        session.set("alice-key", privateKey);
    };

    const getEthPrivateKey = () => {
        return session.get("eth-key");
    };

    const getAlicePrivateKey = () => {
        return session.get("alice-key");
    };

    return {
        reset,
        setAliceAddress,
        getAliceAddress,
        setEthAddress,
        getEthAddress,
        setMnemonicWithPassword,
        getMnemonicWithPassword,
        setEthPrivateKey,
        setAlicePrivateKey,
        getEthPrivateKey,
        getAlicePrivateKey
    };
};

export default useStoredWallet;
