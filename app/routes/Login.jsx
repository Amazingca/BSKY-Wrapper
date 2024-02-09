import Header from "../components/center/Header";
import Input from "../components/center/Input";

const Login = () => {

    return (
        <div className={"Login"}>
            <Header title="Login" />
            <br/>
            <h2 style={{color: "var(--header-primary)"}}>Server</h2>
            <Input name="Current" type="text" prefill="bsky.social" lockedTo="/settings" />
        </div>
    )
}

export default Login;