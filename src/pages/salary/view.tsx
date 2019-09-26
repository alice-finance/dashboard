import React, { useCallback, useEffect, useState } from "react";
import useSalaryRegistry from "../../hook/useSalaryRegistry";
import { Contract } from "ethers";
import { BigNumber } from "ethers/utils";
import { RouteComponentProps } from "react-router-dom";
import {
    Button,
    Container,
    createStyles,
    Grid,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Theme
} from "@material-ui/core";
import useStoredWallet from "../../hook/useStoredWallet";

interface MatchParams {
    address: string;
}

interface SalaryInfo {
    interval?: BigNumber;
    currentClaimable?: BigNumber;
    wage?: BigNumber;
    totalClaimed?: BigNumber;
    lastClaimedTimestamp?: Date;
}

interface ClaimInfo {
    amount: BigNumber;
    timestamp: Date;
}

const useStyles = makeStyles((theme: Theme) => createStyles({ root: { padding: theme.spacing(3, 2) } }));

const SalaryViewPage: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
    const { getAliceAddress } = useStoredWallet();
    const aliceAddress = getAliceAddress();
    const contractAddress = match.params.address;
    const { ready, getSalary } = useSalaryRegistry();
    const [salary, setSalary] = useState<Contract | null>(null);
    const [salaryInfo, setSalaryInfo] = useState<SalaryInfo | null>();
    const [claimList, setClaimList] = useState<Array<ClaimInfo>>([]);
    const classes = useStyles();

    useEffect(() => {
        if (ready) {
            getSalary(contractAddress).then(r => setSalary(r));
        }
    }, [contractAddress, getSalary, ready]);

    const refresh = useCallback(() => {
        if (salary) {
            salary.interval().then((interval: BigNumber) => {
                setSalaryInfo(prevState => {
                    return { ...prevState, interval: interval };
                });
            });
            salary.wage().then((wage: BigNumber) => {
                setSalaryInfo(prevState => {
                    return { ...prevState, wage: wage };
                });
            });
            salary.totalClaimed().then((totalClaimed: BigNumber) => {
                setSalaryInfo(prevState => {
                    return { ...prevState, totalClaimed: totalClaimed };
                });
            });
            salary.currentClaimable().then((currentClaimable: BigNumber) => {
                setSalaryInfo(prevState => {
                    return { ...prevState, currentClaimable: currentClaimable };
                });
            });
            salary.lastClaimedTimestamp().then((lastClaimedTimestamp: BigNumber) => {
                if (lastClaimedTimestamp.gt(new BigNumber(0))) {
                    setSalaryInfo(prevState => {
                        const date = new Date(lastClaimedTimestamp.toNumber() * 1000);
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
        }
    }, [salary]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const handleClaim = useCallback(() => {
        if (salary) {
            salary
                .claim({ gasLimit: 0 })
                .then(() => {
                    refresh();
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        }
    }, [refresh, salary]);

    return (
        <Container className="wrapper">
            <Grid container className="section">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th">Wage Interval</TableCell>
                            <TableCell>
                                {salaryInfo && salaryInfo.interval ? salaryInfo.interval.toNumber() : "Loading"}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th">Contracted Wage</TableCell>
                            <TableCell>
                                {salaryInfo && salaryInfo.wage ? salaryInfo.wage.toString() : "Loading"}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th">Total Claimed Wage</TableCell>
                            <TableCell>
                                {salaryInfo && salaryInfo.totalClaimed ? salaryInfo.totalClaimed.toString() : "Loading"}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th">Current Claimable Amount</TableCell>
                            <TableCell>
                                {salaryInfo && salaryInfo.currentClaimable
                                    ? salaryInfo.currentClaimable.toString()
                                    : "Loading"}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th">Last Claimed Date</TableCell>
                            <TableCell>
                                {salaryInfo
                                    ? salaryInfo.lastClaimedTimestamp
                                        ? salaryInfo.lastClaimedTimestamp.toString()
                                        : "Never Claimed"
                                    : "Loading"}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <Button
                    variant="contained"
                    color="primary"
                    disabled={
                        !(salaryInfo && salaryInfo.currentClaimable && salaryInfo.currentClaimable.gt(new BigNumber(0)))
                    }
                    onClick={handleClaim}>
                    Claim
                </Button>

                <Table>
                    <TableBody>
                        {claimList.length > 0 ? (
                            claimList.map(claim => {
                                return (
                                    <TableRow key={claim.timestamp.getTime()}>
                                        <TableCell>{claim.amount.toString()}</TableCell>
                                        <TableCell>{claim.timestamp.toString()}</TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell>Never Claimed</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Grid>
        </Container>
    );
};

export default SalaryViewPage;
