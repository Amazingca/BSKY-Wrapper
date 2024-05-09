import {
    HeartFillIcon,
    ArrowSwitchIcon,
    PersonAddIcon,
    MentionIcon,
    ReplyIcon,
    CommentIcon
} from "@primer/octicons-react";
import { Link } from "@remix-run/react";

const Notification = ({record}) => {

    var SubjectIcon;
    var iconFillColor = "";
    var iconBackgroundColor = "";
    var subjectText = record.reason;

    if (subjectText == "like") {
        
        SubjectIcon = HeartFillIcon;
        iconFillColor = "--metric-like-primary";
        iconBackgroundColor = "--metric-like-accent";
        subjectText = "liked your post";
    } else if (subjectText == "repost") {
        
        SubjectIcon = ArrowSwitchIcon;
        iconFillColor = "--metric-repost-primary";
        iconBackgroundColor = "--metric-repost-accent";
        subjectText = "reposted your post";
    } else if (subjectText == "follow") {
        
        SubjectIcon = PersonAddIcon;
        iconFillColor = "--metric-repost-primary";
        iconBackgroundColor = "--metric-repost-accent";
        subjectText = "followed you";
    } else if (subjectText == "mention") {
        
        SubjectIcon = MentionIcon;
        iconFillColor = "--metric-comment-primary";
        iconBackgroundColor = "--metric-comment-accent";
        subjectText = "mentioned you";
    } else if (subjectText == "reply") {
        
        SubjectIcon = ReplyIcon;
        iconFillColor = "--metric-comment-primary";
        iconBackgroundColor = "--metric-comment-accent";
        subjectText = "replied to your post";
    } else if (subjectText == "quote") {
        
        SubjectIcon = CommentIcon;
        iconFillColor = "--metric-comment-primary";
        iconBackgroundColor = "--metric-comment-accent";
        subjectText = "quoted your post";
    }

    return (
        <div className={`Post${(record.isRead == false) ? " Unread" : ""}`}>
            <div className={"Subject"}>
                <div style={{backgroundColor: `var(${iconBackgroundColor})`}} className={"Icon"}>
                    <SubjectIcon size={"small"} fill={`var(${iconFillColor})`} />
                </div>
                <div>
                    <p><Link to={`/profile/${record.author.handle}`}>@{record.author.handle}</Link> {subjectText}</p>
                </div>
            </div>
        </div>
    )
}

export default Notification;