import React, { useCallback } from "react";
import { BigNumber } from "ethers/utils";
import { RouteComponentProps } from "react-router-dom";
import { Button, Container, Grid, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import useStoredWallet from "../../hook/useStoredWallet";
import useSalary from "../../hook/useSalary";

interface MatchParams {
    address: string;
}

const SalaryViewPage: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
    const { getAliceAddress } = useStoredWallet();
    getAliceAddress();
    const contractAddress = match.params.address;
    const { salaryInfo, claimList, claim } = useSalary(contractAddress);

    const handleClaim = useCallback(() => {
        claim();
    }, [claim]);

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
