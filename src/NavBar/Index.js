import React, {useState} from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
import Cookies from "js-cookie";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Index = () => {
    const [isLogged , setIsLogged] = useState(false);
    const navigate = useNavigate();

    const Logout = () => {
        if (isLogged) {

        }
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
                            <Button onClick={()=>{
                                Cookies.remove("token")
                                navigate("../login")
                            }}>Logout</Button>
                            :
                            <Button onClick={()=>{
                                Cookies.remove("token")
                                navigate("../login")
                            }}>Login</Button>

                    }

                </NavMenu>
            </Nav>
        </div>
    );
};

export default Index;