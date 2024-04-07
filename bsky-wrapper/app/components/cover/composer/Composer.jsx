import { useState } from "react";
import { useNavigate} from "@remix-run/react";
import TextField from "./TextField";
import Checkbox from "../../interactable/Checkbox";
import Options from "./Options";

const Composer = ({apiInterface, display, postObj}) => {

    const [threadgate, setThreadgate] = useState(true);
    const [mediaSexual, setMediaSexual] = useState(false);
    const [mediaPorn, setMediaPorn] = useState(false);
    const [hasMedia, setHasMedia] = useState(false);

    const navigate = useNavigate();

    const doPost = async () => {

        console.log(postObj);

        const recordRef = await apiInterface.newRecord(postObj);

        if (recordRef) {

            display(false);
            navigate(`/profile/${recordRef[0].uri.split("/")[2]}/post/${recordRef[0].uri.split("/")[4]}`);
        }
    }

    const addMedia = async (e) => {

        for (const file of e.currentTarget.files) {

            apiInterface.uploadBlob(file, (media) => postObj.addEmbedData(media));
        }

        setHasMedia(true);
        postObj.setEmbedType("app.bsky.embed.images");
    }

    const changeThreadgate = (blockAll) => {

        setThreadgate(blockAll);
        if (!blockAll) postObj.setThreadgate(["app.bsky.feed.threadgate#allRules"]);
        else postObj.setThreadgate([]);
    }

    const changeSexualMediaFlag = (value) => {

        setMediaSexual(value);

        var currLabels = postObj.getLabels().filter(label => label != "sexual");

        if (value) currLabels.push("sexual");

        postObj.setLabels(currLabels);
    }

    const changePornMediaFlag = (value) => {

        setMediaPorn(value);

        var currLabels = postObj.getLabels().filter(label => label != "porn");

        if (value) currLabels.push("porn");

        postObj.setLabels(currLabels);
    }

    return (
        <div className={"Composer"}>
            <TextField postObj={postObj} />
            <Options addMedia={addMedia} postObj={postObj} />
            {(postObj.getReply() == null) && <div style={{display: "flex", alignItems: "center", gap: "0.5rem"}}>
                <Checkbox checked={threadgate} setChecked={changeThreadgate} size={"small"} />
                <p>Allow replies</p>
            </div>}
            {(hasMedia) && (
                <>
                    <p>Flag media as:</p>
                    <div style={{display: "flex", alignItems: "center", gap: "0.5rem"}}>
                        <Checkbox checked={mediaSexual} setChecked={changeSexualMediaFlag} size={"small"} />
                        <p>Sexual</p>
                    </div>
                    <div style={{display: "flex", alignItems: "center", gap: "0.5rem"}}>
                        <Checkbox checked={mediaPorn} setChecked={changePornMediaFlag} size={"small"} />
                        <p>Pornographic</p>
                    </div>
                </>
            )}
            <button onClick={() => doPost()}>Post</button>
        </div>
    )
}

export default Composer;