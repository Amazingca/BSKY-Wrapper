import Title from "./Title";
import TaskBar from "./TaskBar";
import UserBar from "./UserBar";

const SideBar = ({text}) => {

    return (
        <div className={"SideBar"}>
            <Title accent="--title-accent" primary="--title-primary" />
            <TaskBar />
            <UserBar />
        </div>
    )
}

export default SideBar;