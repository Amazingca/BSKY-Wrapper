import {
    Links,
    Meta,
    Outlet,
    Scripts,
    useNavigate
} from "@remix-run/react";
import { useState, useEffect } from "react";
import SideBar from "./components/sidebar/SideBar";
import FooterBar from "./components/footerbar/FooterBar";
import { BeakerIcon } from "@primer/octicons-react";
import Locale from "./infra/Locale.js";
import Api from "./infra/Api.mjs";
import Flags from "./infra/Flags.js";
import Themes from "./infra/Themes.js";
import stylesheet from "./style.css";
import manifest from "./app.webmanifest";
import CoverModal from "./components/cover/CoverModal.jsx";
import Keybinds from "./components/cover/Keybinds.jsx";
import Composer from "./components/cover/composer/Composer.jsx";
import AddUser from "./components/cover/AddUser.jsx";

export const meta = () => {

    return [
        {
            title: "Home – Blue Wrapper"
        },
        {
            property: "og:title",
            content: "Home"
        },
        {
            property: "og:description",
            content: "Third-party ATP client. Built with Remix and hosted on Cloudflare Pages."
        },
        {
            property: "og:image",
            content: "https://cdn.glitch.global/fa1b6839-ae9a-450b-b03b-be3be9c9b051/BlueWrapperTransparent.png?v=1691731693827"
        },
        {
            name: "titleAffix",
            content: " – Blue Wrapper"
        },
        {
            name: "robots",
            content: "noindex,nofollow"
        }
    ]
}

const App = () => {

    const localData = new Locale();

    // Note: This is required because our effect in root must fully initialize our API handler before components can load.
    const [load, setLoad] = useState(false);

    const [theme, setTheme] = useState("light");
    const [colorway, setColorway] = useState("blue");
    const [server, setServer] = useState("https://bsky.social");
    const [authorized, setAuthorized] = useState(false);
    const [authorization, setAuthorization] = useState(null);
    const [notificationCount, setNotificationCount] = useState(null);
    const [messagesUnreadCount, setMessagesUnreadCount] = useState(null);
    const [operatingSystem, setOperatingSystem] = useState("");
    const [showKeybinds, setShowKeybinds] = useState(false);
    const [showComposer, setShowComposer] = useState([false, null]);
    const [showAddModal, setShowAddModal] = useState([false, null]);
    const [preferNativeView, setPreferNativeView] = useState(false);

    const navigate = useNavigate();

    var varAuthorized = [false, null];

    const tryAuthorize = async () => {

        setLoad(false);

        const successfulAuthorization = await apiInterface.authorize("refresh", localData.getPrimaryUser());

        if (successfulAuthorization == true) {

            setAuthorized(true);
            varAuthorized = [true, apiInterface.getAuthorization().handle];
            setAuthorization(apiInterface.getAuthorization());
        } else {

            console.log("Removing user:", localData.getPrimaryUser());

            localData.removeUser(localData.getPrimaryUser());

            if (Object.keys(localData.getPrimaryUser()).length > 0) tryAuthorize();
            else location.reload();
        }

        setLoad(true);
    }

    useEffect(() => {

        setServer(localData.getServer());
        setPreferNativeView(localData.getPreferNativeView());

        if (Object.keys(localData.getPrimaryUser()).length > 0) {

            tryAuthorize();
        } else {

            setLoad(true);
        }

        if (navigator.userAgent) setOperatingSystem((navigator.userAgent.includes("Mac OS")) ? "Mac OS" : "other");

        if (navigator.userAgent) {

            var varShowKeybinds = false;

            document.getElementsByTagName("html")[0].addEventListener("keydown", (keypress) => {

                if ((keypress.ctrlKey == true) && (keypress.key == "/") && (varShowKeybinds == false)) {
                    
                    varShowKeybinds = true;
                    setShowKeybinds(true);
                } else if ((((keypress.ctrlKey == true) && (keypress.key == "/")) || (keypress.key == "Escape")) && (varShowKeybinds == true)) {
                    
                    varShowKeybinds = false;
                    setShowKeybinds(false);
                }

                if ((keypress.ctrlKey == true) && (keypress.altKey == true)) {

                    switch (keypress.key) {
                        case "h":
                            navigate("/");
                            break;
                        case "n":
                            if (varAuthorized[0]) navigate("/notifications");
                            break;
                        case "r":
                            if (varAuthorized[0]) navigate("/rooms");
                            break;
                        case "p":
                            if (varAuthorized[0]) navigate(`/profile/${varAuthorized[1]}`);
                            break;
                        case "s":
                            navigate("/settings");
                            break;
                        case "c":
                            if (varAuthorized[0]) setShowComposer([true, null]);
                            break;
                    }
                }
            });
        }
    }, []);

    const apiInterface = new Api({pdsUrl: server, authorization: authorization, locale: localData, recordLimit: 30});

    // Overrides sanitization on returned data.
    apiInterface.setSanitize(false);

    const flags = new Flags(process.env.NODE_ENV == "development");

    flags.register("ENABLED_ROOMS", useState(false));
    flags.register("ENABLED_COLORWAYS", useState(true));

    const display = new Themes(localData, theme, setTheme, colorway, setColorway);

    const context = {
        display: display,
        localData: localData,
        flags: flags,
        apiInterface: apiInterface,
        server: server,
        colorway: colorway,
        setServer: setServer,
        authorized: authorized,
        setAuthorized: setAuthorized,
        setAuthorization: setAuthorization,
        setNotificationCount: setNotificationCount,
        setMessagesUnreadCount: setMessagesUnreadCount,
        setShowAddModal: setShowAddModal,
        setShowComposer: setShowComposer,
        preferNativeView: preferNativeView,
        setPreferNativeView: setPreferNativeView
    };

    return (
        <html>
            <head>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
                {(process.env.NODE_ENV == "development") && <meta name="theme-color" content="lightsalmon"/>}
                <meta name="theme-color" content="#1a1a1a" media="(prefers-color-scheme: dark)"/>
                <meta name="theme-color" content="#0099FF" media="(prefers-color-scheme: light)"/>
                <meta property="og:site_name" content="Blue Wrapper"/>
                <meta property="og:type" content="article"/>
                <link rel="icon" href="https://cdn.glitch.global/fa1b6839-ae9a-450b-b03b-be3be9c9b051/BlueWrapperTransparent.png?v=1691731693827"/>
                <link rel="apple-touch-icon" href="https://cdn.glitch.global/fa1b6839-ae9a-450b-b03b-be3be9c9b051/BlueWrapper.png?v=1691731259916"/>
                <link type="text/css" rel="stylesheet" href={stylesheet}/>
                <link rel="manifest" href={manifest}/>
                <Meta />
                <Links />
            </head>
            <body className={theme + ((flags.getGate("ENABLED_COLORWAYS")) ? " " + colorway : "")} id={(showKeybinds) ? "bodyLocked" : ""}>
                {process.env.NODE_ENV == "development" && <div className="devBanner"><BeakerIcon size={16} />You are currently running the dev environment for the Blue Wrapper.</div>}
                {(load) && (
                    <>
                        {(showKeybinds) ? (
                            <div id="bodyCover">
                                <CoverModal title={"Shortcuts"} InnerModal={Keybinds} authorized={authorized} operatingSystem={operatingSystem} display={setShowKeybinds} />
                            </div>
                        ) : (showComposer[0]) ? (
                            <div id="bodyCover">
                                <CoverModal title={(!showComposer[1]) ? "Compose" : "Reply"} InnerModal={Composer} apiInterface={apiInterface} authorized={authorized} operatingSystem={operatingSystem} display={setShowComposer} to={(showComposer[1]) ? showComposer[1] : null} />
                            </div>
                        ) : (showAddModal[0]) ? (
                            <div id="bodyCover">
                                <CoverModal title={"Add User"} InnerModal={AddUser} apiInterface={apiInterface} authorized={authorized} operatingSystem={operatingSystem} display={setShowAddModal} data={showAddModal[1]} />
                            </div>
                        ) : (<></>)}
                        <div id="main" className={(process.env.NODE_ENV == "development") && "hasDevBanner"}>
                            <SideBar flags={flags} tryAuthorize={tryAuthorize} localData={localData} display={display} authorized={authorized} apiInterface={apiInterface} notifications={{notificationCount: notificationCount, setNotificationCount: setNotificationCount}} messages={{messagesUnreadCount: messagesUnreadCount, setMessagesUnreadCount: setMessagesUnreadCount}} setShowComposer={setShowComposer} />
                            <Outlet context={context} />
                            <FooterBar />
                        </div>
                    </>
                )}
                <Scripts />
            </body>
        </html>
    );
}

export default App;
