import Header from "../components/center/Header";
import Post from "../components/center/Post";
import { useOutletContext } from "@remix-run/react";
import { useState, useEffect } from "react";

const Feed = () => {

    const {apiInterface, authorized} = useOutletContext();
    const [posts, setPosts] = useState({feed: []});
    var postsCache = {feed: []};

    const getPosts = async () => {

        if (postsCache.feed.length == 0) {

            var feed = await apiInterface.getFeed({});

            setPosts(feed);
            postsCache = feed;
        } else {

            var newFeed = await apiInterface.getFeed({cursor: postsCache.cursor});
            newFeed.feed = newFeed.feed.filter(n => postsCache.feed.filter(a => a.post.uri != n.post.uri).length == postsCache.feed.length);
            newFeed.feed = [...postsCache.feed, ...newFeed.feed];

            setPosts(newFeed);
            postsCache = newFeed;
        }
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

        getPosts();
    }, []);

    var index = 0;

    return (
        <div className={"Feed"}>
            <Header title="Feed" />
            {posts.feed.map((record) => ((apiInterface.isHiddenHydrated(record.post.author) == false) || (authorized == true)) && <Post record={record} apiInterface={apiInterface} authorized={authorized} key={record.post.uri + "/target/" + index++} />)}
        </div>
    )
}

export default Feed;