import { makeStyles } from "@mui/styles";
import background from "../../../media/ethan-robertson-SYx3UCHZJlo-unsplash.jpg";

export const useLoginStyles = makeStyles({
    loginBackground: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh"
    },

    loginContainer: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"
    },

    loginForm: {
        backgroundColor: "#fff5",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        opacity: 5
    }
});