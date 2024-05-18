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

    containerRoot: {
        minHeight: "100vh"
    },

    containerNavbarLogin: {
        backgroundColor: "#0005",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },

    navbarIcon: {
        display: "flex",
        alignItems: "center",
        paddingLeft: "24px",
        cursor: "pointer"
    },

    containerFormLogin: {
        marginTop: "128px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    containerLoginGoTravel: {
        width: "50%",
        display: "flex",
        justifyContent: "center" 
    },

    containerForm: {
        width: "40%",
        display: "flex",
        justifyContent: "center"
    },

    loginForm: {
        backgroundColor: "#fff5",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        width: "70%"
    },

    loginFormCekAccount: {
        display: "flex",
        justifyContent: "center",
        fontSize: "12px",
        gap: "4px",
        marginBottom: "32px"
    },

    containerFooter: {
        backgroundColor: "#0005",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: "16px",
        position: "fixed",
        bottom: 0
    },
});