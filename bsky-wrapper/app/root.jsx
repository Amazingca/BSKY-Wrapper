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
import Themes from "./infra/Themes.js";
import stylesheet from "./style.css";
import manifest from "./app.webmanifest";
import CoverModal from "./components/cover/CoverModal.jsx";
import Keybinds from "./components/cover/Keybinds.jsx";
import Composer from "./components/cover/composer/Composer.jsx";

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
        }
    ]
}

const App = () => {

    const localData = new Locale();

    // Note: This is required because our effect in root must fully initialize our API handler before components can load.
    const [load, setLoad] = useState(false);

    const [theme, setTheme] = useState("light");
    const [server, setServer] = useState("https://bsky.social");
    const [authorized, setAuthorized] = useState(false);
    const [authorization, setAuthorization] = useState(null);
    const [notificationCount, setNotificationCount] = useState(null);
    const [operatingSystem, setOperatingSystem] = useState("");
    const [showKeybinds, setShowKeybinds] = useState(false);
    const [showComposer, setShowComposer] = useState([false, null]);
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

                if (keypress.ctrlKey == true) {

                    switch (keypress.key) {
                        case "h":
                            navigate("/");
                            break;
                        case "n":
                            if (varAuthorized[0]) navigate("/notifications");
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

    const context = {
        localData: localData,
        apiInterface: apiInterface,
        server: server,
        setServer: setServer,
        authorized: authorized,
        setAuthorized: setAuthorized,
        setAuthorization: setAuthorization,
        setNotificationCount: setNotificationCount,
        setShowComposer: setShowComposer,
        preferNativeView: preferNativeView,
        setPreferNativeView: setPreferNativeView
    };

    const display = new Themes(localData, theme, setTheme);

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
            <body className={theme} id={(showKeybinds) ? "bodyLocked" : ""}>
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
                        ) : (<></>)}
                        <div id="main" className={(process.env.NODE_ENV == "development") && "hasDevBanner"}>
                            <SideBar tryAuthorize={tryAuthorize} localData={localData} display={display} authorized={authorized} apiInterface={apiInterface} notifications={{notificationCount: notificationCount, setNotificationCount: setNotificationCount}} setShowComposer={setShowComposer} />
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