import {
    Link
} from "@remix-run/react";

const Post = ({record}) => {

    return (
        <div className={"Post"}>
            <div className={"Author"}>
                <img src={record.post.author.avatar} className={"Avatar"} />
                <div className={"Details"}>
                    <p className={"DisplayName"}>{record.post.author.displayName}</p>
                    <Link to={`/profile/${record.post.author.handle}`} className={"Handle"}>{record.post.author.handle}</Link>
                </div>
            </div>
            <p>{record.post.record.text}</p>
        </div>
    )
}

export default Post;