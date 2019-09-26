export const useTestNet = process.env.USE_TESTNET ? true : process.env.NODE_ENV !== "production" ;

console.log(useTestNet);
