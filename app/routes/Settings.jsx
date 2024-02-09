import Header from "../components/center/Header";
import Input from "../components/center/Input";

const Settings = () => {

    return (
        <div className={"Settings"}>
            <Header title="Settings" />
            <br/>
            <h2 style={{color: "var(--header-primary)"}}>Server</h2>
            <Input name="Current" type="text" prefill="bsky.social" />
        </div>
    )
}

export default Settings;