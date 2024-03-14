import { Link } from "@remix-run/react";
import { Fragment } from "react";

const Facets = ({text, facets}) => {

    var index = 0;

    const facetNester = (facet, string, index=0) => {

        const innerContent = (index + 1 != facet.features.length) ? facetNester(facet, string, index + 1) : string;

        switch (facet.features[index].$type) {
            case "app.bsky.richtext.facet#mention":
                return (<Link to={`/profile/${facet.features[index].did}`}>{innerContent}</Link>);
            case "app.bsky.richtext.facet#link":
                return (<Link to={facet.features[index].uri}>{innerContent}</Link>);
            case "app.bsky.richtext.facet#tag":
                return (<Link to={`/hashtag/${innerContent.slice(1)}`}>{innerContent}</Link>);
            case "dev.amazingca.blue.facet#bolden":
                return (<b>{innerContent}</b>);
            case "dev.amazingca.blue.facet#italicize":
                return (<i>{innerContent}</i>);
            default:
                return string;
        }
    }
        
    var formattedText = [];

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const byteArray = encoder.encode(text);

    for (var i = 0; i < byteArray.length; i++) {

        var isFacet = false;
        var target;

        for (var o = 0; o < facets.length; o++) {

            if (facets[o].index.byteStart == i) {

                isFacet = true;
                target = o;
            }
        }

        if (isFacet == true) {

            var facetLength = facets[target].index.byteEnd - facets[target].index.byteStart;

            var facetedArray = new Uint8Array(facetLength);

            for (var o = 0; o < facetLength; o++) {

                facetedArray[o] = byteArray[i];
                //i++;
                if (o + 1 != facetLength) i++;
            }

            const facetElement = facetNester(facets[target], decoder.decode(facetedArray));

            formattedText.push({type: "facet", data: facetElement});
        } else {
            
            if ((formattedText.length == 0) || ((formattedText.length > 0 && (formattedText[formattedText.length - 1].type == "facet")))) formattedText.push({type: "string", data: new Uint8Array([byteArray[i]])});
            else formattedText[formattedText.length - 1].data = new Uint8Array([...formattedText[formattedText.length - 1].data, byteArray[i]]);
        }
    }

    for (var i = 0; i < formattedText.length; i++) {

        if (formattedText[i].type == "string") {

            const text = decoder.decode(formattedText[i].data);

            const lines = [...(text.match(/^\\n/g)) ? [""] : [], ...text.split("\n"), ...(text.match(/\\n$/g)) ? [""] : []];

            for (var o = 0; o < lines.length; o++) {

                if (lines.length - 1 == o) lines[o] = (<>{lines[o]}</>);
                else lines[o] = (<>{lines[o]}<br /></>);
            }

            formattedText[i].data = lines.map(line => <Fragment key={line + index++}>{line}</Fragment>);
        }
    }

    return (
        <p>
            {formattedText.map(section => <Fragment key={section + index++}>{section.data}</Fragment>)}
        </p>
    )
}

Facets.defaultProps = {
    facets: []
}

export default Facets;