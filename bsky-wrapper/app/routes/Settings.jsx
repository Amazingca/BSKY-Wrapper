import Header from "../components/center/Header";
import Input from "../components/center/Input";
import { useOutletContext, useLocation } from "@remix-run/react";
import { useRef, useEffect, useState } from "react";
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

    const {localData, apiInterface, server, setServer, authorized, preferNativeView, setPreferNativeView} = useOutletContext();

    const location = useLocation();
    const serverInput = useRef(null);
    const roomsPrivacyToggle = useRef(null);

    useEffect(() => {

        if (location.hash == "#server") {
            
            serverInput.current.focus();
        } else if (location.hash == "rooms.privacy") {

            roomsPrivacyToggle.current.focus();
        }

        if (authorized) {

            const getPrefs = async () => {
            
                const actorPrefsForMessages = await apiInterface.listRecords("chat.bsky.actor.declaration");

                for (const record of actorPrefsForMessages.records) {

                    if (record.value.$type == "chat.bsky.actor.declaration") setMessageGatePrefs(record.value.allowIncoming, false);
                }
            }

            getPrefs();
        }
    }, []);

    const [messageGateAllowNone, setMessageGateAllowNone] = useState(false);
    const [messageGateAllowFollows, setMessageGateAllowFollows] = useState(false);
    const [messageGateAllowEveryone, setMessageGateAllowEveryone] = useState(false);

    const setMessageGatePrefs = async (pref, update=true) => {

        if (update == true) {

            const updateSetting = await apiInterface.setPreferences("chat.bsky.actor.declaration", pref);

            if (!updateSetting.uri) return;
        }

        const setAllFalse = () => {

            setMessageGateAllowNone(false);
            setMessageGateAllowFollows(false);
            setMessageGateAllowEveryone(false);
        }

        if (pref == "none") {

            setAllFalse();
            setMessageGateAllowNone(true);
        } else if (pref == "following") {

            setAllFalse();
            setMessageGateAllowFollows(true);
        } else if (pref == "all") {

            setAllFalse();
            setMessageGateAllowEveryone(true);
        }
    }

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
                <div>
                    <h2 style={{color: "var(--header-primary"}}>Rooms</h2>
                    <h3 ref={roomsPrivacyToggle}>Allow messages from</h3>
                    <div style={{display: "flex", flexDirection: "column", gap: "0.75rem"}}>
                        <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
                            <Checkbox checked={messageGateAllowNone} setChecked={setMessageGatePrefs} setCheckedType="none" />
                            <p>No one</p>
                        </div>
                        <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
                            <Checkbox checked={messageGateAllowFollows} setChecked={setMessageGatePrefs} setCheckedType="following" />
                            <p>Follows</p>
                        </div>
                        <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
                            <Checkbox checked={messageGateAllowEveryone} setChecked={setMessageGatePrefs} setCheckedType="all" />
                            <p>Everyone</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;