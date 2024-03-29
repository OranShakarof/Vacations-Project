import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";


function Layout(): JSX.Element {
    return (
        <div className="Layout">
            
            <Menu/>

			<Header />

            <Routing />
            
        </div>
    );
}

export default Layout;
