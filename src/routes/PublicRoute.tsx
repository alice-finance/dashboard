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
  return (
    <Fragment>
      <Route {...props} render={props => <Component {...props} />} />
      <Footer />
    </Fragment>
  );
};

export default PublicRoute;
