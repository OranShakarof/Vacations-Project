import AddIcon from '@mui/icons-material/Add';
import BarChartIcon from '@mui/icons-material/BarChart';
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';
import { Button, Toolbar, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./AuthMenu.css";
import { vacationsStore } from '../../../Redux/VacationsState';

function AuthMenu(): JSX.Element {
    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        setUser(authStore.getState().user);
        const unsubscribe = authStore.subscribe(() => setUser(authStore.getState().user));
        return unsubscribe;
    }, []);

    function logoutMe(): void{
        authService.logout();
        vacationsStore.getState().vacations = [];
        notifyService.success("Bye Bye...");
    }
    return (
        <div className="AuthMenu">
			{!user && 
                <Toolbar sx={{ display: 'flex' }}>
                    <Typography variant="inherit" component="div" sx={{ ml: 'auto'}}>
                        <Button sx={{textTransform: 'none'}}>
                            <NavLink to={"/login"} className={"NavLink"}>
                                Login
                            </NavLink>
                        </Button>
                    </Typography>
                </Toolbar>
            }

            {user && user.role === 1 && 
                <Toolbar sx={{ display: 'flex' }}>
                    <Typography variant="inherit" component="div" sx={{ ml: 'auto'}}>
                        <Tooltip title={"Vacations"}>
                            <NavLink to="/vacations" className={"NavLink"}>
                                <FlightTakeoffOutlinedIcon/>
                            </NavLink>
                        </Tooltip>
                    </Typography>
                    <Typography variant="inherit" component="div">
                        <Button sx={{textTransform: 'none'}}>
                            <NavLink to="/home" onClick={logoutMe} className={"NavLink"}>
                                Logout
                            </NavLink>
                        </Button>
                    </Typography>
                </Toolbar>
            }

            {user && user.role === 2 && (
                <Toolbar sx={{ display: 'flex' }}>
                    <Typography variant="inherit" component="div" sx={{ ml: 'auto' , mr: 1}}>
                        <Tooltip title={"Vacations"}>
                            <NavLink to="/vacations" className={"NavLink"}>
                                <FlightTakeoffOutlinedIcon/>
                            </NavLink>
                        </Tooltip>
                    </Typography>
                    <Typography variant="inherit" component="div" sx={{ mr: 1}}>
                        <Tooltip title={"Add Vacation"}>
                            <NavLink to="/vacations/new" className={"NavLink"}>
                                <AddIcon/>
                            </NavLink>
                        </Tooltip>
                    </Typography>
                    <Typography variant="inherit" component="div" sx={{ mr: 1}}>
                            <Tooltip title={"Graphs"}>
                                <NavLink to="/vacations/graphs" className={"NavLink"}>
                                    <BarChartIcon/>
                                </NavLink>
                            </Tooltip>
                    </Typography>
                    <Typography variant="inherit" component="div">
                        <Button sx={{textTransform: 'none'}}>
                            <NavLink to="/home" onClick={logoutMe} className={"NavLink"}>
                                Logout
                            </NavLink>
                        </Button>
                    </Typography>
                </Toolbar>
            )}
        </div>
    );
}

export default AuthMenu;
