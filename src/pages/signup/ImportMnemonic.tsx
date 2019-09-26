import React, { ChangeEvent, FormEvent, useCallback, useContext, useState } from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";

import "../Page.scss";
import "./Mnemonic.scss";
import useStoredWallet from "../../hook/useStoredWallet";
import Alice from "@alice-finance/alice.js/dist";
import cookie from "js-cookie";
import { ChainContext } from "../../contexts/ChainContext";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import { useTestnet } from "../../constants/environment";

const ImportMnemonic = () => {
    const { setMnemonic, setEthereumChain, setLoomChain } = useContext(ChainContext);
    const [mnemonic, setInputMnemonic] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useState(false);
    const {
        setAliceAddress,
        setEthAddress,
        setMnemonicWithPassword,
        setEthPrivateKey,
        setAlicePrivateKey
    } = useStoredWallet();

    const handleMnemonicChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setInputMnemonic(value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPassword(value);
    };

    const handleSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const alice = Alice.fromMnemonic(mnemonic, useTestnet);
            const ethChain = alice.getEthereumChain();
            const loomChain = alice.getLoomChain();

            alice
                .areAccountsMapped()
                .then(isMapped => {
                    if (isMapped) {
                        setAliceAddress(loomChain.getAddress().toLocalAddressString());
                        setEthAddress(ethChain.getAddress().toLocalAddressString());
                        setAlicePrivateKey(loomChain.getPrivateKey());
                        setEthPrivateKey(ethChain.getPrivateKey());
                        setMnemonicWithPassword(mnemonic, password);

                        setMnemonic(mnemonic);
                        setEthereumChain(ethChain);
                        setLoomChain(loomChain);

                        cookie.set("Auth", "true");

                        setAuth(true);
                    } else {
                        toast.error("Your seed phrase cannot be used. please try other one.");
                    }
                })
                .catch(error => {
                    toast.error(error);
                });
        },
        [
            mnemonic,
            setAliceAddress,
            setEthAddress,
            setAlicePrivateKey,
            setEthPrivateKey,
            setMnemonicWithPassword,
            password,
            setMnemonic,
            setEthereumChain,
            setLoomChain
        ]
    );

    if (auth) {
        return <Redirect to="/" />;
    }

    return (
        <Grid className="container">
            <Grid className="section">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={12}>
                        <Typography className="section-title" component="h4">
                            Import Wallet
                        </Typography>
                        <Typography component="p">
                            There are many variations of passages of Lorem Ipsum available, but the majority have
                            suffered alteration in some form.
                        </Typography>
                    </Grid>
                    <form className="container mnemonicBody" style={{ width: "100%" }} onSubmit={handleSubmit}>
                        <Grid container className="mnemonicBody">
                            <Typography component="h5" className="subTitle">
                                Type your seed phrase to import
                            </Typography>
                            <TextField
                                id="standard-multiline-static"
                                label="Seed phrase"
                                multiline
                                fullWidth
                                rows="4"
                                margin="normal"
                                variant="outlined"
                                className="inputStyle"
                                onChange={handleMnemonicChange}
                                value={mnemonic}
                            />
                            <Typography component="h5" className="subTitle">
                                Please enter your password.
                            </Typography>
                            <TextField
                                label="Password"
                                fullWidth
                                type="password"
                                margin="normal"
                                variant="outlined"
                                className="inputStyle"
                                onChange={handlePasswordChange}
                                value={password}
                            />
                            <TextField
                                label="Password Confirm"
                                fullWidth
                                type="password"
                                margin="normal"
                                variant="outlined"
                                className="inputStyle"
                            />

                            <Button type="submit" variant="contained" color="primary" className="formSubmitBtn">
                                Register
                            </Button>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ImportMnemonic;
