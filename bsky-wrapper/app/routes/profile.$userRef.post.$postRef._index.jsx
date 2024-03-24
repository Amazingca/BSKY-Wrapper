import Header from "../components/center/Header";
import Post from "../components/center/Post";
import NoView from "../components/center/NoView";
import { json, useLoaderData, useOutletContext, useParams } from "@remix-run/react";
import { useState, useEffect } from "react";
import Api from "../infra/Api.mjs";

export const loader = async ({request, params}) => {
    
    var urlParams = null;
    if (request.url.includes("?")) urlParams = new URLSearchParams(request.url.split("?")[1]);

    const apiInterface = new Api({pdsUrl: "https://bsky.social"});

    return json({
        userRef: params.userRef,
        userObj: await apiInterface.getProfile(params.userRef),
        postObj: await apiInterface.getPostThread({type: (params.userRef.includes("did:")) ? "did": "handle", ref: params.userRef}, params.postRef),
        urlParams: (urlParams && urlParams.get("prefersImage")) ? urlParams.get("prefersImage") : null
    });
}

export const meta = ({data, matches}) => {

    const affix = matches.filter(item => item.id == "root")[0].meta.filter(item => item.name == "titleAffix")[0].content;

    var displayName = (data.userObj.displayName) ? data.userObj.displayName + " ": "";
    var handle = (displayName != "") ? `(${(!data.userRef.includes("did:")) ? "@" + data.userRef : data.userRef})` : (!data.userRef.includes("did:")) ? "@" + data.userRef : data.userRef;

    console.log(data.postObj.thread.post.record.text);
    return [
        {
            title: (Object.keys(data.userObj).length > 0) ? `Post by ${displayName}${handle}${affix}` : `User Post${affix}`
        },
        {
            property: "og:title",
            content: (Object.keys(data.userObj).length > 0) ? `Post by ${displayName}${handle}` : `User Post`
        },
        {
            property: "og:description",
            content: ((Object.keys(data.userObj).length > 0) && (data.postObj.thread.post.record.text != "")) ? data.postObj.thread.post.record.text.replaceAll("&quote;", "\"") : ""
        },
        {
            property: "og:image",
            content: (Object.keys(data.userObj).length > 0) ? (data.postObj.thread.post.embed && (data.postObj.thread.post.embed.$type == "app.bsky.embed.images#view")) ? data.postObj.thread.post.embed.images[(data.urlParams) ? data.urlParams - 1 : 0].fullsize : (data.userObj.avatar) ? data.userObj.avatar : "" : ""
        },
        ...(data.postObj.thread.post.embed && (data.postObj.thread.post.embed.$type == "app.bsky.embed.images#view")) ? [{
            property: "twitter:card",
            content: "summary_large_image"
        }] : []
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
                {(record.post && ((apiInterface.isHiddenHydrated(record.post.author) == false) || (authorized == true))) ? <Post record={record} apiInterface={apiInterface} authorized={authorized} /> : <NoView />}
                <div className={"ReplyConnector"}></div>
            </>
        )
    }

    var index = 0;

    return (
        <div className={"UserPost"}>
            <Header title={(post.thread && post.thread.parent) ? "Post Thread" : "Post"} />
            <div>
                {(post.thread && post.thread.parent) && higherLevelPost(post.thread.parent)}
                {(post.thread) ? <Post record={post.thread} apiInterface={apiInterface} authorized={authorized} focused={true} /> : (Object.keys(post) == 0) && <NoView />}
                {(post.thread && (post.thread.replies.length > 0)) && (
                    <>
                        <h3>Replies:</h3>
                        <div className={"Replies"}>
                            {post.thread.replies.map((reply) => ((reply.$type == "app.bsky.feed.defs#threadViewPost" && ((apiInterface.isHiddenHydrated(reply.post.author) == false) || (authorized == true))) && <Post record={reply} apiInterface={apiInterface} authorized={authorized} key={reply.post.uri} />))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default UserPost;