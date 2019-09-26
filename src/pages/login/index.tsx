import React, { ChangeEvent, FormEvent, useCallback, useContext, useState } from "react";
import { Button, Container, Grid, TextField, Typography } from "@material-ui/core";
import useStoredWallet from "../../hook/useStoredWallet";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import Alice from "@alice-finance/alice.js/dist";
import cookie from "js-cookie";
import { ChainContext } from "../../contexts/ChainContext";
import { useTestNet } from "../../constants/environment";

const LoginPage = () => {
    const { setMnemonic, setEthereumChain, setLoomChain } = useContext(ChainContext);
    // const { history } = useReactRouter();
    const { getEthAddress, getMnemonicWithPassword, setAlicePrivateKey, setEthPrivateKey, reset } = useStoredWallet();
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useState(false);
    const [ethAddress, setEthAddress] = useState(getEthAddress());

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            try {
                const mnemonic = getMnemonicWithPassword(password);

                const alice = Alice.fromMnemonic(mnemonic, useTestNet);
                const ethChain = alice.getEthereumChain();
                const loomChain = alice.getLoomChain();

                alice
                    .areAccountsMapped()
                    .then(isMapped => {
                        if (isMapped) {
                            setMnemonic(mnemonic);
                            setEthereumChain(ethChain);
                            setLoomChain(loomChain);
                            setAlicePrivateKey(loomChain.getPrivateKey());
                            setEthPrivateKey(ethChain.getPrivateKey());

                            cookie.set("Auth", "true");

                            // history.replace("/");
                            setAuth(true);
                        } else {
                            toast.error("Your seed phrase cannot be used. please try other one.");
                        }
                    })
                    .catch(error => {
                        toast.error(error);
                    });
            } catch (e) {
                toast.error("Wrong Password");
            }
        },
        [
            getMnemonicWithPassword,
            password,
            setAlicePrivateKey,
            setEthPrivateKey,
            setEthereumChain,
            setLoomChain,
            setMnemonic
        ]
    );

    const handleReset = useCallback(() => {
        cookie.remove("Auth");
        reset();
        setEthAddress("");
    }, [reset]);

    if (!ethAddress) {
        return <Redirect to="/signup" />;
    }

    if (auth) {
        return <Redirect to="/" />;
    }

    return (
        <Container>
            <Grid container>
                <Grid item>
                    <form onSubmit={handleSubmit}>
                        <Typography component="h1">Login</Typography>
                        <Typography component="p">You are about to login to ethereum address [{ethAddress}]</Typography>
                        <TextField
                            label="Password"
                            variant="outlined"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Login
                        </Button>
                    </form>
                    <Typography component="p">You can reset saved account</Typography>
                    <Button type="button" variant="contained" onClick={handleReset}>
                        Reset
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default LoginPage;
