import React from "react";
import { Link } from "react-router-dom";
import { Container, Grid, List, ListItem } from "@material-ui/core";

const SignUp = () => {
    return (
        <Container className="wrapper">
            <Grid container className="section">
                <List>
                    {/*<ListItem>*/}
                    {/*    <Link to="/signup/create">Create Wallet</Link>*/}
                    {/*</ListItem>*/}
                    <ListItem>
                        <Link to="/signup/import">Import Wallet</Link>
                    </ListItem>
                </List>
            </Grid>
        </Container>
    );
};

export default SignUp;
