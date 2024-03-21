import {
    Links,
    Meta,
    Outlet,
    Scripts
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

export const meta = () => {

    return [
        {
            title: "Home – BlueSky Wrapper"
        },
        {
            property: "og:title",
            content: "Home"
        },
        {
            name: "titlePrefix",
            content: " – BlueSky Wrapper"
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

    useEffect(() => {

        setServer(localData.getServer());

        if (Object.keys(localData.getPrimaryUser()).length != 0) {

            const tryAuthorize = async () => {

                const successfulAuthorization = await apiInterface.authorize("refresh", localData.getPrimaryUser());

                if (successfulAuthorization == true) {

                    setAuthorized(true);
                    setAuthorization(apiInterface.getAuthorization());
                } else {

                    localData.removeUser(localData.getPrimaryUser().did);
                }

                setLoad(true);
            }

            tryAuthorize();
        } else {

            setLoad(true);
        }
    }, []);

    const apiInterface = new Api({pdsUrl: server, authorization: authorization});

    // Overrides sanitization on returned data.
    apiInterface.setSanitize(false);

    const context = {
        localData: localData,
        apiInterface: apiInterface,
        server: server,
        setServer: setServer,
        authorized: authorized,
        setAuthorized: setAuthorized,
        setAuthorization: setAuthorization
    };

    const display = new Themes(localData, theme, setTheme);

    return (
        <html>
            <head>
                <meta httpEquiv="Content-Type" content="text/html;charset=utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
                {(process.env.NODE_ENV == "development") && <meta name="theme-color" content="lightsalmon"/>}
                <meta name="theme-color" content="#f5f5f5" media="(prefers-color-scheme: light)"/>
                <meta name="theme-color" content="#1a1a1a" media="(prefers-color-scheme: dark)"/>
                <meta property="og:type" content="website"/>
                <meta property="og:description" content="Third-party ATP client. Built on Remix and hosted on Cloudflare Pages."/>
                <meta property="og:color" content="#0099FF"/>
                <meta property="og:site_name" content="Blue Wrapper"/>
                <meta proerty="og:image" content="https://cdn.glitch.global/fa1b6839-ae9a-450b-b03b-be3be9c9b051/BlueWrapperTransparent.png?v=1691731693827"/>
                <link rel="icon" href="https://cdn.glitch.global/fa1b6839-ae9a-450b-b03b-be3be9c9b051/BlueWrapperTransparent.png?v=1691731693827"/>
                <link rel="apple-touch-icon" href="https://cdn.glitch.global/fa1b6839-ae9a-450b-b03b-be3be9c9b051/BlueWrapper.png?v=1691731259916"/>
                <link type="text/css" rel="stylesheet" href={stylesheet}/>
                <link rel="manifest" href={manifest}/>
                <Meta />
                <Links />
            </head>
            <body className={theme}>
                {process.env.NODE_ENV == "development" && <div className="devBanner"><BeakerIcon size={16} />You are currently running the dev environment for the Blue Wrapper.</div>}
                {(load) && <div id="main" className={(process.env.NODE_ENV == "development") && "hasDevBanner"}>
                    <SideBar display={display} authorized={authorized} apiInterface={apiInterface} />
                    <Outlet context={context} />
                    <FooterBar />
                </div>}
                <Scripts />
            </body>
        </html>
    );
}

export default App;