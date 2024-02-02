import ActionItem from "./ActionItem";
import {
    HomeIcon,
    BellIcon,
    PersonIcon,
    PaintbrushIcon
} from "@primer/octicons-react";
import { useNavigate } from "@remix-run/react";

const TaskBar = () => {

    const navigate = useNavigate();

    const GoHome = () => {

        navigate("/");
    }

    const func = () => {

        return redirect("/");
    }

    return (
        <div className={"TaskBar"}>
            <ActionItem Icon={HomeIcon} description="Home" intent={GoHome}/>
            <ActionItem Icon={BellIcon} description="Notifications" mainColor="--action-item-secondary" intent={func}/>
            <ActionItem Icon={PersonIcon} description="Profile" mainColor="--action-item-secondary" intent={func}/>
            <ActionItem Icon={PaintbrushIcon} description="Compose" mainColor="--primary-accent" backgroundColor="--action-icon-background-secondary" intent={func}/>
        </div>
    )
}

export default TaskBar;