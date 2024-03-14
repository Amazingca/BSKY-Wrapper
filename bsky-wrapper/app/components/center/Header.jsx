import { ArrowRightIcon } from "@primer/octicons-react";

const Header = ({title, subroute, options={}}) => {

    return (
        <div className={"Header"}>
            <h1>{title}</h1>
            {(subroute) && (
                <>
                    <ArrowRightIcon size="small" fill="var(--header-primary)"/>
                    <h1 className={"Accent"}>{subroute}</h1>
                </>
            )}
        </div>
    )
}

export default Header;