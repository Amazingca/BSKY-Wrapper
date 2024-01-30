import {
    Links,
    Meta,
    Outlet,
    Scripts
} from "@remix-run/react";
import SideBar from "./components/sidebar/SideBar";
import FooterBar from "./components/footerbar/FooterBar";
import { BeakerIcon } from "@primer/octicons-react";
import stylesheet from "./style.css";
import manifest from "./manifest.json";

const App = () => {

    return (
        <html>
            <head>
                <title>BlueSky Wrapper</title>
                <meta name="viewport" content="width=device-width, initial-scale: 1, maximum-scale=1"/>
                <link rel="icon" href="https://cdn.glitch.global/fa1b6839-ae9a-450b-b03b-be3be9c9b051/BlueWrapperTransparent.png?v=1691731693827"/>
                <link rel="apple-touch-icon" href="https://cdn.glitch.global/fa1b6839-ae9a-450b-b03b-be3be9c9b051/BlueWrapper.png?v=1691731259916"/>
                <meta name="theme-color" content="#f5f5f5" media="(prefers-color-scheme: light)"/>
                <meta name="theme-color" content="#1a1a1a" media="(prefers-color-scheme: dark)"/>
                <link type="text/css" rel="stylesheet" href={stylesheet}></link>
                <link rel="manifest" href={manifest}/>
                <Meta />
                <Links />
            </head>
            <body>
                <div id="main" style={{gridTemplateRows: (process.env.NODE_ENV == "developments") && "51px auto"}}>
                    {process.env.NODE_ENV == "developments" && <div className="devBanner"><BeakerIcon size={16} />You are currently running the dev environment for the Blue Wrapper.</div>}
                    <SideBar />
                    <Outlet />
                    <FooterBar />
                </div>
                <Scripts />
            </body>
        </html>
    );
}

export default App;