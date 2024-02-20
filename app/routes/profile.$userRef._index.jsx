import Header from "../components/center/Header";
import Profile from "../components/center/Profile";
import Post from "../components/center/Post";
import NoView from "../components/center/NoView";
import { useOutletContext, useParams } from "@remix-run/react";
import { useState, useEffect } from "react";

const UserProfile = () => {

    const [localData, apiInterface, server, setServer] = useOutletContext();
    const params = useParams();

    const [user, setUser] = useState({ref: null});
    const [posts, setPosts] = useState({ref: null});

    useEffect(() => {

        const getUserItems = async () => {

            setUser(await apiInterface.getProfile(params.userRef));
            setPosts(await apiInterface.getProfileFeed(params.userRef));
        }

        getUserItems();
    }, []);

    return (
        <div className={"UserProfile"}>
            {(false) && <Header title="Profile" />}
            {(user.did) ? <Profile user={user} /> : (Object.keys(user) == 0) && <NoView />}
            {(posts.feed) && posts.feed.map((record) => (
                <Post record={record} key={record.post.uri} />
            ))}
        </div>
    )
}

export default UserProfile;