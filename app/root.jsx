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

const App = () => {

    const localData = new Locale();

    const [theme, setTheme] = useState("light");
    const [server, setServer] = useState("https://bsky.social");
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {

        setServer(localData.getServer());
        setAuthorized(Object.keys(localData.getPrimaryUser()).length != 0);
    }, []);

    const apiInterface = new Api(server);

    // Overrides sanitization on returned data.
    apiInterface.setSanitize(false);

    const context = [localData, apiInterface, server, setServer];

    const display = new Themes(localData, theme, setTheme);

    return (
        <html>
            <head>
                <title>BlueSky Wrapper</title>
                <meta name="viewport" content="width=device-width, initial-scale: 1, maximum-scale=1"/>
                <link rel="icon" href="https://cdn.glitch.global/fa1b6839-ae9a-450b-b03b-be3be9c9b051/BlueWrapperTransparent.png?v=1691731693827"/>
                <link rel="apple-touch-icon" href="https://cdn.glitch.global/fa1b6839-ae9a-450b-b03b-be3be9c9b051/BlueWrapper.png?v=1691731259916"/>
                {(process.env.NODE_ENV == "development") && <meta name="theme-color" content="lightsalmon"/>}
                <meta name="theme-color" content="#f5f5f5" media="(prefers-color-scheme: light)"/>
                <meta name="theme-color" content="#1a1a1a" media="(prefers-color-scheme: dark)"/>
                <link type="text/css" rel="stylesheet" href={stylesheet}/>
                <link rel="manifest" href={manifest}/>
                <Meta />
                <Links />
            </head>
            <body className={theme}>
                <div id="main" style={{gridTemplateRows: (process.env.NODE_ENV == "development") && "51px auto"}}>
                    {process.env.NODE_ENV == "development" && <div className="devBanner"><BeakerIcon size={16} />You are currently running the dev environment for the Blue Wrapper.</div>}
                    <SideBar display={display} authorized={authorized} />
                    <Outlet context={context} />
                    <FooterBar />
                </div>
                <Scripts />
            </body>
        </html>
    );
}

export default App;