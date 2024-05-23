import { Box } from "@mui/material";
import Navbar from "../../../components/navbar/Navbar";
import { useMediaQuery } from "react-responsive";
import { useAboutStyles } from "./style";

export default function About(props) {
    console.log(props);

    const isMobile = useMediaQuery({ maxWidth: 991 });
    const classes = useAboutStyles({ isMobile });

    return (
        <>
            <Box className={classes.aboutBackground}>
                <Navbar />
                <Box>About</Box>
            </Box>
        </>
    );
};
