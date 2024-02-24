import { Link } from "@remix-run/react";
import Facets from "./Facets";
import Embed from "./Embed";
import Time from "../../infra/Time";

const InlinePost = ({record}) => {

    return (
        <div className={"InlinePost"}>
            <div className={"InlineNest"}>
                <div className={"InlineHeader"}>
                    <div className={"InlineAuthor"}>
                        {(record.author.avatar) && <img src={record.author.avatar} />}
                        <div className={"Titlers"}>
                            {(record.author.displayName) && <p>{record.author.displayName}</p>}
                            <Link to={`/profile/${record.author.handle}`}>{record.author.handle}</Link>
                        </div>
                    </div>
                    <Link to={`/profile/${record.author.handle}/post/${record.uri.split("/").pop()}`} title={new Date(record.value.createdAt).toUTCString()} className={"Timestamp"}>
                        {Time.relative(record.value.createdAt)}
                    </Link>
                </div>
                {(record.value.text) && (record.value.facets) ? <Facets text={record.value.text} facets={record.value.facets} /> : <Facets text={record.value.text} />}
            </div>
            {(record.embeds && record.embeds.length > 0 && record.embeds[0].$type != "app.bsky.embed.record#view") && <Embed embed={record.embeds[0]} />}
        </div>
    )
}

export default InlinePost;