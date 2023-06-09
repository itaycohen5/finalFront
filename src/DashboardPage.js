import {useEffect, useState} from "react";
import axios from "axios";
import ProductComponent from "./ProductComponent";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import './css/DashBoard.css';


function DashboardPage() {

// eslint-disable-next-line react-hooks/rules-of-hooks
    const [Products, setProducts] = useState([]);
    const [token, setToken] = useState("");
    const [userName, setUsername] = useState("");

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
        }
    })

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get("http://localhost:8989/get-all-open-products").then((response) => {
                    const openProducts = response.data.product;
                    setProducts(openProducts)
                    console.log(openProducts)
                }
            );
        }, 1000);
        return () => clearInterval(interval);
    }, []);



    return (

        <div>
            <h1> Products For Sale: </h1>
            <div className="dashBoard1">
                {
                    Products.map((product) => {
                        return (
                            <div >
                                <ProductComponent  data={product}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}


export default DashboardPage;