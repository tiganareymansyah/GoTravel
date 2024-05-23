import { useLocation } from "react-router-dom";
import Beranda from "./layouts/beranda/Beranda";
import Booking from "./layouts/booking/Booking";
import About from "./layouts/about/About";
import Contact from "./layouts/contact/Contact";

export default function GoTravelIndex(props) {
    const pathname = useLocation().pathname;

    console.log(props);
    console.log(pathname);

    return (
        <>
            {pathname === "/dashboard" ? (
                <Beranda />
            ) : pathname === "/booking" ? (
                <Booking />
            ) : pathname === "/about" ? (
                <About />
            ) : pathname === "/contact" ? (
                <Contact />
            ) : ( 
                console.log("Not Found")
            )}
        </>  
    );
};