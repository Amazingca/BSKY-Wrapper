const Key = ({trigger, operatingSystem}) => {

    return (
        <div className={"Key"}>
            <h3 style={{backgroundImage: "var(--title-accent)"}}>{(operatingSystem == "macOS_Native") ? "⌘" : "CTRL + ALT"} + {trigger.toUpperCase()}</h3>
        </div>
    )
}

export default Key;