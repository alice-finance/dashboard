import React, { Fragment, Component } from "react";
import { Route } from "react-router-dom";
import { RouteProps } from "react-router";
import Footer from "../components/Footer";

import "./Route.scss";

interface PublicRouteProps extends RouteProps {
    icon?: string | undefined;
    title?: string | undefined;
}

const PublicRoute = (props: PublicRouteProps) => {
    const Component = props.component;
    const rest = { ...props, component: null };
    return (
        <Fragment>
            <Route {...rest} render={(props: PublicRouteProps) => <Component {...rest} />} />
            <Footer />
        </Fragment>
    );
};

export default PublicRoute;
