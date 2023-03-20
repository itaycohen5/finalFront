import Cookies from "js-cookie";
import {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Message from "./Message";
import message from "./Message";

function DashboardPage () {

    const [username , setUsername] = useState("");
    const [recipients , setRecipients] = useState([]);
    const [token , setToken] = useState("");
    const [conversation , setConversation] = useState([]);
    const [newMessage , setNewMessage] = useState("");
    const [recipientId , setRecipientId] = useState(0);
    const [currentRecipient , setCurrentRecipient] = useState("");
    const [typing , setTyping] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token");
        if (token == undefined) {
            navigate("../login");
        } else {
            setToken(token);
            axios.get("http://localhost:8989/get-username?token=" + token)
                .then((response) => {
                    setUsername(response.data.username);
                })

            axios.get("http://localhost:8989/get-recipients?token=" + token)
                .then((response) => {
                    setRecipients(response.data.recipients);
                })
        }
    },[])

    const logout = () => {
        Cookies.remove("token");
        navigate("../login");
    }

    const showConversation = (recipient) => {
        setRecipientId(recipient.id);
        setCurrentRecipient(recipient.username);
        axios.get("http://localhost:8989/get-conversation?token=" + token + "&recipientId=" + recipient.id )
            .then((response) => {
                setConversation(response.data.messageModelList)})
        const sse = EventSource("http://localhost:8989/sse-handler?token=" + token + "&recipientId=" + recipient.id);
        sse.onmessage = (message) => {
            const data = message.data;
            if (data == "1") {
                setTyping(true)
                setTimeout(() => {
                    setTyping(false)
                },1000)
            } else {
                const newMessage = JSON.parse(message.data);
                setConversation((prevConversation) => {
                    const newConversation = prevConversation.slice();
                    newConversation.push(newMessage);
                    return newConversation;
                })
            }
        }
    }


    return (
        <div>
            <div id={"header"}>
                this is the header
                Hello {username}
                <button onClick={logout}>Logout</button>
            </div>
            <div id={"page"}>
                <div id={"sideBar"}>
                    {
                        recipients.map((item) => {
                            return(
                                <div style={{marginBottom: "10px"}}>
                                    <button onClick={() => showConversation(item)}>
                                        {item.username}
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
                <div id={"content"}>
                    {
                        conversation.map(message => {
                            return(
                                <Message data={message}/>
                            )
                        })
                    }
                    <div>
                        {
                            recipientId > 0 &&
                            <div>
                                <div>
                                    <span>{currentRecipient}</span>
                                    {
                                        typing &&
                                        <span> is typing...</span>
                                    }
                                </div>
                                <input value={newMessage} onChange={newMessageChanged}/>

                                <button onClick={send} disabled={newMessage == ""}>SEND</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage;