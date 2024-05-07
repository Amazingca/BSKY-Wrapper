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
import Label from "./Label";
import NoView from "./NoView";

const Post = ({record, apiInterface, authorized, focused, setShowComposer}) => {

    if (record.post.$system) return <NoView message={record.post.$system.message} />

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

    const happeningSoon = (basic=false) => {

        if ((authorized == false) && (basic == false)) navigate("/login");
        else window.alert("This button doesn't do anything right now, but it will soon!");
    }

    const replyToPost = () => {

        if (authorized == true) setShowComposer([true, {root: {uri: (record.post.record.reply) ? record.post.record.reply.root.uri : record.post.uri, cid: (record.post.record.reply) ? record.post.record.reply.root.cid : record.post.cid}, parent: {uri: record.post.uri, cid: record.post.cid}}]);
        else happeningSoon();
    }

    const repostPost = () => {

        happeningSoon();
    }

    const likePost = () => {

        happeningSoon();
    }

    return (
        <div className={"PostRoot"}>
            {(record.reply || record.reason) && (
                <div onClick={goToPrependItem} className={"PostPrepend"}>
                    {(record.reason) ? <ArrowSwitchIcon size={"small"} fill="var(--record-prepend-primary)" /> : (record.reply) && <ReplyIcon size={"small"} fill="var(--record-prepend-primary)" />}
                    <p>{(record.reason && record.reason.$type == "app.bsky.feed.defs#reasonRepost") ? `Reposted by ${record.reason.by.displayName}` : (record.reply) ? ((record.reply.parent.$type != "app.bsky.feed.defs#blockedPost" && record.reply.parent.$type != "app.bsky.feed.defs#notFoundPost") && ((apiInterface.isHiddenHydrated(record.reply.parent.author) == false) || (authorized == true))) ? `Replied to ${(record.reply.parent.author.displayName) ? record.reply.parent.author.displayName : record.reply.parent.author.handle}` : " Replied to a user" : ""}</p>
                </div>
            )}
            <div className={"Post"}>
                <div className={"PostHeader"}>
                    <div className={"Author"}>
                        {(record.post.author.avatar) && <img src={record.post.author.avatar} className={`Avatar${(focused == false) ? " Regular" : ""}`} />}
                        <div className={"Details"}>
                            <p className={`DisplayName${(focused == false) ? " Regular" : ""}`}>{record.post.author.displayName}</p>
                            <Link to={`/profile/${record.post.author.handle}`} className={`Handle${(focused == false) ? " Regular" : ""}`} unstable_viewTransition>{(record.post.author.handle.includes("did:")) ? record.post.author.handle : "@" + record.post.author.handle}</Link>
                        </div>
                    </div>
                    {(focused == false) && (
                        <Link to={`/profile/${record.post.author.handle}/post/${record.post.uri.split("/").pop()}`} title={Time.format(record.post.record.createdAt)} className={"Timestamp"} unstable_viewTransition>
                            {Time.relative(record.post.record.createdAt)}
                        </Link>
                    )}
                </div>
                {(record.post.record.text) && (record.post.record.facets) ? <Facets text={record.post.record.text} facets={record.post.record.facets} /> : <Facets text={record.post.record.text} />}
                {(record.post.embed) && <Embed embed={record.post.embed} apiInterface={apiInterface} authorized={authorized} />}
                {(focused == true) && <p className={"Timestamp"}>{Time.format(record.post.record.createdAt)}</p>}
                <div className={"PostFooter"}>
                    <div className={"Metrics"}>
                        <MetricItem Icon={CommentIcon} onClick={replyToPost} fillColor="--metric-comment-primary" backgroundColor="--metric-comment-accent" metricData={record.post.replyCount} />
                        <MetricItem Icon={ArrowSwitchIcon} onClick={repostPost} fillColor="--metric-repost-primary" backgroundColor="--metric-repost-accent" metricData={record.post.repostCount} />
                        <MetricItem Icon={HeartIcon} onClick={likePost} fillColor="--metric-like-primary" backgroundColor="--metric-like-accent" metricData={record.post.likeCount} />
                    </div>
                    <div className={"Options"}>
                        <MetricItem Icon={KebabHorizontalIcon} onClick={() => happeningSoon(true)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

Post.defaultProps = {
    focused: false
};

export default Post;