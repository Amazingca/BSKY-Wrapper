import {
    Link
} from "@remix-run/react";

const Footer = () => {

    return (
        <div className="Footer">
            <footer>Open-sourced on <a href="https://github.com/Amazingca/BSKY-Wrapper" target="_blank">Github</a>.</footer>
            <footer>&copy; 2025 by its maintainers</footer>
            <footer><Link to={`/about`}>About</Link> · <Link to={`/acknowledgments`}>Acknowledgments</Link></footer>
        </div>
    )
}

export default Footer;
