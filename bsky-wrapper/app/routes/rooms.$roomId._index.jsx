import { useOutletContext, useParams } from "@remix-run/react";
import Header from "../components/center/Header";

const ChatRoom = () => {

    const {apiInterface, authorized, setShowComposer} = useOutletContext();
    const params = useParams();

    return (
        <div className={"Rooms"}>
            <Header title={"Room"} />
            <div>You're in the room. {params.roomId}</div>
        </div>
    )
}

export default ChatRoom;