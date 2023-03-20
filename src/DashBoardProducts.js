import ProductComponent from "./ProductComponent";
import axios from "axios";
import {useEffect,useState} from "react";

// eslint-disable-next-line react-hooks/rules-of-hooks
const [Products, setProducts] = useState([]);

function DashboardProducts() {

    useEffect(() => {
            axios.get("http://localhost:8989/get-all-open-products").then((response) => {
                    const openProducts = response.data.product;
                    setProducts(openProducts)
                    console.log(openProducts)
                }
            );
        },
    );

    return (
        <div>
            {
                Products.map((product) => {
                    return (
                        <div>
                            <ProductComponent data={product}/>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DashboardProducts;