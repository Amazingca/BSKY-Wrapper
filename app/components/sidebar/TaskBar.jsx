import ActionItem from "./ActionItem";
import {
    HomeIcon,
    BellIcon,
    PersonIcon,
    ToolsIcon,
    PaintbrushIcon
} from "@primer/octicons-react";
import { useLocation, useNavigate } from "@remix-run/react";

const TaskBar = ({authorized}) => {

    const location = useLocation();
    const navigate = useNavigate();

    const goHome = () => {

        if (location.pathname != "/") navigate("/");
    }

    const goToSettings = () => {

        if (location.pathname != "/settings") navigate("/settings");
    }

    const func = () => {

        return redirect("/");
    }

    return (
        <div className={"TaskBar"}>
            <ActionItem Icon={HomeIcon} description="Home" intent={goHome}/>
            {(authorized) && <ActionItem Icon={BellIcon} description="Notifications" mainColor="--action-item-secondary" intent={func}/>}
            {(authorized) && <ActionItem Icon={PersonIcon} description="Profile" mainColor="--action-item-secondary" intent={func}/>}
            <ActionItem Icon={ToolsIcon} description="Settings" mainColor="--action-item-secondary" intent={goToSettings}/>
            {(authorized) && <ActionItem Icon={PaintbrushIcon} description="Compose" mainColor="--primary-accent" backgroundColor="--action-icon-background-secondary" intent={func}/>}
        </div>
    )
}

export default TaskBar;