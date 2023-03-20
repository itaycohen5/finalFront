import {useEffect, useState} from "react";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

function LoginPage () {

    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    const [password2 , setPassword2] = useState("");
    const [type , setType] = useState("login");
    const [errorCode , setErrorCode] = useState(0);
    const [offerAmount , setOfferAmount] = useState(1);
    const [userAmount , setUserAmount] = useState(1);
    const [productAmount , setProductAmount] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token");
        if (token == undefined) {
            axios.get("http://localhost:8989/get-all-users")
                .then((response) => {
                    const usersSize = response.data.users.length
                    setUserAmount(usersSize)
                })
            axios.get("http://localhost:8989/get-all-offers")
                .then((response) => {
                    const offersSize = response.data.offers.length
                    setOfferAmount(offersSize)
                })
            axios.get("http://localhost:8989/get-all-products")
                .then((response) => {
                    const productSize = response.data.product.length
                    setProductAmount(productSize)
                })
        }
    },[])

    const usernameChanged = (event) => {
        setUsername(event.target.value);
    }

    const passwordChanged = (event) => {
        setPassword(event.target.value);
    }

    const password2Changed = (event) => {
        setPassword2(event.target.value)
    }


    const typeChanged = (event) => {
        setType(event.target.value);
    }

    const submitAsAdmin = (event) => {
        if (type == "admin") {
            axios.get("http://localhost:8989/login-as-admin", {
                params: {username,password}}).then((response) => {
                if (response.data.success) {
                    setErrorCode(0)
                    Cookies.set("token",response.data.token)
                    navigate("../manage")
                } else {
                    setErrorCode(response.data.errorCode)
                }
            })
        }
    }

    const submit = (event) => {
        if (type == "admin") {
            axios.get("http://localhost:8989/login-as-admin", {
                params: {username,password}}).then((response) => {
                if (response.data.success) {
                    setErrorCode(0)
                    Cookies.set("token",response.data.token)
                    navigate("../manage")
                } else {
                    setErrorCode(response.data.errorCode)
                }
            })
        }
        if (type == "signUp") {
                axios.post("http://localhost:8989/sign-up" , null , {
                    params:{username , password}
                }).then((response) => {
                    if (response.data.success) {
                        setErrorCode(0)
                        alert("OK")
                        navigate("../login")
                    } else {
                        setErrorCode(response.data.errorCode);
                    }
                })
            } else {
                axios.get("http://localhost:8989/login", {
                    params: {username,password}}).then((response) => {
                    if (response.data.success) {
                        setErrorCode(0)
                        Cookies.set("token",response.data.token)
                        navigate("../dashboard")
                    } else {
                        setErrorCode(response.data.errorCode)
                    }
                })
            }
    }

    return (
        <div style={{margin:"25px"}}>

            <div>
                <div>User Amount In The System:{userAmount}</div>
                <div>Offers Amount In The System:{offerAmount}</div>
                <div>Products Amount In The System:{productAmount}</div>
            </div>

            <div>
                <span style={{marginRight: "5px"}}>
                    <input type={"radio"} name={"type"} value={"login"} checked={type == "login"} onChange={typeChanged}/> Login
                </span>
                <input type={"radio"} name={"type"} value={"signUp"} checked={type == "signUp"} onChange={typeChanged}/> Sign Up
                <input type={"radio"} name={"type"} value={"admin"} checked={type == "admin"} onChange={typeChanged}/> Login For Admin
            </div>

            <table>
                <tr>
                    <td>
                        Username:
                    </td>
                    <td>
                        <input type={"text"} value={username} onChange={usernameChanged}/>
                    </td>

                </tr>
                <tr>
                    <td>
                        Password:
                    </td>
                    <td>
                        <input type={"password"} value={password} onChange={passwordChanged}/>
                    </td>
                    <td>
                        {
                            type == "signUp" && password.length<6 && password.length>0 &&
                            <ErrorMessage message={"Password Too Weak"} lineBreak={"false"}/>
                        }
                    </td>
                </tr>
                {
                    type == "signUp" &&
                    <tr>
                        <td>
                            Repeat Password:
                        </td>
                        <td>
                            <input type={"password"} value={password2} onChange={password2Changed}/>
                        </td>
                        <td>
                            {
                                password != password2 &&
                                <ErrorMessage message={"Password Don't Match"} lineBreak={"true"}/>
                            }
                        </td>
                    </tr>
                }
            </table>

            {
                errorCode > 0 &&
                <ErrorMessage message={errorCode} lineBreak={true}/>
            }

            {(type == "signUp") || (type == "login") ?
                <button onClick={submit} disabled={
                    password.length < 6 ||
                    (type == "signUp" && password != password2) ||
                    username.length == 0
                }>{type == "signUp" ? "Sign Up" : "Login"}</button>
                :
                <button onClick={submitAsAdmin} disabled={password.length < 6}>Login As Admin</button>
            }

        </div>
    )
}

export default LoginPage;