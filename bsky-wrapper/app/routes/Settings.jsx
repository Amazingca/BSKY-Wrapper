import Header from "../components/center/Header";
import Input from "../components/center/Input";
import { useOutletContext, useLocation } from "@remix-run/react";
import { useRef, useEffect } from "react";

export const meta = ({matches}) => {

    const prefix = matches.filter(item => item.id == "root")[0].meta.filter(item => item.name == "titlePrefix")[0].content;

    return [
        {
            title: `Settings${prefix}`
        }
    ];
};

const Settings = () => {

    const {localData, apiInterface, server, setServer} = useOutletContext();

    const location = useLocation();
    const serverInput = useRef(null);

    useEffect(() => {

        if (location.hash == "#server") {
            
            serverInput.current.focus();
        }
    }, []);

    const toSetServer = (server) => {

        setServer(server);
        localData.setServer(server);
    }

    return (
        <div className={"Settings"}>
            <Header title="Settings" />
            <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                <div>
                    <h2 style={{color: "var(--header-primary)"}}>Server</h2>
                    <Input name="Current" type="text" setItem={toSetServer} prefill={server} reference={serverInput} />
                </div>
            </div>
        </div>
    )
}

export default Settings;