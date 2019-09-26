import React, { useEffect, useMemo, useState } from "react";
import { Container, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import useSalaryRegistry from "../../hook/useSalaryRegistry";
import { Contract } from "ethers";
import { Link } from "react-router-dom";
import { BigNumber } from "ethers/utils";

interface SalaryInfo {
    currentClaimable?: BigNumber;
    wage?: BigNumber;
    totalClaimed?: BigNumber;
}

const SalaryPage: React.FC = () => {
    const { ready, getSalary, getClosedSalary } = useSalaryRegistry();
    const [salaryAddress, setSalaryAddress] = useState(null);
    const [salary, setSalary] = useState<Contract | null>(null);
    const [salaryInfo, setSalaryInfo] = useState<SalaryInfo | null>();
    const [closedSalary, setClosedSalary] = useState<Array<Contract>>([]);

    useEffect(() => {
        console.log("ready", ready);
        if (ready) {
            getSalary().then(contract => {
                setSalary(contract);
            });
            getClosedSalary().then(contracts => {
                setClosedSalary(contracts);
            });
        }
    }, [ready, getSalary, setClosedSalary, getClosedSalary]);

    useEffect(() => {
        if (salary) {
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
        }
    }, [salary]);

    return (
        <Container className="wrapper">
            <Grid container className="section">
                <Typography component="h1">Salary</Typography>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Contract Address</TableCell>
                            <TableCell>Claimable</TableCell>
                            <TableCell>&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {salary !== null ? (
                            <TableRow>
                                <TableCell component="td">Salary Contract {salary.address}</TableCell>
                                <TableCell>
                                    {salaryInfo && salaryInfo.currentClaimable
                                        ? salaryInfo.currentClaimable.toString()
                                        : 0}
                                </TableCell>
                                <TableCell component="td">
                                    <Link to={`/salary/view/${salary.address}`}>View</Link>
                                </TableCell>
                            </TableRow>
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

export default SalaryPage;
