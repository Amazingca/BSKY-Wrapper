import ActionItem from "./ActionItem";
import {
    HomeIcon,
    BellIcon,
    PersonIcon,
    PaintbrushIcon
} from "@primer/octicons-react";

const TaskBar = () => {

    const func = () => {

        console.log("Testing function to pass.");
    }

    return (
        <div className={"TaskBar"}>
            <ActionItem Icon={HomeIcon} description="Home" intent={func}/>
            <ActionItem Icon={BellIcon} description="Notifications" mainColor="--action-item-secondary" intent={func}/>
            <ActionItem Icon={PersonIcon} description="Profile" mainColor="--action-item-secondary" intent={func}/>
            <ActionItem Icon={PaintbrushIcon} description="Compose" mainColor="--primary-accent" backgroundColor="--action-icon-background-secondary" intent={func}/>
        </div>
    )
}

export default TaskBar;