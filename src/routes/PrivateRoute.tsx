import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
import { Route } from "react-router-dom";
import { RouteProps } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

import "./Route.scss";
import BreadCrumbs from "../components/BreadCrumbs";
import Helmet from "react-helmet";

interface PrivateRouteProps extends RouteProps {
    icon?: string;
    title?: string;
}

const PrivateRoute = (props: PrivateRouteProps) => {
    return (
        <Fragment>
            {props.title && (
                <Helmet>
                    <title>{props.title}</title>
                </Helmet>
            )}
            <Grid className="headWrapper">
                <Header />
                <BreadCrumbs icon={props.icon} title={props.title} />
            </Grid>
            <Route {...props} />
            <Footer />
        </Fragment>
    );
};

export default PrivateRoute;
