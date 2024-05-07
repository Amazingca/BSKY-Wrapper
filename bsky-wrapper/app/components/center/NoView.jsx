import { AlertFillIcon } from "@primer/octicons-react";

const NoView = ({message}) => {

    return (
        <div className={"Post NoView"}>
            <div>
                <AlertFillIcon size={"15.99"} fill={"var(--context-primary)"} />
            </div>
            <p>{message}</p>
        </div>
    )
}

NoView.defaultProps = {
    message: "This record is not available"
}

export default NoView;