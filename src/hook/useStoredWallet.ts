import useStorage from "./useStorage";
import SecureLS from "secure-ls";

const useStoredWallet = () => {
    const storage = useStorage();

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

    return {
        reset,
        setAliceAddress,
        getAliceAddress,
        setEthAddress,
        getEthAddress,
        setMnemonicWithPassword,
        getMnemonicWithPassword
    };
};

export default useStoredWallet;
