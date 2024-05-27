import { Link } from "@remix-run/react";

const RoomHeader = ({roomRecord}) => {

    return (
        <div className={"RoomHeader"}>
            <div className={"Info"}>
                <img src={roomRecord.members[1].avatar}></img>
                <Link to={"/profile/" + roomRecord.members[1].handle} className={"Handle"} style={{textDecoration: "none"}}>@{roomRecord.members[1].handle}</Link>
            </div>
            
        </div>
    )
}

export default RoomHeader;