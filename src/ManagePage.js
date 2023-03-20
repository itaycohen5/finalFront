import {useEffect,useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";


function ManagePage () {

    const [users , setUsers] = useState([]);
    const [errorCode , setErrorCode] = useState([]);
    const [openProducts , setOpenProducts] = useState([]);
    const [profitAmount , setProfitAmount] = useState(0);
    const [productAmount , setProductAmount] = useState(-1);
    const [username , setUsername] = useState({});
    const [creditToAdd ,setCreditToAdd] = useState(0);
    const [isUserClicked ,setIsUserClicked] = useState(0);
    const [isProductClicked ,setIsProductClicked] = useState(0);
    const [currentUser ,setCurrentUser] = useState({});
    const [currentProduct ,setCurrentProduct] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token");
        if (token == undefined) {
            navigate("../login");
        }
        axios.get("http://localhost:8989/get-user-by-token?token=" + token)
            .then((response) => {
                setUsername(response.data.user.username);
                setProfitAmount(response.data.user.credits);
            })
        axios.get("http://localhost:8989/get-all-users")
            .then((response) => {
                if (response.data.success) {
                    const usersList = response.data.users;
                    setUsers(usersList)
                }
            })
        axios.get("http://localhost:8989/get-all-open-products")
            .then((response) => {
                if (response.data.success) {
                    const openProducts = response.data.product
                    setOpenProducts(openProducts)
                }
            })
    },[])

    const creditToAddChanged = (event) => {
        setCreditToAdd(event.target.value)
    }

    const addCredits = (credits) => {
        const token = Cookies.get("token")
        axios.get("http://localhost:8989/add-credit-to-user", {
            params: {token,credits}}).then((response) => {
            if (response.data.success) {
                setErrorCode(0)
            } else {
                setErrorCode(response.data.errorCode)
            }
        })
    }

    // const goToProduct = (productId) => {
    //     Cookies.set("productId",productId)
    //     navigate("../product")
    // }

    const handleUserClick =(user) => {
        setCurrentUser(user);
        setIsUserClicked(true)
        if (!isUserClicked) {
            axios.get("http://localhost:8989/get-all-open-products-by-id?userId=" + currentUser.id)
                .then((response) => {
                    if (response.data.success) {
                        const allUserProducts = response.data.productsAmount
                        setProductAmount(allUserProducts);
                    }
                })
        } else {
            setIsUserClicked(false)
        }
    }
    const handleProductClick =(product) => {
        setCurrentProduct(product);
        setIsProductClicked(true)
        if (isProductClicked) {
            axios.get("http://localhost:8989/get-product-by-id?productId=" + product.id)
                .then((response) => {
                    if (response.data.success) {
                        Cookies.set("productId",product.id)
                        navigate("../product")
                    }
                })
        } else {
            setIsProductClicked(false)
        }
    }

    return (
        <div>
            {/*<div>*/}
            {/*    <div>Hello , {username}</div>*/}
            {/*    <div>System Credits Profit:  {profitAmount}</div>*/}
            {/*</div>*/}
            <table>
                <h2>System's users: {users.length} </h2>
                <ul>
                    {users.map((user) => (
                        <li style={{color : "blue"}} key={user.id} onClick={() => handleUserClick(user)}>
                            <button>{user.username}</button>
                        </li>
                    ))}
                </ul>
                {   (isUserClicked && productAmount != -1)  && (

                    currentUser && (
                        <div>
                            <p>UserName: {currentUser.username}<    /p>
                            <p>Credits : {currentUser.credits}</p>
                            <p>Open auctions : {productAmount}</p>
                        </div>
                    )
                )}
            </table>

            <div>
                <h2>System's Open Products: {openProducts.length} </h2>
                <ul>
                    {openProducts.map((product) => (
                        <li style={{color : "blue"}} key={product.id} onClick={() => handleProductClick(product)}>
                            <button>{product.productName}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    )

}

export default ManagePage;




