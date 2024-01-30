const Title = ({accent, primary}) => {

    return (
        <div>
            <h1 style={{color: `var(${primary})`}} className={"Title"}><div style={{backgroundImage: `var(${accent})`}} className={"TitleAccent"}>BlueSky</div> <div style={{textWrap: "nowrap"}}>Social Wrapper</div></h1>
        </div>
    )
}

export default Title;