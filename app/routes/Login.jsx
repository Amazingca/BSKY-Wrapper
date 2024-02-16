import Header from "../components/center/Header";
import Input from "../components/center/Input";
import { useEffect } from "react";
import { useOutletContext } from "@remix-run/react";

const Login = () => {

    const [localData, apiInterface, server, setServer] = useOutletContext();
    
    var username = "";
    var password = "";

    const setUsername = (value) => {

        username = value;
        console.log("Value changed to", username);
    }

    const setPassword = (value) => {

        password = value;
        console.log("Value changed to", password);
    }

    return (
        <div className={"Login"}>
            <Header title="Login" />
            <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                <div>
                    <h2 style={{color: "var(--header-primary)"}}>Server</h2>
                    <Input name="Current" type="text" prefill={server} lockedTo="/settings#server" />
                </div>
                <div>
                    <br/>
                    <h2 style={{color: "var(--header-primary)"}}>Credentials</h2>
                    <div className={"CenterSpacer"}>
                        <Input name="Handle" type="username" prefill="example.com" setItem={setUsername} />
                        <Input name="Password" type="password" prefill="xxxx-xxxx-xxxx-xxxx" setItem={setPassword} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;