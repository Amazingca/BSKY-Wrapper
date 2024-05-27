import { useOutletContext, useParams } from "@remix-run/react";
import NoView from "../components/center/NoView";
import RoomHeader from "../components/center/messages/RoomHeader";
import { useEffect, useState } from "react";

const ChatRoom = () => {

    const {apiInterface, authorized, setShowComposer} = useOutletContext();
    const params = useParams();

    const [roomRecord, setRoomRecord] = useState(null);

    useEffect(() => {

        const getRoom = async () => {

            const roomRecord = await apiInterface.getRoomFromId(params.roomId);

            if (roomRecord) setRoomRecord(roomRecord);
            else setRoomRecord({error: true});
        }

        getRoom();
    }, []);

    return (
        <div className={"Room"}>
            {(roomRecord && !roomRecord.error) ? (<>
                <RoomHeader roomRecord={roomRecord.convo} />
            </>) : <NoView message={"This record is not available or your token doesn't have the right scope!"} />}
        </div>
    )
}

export default ChatRoom;