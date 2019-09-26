import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";
import { BigNumber } from "ethers/utils";
import { ChainContext } from "../contexts/ChainContext";
import { toast } from "react-toastify";

interface SalaryInfo {
    address?: string;
    interval?: BigNumber;
    currentClaimable?: BigNumber;
    wage?: BigNumber;
    totalClaimed?: BigNumber;
    lastClaimedTimestamp?: Date;
    closed?: boolean;
}

interface ClaimInfo {
    amount: BigNumber;
    timestamp: Date;
}

const useSalary = (address: string | null) => {
    const { loomChain } = useContext(ChainContext);
    const salary = useMemo(() => {
        if (address && loomChain) {
            return new ethers.Contract(
                address,
                require("@alice-finance/dao-contracts/abis/Salary.json"),
                loomChain.getSigner()
            );
        } else {
            return null;
        }
    }, [address, loomChain]);
    const [salaryInfo, setSalaryInfo] = useState<SalaryInfo | null>(null);
    const [claimList, setClaimList] = useState<Array<ClaimInfo>>([]);

    const refresh = useCallback(() => {
        if (salary != null) {
            setSalaryInfo(prevState => {
                return { ...prevState, address: salary.address };
            });
            salary.interval().then((value: BigNumber) => {
                setSalaryInfo(prevState => {
                    return { ...prevState, interval: value };
                });
            });
            salary.wage().then((value: BigNumber) => {
                setSalaryInfo(prevState => {
                    return { ...prevState, wage: value };
                });
            });
            salary.totalClaimed().then((value: BigNumber) => {
                setSalaryInfo(prevState => {
                    return { ...prevState, totalClaimed: value };
                });
            });
            salary.currentClaimable().then((value: BigNumber) => {
                setSalaryInfo(prevState => {
                    return { ...prevState, currentClaimable: value };
                });
            });
            salary.lastClaimedTimestamp().then((value: BigNumber) => {
                if (value.gt(new BigNumber(0))) {
                    setSalaryInfo(prevState => {
                        const date = new Date(value.toNumber() * 1000);
                        return { ...prevState, lastClaimedTimestamp: date };
                    });
                }
            });
            salary.getClaimLogs().then((result: Array<Array<BigNumber>>) => {
                const amounts = result[0];
                const timestamps = result[1];
                setClaimList(
                    amounts.map((v, i) => {
                        return { amount: v, timestamp: new Date(timestamps[i].toNumber() * 1000) };
                    })
                );
            });
            salary.isClosed().then((value: boolean) => {
                setSalaryInfo(prevState => {
                    return { ...prevState, closed: value };
                });
            });
        }
    }, [salary]);

    const claim = useCallback(() => {
        if (salary) {
            salary
                .claim({ gasLimit: 0 })
                .then(() => {
                    refresh();
                })
                .catch((e: Error) => {
                    toast.error(e);
                });
        }
    }, [salary, refresh]);

    useEffect(() => {
        refresh();
    }, [refresh]);
    return { salaryInfo, claimList, claim, refresh };
};

export default useSalary;
