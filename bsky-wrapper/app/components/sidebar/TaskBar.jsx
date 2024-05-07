import ActionItem from "./ActionItem";
import {
    HomeIcon,
    BellIcon,
    PersonIcon,
    ToolsIcon,
    PaintbrushIcon
} from "@primer/octicons-react";
import { useLocation, useNavigate, Link } from "@remix-run/react";
import { useState, useEffect } from "react";

const TaskBar = ({authorized, apiInterface, setShowComposer}) => {

    const location = useLocation();
    const navigate = useNavigate();

    const goHome = () => {

        if (location.pathname != "/") navigate("/");
    }

    const goToSettings = () => {

        if (location.pathname != "/settings") navigate("/settings");
    }

    const goToNotifications = () => {

        if (location.pathname != "/notifications") navigate("/notifications");
    }

    const goToProfile = () => {

        if (location.pathname != `/profile/${apiInterface.getAuthorization().handle}`) navigate(`/profile/${apiInterface.getAuthorization().handle}`);
    }

    const func = () => {

        return redirect("/");
    }

    const [notificationCount, setNotificationCount] = useState(null);

    const getNotificationCount = async () => {

        const currentNotificationCount = await apiInterface.getNotificationCount();

        if (currentNotificationCount && (currentNotificationCount > 0)) setNotificationCount((currentNotificationCount >= 1000) ? "999+" : currentNotificationCount);
    }

    if (authorized == true) getNotificationCount();

    return (
        <div className={"TaskBar"}>
            <Link to="/" unstable_viewTransition>
                <ActionItem Icon={HomeIcon} description="Home" mainColor="--action-item-secondary"/>
            </Link>
            {(authorized) && (
                <Link to="/notifications" unstable_viewTransition>
                    <ActionItem Icon={BellIcon} description="Notifications" mainColor="--action-item-secondary" status={notificationCount} />
                </Link>
            )}
            {(authorized) && (
                <Link to={`/profile/${apiInterface.getAuthorization().handle}`} unstable_viewTransition>
                    <ActionItem Icon={PersonIcon} description="Profile" mainColor="--action-item-secondary"/>
                </Link>
            )}
            <Link to="/settings" unstable_viewTransition>
                <ActionItem Icon={ToolsIcon} description="Settings" mainColor="--action-item-secondary"/>
            </Link>
            {(authorized) && <ActionItem Icon={PaintbrushIcon} description="Compose" mainColor="--primary-accent" backgroundColor="--action-icon-background-secondary" intent={() => setShowComposer([true, null])}/>}
        </div>
    )
}

export default TaskBar;