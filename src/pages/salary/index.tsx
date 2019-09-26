import React, { useEffect, useState } from "react";
import { Container, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import useSalaryRegistry from "../../hook/useSalaryRegistry";
import { Link } from "react-router-dom";
import useSalary from "../../hook/useSalary";

interface SalaryInfoTableRowProps {
    address: string | null;
}

const SalaryInfoTableRow = ({ address }: SalaryInfoTableRowProps) => {
    const { salaryInfo } = useSalary(address);

    if (!salaryInfo) {
        return (
            <TableRow>
                <TableCell colSpan={3}>Loading...</TableCell>
            </TableRow>
        );
    }
    return (
        <TableRow>
            <TableCell component="td">Salary Contract {salaryInfo.address}</TableCell>
            <TableCell>
                {salaryInfo && salaryInfo.currentClaimable ? salaryInfo.currentClaimable.toString() : 0}
            </TableCell>
            <TableCell component="td">
                <Link to={`/salary/view/${salaryInfo.address}`}>View</Link>
            </TableCell>
        </TableRow>
    );
};

const SalaryPage = () => {
    const { ready, salaryAddress, getClosedSalaryAddressList } = useSalaryRegistry();
    const [closedSalaryList, setClosedSalaryList] = useState<Array<string>>([]);

    useEffect(() => {
        getClosedSalaryAddressList().then(result => setClosedSalaryList(result));
    }, [getClosedSalaryAddressList, ready]);

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
                        {salaryAddress ? (
                            <SalaryInfoTableRow address={salaryAddress} />
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} component="td">
                                    No contract available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <Typography component="h1">Closed Salary Contracts</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Contract Address</TableCell>
                            <TableCell>Claimable</TableCell>
                            <TableCell>&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {closedSalaryList.length > 0 ? (
                            closedSalaryList.map((address, index) => <SalaryInfoTableRow key={index} address={address} />)
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} component="td">
                                    No closed contracts
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Grid>
        </Container>
    );
};

export default SalaryPage;
