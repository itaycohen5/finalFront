function Message (props) {
    return(
        <div style={
            {
                margin: "20px" ,
                borderBottom: "1px solid grey",
                textAlign: props.data.sentByMe ? "right" : "left"}
        }>
            <div>
                <span style={{marginRight: "10px"}}>{props.data.senderUsername}</span>
                <span>{props.data.sendDate}</span>
            </div>
            <div>
                {
                    props.data.content
                }
            </div>
        </div>
    )
}

export default Message;