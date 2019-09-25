import React, { Fragment} from "react";
import { Grid } from "@material-ui/core";
import { Route } from "react-router-dom";
import { RouteProps } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

import "./Route.scss";

interface PrivateRouteProps extends RouteProps {
    icon?: string | undefined;
    title?: string | undefined;
}

const PrivateRoute = (props: PrivateRouteProps) => {
    return (
        <Fragment>
            <Grid className="headWrapper">
                <Header />
                {/*<BreadCrumbs icon={props.icon} title={props.title} />*/}
            </Grid>
            <Route {...props} />
            <Footer />
        </Fragment>
    );
};

export default PrivateRoute;
