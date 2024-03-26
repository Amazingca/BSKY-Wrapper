import { XCircleFillIcon } from "@primer/octicons-react";

const CoverModal = ({title, InnerModal, authorized, operatingSystem, display}) => {

    return (
        <div className={"CoverModal"}>
            <div className={"Heading"}>
                <h2>{title}</h2>
                <div onClick={() => display(false)}>
                    <XCircleFillIcon size={16} fill={"var(--header-primary)"} />
                </div>
                
            </div>
            <InnerModal authorized={authorized} operatingSystem={operatingSystem} />
        </div>
    )
}

export default CoverModal;