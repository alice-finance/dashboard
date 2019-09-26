import React, { ReactNode } from "react";
import { Grid, Typography } from "@material-ui/core";
import Image from "./Image";
import "./BreadCrumbs.scss";

interface BreadCrumbsProps {
    icon?: string;
    title?: string;
}

const BreadCrumbs = (props: BreadCrumbsProps) => {
    return (
        <Grid className="breadCrumbs">
            <Grid container alignItems="center" className="container">
                <Grid item xs={12} sm={4} className="breadCrumbInfo">
                    <Typography component="div">
                        {props.icon && <Image src={props.icon} />}
                        <span>{props.title}</span>
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default BreadCrumbs;
