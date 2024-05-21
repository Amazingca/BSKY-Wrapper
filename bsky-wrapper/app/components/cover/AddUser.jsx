import { useState } from "react";
import ProfileItem from "../center/ProfileItem";

const AddUser = ({apiInterface, data: [CanInitiateDM, CallbackAdd]}) => {

    const [userResults, setUserResults] = useState({actors: []});

    const queryUsers = async (query) => {

        const results = await apiInterface.queryActorsTypeahead({actor: query});

        if (results) setUserResults(results);
    }

    return (
        <div style={{display: "flex", flexDirection: "column", gap: "0.5rem", userSelect: "none", WebkitUserSelect: "none"}}>
            <input onChange={(e) => (e.currentTarget.value.length > 0) ? queryUsers(e.currentTarget.value) : setUserResults({actors: []})} type="text"></input>
            {(userResults.actors.length > 0) && userResults.actors.map(actor => (
                <div onClick={() => ((actor.associated?.chat) ? CanInitiateDM(actor) : false) ? CallbackAdd(actor) : ""} style={{cursor: ((actor.associated?.chat) ? !CanInitiateDM(actor) : true) ? "not-allowed" : "pointer"}} key={actor.did}>
                    <ProfileItem actor={actor} faded={(actor.associated?.chat) ? !CanInitiateDM(actor) : true} />
                </div>
            ))}
        </div>
    )
}

export default AddUser;