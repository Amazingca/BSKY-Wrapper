const TextField = ({postObj}) => {

    return (
        <div className={"TextField"}>
            <textarea placeholder={"Your post goes here..."} maxLength={"300"} style={{width: "-webkit-fill-available", fontFamily: "Mona Sans", fontSize: "0.85rem"}} onChange={(e) => postObj.setText(e.currentTarget.value)}/>
        </div>
    )
}

export default TextField;