import Title from "./Title";
import TaskBar from "./TaskBar";
import UserBar from "./UserBar";

const SideBar = ({display, authorized, apiInterface, setShowComposer}) => {

    return (
        <div className={"SideBar"}>
            <div className={"SideBar-Heading"}>
                <Title accent="--title-accent" primary="--title-primary" />
                <TaskBar authorized={authorized} apiInterface={apiInterface} setShowComposer={setShowComposer} />
            </div>
            <UserBar display={display} authorized={authorized} apiInterface={apiInterface} />
        </div>
    )
}

export default SideBar;