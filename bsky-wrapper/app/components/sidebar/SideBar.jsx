import Title from "./Title";
import TaskBar from "./TaskBar";
import UserBar from "./UserBar";

const SideBar = ({flags, tryAuthorize, localData, display, authorized, apiInterface, notifications, messages, setShowComposer}) => {

    return (
        <div className={"SideBar"}>
            <div className={"SideBar-Heading"}>
                <Title accent="--title-accent" primary="--title-primary" />
                <TaskBar flags={flags} authorized={authorized} apiInterface={apiInterface} notifications={notifications} messages={messages} setShowComposer={setShowComposer} />
            </div>
            <UserBar tryAuthorize={tryAuthorize} localData={localData} display={display} authorized={authorized} apiInterface={apiInterface} />
        </div>
    )
}

export default SideBar;