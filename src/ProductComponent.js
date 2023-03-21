import { useEffect, useState } from "react";
import "./css/ProductComponent.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

function ProductComponent(props) {
    const [highestOffer, setHighestOffer] = useState(0.0);

    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get("http://localhost:8989/get-highest-offer?productId=" + props.data.id)
                .then((response) => {
                    const offerFound = response.data.offer;
                    const highestOfferFound = offerFound.offerAmount
                    setHighestOffer(highestOfferFound);
                    console.log(highestOffer);
                });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const ClickCom = () => {
        Cookies.set("productId",props.data.id)
        navigate("../inner-product"); // navigate to "/product-details" route
    };

        return (
            <div className="ProductComponent1" onClick={ClickCom} >
                <h1> {props.data.productName} By {props.data.publisherName}</h1>
                <img  className="productImg" src={props.data.productImg} alt="product"/>
                <h5> Descreption : {props.data.productDescription}</h5>
                <h3>The Current Offer Is: <div style={{color: "green"}}>{highestOffer}$ </div></h3>
                <h6>The minimum offer is: {props.data.startingPrice}</h6>
            </div>
        );

}
export default ProductComponent;