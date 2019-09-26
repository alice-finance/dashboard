import { Grid, List, ListItem, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import React from "react";

import "./Footer.scss";

const currentYear = new Date().getFullYear();

const Footer = () => {
    return (
        <Grid className="footerArea">
            <Grid container alignItems="center" className="container">
                <Grid item xs={12} sm={6}>
                    <Typography component="p">
                        {currentYear} | All Right Reserved By <strong>Alice Finance</strong>
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <List disablePadding>
                        <ListItem>
                            <Link to="/">FAQS</Link>
                        </ListItem>
                        <ListItem>
                            <Link to="/">Terms And Conditions</Link>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Footer;
