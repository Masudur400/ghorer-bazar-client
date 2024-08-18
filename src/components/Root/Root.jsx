import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";


const Root = () => {
    return (
        <div>
            <div className="shadow-md">
                <NavBar></NavBar>
            </div>
            <div className="container mx-auto px-4">
                <Outlet></Outlet>
            </div>
            <div className="bg-base-300 mt-10">
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Root;