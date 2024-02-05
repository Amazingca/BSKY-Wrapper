import Title from "./Title";
import TaskBar from "./TaskBar";
import UserBar from "./UserBar";

const SideBar = ({display}) => {

    return (
        <div className={"SideBar"}>
            <div className={"SideBar-Heading"}>
                <Title accent="--title-accent" primary="--title-primary" />
                <TaskBar />
            </div>
            <UserBar display={display} />
        </div>
    )
}

export default SideBar;