import Header from "../components/center/Header";
import Input from "../components/center/Input";
import { useOutletContext, useNavigate } from "@remix-run/react";

const Login = () => {

    const {localData, apiInterface, server, setAuthorized, setAuthorization} = useOutletContext();
    const navigate = useNavigate();
    
    var username = "";
    var password = "";

    const setUsername = (value) => {

        username = value;
    }

    const setPassword = async (value) => {

        password = value;

        if (password.match(/^[\w]{4}-[\w]{4}-[\w]{4}-[\w]{4}$/g)) {

            console.log("Detected app password!");

            const successfulAuthorization = await apiInterface.authorize("new", {identifier: username, password: password});

            if (successfulAuthorization == true) {

                console.log("Authenticated with API!");

                setAuthorized(true);

                localData.addUser(apiInterface.getAuthorization());

                setAuthorization(apiInterface.getAuthorization());

                navigate("/");
            }
        }
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