const Embed = ({embed}) => {

    const imageItemPointer = (count, index) => {

        switch (count) {
            case 1:
                return "1 / 1 / 1 / 1";
            case 2:
                switch (index) {
                    case 0:
                        return "1 / 1 / 1 / 1";
                    case 1:
                        return "1 / 2 / 1 / 2";
                }
            case 3:
                switch (index) {
                    case 0:
                        return "1 / 1 / 3 / 3";
                    case 1:
                        return "2 / 3 / 1 / 3";
                    case 2:
                        return "2 / 3 / 2 / 3";
                }
            case 4:
                switch (index) {
                    case 0:
                        return "1 / 1 / 1 / 1";
                    case 1:
                        return "2 / 1 / 2 / 1";
                    case 2:
                        return "1 / 2 / 1 / 2";
                    case 3:
                        return "2 / 2 / 2 / 2";
                }
        }
    }

    return (
        <>
            {(embed.$type == "app.bsky.embed.images#view") && (
                <div className={"ImageGrid"}>
                    {embed.images.map(image => (
                        <div style={{
                            gridArea: imageItemPointer(embed.images.length, embed.images.indexOf(image)),
                            aspectRatio: (embed.images.length == 1) ? "unset" : "1 / 1"
                        }} className={"ImageGridItem"} key={image.thumb}>
                            <img src={image.thumb} title={image.alt} onClick={() => window.open(image.fullsize)} />
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default Embed;