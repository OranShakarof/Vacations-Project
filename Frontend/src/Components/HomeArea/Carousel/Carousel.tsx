import VacationCarousel from "react-material-ui-carousel";
import CarouselImages from "../CarouselImages/CarouselImages";
import ImageSource1 from "../../../Assets/Images/las-vegas.jpg";
import ImageSource2 from "../../../Assets/Images/new-york.jpg";
import ImageSource3 from "../../../Assets/Images/thailand.jpg";

function Carousel(): JSX.Element {
    const images = [{id:1, imageUrl:ImageSource1}, {id:2, imageUrl:ImageSource2}, {id:3, imageUrl:ImageSource3}];

    return (
        <div className="Carousel">
            <VacationCarousel navButtonsWrapperProps={{style: {marginLeft: "23%", marginRight: "23%"}}} >
                {
                    images.map( image => <CarouselImages key={image.id} image={image}/>)
                }
            </VacationCarousel>
        </div>
    );
}

export default Carousel;
