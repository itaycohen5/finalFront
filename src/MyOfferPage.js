import {useEffect, useState} from "react";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

function MyProductPage() {

    const [username , setUsername] = useState("");
    const [userBalance , setUserBalance] = useState("");
    const [errorCode , setErrorCode] = useState(0);
    const [myOffers , setMyOffers] = useState([]);
    const [token , setToken] = useState("");
    const [highestOffer , setHighestOffer] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token");
        if (token == undefined) {
            navigate("../login")
        } else {
            setToken(token);
            axios.get("http://localhost:8989/get-username?token=" + token)
                .then((response) => {
                    setUsername(response.data.username);
                    setUserBalance(response.data.credits)
                })
            axios.get("http://localhost:8989/my-offers?token=" + token)
                .then((response) => {
                    setMyOffers(response.data.offers)
                })

        }
    },[])

    const isWinning = (offer) => {
        setInterval(() => {
            axios.get("http://localhost:8989/get-highest-offer?productId=" + offer.product.id)
                .then((response) => {
                    setHighestOffer(response.data.offer)
                    if (offer.offerAmount == highestOffer) {
                        return true;
                    } else {
                        return false
                    }
                })
        }, 1000);
    }


    return (
        <div>
            <div>
                <h3>Hello , {username}</h3>
                <h3>Your Balance: {userBalance}</h3>
            </div>

            <table>
                <thead>
                <tr>
                    <th style={{border: "1px solid black"}} >Product Name</th>
                    <th style={{border: "1px solid black"}} >Offer Amount</th>
                    <th style={{border: "1px solid black"}} >Status</th>
                    <th style={{border: "1px solid black"}} >Winning Offer</th>
                </tr>
                </thead>
                <tbody>
                {
                    myOffers.map((offer) => {
                        return(
                            <tr>
                                <td>{offer.product.productName}</td>
                                <td>{offer.offerAmount}</td>
                                <td>{offer.product.open?"Available":"NotAvailable"}</td>
                                <td>{isWinning(offer)? "Yes" : "No"}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>


        </div>
    )
}

export default MyProductPage;