const RoomPill = ({roomRecord}) => {

    return (
        <div className={"RoomPill"}>
            <img src={roomRecord.members[1].avatar} />
            <h3>{roomRecord.members[1].displayName}</h3>
            <p>@{roomRecord.members[1].handle}</p>
        </div>
    )
}

export default RoomPill;