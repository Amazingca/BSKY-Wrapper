import Header from "../components/center/Header";
import Notification from "../components/center/Notification";
import { useOutletContext } from "@remix-run/react";
import { useState, useEffect } from "react";
import Button from "../components/interactable/Button";

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

    const {apiInterface, setNotificationCount} = useOutletContext();
    const [notifications, setNotifications] = useState({notifications: []});
    var notificationsCache = {notifications: []};

    const getNotifications = async () => {

        if (notificationsCache.notifications.length == 0) {

            const currentNotifications = await apiInterface.getNotifications();

            if (currentNotifications) {

                setNotifications(currentNotifications);
                notificationsCache = currentNotifications;
            }
        } else {

            var newNotifications = await apiInterface.getNotifications(notificationsCache.cursor);
            newNotifications.notifications = [...notificationsCache.notifications, ...newNotifications.notifications];
            newNotifications.cursor = newNotifications.notifications[newNotifications.notifications.length - 1].record.createdAt;

            setNotifications(newNotifications);
            notificationsCache = newNotifications;
        }
    }

    useEffect(() => {

        var isTriggered = false;
        window.onscroll = async function () {
            
            if ((document.getElementsByTagName("body")[0].getBoundingClientRect().height - 1000) < (window.visualViewport.height + window.visualViewport.pageTop)) {
                
                if (isTriggered == false) {
                    
                    isTriggered = true;
                    await getNotifications();
                    isTriggered = false;
                }
            }
        }

        getNotifications();
    }, []);

    const markAsRead = async (date=null) => {

        const seenAt = (date) ? date + ":00.000Z" : new Date().toISOString();

        const tryRead = await apiInterface.markNotificationsAsRead(seenAt);

        if (tryRead) {

            var tempNotifs = notifications;
            tempNotifs.seenAt = seenAt;

            for (var i = 0; i < tempNotifs.notifications.length; i++) {

                if (tempNotifs.notifications[i].record.createdAt <= seenAt) tempNotifs.notifications[i].isRead = true;
                else tempNotifs.notifications[i].isRead = false;
            }

            const notificationCount = tempNotifs.notifications.filter((notification) => notification.isRead == false).length;
            
            setNotificationCount((notificationCount > 0) ? notificationCount : null);
            setNotifications(tempNotifs);
        }
    }

    return (
        <div className={"Notifications"}>
            <Header title="Notifications" side={<Button text="Mark as read until" clicker={markAsRead} conditional="datetime" conditionalData={(notifications.notifications.length > 0) && {max: new Date().toISOString().replace("Z", "")}} />} />
            {(notifications) && notifications.notifications.map(notification => <Notification record={notification} key={notification.uri + "/target/" + index++} />)}
        </div>
    )
}

export default Notifications;