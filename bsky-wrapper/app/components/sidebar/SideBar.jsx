import Title from "./Title";
import TaskBar from "./TaskBar";
import UserBar from "./UserBar";

const SideBar = ({display, authorized, apiInterface}) => {

    return (
        <div className={"SideBar"}>
            <div className={"SideBar-Heading"}>
                <Title accent="--title-accent" primary="--title-primary" />
                <TaskBar authorized={authorized} apiInterface={apiInterface} />
            </div>
            <UserBar display={display} authorized={authorized} apiInterface={apiInterface} />
        </div>
    )
}

export default SideBar;