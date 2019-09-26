import React, { useEffect, useMemo, useState } from "react";
import { Container, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import useTokenVestingRegistry from "../../hook/useTokenVestingRegistry";
import { Contract } from "ethers";
import { Link } from "react-router-dom";
import { BigNumber } from "ethers/utils";

interface TokenVestingInfo {
    currentClaimable?: BigNumber;
    wage?: BigNumber;
    totalClaimed?: BigNumber;
}

const TokenVestingPage: React.FC = () => {
    const { ready, getTokenVestingList } = useTokenVestingRegistry();
    const [tokenVestingList, setTokenVestingList] = useState<Array<Contract>>([]);
    const [tokenVestingInfoList, setTokenVestingInfoList] = useState<Array<TokenVestingInfo>>([]);

    const loadData = (contract: Contract, index: number) => {
        contract.currentClaimable().then((currentClaimable: BigNumber) => {
            setTokenVestingInfoList(prevState => {
                prevState[index].currentClaimable = currentClaimable;
                return [...prevState];
            });
        });
    };

    useEffect(() => {
        console.log("ready", ready);
        if (ready) {
            getTokenVestingList().then(contracts => {
                setTokenVestingList(contracts);
            });
        }
    }, [ready, getTokenVestingList]);

    useEffect(() => {
        setTokenVestingInfoList(
            tokenVestingList.map(v => {
                return {};
            })
        );
        tokenVestingList.forEach((contract, index) => {
            loadData(contract, index);
        });
    }, [tokenVestingList]);

    return (
        <Container className="wrapper">
            <Grid container className="section">
                <Typography component="h1">TokenVesting</Typography>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Contract Address</TableCell>
                            <TableCell>Claimable</TableCell>
                            <TableCell>&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tokenVestingList.length > 0 ? (
                            tokenVestingList.map((vesting, index) => {
                                return (
                                    <TableRow>
                                        <TableCell component="td">TokenVesting Contract {vesting.address}</TableCell>
                                        <TableCell>
                                            {tokenVestingInfoList[index] && tokenVestingInfoList[index].currentClaimable
                                                ? tokenVestingInfoList[index].currentClaimable!.toString()
                                                : "Loading"}
                                        </TableCell>
                                        <TableCell component="td">
                                            <Link to={`/token-vesting/view/${vesting.address}`}>View</Link>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell component="td">No contract available</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Grid>
        </Container>
    );
};

export default TokenVestingPage;
