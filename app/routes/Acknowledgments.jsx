import Header from "../components/center/Header";
import Article from "../components/center/Article";

const Acknowledgments = () => {

    const acknowledgments = [
        "The Blue Wrapper is made possible through these frameworks and graphics:",
        "### Github",
        (<a href="https://github.com/github/mona-sans" target="_blank">Mona Sans</a>),
        (<a href="https://github.com/primer/octicons" target="_blank">Octicons</a>),
        "### Shopify",
        (<a href="https://github.com/remix-run/remix">Remix</a>),
        "### Facebook",
        (<a href="https://github.com/facebook/react">React</a>),
        "## Honorable Mentions",
        (<a href="https://atproto.com/community/projects" target="_blank">ATP Dev Community</a>)
    ];

    return (
        <div className={"Acknowledgments"}>
            <Header title="Acknowledgments" />
            <Article content={acknowledgments} />
        </div>
    )
}

export default Acknowledgments;