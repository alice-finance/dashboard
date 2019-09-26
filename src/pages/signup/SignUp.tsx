import React from "react";
import { Link } from "react-router-dom";
import { List, ListItem } from "@material-ui/core";

const SignUp = () => {
    return (
        <List>
            <ListItem>
                <Link to="/signup/create">Create Wallet</Link>
            </ListItem>
            <ListItem>
                <Link to="/signup/import">Import Wallet</Link>
            </ListItem>
        </List>
    );
};

export default SignUp;
