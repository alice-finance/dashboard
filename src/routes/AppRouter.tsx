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
import SalaryViewPage from "../pages/salary/view";
import TokenVestingViewPage from "../pages/tokenVesting/view";

export const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <PrivateRoute exact path="/salary" title="Salary" component={SalaryPage} />
                <PrivateRoute exact path="/salary/view/:address" title="Salary Detail" component={SalaryViewPage} />

                <PrivateRoute exact path="/token-vesting" title="Token Vesting" component={TokenVestingPage} />
                <PrivateRoute
                    exact
                    path="/token-vesting/view/:address"
                    title="Token Vesting Detail"
                    component={TokenVestingViewPage}
                />

                <PrivateRoute exact path="/" title="Dashboard" component={DashboardPage} />

                <PublicRoute exact path="/login" title="Login" component={LoginPage} />
                <PublicRoute exact path="/signup" title="SignUp" component={SignUp} />
                <PublicRoute exact path="/signup/import" title="SignUp" component={ImportMnemonic} />
                <PublicRoute exact path="/signup/create" title="SignUp" component={CreateMnemonic} />
            </Switch>
        </Router>
    );
};
