import { AlertFillIcon } from "@primer/octicons-react";

const NoView = () => {

    return (
        <div className={"Post NoView"}>
            <div>
                <AlertFillIcon size={"15.99"} fill={"var(--context-primary)"} />
            </div>
            <p>This record is not available</p>
        </div>
    )
}

export default NoView;