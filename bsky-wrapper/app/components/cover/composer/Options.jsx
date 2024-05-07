const Options = ({addMedia, postObj}) => {

    return (
        <div className={"Options"}>
            <input type="file" accept="image/*" onChange={(e) => addMedia(e)} multiple/>
        </div>
    )
}

export default Options;