import Header from "../components/center/Header";
import Notification from "../components/center/Notification";
import { useOutletContext } from "@remix-run/react";
import { useState, useEffect } from "react";

export const meta = ({matches}) => {

    const affix = matches.filter(item => item.id == "root")[0].meta.filter(item => item.name == "titleAffix")[0].content;

    return [
        {
            title: `Notifications${affix}`
        },
        {
            property: "og:title",
            content: "Notifications"
        }
    ];
};

const Notifications = () => {

    var index = 0;

    const {apiInterface} = useOutletContext();
    const [notifications, setNotifications] = useState({notifications: []});

    useEffect(() => {

        const getNotifications = async () => {

            const currentNotifications = await apiInterface.getNotifications();

            if (currentNotifications) {

                setNotifications(currentNotifications);
            }
        }

        getNotifications();
    }, []);

    return (
        <div className={"Notifications"}>
            <Header title="Notifications" />
            {(notifications) && notifications.notifications.map(notification => <Notification record={notification} key={notification.uri + "/target/" + index++} />)}
        </div>
    )
}

export default Notifications;