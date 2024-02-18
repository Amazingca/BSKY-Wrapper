import {
    useLocation,
    useNavigate,
    Link
} from "@remix-run/react";
import {
    HeartIcon,
    ArrowSwitchIcon,
    CommentIcon,
    KebabHorizontalIcon
} from "@primer/octicons-react";
import Time from "../../infra/Time";

const Post = ({record}) => {

    const location = useLocation();
    const navigate = useNavigate();

    const goToPost = () => {

        if (window.getSelection().type == "Caret") {
            
            if (location.pathname != `/profile/${record.post.author.handle}/post/${record.post.uri.split("/").pop()}`) {
                
                navigate(`/profile/${record.post.author.handle}/post/${record.post.uri.split("/").pop()}`);
            }
        }
    }

    const replyToPost = () => {

        navigate("/login");
    }

    const repostPost = () => {

        navigate("/login");
    }

    const likePost = () => {

        navigate("/login");
    }

    return (
        <div onClick={goToPost} className={"Post"}>
            <div className={"PostHeader"}>
                <div className={"Author"}>
                    <img src={record.post.author.avatar} className={"Avatar"} />
                    <div className={"Details"}>
                        <p className={"DisplayName"}>{record.post.author.displayName}</p>
                        <Link to={`/profile/${record.post.author.handle}`} className={"Handle"}>{record.post.author.handle}</Link>
                    </div>
                </div>
                <Link to={`/profile/${record.post.author.handle}/post/${record.post.uri.split("/").pop()}`} title={new Date(record.post.record.createdAt).toUTCString()} className={"Timestamp"}>
                    {Time.relative(record.post.record.createdAt)}
                </Link>
            </div>
            {(record.post.record.text) && <p>{record.post.record.text}</p>}
            <div className={"PostFooter"}>
                <div className={"Metrics"}>
                    <div onClick={replyToPost}>
                        <CommentIcon size={"small"} fill={"var(--record-metrics-icon)"} />
                        {(record.post.replyCount > 0) && <p>{record.post.replyCount}</p>}
                    </div>
                    <div onClick={repostPost}>
                        <ArrowSwitchIcon size={"small"} fill={"var(--record-metrics-icon)"} />
                        {(record.post.repostCount > 0) && <p>{record.post.repostCount}</p>}
                    </div>
                    <div onClick={likePost}>
                        <HeartIcon size={"small"} fill={"var(--record-metrics-icon)"} />
                        {(record.post.likeCount > 0) && <p>{record.post.likeCount}</p>}
                    </div>
                </div>
                <div className={"Options"}>
                    <KebabHorizontalIcon size={"small"} fill={"var(--record-metrics-icon)"} />
                </div>
            </div>
        </div>
    )
}

export default Post;