import React, { ChangeEvent, FormEvent, useCallback, useContext, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import useStoredWallet from "../../hook/useStoredWallet";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import Alice from "@alice-finance/alice.js/dist";
import cookie from "js-cookie";
import { ChainContext } from "../../contexts/AliceContext";

const useTestnet = false;

const LoginPage: React.FC = () => {
    const { setMnemonic, setEthereumChain, setLoomChain } = useContext(ChainContext);
    // const { history } = useReactRouter();
    const { getEthAddress, getMnemonicWithPassword } = useStoredWallet();
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useState(false);
    const ethAddress = getEthAddress();

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            try {
                const mnemonic = getMnemonicWithPassword(password);

                const alice = Alice.fromMnemonic(mnemonic, useTestnet);
                const ethChain = alice.getEthereumChain();
                const loomChain = alice.getLoomChain();

                alice
                    .areAccountsMapped()
                    .then(isMapped => {
                        if (isMapped) {
                            setMnemonic(mnemonic);
                            setEthereumChain(ethChain);
                            setLoomChain(loomChain);

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
        [getMnemonicWithPassword, password, setEthereumChain, setLoomChain, setMnemonic]
    );

    if (!ethAddress) {
        return <Redirect to="/signup" />;
    }

    if (auth) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField label="Password" variant="outlined" value={password} onChange={handlePasswordChange} />
                <Button type="submit">Login</Button>
            </form>
        </div>
    );
};

export default LoginPage;
