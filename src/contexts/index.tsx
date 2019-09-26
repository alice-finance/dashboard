import { ChainProvider } from "./ChainContext";
import React from "react";

export const ContextProvider: React.FC = ({ children }) => {
    return <ChainProvider>{children}</ChainProvider>;
};
