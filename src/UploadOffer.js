import React, { useState } from 'react';
import axios from 'axios';

function UploadOffer() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [pictureLink, setPictureLink] = useState('');
    const [minimumPrice, setMinimumPrice] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            name: name,
            description: description,
            pictureLink: pictureLink,
            minimumPrice: minimumPrice
        };
        axios.post('/api/products', data)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                Make a new Offer:
                <br/>-------------------
            </div>
            <label>
                Name:
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label> <br/>
            <label>
                Description:
                <textarea value={description} onChange={e => setDescription(e.target.value)} />
            </label><br/>
            <label>
                Picture Link:
                <input type="text" value={pictureLink} onChange={e => setPictureLink(e.target.value)} />
            </label><br/>
            <label>
                Minimum Price:
                <input type="text" value={minimumPrice} onChange={e => setMinimumPrice(e.target.value)} />
            </label><br/>
            <button type="submit">Upload Product</button>
        </form>
    );
}

export default UploadOffer;


/** NEED TO ADD IN APP.CSS
 * form {
 *   float: right;
 *   padding: 10px;
 *   width: 30%;
 *   background-color: peachpuff;
 *   height: 270px; /* only for demonstration, should be removed }  */

 
