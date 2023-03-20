import React, {useState, useEffect} from "react";
import {Nav, NavLink, NavMenu} from "./NavbarElements";
import Cookies from "js-cookie";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import UserInfo from "../UserInfo";
import axios from "axios";
import '../App.css'

const Index = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const token = Cookies.get("token");

    useEffect(() => {
        token !== undefined && setIsLogged(true)
        axios.get("http://localhost:8989/get-user-by-token?token=" + token)
            .then((response) => {
                setUser(response.data.user);
            })
    });


    const logOut = () => {
        Cookies.remove("token")
        setIsLogged(false)
        navigate("../login")
    }

    const logIn = () => {
        isLogged &&
        Cookies.set("token", token)
        navigate("../login")
    }

    const newSale = () => {
        navigate("../upload-sale")
    }


    return (
        <div className='navbar'>
            <div className="userInfo">
                {isLogged&& <UserInfo data={user} /> }

            </div>
                <Nav>
                <NavMenu>

                    <h5>Bid It</h5>
                    <NavLink to="/dashboard" activeStyle>
                        Dashboard
                    </NavLink>
                    <NavLink to="/my-offer" activeStyle>
                        My Offers
                    </NavLink>
                    <NavLink to="/my-product" activeStyle>
                        My-Products
                    </NavLink>
                    {
                        isLogged ? (
                                <div>
                                    <Button onClick={logOut}>Logout</Button>
                                    <Button onClick={newSale}> New Sale </Button>
                                </div>
                            ) :
                            <Button onClick={logIn}>Login</Button>

                    }

                </NavMenu>
            </Nav>
        </div>
    );
};

export default Index;




