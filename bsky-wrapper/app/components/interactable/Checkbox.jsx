import { XIcon, CheckIcon } from "@primer/octicons-react";

const Checkbox = ({checked, setChecked}) => {

    return (
        <div onClick={() => setChecked(!checked)} className={"Checkbox" + ((checked) ? " checked" : " unChecked")}>
            <div className={"notChecked"}><XIcon size={16} /></div>
            <div className={"isChecked"}><CheckIcon size={16} /></div>
        </div>
    )
}

export default Checkbox;