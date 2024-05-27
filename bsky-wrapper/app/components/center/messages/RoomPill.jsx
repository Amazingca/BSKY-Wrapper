import { Link } from "@remix-run/react";

const RoomPill = ({roomRecord, linked}) => {

    return (
        <>
            {(linked) ? <Link to={"/rooms/" + roomRecord.id} className={"RoomPill"} style={{textDecoration: "none"}}>
                <img src={roomRecord.members[1].avatar} />
                <h3>{roomRecord.members[1].displayName}</h3>
                <p>@{roomRecord.members[1].handle}</p>
            </Link> : <div className={"RoomPill"}>
                <img src={roomRecord.members[1].avatar} />
                <h3>{roomRecord.members[1].displayName}</h3>
                <p>@{roomRecord.members[1].handle}</p>
            </div>}
        </>
    )
}

RoomPill.defaultProps = {
    linked: false
}

export default RoomPill;