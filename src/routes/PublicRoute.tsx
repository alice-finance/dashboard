import React, { Fragment } from "react";
import { Route, RouteProps } from "react-router-dom";
import Footer from "../components/Footer";

import "./Route.scss";

interface PublicRouteProps extends RouteProps {
    icon?: string | undefined;
    title?: string | undefined;
}

const PublicRoute = (props: PublicRouteProps) => {
    const component = props.component;
    const rest = { ...props };
    delete rest["component"];
    return (
        <Fragment>
            <Route {...rest} render={() => React.createElement(component!, rest)} />
            <Footer />
        </Fragment>
    );
};

export default PublicRoute;
