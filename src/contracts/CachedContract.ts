import { ethers } from "ethers";

export abstract class CachedContract {
    public contract: ethers.Contract;

    protected constructor(
        address: string,
        abis: string | (string | ethers.utils.ParamType)[] | ethers.utils.Interface,
        signer: ethers.Signer | ethers.providers.Provider
    ) {
        this.contract = new ethers.Contract(address, abis, signer);
    }

    abstract async update(): Promise<void>;
}
