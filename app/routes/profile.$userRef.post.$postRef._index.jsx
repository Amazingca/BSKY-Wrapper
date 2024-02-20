import Header from "../components/center/Header";
import Post from "../components/center/Post";
import NoView from "../components/center/NoView";
import { useOutletContext, useParams } from "@remix-run/react";
import { useState, useEffect } from "react";

const UserPost = () => {

    const [localData, apiInterface, server, setServer] = useOutletContext();
    const params = useParams();

    const [post, setPost] = useState({"ref": null});

    useEffect(() => {

        const getPost = async () => {

            setPost(await apiInterface.getPostThread({ref: params.userRef, type: (params.userRef.includes("did:plc:") ? "did" : "handle")}, params.postRef));
        }

        getPost();
    }, []);

    return (
        <div className={"UserPost"}>
            <Header title="Post" />
            {(post.thread) ? <Post record={post.thread} /> : (Object.keys(post) == 0) && <NoView />}
        </div>
    )
}

export default UserPost;