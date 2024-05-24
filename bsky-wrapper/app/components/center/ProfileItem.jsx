const ProfileItem = ({actor, faded}) => {

    return (
        <div style={{opacity: (faded) ? "0.5" : "1"}} className={"Author"}>
            {(actor.avatar) && <img src={actor.avatar} className={`Avatar`} />}
            <div className={"Details"}>
                <p className={`DisplayName`}>{actor.displayName}</p>
                <p className={`Handle`}>{(actor.handle.includes("did:")) ? actor.handle : "@" + actor.handle}</p>
            </div>
        </div>
    )
}

export default ProfileItem;