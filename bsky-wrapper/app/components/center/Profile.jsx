const Profile = ({user}) => {
    
    return (
        <div className={"Profile"}>
            {(user.banner) && <img src={user.banner} className={"Banner"} />}
            <div style={{marginTop: ((!user.banner) || (!user.avatar)) && "0rem"}} className={"Inline"}>
                {(user.avatar) && <img src={user.avatar} className={"Avatar"} />}
                <div className={"Details"}>
                    <div>
                        <p className={"DisplayName"}>{user.displayName}</p>
                        <p className={"Handle"}>@{user.handle}</p>
                    </div>
                    {user.description.split("\n").map(line => <p key={line}>{line}</p>)}
                    <div className={"Metrics"}>
                        <div><p>{user.followersCount}</p><p className={"Accent"}>Follower{(user.followersCount > 1) && "s"}</p></div>
                        <div><p>{user.followsCount}</p><p className={"Accent"}>Following</p></div>
                        <div><p>{user.postsCount}</p><p className={"Accent"}>Post{(user.postsCount > 1) && "s"}</p></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;