import Header from "../components/center/Header";
import Profile from "../components/center/Profile";
import Post from "../components/center/Post";
import NoView from "../components/center/NoView";
import { json, useOutletContext, useParams } from "@remix-run/react";
import { useState, useEffect } from "react";
import Api from "../infra/Api.mjs";

export const loader = async ({params}) => {

    const apiInterface = new Api({pdsUrl: "https://bsky.social"});

    return json({
        userRef: params.userRef,
        userObj: await apiInterface.getProfile(params.userRef)
    });
}

export const meta = ({data, matches}) => {

    const affix = matches.filter(item => item.id == "root")[0].meta.filter(item => item.name == "titleAffix")[0].content;

    return [
        {
            title: (Object.keys(data.userObj).length > 0) ? `${(data.userObj.displayName) && data.userObj.displayName} (${(!data.userRef.includes("did:")) ? "@" + data.userRef : data.userRef})${affix}` : `User Profile${affix}`
        },
        {
            property: "og:title",
            content: (Object.keys(data.userObj).length > 0) ? `${(data.userObj.displayName) && data.userObj.displayName} (${(!data.userRef.includes("did:")) ? "@" + data.userRef : data.userRef})` : `User Profile`
        },
        {
            property: "og:description",
            content: ((Object.keys(data.userObj).length > 0) && data.userObj.description) ? data.userObj.description : ""
        },
        {
            property: "og:image",
            content: ((Object.keys(data.userObj).length > 0) && data.userObj.avatar) ? data.userObj.avatar : ""
        }
    ];
};

const UserProfile = () => {

    const {apiInterface, authorized} = useOutletContext();
    const params = useParams();

    const [user, setUser] = useState({ref: null});
    const [posts, setPosts] = useState({ref: null});

    useEffect(() => {

        const getUserItems = async () => {

            // TODO: Fix hidden user profile schema when authorized & personal PDS loading (more in Api.getPreferredDataServer())
            // Info: Client load causes mismatched syncing which unintentionally hides hidden users when authenticated. Basically, it's too fast.
            setUser(await apiInterface.getProfile(params.userRef));
            setPosts(await apiInterface.getProfileFeed(params.userRef));
        }

        getUserItems();
    }, []);

    var index = 0;

    return (
        <div className={"UserProfile"}>
            {(false) && <Header title="Profile" />}
            {(user.did) ? <Profile user={user} /> : (Object.keys(user) == 0) && <NoView />}
            {(posts.feed) && posts.feed.map((record) => ((apiInterface.isHiddenHydrated(record.post.author) == false) || (authorized == true)) && <Post record={record} apiInterface={apiInterface} authorized={authorized} key={record.post.uri + "/target/" + index++} />)}
        </div>
    )
}

export default UserProfile;