import ActionItem from "./ActionItem";
import {
    HomeIcon,
    BellIcon,
    PersonIcon,
    ToolsIcon,
    PaintbrushIcon
} from "@primer/octicons-react";
import { useLocation, useNavigate } from "@remix-run/react";
import { useState, useEffect } from "react";

const TaskBar = ({authorized, apiInterface}) => {

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
    useEffect(() => {

        const getNotificationCount = async () => {

            const currentNotificationCount = await apiInterface.getNotificationCount();

            if (currentNotificationCount && (currentNotificationCount > 0)) setNotificationCount((currentNotificationCount >= 1000) ? "999+" : currentNotificationCount);
        }

        getNotificationCount();
    }, []);

    return (
        <div className={"TaskBar"}>
            <ActionItem Icon={HomeIcon} description="Home" intent={goHome}/>
            {(authorized) && <ActionItem Icon={BellIcon} description="Notifications" mainColor="--action-item-secondary" intent={goToNotifications} status={notificationCount} />}
            {(authorized) && <ActionItem Icon={PersonIcon} description="Profile" mainColor="--action-item-secondary" intent={goToProfile}/>}
            <ActionItem Icon={ToolsIcon} description="Settings" mainColor="--action-item-secondary" intent={goToSettings}/>
            {(authorized) && <ActionItem Icon={PaintbrushIcon} description="Compose" mainColor="--primary-accent" backgroundColor="--action-icon-background-secondary" intent={func}/>}
        </div>
    )
}

export default TaskBar;