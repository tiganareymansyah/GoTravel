import { useLocation } from "react-router-dom";
import Beranda from "./layouts/beranda/Beranda";
import Booking from "./layouts/booking/Booking";
import About from "./layouts/about/About";
import Contact from "./layouts/contact/Contact";
import FormBooking from "./layouts/booking/formBooking/FormBooking";

export default function GoTravelIndex(props) {
    const pathname = useLocation().pathname;

    return (
        <>
            {pathname === "/dashboard" ? (
                <Beranda userLogin={props.userLogin} dataBooking={props.dataBooking} doLoad={props.doLoad} />
            ) : pathname === "/booking" ? (
                <Booking userLogin={props.userLogin} dataBooking={props.dataBooking} doLoad={props.doLoad} />
            ) : pathname === "/about" ? (
                <About userLogin={props.userLogin} dataBooking={props.dataBooking} doLoad={props.doLoad} />
            ) : pathname === "/contact" ? (
                <Contact userLogin={props.userLogin} dataBooking={props.dataBooking} doLoad={props.doLoad} />
            ) : pathname === "/booking/form-booking" ? (
                <FormBooking userLogin={props.userLogin} dataBooking={props.dataBooking} doLoad={props.doLoad} />
            ) : ( 
                console.log("Not Found")
            )}
        </>  
    );
};
