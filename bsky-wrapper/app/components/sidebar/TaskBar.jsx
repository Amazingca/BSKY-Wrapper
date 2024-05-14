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

const TaskBar = ({authorized, apiInterface, notifications: {notificationCount, setNotificationCount}, setShowComposer}) => {

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

    const getNotificationCount = async () => {

        const currentNotificationCount = await apiInterface.getNotificationCount();

        if (currentNotificationCount && (currentNotificationCount > 0)) setNotificationCount((currentNotificationCount >= 1000) ? "999+" : currentNotificationCount);
    }

    if (authorized == true) getNotificationCount();

    return (
        <div className={"TaskBar"}>
            <Link to="/">
                <ActionItem Icon={HomeIcon} description="Home" mainColor="--action-item-secondary"/>
            </Link>
            {(authorized) && (
                <Link to="/notifications">
                    <ActionItem Icon={BellIcon} description="Notifications" mainColor="--action-item-secondary" status={notificationCount} />
                </Link>
            )}
            {(authorized) && (
                <Link to={`/profile/${apiInterface.getAuthorization().handle}`}>
                    <ActionItem Icon={PersonIcon} description="Profile" mainColor="--action-item-secondary"/>
                </Link>
            )}
            <Link to="/settings">
                <ActionItem Icon={ToolsIcon} description="Settings" mainColor="--action-item-secondary"/>
            </Link>
            {(authorized) && <ActionItem Icon={PaintbrushIcon} description="Compose" mainColor="--primary-accent" backgroundColor="--action-icon-background-secondary" intent={() => setShowComposer([true, null])}/>}
        </div>
    )
}

export default TaskBar;