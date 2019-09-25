import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import SignUp from "../pages/signup/SignUp";
import ImportMnemonic from "../pages/signup/ImportMnemonic";
import CreateMnemonic from "../pages/signup/CreateMnemonic";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import LoginPage from "../pages/login";
import SalaryPage from "../pages/salary";
import TokenVestingPage from "../pages/tokenVesting";
import DashboardPage from "../pages/dashboard";

export const AppRouter: React.FC = () => {
    return (
        <Router>
            <Switch>
                <PrivateRoute exact path="/salary" component={SalaryPage}/>

                <PrivateRoute exact path="/token-vesting" component={TokenVestingPage}/>

                <PrivateRoute exact path="/" component={DashboardPage}/>

                <PublicRoute exact path="/login" component={LoginPage} />
                <PublicRoute exact path="/signup" component={SignUp} />
                <PublicRoute exact path="/signup/import" component={ImportMnemonic} />
                <PublicRoute exact path="/signup/create" component={CreateMnemonic} />
            </Switch>
        </Router>
    );
};
