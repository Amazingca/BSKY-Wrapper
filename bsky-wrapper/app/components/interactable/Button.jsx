import { CalendarIcon, PlusIcon } from "@primer/octicons-react";
import { useState } from "react";

const Button = ({text, clicker, conditional, conditionalData}) => {

    var [conditionalValue, setConditionalValue] = useState("");

    const updateValue = (e) => {

        setConditionalValue(e.target.value);
    }

    var ConditionalComponent = null;

    switch (conditional) {
        case "datetime":
            ConditionalComponent = (<input type="datetime-local" value={conditionalValue} onChange={updateValue} max={(conditionalData.max) ? conditionalData.max : ""}></input>)
            break;
        case "add":
            ConditionalComponent = (<PlusIcon size="16" fill="var(--header-primary)" />);
            break;
    }

    const performClick = () => {

        if (conditional != "default") clicker(conditionalValue);
        else clicker();
    }
    
    return (
        <div onClick={performClick} className={"Button"}>
            <h3>{text}</h3>
            {(ConditionalComponent) && ConditionalComponent}
        </div>
    )
}

Button.defaultProps = {
    conditional: "default"
}

export default Button;