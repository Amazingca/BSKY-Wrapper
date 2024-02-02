import Header from "../components/center/Header";
import Article from "../components/center/Article";

const Acknowledgements = () => {

    const acknowledgements = [
        "The Blue Wrapper is made possible through these frameworks and graphics:",
        "### Github",
        (<a href="https://github.com/github/mona-sans" target="_blank">Mona Sans</a>),
        (<a href="https://github.com/primer/octicons" target="_blank">Octicons</a>),
        "### Remix",
        (<a href="https://github.com/remix-run/remix">Remix</a>),
        "## Honorable Mentions",
        (<a href="https://atproto.com/community/projects" target="_blank">ATP Dev Community</a>)
    ];

    return (
        <div className={"Acknowledgements"}>
            <Header title="Acknowledgements" />
            <Article content={acknowledgements} />
        </div>
    )
}

export default Acknowledgements;