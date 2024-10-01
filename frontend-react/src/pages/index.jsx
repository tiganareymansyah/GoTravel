import { useLocation } from "react-router-dom";
import Beranda from "./layouts/beranda/Beranda";
import Booking from "./layouts/booking/Booking";
import FormBooking from "./layouts/booking/formBooking/FormBooking";
import About from "./layouts/about/About";
import Contact from "./layouts/contact/Contact";
import Profil from "./layouts/profil/Profil";
import Admin from "./layouts/admin/Admin";
import DetailBooking from "./layouts/booking/formBooking/detail/DetailBooking";

export default function GoTravelIndex(props) {
    const pathname = useLocation().pathname;

    return (
        <>
            {pathname === "/dashboard" ? (
                <Beranda userLogin={props.userLogin} dataBooking={props.dataBooking} doLoad={props.doLoad} />
            ) : pathname === "/booking" ? (
                <Booking userLogin={props.userLogin} dataBooking={props.dataBooking} doLoad={props.doLoad} />
            ) : pathname === "/booking/form-booking" ? (
                <FormBooking userLogin={props.userLogin} dataBooking={props.dataBooking} doLoad={props.doLoad} />
            ) : pathname === "/about" ? (
                <About userLogin={props.userLogin} dataBooking={props.dataBooking} doLoad={props.doLoad} />
            ) : pathname === "/contact" ? (
                <Contact userLogin={props.userLogin} dataBooking={props.dataBooking} doLoad={props.doLoad} />
            ) : pathname === "/profil" ? (
                <Profil userLogin={props.userLogin} dataBooking={props.dataBooking} doLoad={props.doLoad} />
            ) : pathname === "/kelola-admin" ? (
                <Admin userLogin={props.userLogin} dataBooking={props.dataBooking} doLoad={props.doLoad} />
            ) : pathname === "/booking/detail-booking" ? (
                <DetailBooking userLogin={props.userLogin} doLoad={props.doLoad} />
            ) : ( 
                console.log("Not Found")
            )}
        </>  
    );
};
