import { Box } from "@mui/material";
import Navbar from "../../../components/navbar/Navbar";
import { useMediaQuery } from "react-responsive";
import { useBookingStyles } from "./style";

export default function Booking(props) {
    console.log(props);

    const isMobile = useMediaQuery({ maxWidth: 991 });
    const classes = useBookingStyles({ isMobile });

    return (
        <>
            <Box className={classes.bookingBackground}>
                <Navbar />
                <Box>Booking</Box>
            </Box>
        </>
    );
};
