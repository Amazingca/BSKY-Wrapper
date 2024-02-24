import {
    useLocation,
    useNavigate,
    Link
} from "@remix-run/react";
import {
    HeartIcon,
    ArrowSwitchIcon,
    CommentIcon,
    KebabHorizontalIcon,
    ReplyIcon
} from "@primer/octicons-react";
import Facets from "./Facets";
import Embed from "./Embed";
import MetricItem from "./MetricItem";
import Time from "../../infra/Time";

const Post = ({record, apiInterface}) => {

    const location = useLocation();
    const navigate = useNavigate();

    const goToPrependItem = () => {

        if (record.reason) {

            if (record.reason.$type == "app.bsky.feed.defs#reasonRepost") {

                if (location.pathname != `/profile/${record.reason.by.handle}`) navigate(`/profile/${record.reason.by.handle}`);
            }
        } else if (record.reply) {

            if (location.pathname != `/profile/${record.reply.parent.author.handle}/post/${record.reply.parent.uri.split("/").pop()}`) navigate(`/profile/${record.reply.parent.author.handle}/post/${record.reply.parent.uri.split("/").pop()}`);
        }
    }

    const goToPost = () => {

        /*if (window.getSelection().type == "Caret") {
            
            if (location.pathname != `/profile/${record.post.author.handle}/post/${record.post.uri.split("/").pop()}`) {
                
                navigate(`/profile/${record.post.author.handle}/post/${record.post.uri.split("/").pop()}`);
            }
        }*/
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
        <div className={"PostRoot"}>
            {(record.reply || record.reason) && (
                <div onClick={goToPrependItem} className={"PostPrepend"}>
                    {(record.reason) ? <ArrowSwitchIcon size={"small"} fill="var(--record-prepend-primary)" /> : (record.reply) && <ReplyIcon size={"small"} fill="var(--record-prepend-primary)" />}
                    <p>{(record.reason && record.reason.$type == "app.bsky.feed.defs#reasonRepost") ? `Reposted by ${record.reason.by.displayName}` : (record.reply) ? (apiInterface.isHiddenHydrated(record.reply.parent.author) == false) ? `Replied to ${record.reply.parent.author.displayName}` : " Replied to a user" : ""}</p>
                </div>
            )}
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
                {(record.post.record.text) && (record.post.record.facets) ? <Facets text={record.post.record.text} facets={record.post.record.facets} /> : <Facets text={record.post.record.text} />}
                {(record.post.embed) && <Embed embed={record.post.embed} apiInterface={apiInterface} />}
                <div className={"PostFooter"}>
                    <div className={"Metrics"}>
                        <MetricItem Icon={CommentIcon} onClick={replyToPost} fillColor="--metric-comment-primary" backgroundColor="--metric-comment-accent" metricData={record.post.replyCount} />
                        <MetricItem Icon={ArrowSwitchIcon} onClick={repostPost} fillColor="--metric-repost-primary" backgroundColor="--metric-repost-accent" metricData={record.post.repostCount} />
                        <MetricItem Icon={HeartIcon} onClick={likePost} fillColor="--metric-like-primary" backgroundColor="--metric-like-accent" metricData={record.post.likeCount} />
                    </div>
                    <div className={"Options"}>
                        <MetricItem Icon={KebabHorizontalIcon} onClick={() => window.alert("This button doesn't do anything right now, but it will soon!")} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post;