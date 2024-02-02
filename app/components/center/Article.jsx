const Article = ({content}) => {

    return (
        <div>
            {content.map((row) => ((row == "\n") ?
                    <br />
                : ((typeof row == "string") && row.includes("# ")) ?
                    (row.includes("### ")) ?
                        <>
                            <h3 style={{color: "var(--sidebar-background)"}}>
                                {row.split("## ")[1]}
                            </h3>
                        </>
                    : (row.includes("## ")) &&
                        <>
                            <br />
                            <h2 style={{color: "var(--sidebar-background)"}}>
                                {row.split("# ")[1]}
                            </h2>
                        </>
                :
                    <>
                        <a1>{row}</a1>
                        <br /><br />
                    </>
            ))}
        </div>
    )
}

export default Article;