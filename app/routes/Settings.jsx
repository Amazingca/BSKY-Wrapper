import Header from "../components/center/Header";
import Input from "../components/center/Input";
import { useLocation } from "@remix-run/react";
import { useRef, useEffect } from "react";

const Settings = () => {

    const location = useLocation();
    const serverInput = useRef(null);

    useEffect(() => {

        if (location.hash == "#server") {
            
            serverInput.current.focus();

        }
    }, []);

    return (
        <div className={"Settings"}>
            <Header title="Settings" />
            <br/>
            <h2 style={{color: "var(--header-primary)"}}>Server</h2>
            <Input name="Current" type="text" prefill="bsky.social" reference={serverInput} />
        </div>
    )
}

export default Settings;