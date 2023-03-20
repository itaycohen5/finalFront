import React, {useState,useEffect} from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
import Cookies from "js-cookie";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Index = () => {
    const [isLogged , setIsLogged] = useState(false);
    const navigate = useNavigate();
    const token = Cookies.get("token");

    useEffect(() => {
        token !== undefined && setIsLogged(true)
    });


    const logOut=()=>{
        Cookies.remove("token")
        setIsLogged(false)
        navigate("../login")
    }

    const logIn=()=>{
        isLogged &&
        Cookies.set("token",token)
        navigate("../login")
    }


    return (
        <div className='navbar'>

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
                        isLogged?
                            <Button onClick={logOut}>Logout</Button>
                            :
                            <Button onClick={logIn}>Login</Button>

                    }

                </NavMenu>
            </Nav>
        </div>
    );
};

export default Index;




