import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import Index from "../pages/Index";
import SignUp from "../pages/signup/SignUp";
import ImportMnemonic from "../pages/signup/ImportMnemonic";
import CreateMnemonic from "../pages/signup/CreateMnemonic";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import LoginPage from "../pages/login";

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        {/*<PrivateRoute exact path="/" component={Index} />*/}
        <PrivateRoute exact path="/" component={Index} />

        <PublicRoute exact path="/login" component={LoginPage} />
        <PublicRoute exact path="/signup" component={SignUp} />
        <PublicRoute path="/signup/import" component={ImportMnemonic} />
        <PublicRoute path="/signup/create" component={CreateMnemonic} />
      </Switch>
    </Router>
  );
};
