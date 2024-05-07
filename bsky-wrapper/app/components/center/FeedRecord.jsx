import { Link } from "@remix-run/react";

const FeedRecord = ({record}) => {

    return (
        <div className={"FeedRecord"}>
            <div className={"Headers"}>
                <div>
                    <img src={record.avatar} draggable="false" className={"Avatar"} />
                </div>
                <div>
                    <p>{record.displayName}</p>
                    <Link to={`/profile/${record.creator.handle}`}>
                        <img src={record.creator.avatar} draggable="false" className={"Creator"} />
                        <p>{record.creator.handle}</p>
                    </Link>
                </div>
            </div>
            {(record.description) && <p>{record.description}</p>}
            {(record.likeCount > 0) && (
                <div className={"Metrics"}>
                    {(record.likeCount > 0) && (
                        <div>
                            <p>{record.likeCount}</p>
                            <p className={"Accent"}>Like{(record.likeCount > 1) && "s"}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default FeedRecord;