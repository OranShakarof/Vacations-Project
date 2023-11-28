import HomeIcon from "@mui/icons-material/Home";
import { AppBar, Box, Toolbar, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Menu.css";

function Menu(): JSX.Element {
    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        setUser(authStore.getState().user);
        const unsubscribe = authStore.subscribe(() => setUser(authStore.getState().user));
        return unsubscribe;
    }, [])

    return (
        <div className="Menu">
            <Box sx={{ flexGrow: 1, }} className="Navbar">
                <AppBar position="static" sx={{ backgroundColor: 'transparent' }}>
                    <Toolbar sx={{ display: 'flex' }}>
                        <Typography variant="inherit" component="div" sx={{mr: 2}}>
                            <Tooltip title={"Home"}>
                                <NavLink to={"/home"} className={"NavLink"}>
                                    <HomeIcon/>
                                </NavLink>
                            </Tooltip>
                        </Typography>
                        {!user && 
                            <Typography variant="inherit" component="div" sx={{mr: 2 , fontFamily: "cursive", color: 'black'}}>
                                Hello, Guest
                            </Typography>
                        }
                        {user &&  
                            <Typography variant="inherit" component="div" sx={{mr: 2, fontFamily: "cursive", color: 'black'}}>
                                Hello, {user.firstName}
                            </Typography>
                        }
                        <div className="Right">
                            <AuthMenu/>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>


        </div>
    );
}

export default Menu;
