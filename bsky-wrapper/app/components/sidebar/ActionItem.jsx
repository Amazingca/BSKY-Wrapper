import ActionIcon from "./ActionIcon";

const ActionItem = ({description, intent, Icon, mainColor, backgroundColor, status, hover}) => {

    return (
        <div onClick={intent} className={"ActionItem"}>
            <ActionIcon Icon={Icon} mainColor={mainColor} backgroundColor={backgroundColor} status={status} hover={hover} />
            <h2>{description}</h2>
        </div>
    )
}

export default ActionItem;