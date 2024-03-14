import Header from "../components/center/Header";
import Post from "../components/center/Post";
import { useOutletContext, useParams } from "@remix-run/react";
import { useState, useEffect } from "react";

const Feed = () => {

    const {apiInterface, authorized} = useOutletContext();
    const params = useParams();
    
    var tag = (params.tag.slice(1) != "#") ? "#" + params.tag : params.tag;
    const [posts, setPosts] = useState({posts: []});

    useEffect(() => {

        const queryPosts = async () => {
            
            setPosts(await apiInterface.queryPosts(tag));
        }

        queryPosts();
    }, []);

    var index = 0;

    return (
        <div className={"Tag"}>
            <Header title="Tag" subroute={tag} />
            {posts.posts.map((record) => ((apiInterface.isHiddenHydrated(record.author) == false) || (authorized == true)) && <Post record={{post: record}} apiInterface={apiInterface} authorized={authorized} key={record.uri + "/target/" + index++} />)}
        </div>
    )
}

export default Feed;