import Header from "../components/center/Header";
import Post from "../components/center/Post";
import { useOutletContext, useParams } from "@remix-run/react";
import { useState, useEffect } from "react";

export const meta = ({matches, location}) => {

    const affix = matches.filter(item => item.id == "root")[0].meta.filter(item => item.name == "titleAffix")[0].content;

    const tagBasis = location.pathname.split("/")[2];
    const tag = (tagBasis.slice(1) != "#") ? "#" + tagBasis : tagBasis;

    return [
        {
            title: `${tag}${affix}`
        },
        {
            property: "og:title",
            content: tag
        },
        {
            property: "og:description",
            content: `Posts with the ${tag} tag.`
        }
    ];
};

const Feed = () => {

    const {apiInterface, authorized} = useOutletContext();
    const params = useParams();
    
    var tag = (params.tag.slice(1) != "#") ? "#" + params.tag : params.tag;
    const [posts, setPosts] = useState({posts: []});
    var postsCache = {posts: []};

    const queryPosts = async () => {

        if (postsCache.posts.length == 0) {

            var query = await apiInterface.queryPosts({term: tag});

            console.log(query);

            setPosts(query);
            postsCache = query;
        } else {

            var newPosts = await apiInterface.queryPosts({term: tag, cursor: postsCache.cursor});
            newPosts.posts = newPosts.posts.filter(n => postsCache.posts.filter(a => a.uri != n.uri).length == postsCache.posts.length);
            newPosts.posts = [...postsCache.posts, ...newPosts.posts];

            setPosts(newPosts);
            postsCache = newPosts;
        }
    }

    useEffect(() => {

        var isTriggered = false;
        window.onscroll = function () {
            
            if ((document.getElementsByTagName("body")[0].getBoundingClientRect().height - 1000) < (window.visualViewport.height + window.visualViewport.pageTop)) {
                
                if (isTriggered == false) {
                    
                    isTriggered = true;
                    queryPosts();
                    isTriggered = false;
                }
            }
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