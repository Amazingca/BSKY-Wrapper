import { XIcon, CheckIcon } from "@primer/octicons-react";

const Checkbox = ({checked, setChecked, setCheckedType, size}) => {

    return (
        <div onClick={() => setChecked((setCheckedType) ? setCheckedType : !checked)} className={`Checkbox${(size == "small") ? " Small" : ""}` + ((checked) ? " checked" : " unChecked")}>
            <div className={"notChecked"}><XIcon size={16} /></div>
            <div className={"isChecked"}><CheckIcon size={16} /></div>
        </div>
    )
}

Checkbox.defaultProps = {
    size: "normal"
}

export default Checkbox;