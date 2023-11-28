import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import ImageSource from "../../../Assets/Images/404PageCover.jpg";
import "./PageNotFound.css";
function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
            <img src={ImageSource}/>
            <br/>
            <Button sx={{backgroundColor: 'white' , textTransform: 'none' ,'&:hover': { backgroundColor: 'whitesmoke' }}}>
                <NavLink className={'navStyle'} to="/home">
                    Go Home
                </NavLink>
            </Button>
        </div>
    );
}

export default PageNotFound;
