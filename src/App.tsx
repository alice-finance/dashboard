import React from "react";
import "./App.scss";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "./utils/material-theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import { AppRouter } from "./routes/AppRouter";
import { ContextProvider } from "./contexts";

const App = () => {
    return (
        <ContextProvider>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Helmet titleTemplate={`%s - Alice Dashboard`} defaultTitle="Alice Dashboard" />
                <AppRouter />
                <ToastContainer position="top-right" />
            </MuiThemeProvider>
        </ContextProvider>
    );
};

export default App;
