import { ChainProvider } from "./AliceContext";
import React from "react";

export const ContextProvider: React.FC = ({ children }) => {
    return <ChainProvider>{children}</ChainProvider>;
};
