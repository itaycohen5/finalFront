import React, {useState} from 'react';
import "./MakeAnOffer.css"
import axios from "axios";
import jsCookie from "js-cookie";
import ErrorMessage from "./ErrorMessage";

function MakeAnOffer() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [pictureLink, setPictureLink] = useState("");
    const [minimumPrice, setMinimumPrice] = useState('');
    const [postSale, setPostSale] = useState(false);
    const [errorCode, setErrorCode] = useState(0);

    const token = Cookies.get("token");

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8989/post-product?token='+token + '&productName=' + name + '&productDescription=' + description + '&startingPrice=' + minimumPrice + '&productImg=' + pictureLink)
            .then(response => {
                if (response.data.success) {
                    setPostSale(true)
                } else setErrorCode(response.data.errorCode)
            });
    };

    const handlePriceChange = (event) => {
        setMinimumPrice(event.target.value);
    };

    return (
        <div>

            {
                postSale ? (<h1>Your Product Posted Successfully! </h1>) : (
                    <div style={{ display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    paddingTop : 10 }}>

                        <main id="main" className="container">
                            <div className="row">
                                <div className="col-xs-12 col-lg-offset-3 col-lg-6">

                                    <div className="m-b-md text-center">
                                        <h1 id="title">Make a new offer</h1>
                                    </div>

                                    <form onSubmit={handleSubmit} method="GET" action="" id="survey-form" name="survey-form">
                                        <fieldset>
                                            <label htmlFor="name" id="name-label">
                                                Name *
                                                <input className="" type="text" value={name}
                                                       onChange={e => setName(e.target.value)} id="name" name="name"
                                                       placeholder="Enter your name (required)" required/>
                                            </label>
                                        </fieldset>
                                        <fieldset>
                                            <label htmlFor="description" id="description-label">
                                                Description *

                                                <textarea className="" type="description"
                                                          id="survey-form-suggestions" name="description"
                                                          onChange={e => setDescription(e.target.value)}
                                                          placeholder="Enter your product description (required)"
                                                          maxLength="194"></textarea>
                                            </label>
                                        </fieldset>
                                        <fieldset>
                                            <label htmlFor="image" id="image-label">
                                                Image link *
                                                <input className="" type="text" value={pictureLink}
                                                       onChange={e =>setPictureLink(e.target.value)}
                                                       id="number" name="number" min="8" max="112"
                                                       placeholder="Enter you age (required)" required/>
                                            </label>
                                        </fieldset>
                                        <fieldset>
                                            <label htmlFor="number" id="number-label">
                                                Starting Price *
                                                <input className="" type="number" id="number" name="number" min="8"
                                                       max="999999"
                                                       value={minimumPrice}
                                                       onChange={e  => setMinimumPrice(e.target.value)}
                                                       placeholder="Enter you age (required)" required/>
                                            </label>
                                        </fieldset>
                                        <button id="submit" type="submit" className="btn">Submit the form</button>

                                        <div>
                                            {
                                                errorCode > 0 &&
                                                <ErrorMessage message={errorCode} lineBreak={true}/>
                                            }
                                        </div>
                                    </form>
                                    <div className="copyright m-t-sm">
                                        <div>By Bid it since 2023<i className="glyphicon glyphicon-heart"></i></div>
                                    </div>
                                </div>
                            </div>
                        </main>


                    </div>)

            }

        </div>
    );
}
export default MakeAnOffer;
