import { Box } from "@mui/material";
import Navbar from "../../../components/navbar/Navbar";
import { useMediaQuery } from "react-responsive";
import { useContactStyles } from "./style";

export default function Contact(props) {
    console.log(props);

    const isMobile = useMediaQuery({ maxWidth: 991 });
    const classes = useContactStyles({ isMobile });

    return (
        <>
            <Box className={classes.contactBackground}>
                <Navbar />
                <Box>Contact</Box>
            </Box>
        </>
    );
};
