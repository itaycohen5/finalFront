import React, {useState, useEffect} from 'react';
import axios from "axios";
import Cookies from "js-cookie";


function InnerProduct() {
    const [product, setProduct] = useState({});
    const [publisher, setPublisher] = useState({});
    const [highestOffer, setHighestOffer] = useState(0.0);
    const [closedSale, setClosedSale] = useState(false);
    const [errorCode, setErrorCode] = useState(0);

    const productId = Cookies.get("productId");
    const token = Cookies.get("token");

    useEffect(() => {
        axios.get("http://localhost:8989/get-product?productId=" + productId)
            .then((response) => {
                const productThatFound = response.data.product;
                setProduct(productThatFound);
                setPublisher(productThatFound.publisher)

            });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get("http://localhost:8989/get-highest-offer?productId=" + productId)
                .then((response) => {
                    const highestOfferFound = response.data.offer.offerAmount;
                    setHighestOffer(highestOfferFound);
                    console.log(highestOffer);
                });
        }, 1000);
        return () => clearInterval(interval);
    }, []);


    const closeSale = () => {
        axios.post("http://localhost:8989/close-product?token="+token+"&productId="+productId).then((response) => {
            if (response.data.success) {
                setClosedSale(true)
                console.log(closedSale)
            } else {
                const newErrorCode = response.data.errorCode;
                setErrorCode(newErrorCode)
                console.log(newErrorCode)
            }
        })
    }

    return (
        <div style={{textAlign: "center"}}>
            {
                closedSale ? (
                    <div>
                        The Sale closed succesfuly!
                        Your Credit will Shortly Arrived!
                    </div>
                ) : (
                    <div>
                        <h1>{product.productName}</h1>
                        <img src={product.productImg} alt="product"/>
                        <h2>{publisher.username}</h2>
                        <h1>The Current Offer Is: <div style={{color: "green"}}>{highestOffer}$ </div></h1>

                        <div>
                            {
                                token === publisher.token ? (<button onClick={closeSale}>Close Sale</button>) : (
                                    <button>Give An Offer</button>)
                            }
                        </div>
                        <div>
                            {errorCode === 1014 && <h1> There is no 3 offers on this Sale</h1>}
                        </div>
                    </div>

                )


            }
        </div>
    )
}

export default InnerProduct;