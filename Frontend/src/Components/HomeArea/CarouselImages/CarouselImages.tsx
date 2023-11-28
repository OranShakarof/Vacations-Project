import { Paper } from "@mui/material";
import { NavLink } from "react-router-dom";
import { authStore } from "../../../Redux/AuthState";
import "./CarouselImages.css";

interface ImageProps{
    id: number;
    imageUrl: string;
}

function CarouselImages({ image }: { image: ImageProps }): JSX.Element {
    const user = authStore.getState().user;
    
    return (
      <div className="CarouselImages">
        <Paper style={{backgroundColor: "transparent"}}>
          <img src={image.imageUrl} alt={`Image ${image.id}`} className="images" />
          <div className="linkStyle">
            {!user &&
                <NavLink to={"/login"} className={"fontStyle"}>Check Out Our Vacations!</NavLink>
            }
            {user && 
                <NavLink to={"/vacations"} className={"fontStyle"}>Check Out Our Vacations!</NavLink>
            }
          </div>
        </Paper>
      </div>
    );
}

export default CarouselImages;
