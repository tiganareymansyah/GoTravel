import { useLocation } from "react-router-dom";
import Beranda from "./layouts/beranda/Beranda";
import Booking from "./layouts/booking/Booking";
import About from "./layouts/about/About";
import Contact from "./layouts/contact/Contact";

export default function GoTravelIndex(props) {
    const pathname = useLocation().pathname;
    
    console.log(pathname);

    const contohData = {
        nama: "Tigana Reymansyah",
        tbt: "Kalangan, 2 Mei 2002",
        alamat: "AMD Kalangan BTN Sitio-Tio Hilir",
        email: "tiganareymansyah2502@gmail.com",
        no_telepon: "082267274100"
    }

    return (
        <>
            {pathname === "/dashboard" ? (
                <Beranda userLogin={props.userLogin} />
            ) : pathname === "/booking" ? (
                <Booking userLogin={props.userLogin} dataRequest={contohData} />
            ) : pathname === "/about" ? (
                <About userLogin={props.userLogin} />
            ) : pathname === "/contact" ? (
                <Contact userLogin={props.userLogin} />
            ) : ( 
                console.log("Not Found")
            )}
        </>  
    );
};
