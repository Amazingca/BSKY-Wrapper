import { Link } from "@remix-run/react"
import Header from "../components/center/Header"
import Button from "../components/interactable/Button"
import { useOutletContext } from "@remix-run/react";
import { ShieldCheckIcon } from "@primer/octicons-react"
import { useEffect, useState } from "react";
import RoomPill from "../components/center/messages/RoomPill";
import NoView from "../components/center/NoView";

export const meta = ({matches}) => {

    const affix = matches.filter(item => item.id == "root")[0].meta.filter(item => item.name == "titleAffix")[0].content;

    return [
        {
            title: `Rooms${affix}`
        },
        {
            property: "og:title",
            content: "Rooms"
        }
    ];
};

const Rooms = () => {

    const {flags, apiInterface, setShowAddModal} = useOutletContext();
    const [openConversations, setOpenConversations] = useState({convos: []});

    const getConversations = async () => {

        if (openConversations.convos.length == 0) {

            var conversations = await apiInterface.listOpenMessages();

            if (conversations) {

                // Data duplication to stress-test view
                if (false) for (var i = 0; i < 4; i++) {

                    var tempConvo = conversations.convos[conversations.convos.length - 1];
                    conversations.convos.push({...tempConvo, id: tempConvo.id + i});
                }

                setOpenConversations(conversations);
            }
        } else {

            var conversations = await apiInterface.listOpenMessages(openConversations.cursor);
            conversations.convos = [...openConversations.convos, ...conversations.convos];

            setOpenConversations(conversations);
        }
    }

    useEffect(() => {

        if (flags.getGate("ENABLED_ROOMS")) return;

        var isTriggered = false;
        window.onscroll = async function () {
            
            if ((document.getElementsByTagName("body")[0].getBoundingClientRect().height - 1000) < (window.visualViewport.height + window.visualViewport.pageTop)) {
                
                if (isTriggered == false) {
                    
                    isTriggered = true;
                    await getConversations();
                    isTriggered = false;
                }
            }
        }

        getConversations();
    }, []);

    const CanInitiateDM = (actor) => {

        if (actor.associated.chat) {

            if (actor.associated.chat.allowIncoming) {

                if (actor.associated.chat.allowIncoming == "all") return true;
                else if (actor.associated.chat.allowIncoming == "following" && actor.viewer.followedBy) return true;
            }
        }

        return false;
    }

    const CallbackAdd = async (actor) => {

        const creationSuccessful = await apiInterface.getRoom([apiInterface.getAuthorization().did, actor.did]);

        console.log(creationSuccessful);
    }

    const HeaderSide = (
        <div>
            <Button text="New" clicker={() => setShowAddModal([true, [CanInitiateDM, CallbackAdd]])} conditional="add" />
            <Link to="/settings#rooms.privacy"><ShieldCheckIcon size="16" /></Link>
        </div>)

    return (
        <div className={"Rooms"}>
            <Header title="Rooms" side={(flags.getGate("ENABLED_ROOMS")) && HeaderSide} />
            {(flags.getGate("ENABLED_ROOMS")) ?
                <div className={"Grid"}>
                    {(openConversations.convos && openConversations.convos.length > 0) ? openConversations.convos.map((conversation) => <RoomPill roomRecord={conversation} key={conversation.id} />) : (openConversations.error) ? <NoView message={(openConversations.error == "InvalidToken") ? "The App Password you used to login is not authorized to access your messages — please use a privileged one instead!" : "There was an issue accessing your "} /> : <></>}
                </div> :
                <NoView message="Thanks for being curious! I'm still working on this feature, but feel free to test things out in a local environment." />
            }
            
        </div>
    )
}

export default Rooms;