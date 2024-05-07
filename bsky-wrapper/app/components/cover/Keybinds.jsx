import Key from "./Key";

const Keybinds = ({operatingSystem, authorized}) => {

    const currentBinds = [
        {
            name: "Home",
            trigger: "h",
            route: "/",
            authorized: false
        },
        {
            name: "Notifications",
            trigger: "n",
            route: "/notifications",
            authorized: true
        },
        {
            name: "Profile",
            trigger: "p",
            route: "",
            authorized: true
        },
        {
            name: "Settings",
            trigger: "s",
            route: "/settings",
            authorized: false
        },
        {
            name: "Compose",
            trigger: "c",
            route: "",
            authorized: true
        }
    ]

    return (
        <div className={"Content"}>
            {currentBinds.filter((bind) => ((bind.authorized == false) || (authorized == true))).map((bind) => (
                <div className={"Keybind"} key={"keybindRef" + bind.name}>
                    <Key trigger={bind.trigger} operatingSystem={operatingSystem} />
                    <h3>{bind.name}</h3>
                </div>
            ))}
        </div>
    )
}

export default Keybinds;