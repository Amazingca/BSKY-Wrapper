import { ArrowRightIcon } from "@primer/octicons-react";

const Header = ({title, subroute, side, options={}}) => {

    return (
        <div className={"Header"}>
            <div>
                <h1>{title}</h1>
                {(subroute) && (
                    <>
                        <ArrowRightIcon size="small" fill="var(--header-primary)"/>
                        <h1 className={"Accent"}>{subroute}</h1>
                    </>
                )}
            </div>
            {(side) && (side)}
        </div>
    )
}

export default Header;