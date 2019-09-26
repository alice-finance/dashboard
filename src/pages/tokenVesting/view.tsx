import React, { useCallback, useEffect, useState } from "react";
import useTokenVestingRegistry from "../../hook/useTokenVestingRegistry";
import { Contract } from "ethers";
import { BigNumber } from "ethers/utils";
import { RouteComponentProps } from "react-router-dom";
import {
    Button,
    Container,
    createStyles,
    Grid,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Theme
} from "@material-ui/core";
import useStoredWallet from "../../hook/useStoredWallet";
import { toast } from "react-toastify";

interface MatchParams {
    address: string;
}

interface TokenVestingInfo {
    totalSupply?: BigNumber;
    initialReleaseAmount?: BigNumber;
    releaseStartAt?: Date | string;
    releaseInterval?: BigNumber;
    releaseAmount?: BigNumber;
    claimAmount?: BigNumber;
    balance?: BigNumber;
    releaseCount?: BigNumber;
    totalLocked?: BigNumber;
    totalReleased?: BigNumber;
    totalClaimed?: BigNumber;
    currentClaimable?: BigNumber;
    lastClaimedTimestamp?: Date;
}

interface ClaimInfo {
    amount: BigNumber;
    timestamp: Date;
}

const useStyles = makeStyles((theme: Theme) => createStyles({ root: { padding: theme.spacing(3, 2) } }));

const TokenVestingViewPage: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
    const contractAddress = match.params.address;
    const { ready, getTokenVesting } = useTokenVestingRegistry();
    const [tokenVesting, setTokenVesting] = useState<Contract | null>(null);
    const [tokenVestingInfo, setTokenVestingInfo] = useState<TokenVestingInfo | null>();
    const [claimList, setClaimList] = useState<Array<ClaimInfo>>([]);
    useStyles();

    useEffect(() => {
        if (ready) {
            getTokenVesting(contractAddress).then(r => setTokenVesting(r));
        }
    }, [contractAddress, getTokenVesting, ready]);

    const refresh = useCallback(() => {
        if (tokenVesting) {
            tokenVesting.totalSupply().then((value: BigNumber) => {
                setTokenVestingInfo(prevState => {
                    return { ...prevState, totalSupply: value };
                });
            });
            tokenVesting.initialReleaseAmount().then((value: BigNumber) => {
                setTokenVestingInfo(prevState => {
                    return { ...prevState, initialReleaseAmount: value };
                });
            });
            tokenVesting.releaseInterval().then((value: BigNumber) => {
                setTokenVestingInfo(prevState => {
                    return { ...prevState, releaseInterval: value };
                });
            });
            tokenVesting.releaseAmount().then((value: BigNumber) => {
                setTokenVestingInfo(prevState => {
                    return { ...prevState, releaseAmount: value };
                });
            });
            tokenVesting.releaseCount().then((value: BigNumber) => {
                setTokenVestingInfo(prevState => {
                    return { ...prevState, releaseCount: value };
                });
            });
            tokenVesting.claimAmount().then((value: BigNumber) => {
                setTokenVestingInfo(prevState => {
                    return { ...prevState, claimAmount: value };
                });
            });
            tokenVesting.totalClaimed().then((value: BigNumber) => {
                setTokenVestingInfo(prevState => {
                    return { ...prevState, totalClaimed: value };
                });
            });
            tokenVesting.totalReleased().then((value: BigNumber) => {
                setTokenVestingInfo(prevState => {
                    return { ...prevState, totalReleased: value };
                });
            });
            tokenVesting.totalLocked().then((value: BigNumber) => {
                setTokenVestingInfo(prevState => {
                    return { ...prevState, totalLocked: value };
                });
            });
            tokenVesting.currentClaimable().then((value: BigNumber) => {
                setTokenVestingInfo(prevState => {
                    return { ...prevState, currentClaimable: value };
                });
            });
            tokenVesting.balance().then((value: BigNumber) => {
                setTokenVestingInfo(prevState => {
                    return { ...prevState, balance: value };
                });
            });
            tokenVesting.releaseStartAt().then((value: BigNumber) => {
                if (value.gt(new BigNumber(0))) {
                    setTokenVestingInfo(prevState => {
                        const date = new Date(value.toNumber() * 1000);
                        return { ...prevState, releaseStartAt: date };
                    });
                } else {
                    setTokenVestingInfo(prevState => {
                        return { ...prevState, releaseStartAt: "Contract has no pending period" };
                    });
                }
            });
            tokenVesting.lastClaimedTimestamp().then((value: BigNumber) => {
                if (value.gt(new BigNumber(0))) {
                    setTokenVestingInfo(prevState => {
                        const date = new Date(value.toNumber() * 1000);
                        return { ...prevState, lastClaimedTimestamp: date };
                    });
                }
            });
            tokenVesting.getClaimLogs().then((result: Array<Array<BigNumber>>) => {
                const amounts = result[0];
                const timestamps = result[1];
                setClaimList(
                    amounts.map((v, i) => {
                        return { amount: v, timestamp: new Date(timestamps[i].toNumber() * 1000) };
                    })
                );
            });
        }
    }, [tokenVesting]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const handleClaim = useCallback(() => {
        if (tokenVesting) {
            tokenVesting
                .claim({ gasLimit: 0 })
                .then(() => {
                    refresh();
                })
                .catch((e: Error) => {
                    toast.error(e);
                });
        }
    }, [refresh, tokenVesting]);

    return (
        <Container className="wrapper">
            <Grid container className="section">
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th">Release Start At</TableCell>
                            <TableCell>
                                {tokenVestingInfo && tokenVestingInfo.releaseStartAt
                                    ? tokenVestingInfo.releaseStartAt.toString()
                                    : "Loading"}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th">Release Interval</TableCell>
                            <TableCell>
                                {tokenVestingInfo && tokenVestingInfo.releaseInterval
                                    ? tokenVestingInfo.releaseInterval.toNumber()
                                    : "Loading"}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th">Initial Release Amount</TableCell>
                            <TableCell>
                                {tokenVestingInfo && tokenVestingInfo.initialReleaseAmount
                                    ? tokenVestingInfo.initialReleaseAmount.toString()
                                    : "Loading"}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th">Release Amount</TableCell>
                            <TableCell>
                                {tokenVestingInfo && tokenVestingInfo.releaseAmount
                                    ? tokenVestingInfo.releaseAmount.toString()
                                    : "Loading"}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th">Claim Amount</TableCell>
                            <TableCell>
                                {tokenVestingInfo && tokenVestingInfo.claimAmount
                                    ? tokenVestingInfo.claimAmount.toString()
                                    : "Loading"}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th">Total Supply</TableCell>
                            <TableCell>
                                {tokenVestingInfo && tokenVestingInfo.totalSupply
                                    ? tokenVestingInfo.totalSupply.toString()
                                    : "Loading"}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th">Total Locked</TableCell>
                            <TableCell>
                                {tokenVestingInfo && tokenVestingInfo.totalLocked
                                    ? tokenVestingInfo.totalLocked.toString()
                                    : "Loading"}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th">Total Released</TableCell>
                            <TableCell>
                                {tokenVestingInfo && tokenVestingInfo.totalReleased
                                    ? tokenVestingInfo.totalReleased.toString()
                                    : "Loading"}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th">Total Claimed</TableCell>
                            <TableCell>
                                {tokenVestingInfo && tokenVestingInfo.totalClaimed
                                    ? tokenVestingInfo.totalClaimed.toString()
                                    : "Loading"}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th">Current Claimable Amount</TableCell>
                            <TableCell>
                                {tokenVestingInfo && tokenVestingInfo.currentClaimable
                                    ? tokenVestingInfo.currentClaimable.toString()
                                    : "Loading"}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th">Last Claimed Date</TableCell>
                            <TableCell>
                                {tokenVestingInfo
                                    ? tokenVestingInfo.lastClaimedTimestamp
                                        ? tokenVestingInfo.lastClaimedTimestamp.toString()
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
                        !(
                            tokenVestingInfo &&
                            tokenVestingInfo.currentClaimable &&
                            tokenVestingInfo.currentClaimable.gt(new BigNumber(0))
                        )
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

export default TokenVestingViewPage;
