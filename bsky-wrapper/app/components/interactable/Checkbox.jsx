import { XIcon, CheckIcon } from "@primer/octicons-react";

const Checkbox = ({checked, setChecked, setCheckedType, color, size}) => {

    return (
        <div onClick={() => setChecked((setCheckedType) ? setCheckedType : !checked)} style={(color) && {fill: color, stroke: color, border: `0.2rem solid ${color}`, backgroundColor: (checked) ? color : "unset"}} className={`Checkbox${(size == "small") ? " Small" : ""}` + ((checked) ? " checked" : " unChecked")}>
            <div className={"notChecked"}><XIcon size={16} fill={(color) ? color : "inherit"} /></div>
            <div className={"isChecked"}><CheckIcon size={16} fill={(color) ? color : "inherit"} /></div>
        </div>
    )
}

Checkbox.defaultProps = {
    size: "normal"
}

export default Checkbox;