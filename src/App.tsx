import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "./utils/material-theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Helmet } from "react-helmet";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Index: React.FC = () => {
  return <div>Hello, world?</div>;
};

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Index} />
      </Switch>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Helmet titleTemplate={`%s - Dashboard`} defaultTitle="Dashboard" />
      <AppRouter />
      <ToastContainer position="top-right" />
    </MuiThemeProvider>
  );
};

export default App;
