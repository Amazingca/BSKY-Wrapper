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

    const {display, localData, flags, apiInterface, server, colorway, setServer, authorized, preferNativeView, setPreferNativeView} = useOutletContext();

    const location = useLocation();
    const serverInput = useRef(null);
    const roomsPrivacyToggle = useRef(null);

    useEffect(() => {

        if (location.hash == "#server") {
            
            serverInput.current.focus();
        } else if (location.hash == "rooms.privacy") {

            roomsPrivacyToggle.current.focus();
        }

        setColorway(colorway);

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

    const [blueColorway, enableBlueColorway] = useState(false);
    const [greenColorway, enableGreenColorway] = useState(false);
    const [yellowColorway, enableYellowColorway] = useState(false);
    const [orangeColorway, enableOrangeColorway] = useState(false);
    const [redColorway, enableRedColorway] = useState(false);
    const [purpleColorway, enablePurpleColorway] = useState(false);
    const [lavenderColorway, enableLavenderColorway] = useState(false);

    const resetAllColorways = () => {

        enableBlueColorway(false);
        enableGreenColorway(false);
        enableYellowColorway(false);
        enableOrangeColorway(false);
        enableRedColorway(false);
        enablePurpleColorway(false);
        enableLavenderColorway(false);
    }

    const setColorway = (pref) => {

        resetAllColorways();

        display

        switch (pref) {
            case "blue":
                enableBlueColorway(true);
                display.updateColorway("blue");
                break;
            case "green":
                enableGreenColorway(true);
                display.updateColorway("green");
                break;
            case "yellow":
                enableYellowColorway(true);
                display.updateColorway("yellow");
                break;
            case "orange":
                enableOrangeColorway(true);
                display.updateColorway("orange");
                break;
            case "red":
                enableRedColorway(true);
                display.updateColorway("red");
                break;
            case "purple":
                enablePurpleColorway(true);
                display.updateColorway("purple");
                break;
            case "lavender":
                enableLavenderColorway(true);
                display.updateColorway("lavender");
                break;
        }
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
                {(flags.getGate("ENABLED_COLORWAYS")) && <div>
                    <h2 style={{color: "var(--header-primary"}}>Display</h2>
                    <h3>Colorways</h3>
                    <div style={{display: "flex", flexDirection: "column", gap: "0.75rem"}}>
                        <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
                            <Checkbox checked={blueColorway} setChecked={setColorway} setCheckedType="blue" color="var(--colorway-blue-primary)" />
                            <p>Blue</p>
                        </div>
                        <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
                            <Checkbox checked={greenColorway} setChecked={setColorway} setCheckedType="green" color="var(--colorway-green-primary)" />
                            <p>Green</p>
                        </div>
                        <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
                            <Checkbox checked={yellowColorway} setChecked={setColorway} setCheckedType="yellow" color="var(--colorway-yellow-primary)" />
                            <p>Yellow</p>
                        </div>
                        <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
                            <Checkbox checked={orangeColorway} setChecked={setColorway} setCheckedType="orange" color="var(--colorway-orange-primary)" />
                            <p>Orange</p>
                        </div>
                        <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
                            <Checkbox checked={redColorway} setChecked={setColorway} setCheckedType="red" color="var(--colorway-red-primary)" />
                            <p>Red</p>
                        </div>
                        <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
                            <Checkbox checked={purpleColorway} setChecked={setColorway} setCheckedType="purple" color="var(--colorway-purple-primary)" />
                            <p>Purple</p>
                        </div>
                        <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
                            <Checkbox checked={lavenderColorway} setChecked={setColorway} setCheckedType="lavender" color="var(--colorway-lavender-primary)" />
                            <p>Lavender</p>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Settings;