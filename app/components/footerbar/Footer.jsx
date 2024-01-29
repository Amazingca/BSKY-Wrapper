import {
    Link
} from "@remix-run/react";

const Footer = () => {

    return (
        <div className="Footer">
            <f1>Open-sourced on <a href="https://github.com/Amazingca/BSKY-Wrapper" target="_blank">Github</a>.</f1>
            <f1>© 2024 by its maintainers</f1>
            <f1><Link to={`/about`}>About</Link> · <Link to={`/acknowledgements`}>Acknowledgements</Link></f1>
        </div>
    )
}

export default Footer;