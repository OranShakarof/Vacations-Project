import imageSource from "../../../Assets/Images/loading.gif";
import "./Spinner.css";
function Spinner(): JSX.Element {
    return (
        <div className="Spinner">
			<img src={imageSource}/>
        </div>
    );
}

export default Spinner;
