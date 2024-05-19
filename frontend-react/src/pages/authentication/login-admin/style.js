import { makeStyles } from "@mui/styles";
import background from "../../../media/ethan-robertson-SYx3UCHZJlo-unsplash.jpg";

export const useLoginAdminStyles = makeStyles({
    loginAdminBackground: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh"
    },

    containerRoot: {
        minHeight: "100vh"
    },

    containerNavbarLoginAdmin: {
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

    buttonBackLoginAmin: {
        paddingRight: "16px"
    },

    containerFormLoginAdmin: {
        marginTop: "128px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    containerLoginAdminGoTravel: {
        width: "50%",
        display: "flex",
        justifyContent: "center" 
    },

    containerForm: {
        width: "40%",
        display: "flex",
        justifyContent: "center"
    },

    loginAdminForm: {
        backgroundColor: "#fff5",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        width: "70%"
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