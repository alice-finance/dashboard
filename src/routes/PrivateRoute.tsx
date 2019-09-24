import React, { Fragment, Component } from "react";
import { Grid } from "@material-ui/core";
import { Route } from "react-router-dom";
import { RouteProps } from "react-router";

interface PrivateRouteProps extends RouteProps {
  icon: string;
  title: string;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  return (
    <Fragment>
      <Grid className="headWrapper">
        <Header />
        <BreadCrumbs icon={props.icon} title={props.title} />
        <Route {...props} render={props => <Component {...props} />} />
        <Footer />
      </Grid>
    </Fragment>
  );
};

export default PrivateRoute;
