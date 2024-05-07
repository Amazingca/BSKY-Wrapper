import Header from "../components/center/Header";
import Input from "../components/center/Input";
import { useOutletContext, useLocation } from "@remix-run/react";
import { useRef, useEffect } from "react";
import Checkbox from "../components/interactable/Checkbox";

export const meta = ({matches}) => {

    const affix = matches.filter(item => item.id == "root")[0].meta.filter(item => item.name == "titleAffix")[0].content;

    return [
        {
            title: `Settings${affix}`
        },
        {
            property: "og:title",
            content: "Settings"
        },
        {
            property: "og:description",
            content: "Modify settings for the Blue Wrapper."
        }
    ];
};

const Settings = () => {

    const {localData, apiInterface, server, setServer, preferNativeView, setPreferNativeView} = useOutletContext();

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

    const toSetTogglePreferNativeView = (preferNativeView) => {

        setPreferNativeView(preferNativeView);
        localData.setPreferNativeView(preferNativeView);
    }

    return (
        <div className={"Settings"}>
            <Header title="Settings" />
            <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                <div>
                    <h2 style={{color: "var(--header-primary)"}}>Server</h2>
                    <Input name="Current" type="text" setItem={toSetServer} prefill={server} reference={serverInput} />
                </div>
                <div>
                    <h2 style={{color: "var(--header-primary"}}>AppView</h2>
                    <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
                        <Checkbox checked={preferNativeView} setChecked={toSetTogglePreferNativeView} />
                        <p>Prefer rendering through native AT Proto view</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;