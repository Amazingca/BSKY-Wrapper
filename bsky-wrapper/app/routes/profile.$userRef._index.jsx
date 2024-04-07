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

    const {apiInterface, authorized, setShowComposer} = useOutletContext();
    const params = useParams();

    const [user, setUser] = useState({ref: null});
    const [posts, setPosts] = useState({feed: []});
    var postsCache = {feed: []};

    const getPosts = async () => {

        if (postsCache.feed.length == 0) {

            var feed = await apiInterface.getProfileFeed({user: params.userRef});

            setPosts(feed);
            postsCache = feed;
        } else {

            var newFeed = await apiInterface.getProfileFeed({user: params.userRef, cursor: postsCache.cursor});
            newFeed.feed = newFeed.feed.filter(n => postsCache.feed.filter(a => a.post.uri != n.post.uri).length == postsCache.feed.length);
            newFeed.feed = [...postsCache.feed, ...newFeed.feed];

            setPosts(newFeed);
            postsCache = newFeed;
        }
    }

    const getUser = async () => {

        // TODO: Fix hidden user profile schema when authorized & personal PDS loading (more in Api.getPreferredDataServer())
        // Info: Client load causes mismatched syncing which unintentionally hides hidden users when authenticated. Basically, it's too fast.
        setUser(await apiInterface.getProfile(params.userRef));
    }

    useEffect(() => {

        var isTriggered = false;
        window.onscroll = function () {
            
            if ((document.getElementsByTagName("body")[0].getBoundingClientRect().height - 1000) < (window.visualViewport.height + window.visualViewport.pageTop)) {
                
                if (isTriggered == false) {
                    
                    isTriggered = true;
                    getPosts();
                    isTriggered = false;
                }
            }
        }

        getUser();
        getPosts();
    }, []);

    var index = 0;

    return (
        <div className={"UserProfile"}>
            {(false) && <Header title="Profile" />}
            {(user.did) ? <Profile user={user} /> : (Object.keys(user) == 0) && <NoView />}
            {(posts.feed) && posts.feed.map((record) => ((apiInterface.isHiddenHydrated(record.post.author) == false) || (authorized == true)) && <Post record={record} apiInterface={apiInterface} authorized={authorized} setShowComposer={setShowComposer} key={record.post.uri + "/target/" + index++} />)}
        </div>
    )
}

export default UserProfile;