import Header from "../components/center/Header";
import Post from "../components/center/Post";
import NoView from "../components/center/NoView";
import { json, useOutletContext, useParams } from "@remix-run/react";
import { useState, useEffect } from "react";
import Api from "../infra/Api.mjs";

export const loader = async ({params}) => {

    const apiInterface = new Api({pdsUrl: "https://bsky.social"});

    return json({
        userRef: params.userRef,
        userObj: await apiInterface.getProfile(params.userRef),
        postObj: await apiInterface.getPostThread({type: (params.userRef.includes("did:")) ? "did": "handle", ref: params.userRef}, params.postRef)
    });
}

export const meta = ({data, matches}) => {

    const affix = matches.filter(item => item.id == "root")[0].meta.filter(item => item.name == "titleAffix")[0].content;

    return [
        {
            title: (Object.keys(data.userObj).length > 0) ? `Post by ${(data.userObj.displayName) && data.userObj.displayName + " "}${(data.userObj.displayName) ? "(" + (!data.userRef.includes("did:")) ? "@" + data.userRef : data.userRef + ")" : (!data.userRef.includes("did:")) ? "@" + data.userRef : data.userRef}${affix}` : `User Post${affix}`
        },
        {
            property: "og:title",
            content: (Object.keys(data.userObj).length > 0) ? `Post by ${(data.userObj.displayName) && data.userObj.displayName + " "}${(data.userObj.displayName) ? "(" + (!data.userRef.includes("did:")) ? "@" + data.userRef : data.userRef + ")" : (!data.userRef.includes("did:")) ? "@" + data.userRef : data.userRef}` : `User Post`
        },
        {
            property: "og:description",
            content: ((Object.keys(data.userObj).length > 0) && (data.postObj.thread.post.record.text != "")) ? data.postObj.thread.post.record.text : ""
        },
        {
            property: "og:image",
            content: ((Object.keys(data.userObj).length > 0) && data.userObj.avatar) ? data.userObj.avatar : ""
        }
    ];
};

const UserPost = () => {

    const {apiInterface, authorized} = useOutletContext();
    const params = useParams();

    const [post, setPost] = useState({"ref": null});

    useEffect(() => {

        const getPost = async () => {

            setPost(await apiInterface.getPostThread({ref: params.userRef, type: (params.userRef.includes("did:plc:") ? "did" : "handle")}, params.postRef));
        }

        getPost();
    }, []);

    const higherLevelPost = (record) => {

        return (
            <>
                {(record.parent) && higherLevelPost(record.parent)}
                {(record.post && ((apiInterface.isHiddenHydrated(record.post.author) == false) || (authorized == false))) ? <Post record={record} apiInterface={apiInterface} authorized={authorized} /> : <NoView />}
                <div className={"ReplyConnector"}></div>
            </>
        )
    }

    return (
        <div className={"UserPost"}>
            <Header title={(post.thread && post.thread.parent) ? "Post Thread" : "Post"} />
            <div>
                {(post.thread && post.thread.parent) && higherLevelPost(post.thread.parent)}
                {(post.thread) ? <Post record={post.thread} apiInterface={apiInterface} authorized={authorized} /> : (Object.keys(post) == 0) && <NoView />}
            </div>
        </div>
    )
}

export default UserPost;