import { Box } from "@mui/material"
import Navbar from "../../../components/navbar/Navbar"
import { useMediaQuery } from "react-responsive";
import { useBerandaStyles } from "./style";

export default function Beranda(props) {
    console.log(props);

    const isMobile = useMediaQuery({ maxWidth: 991 });
    const classes = useBerandaStyles({ isMobile });

    return (
        <>
            <Box className={classes.berandaBackground}>
                <Navbar />
                <Box>Home</Box>
            </Box>
        </>
    )
};
