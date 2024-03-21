import { Fragment } from "react";

const Article = ({content}) => {

    var index = 0;

    return (
        <div>
            {content.map((row) => ((row == "\n") ?
                    <br key={"article-" + index++} />
                : ((typeof row == "string") && row.includes("# ")) ?
                    (row.includes("### ")) ?
                        <Fragment key={"article-" + index++}>
                            <h3 style={{color: "var(--header-primary)"}}>
                                {row.split("## ")[1]}
                            </h3>
                        </Fragment>
                    : (row.includes("## ")) &&
                        <Fragment key={"article-" + index++}>
                            <br />
                            <h2 style={{color: "var(--header-primary)"}}>
                                {row.split("# ")[1]}
                            </h2>
                        </Fragment>
                :
                    <Fragment key={"article-" + index++}>
                        <h4>{row}</h4>
                        <br /><br />
                    </Fragment>
            ))}
        </div>
    )
}

export default Article;