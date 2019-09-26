export const useTestNet = process.env.REACT_APP_USE_TESTNET ? true : process.env.NODE_ENV !== "production";
