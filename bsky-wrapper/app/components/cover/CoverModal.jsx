import { XCircleFillIcon } from "@primer/octicons-react";
import Post from "../../infra/Post.mjs";

const CoverModal = ({title, InnerModal, apiInterface, authorized, operatingSystem, display, to}) => {

    return (
        <div className={"CoverModal"}>
            <div className={"Heading"}>
                <h2>{title}</h2>
                <div onClick={() => display(false)}>
                    <XCircleFillIcon size={16} fill={"var(--header-primary)"} />
                </div>
                
            </div>
            <InnerModal apiInterface={apiInterface} display={display} authorized={authorized} operatingSystem={operatingSystem} postObj={(to) ? new Post({reply: to}) : new Post()} />
        </div>
    )
}

export default CoverModal;