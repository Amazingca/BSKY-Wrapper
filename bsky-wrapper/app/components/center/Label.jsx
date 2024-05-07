import {
    ArrowSwitchIcon
} from "@primer/octicons-react";

const Label = ({label}) => {

    var backgroundColor = "--metric-accent";
    var textColor = "--metric-primary";
    var text = "";
    var Symbol = null;

    switch (label) {
        case "followedBy":
            text = "Follows you";
            break;
        case "following":
            text = "Following";
            break;
        case "mutuals":
            backgroundColor = "--metric-repost-accent";
            textColor = "--metric-repost-primary";
            text = "Mutuals";
            Symbol = ArrowSwitchIcon;
            break;
        case "system":
            backgroundColor = "--metric-comment-primary";
            textColor = "--background-primary";
            text = "Client";
            break;
    }

    return (
        <p style={{backgroundColor: `var(${backgroundColor})`, color: `var(${textColor})`}} className="Flag">
            {(Symbol) && <Symbol size={"small"} fill={`var(${textColor})`} />}
            {text}
        </p>
    )
}

export default Label;