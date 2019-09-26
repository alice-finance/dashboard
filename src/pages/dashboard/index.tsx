import React, { useEffect, useState } from "react";
import { Container, Grid, Paper, Typography } from "@material-ui/core";
import useSalaryRegistry from "../../hook/useSalaryRegistry";
import useTokenVestingRegistry from "../../hook/useTokenVestingRegistry";
import { BigNumber } from "ethers/utils";
import { Contract } from "ethers";
import "../Page.scss";
import useSalary from "../../hook/useSalary";

const DashboardPage = () => {
    const [hasSalary, setHasSalary] = useState(false);
    const [hasTokenVesting, setHasTokenVesting] = useState(false);
    const [salaryClaimable, setSalaryClaimable] = useState<BigNumber>(() => new BigNumber(0));
    const [tokenVestingClaimable, setTokenVestingClaimable] = useState<BigNumber>(() => new BigNumber(0));

    const { salaryAddress } = useSalaryRegistry();
    const { salaryInfo } = useSalary(salaryAddress);
    // const { ready: salaryReady, getSalary } = useSalaryRegistry();
    const { ready: tokenVestingReady, getTokenVestingList } = useTokenVestingRegistry();

    // useEffect(() => {
    //     if (salaryReady) {
    //         getSalary().then((salary: Contract | null) => {
    //             if (salary) {
    //                 setHasSalary(true);
    //                 salary.currentClaimable().then((amount: BigNumber) => {
    //                     setSalaryClaimable(amount);
    //                 });
    //             }
    //         });
    //     }
    // }, [getSalary, salaryReady]);
    //
    useEffect(() => {
        if (tokenVestingReady) {
            getTokenVestingList().then((contracts: Contract[]) => {
                if (contracts.length > 0) {
                    setHasTokenVesting(true);
                    contracts.forEach(contract => {
                        contract.currentClaimable().then((amount: BigNumber) => {
                            setTokenVestingClaimable(prevState => {
                                return prevState.add(amount);
                            });
                        });
                    });
                }
            });
        }
    }, [getTokenVestingList, tokenVestingReady]);

    return (
        <Container className="wrapper">
            <Grid container className="section">
                <Grid container spacing={4}>
                    <Grid item md={6}>
                        <Paper style={{ padding: 16 }}>
                            {salaryInfo ? (
                                <p>Claimable Salary: {salaryClaimable.toString()}</p>
                            ) : (
                                <p>You don't signed salary contract</p>
                            )}
                        </Paper>
                    </Grid>
                    <Grid item md={6}>
                        <Paper style={{padding: 16}}>
                            {hasTokenVesting ? (
                                <p>Claimable Token: {tokenVestingClaimable.toString()}</p>
                            ) : (
                                <p>You don't signed token vesting contract</p>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default DashboardPage;
