import Header from "../components/center/Header";
import Post from "../components/center/Post";
import { useOutletContext } from "@remix-run/react";
import { useState, useEffect } from "react";

const Feed = () => {

    const [localData, apiInterface, server, setServer] = useOutletContext();
    const [posts, setPosts] = useState({feed: []});

    useEffect(() => {

        const getPosts = async () => {

            setPosts(await apiInterface.getFeed());
        }

        getPosts();
    }, []);

    return (
        <div className={"Feed"}>
            <Header title="Feed" />
            {posts.feed.map((record) => (
                <Post record={record} key={record.uri} />
            ))}
        </div>
    )
}

export default Feed;