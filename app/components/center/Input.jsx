import { PencilIcon } from "@primer/octicons-react";
import { useLocation, useNavigate } from "@remix-run/react";

const Input = ({name, type, prefill, lockedTo, setItem, value, reference}) => {

    const location = useLocation();
    const navigate = useNavigate();

    const goTo = () => {

        if (location.pathname != lockedTo) navigate(lockedTo);
    }

    return (
        <div>
            <div className={"InputName"}>
                {name}
            </div>
            <input type={type} placeholder={prefill} className={"InputEntry"} onChange={(e) => setItem(e.target.value)} disabled={(lockedTo) && "disabled"} value={(value) && value} ref={(reference) && reference} />
            {(lockedTo) && <div onClick={goTo} className={"InputPointer"}><PencilIcon size={"small"} fill={"var(--input-name)"} className={"InputPointerIcon"} /></div>}
        </div>
    )
}

export default Input;