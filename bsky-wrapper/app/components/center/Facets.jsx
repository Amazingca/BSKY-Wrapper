const Facets = ({text, facets}) => {

    var index = 0;

    return (
        <>
            {
                (false) ? 
                    <p>{facets.map(facet => <>{/* TODO */}</>)}</p> 
                :
                    text.split("\n").map(line => <p key={line + index++}>{line}</p>)
            }
        </>
    )
}

export default Facets;