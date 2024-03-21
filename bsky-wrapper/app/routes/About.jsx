import Header from "../components/center/Header";
import Article from "../components/center/Article";

export const meta = ({matches}) => {

    const prefix = matches.filter(item => item.id == "root")[0].meta.filter(item => item.name == "titlePrefix")[0].content;

    return [
        {
            title: `About${prefix}`
        }
    ];
};

const About = () => {

    const about = [
        (<>Beginning development in Febuary 2023, the Blue Wrapper is one of the first adaptations of the <a href="https://atproto.com" target="_blank">ATProtocol</a> using a web interface. Such projects exemplify the power of an open-source social networking technology.</>),
        (<>For additional information, and up-to-date progress on v2 of the Blue Wrapper, you can view its README on <a href="https://github.com/Amazingca/BSKY-Wrapper/blob/react-refactor/README.md" target="_blank">Github</a>.</>),
        "## Maintainers",
        (<a href="https://amazingca.dev">caleb.bsky.social</a>)
    ];

    return (
        <div className={"About"}>
            <Header title="About" />
            <Article content={about} />
        </div>
    )
}

export default About;