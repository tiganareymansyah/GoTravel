import { makeStyles } from "@mui/styles";
import background from "../../../media/sean-oulashin-KMn4VEeEPR8-unsplash.jpg";

export const useAboutStyles = makeStyles({
    aboutBackground: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh"
    },

    containerParent: {
        marginTop: "1%",
        margin: "auto", 
        padding: "16px", 
        boxSizing: "border-box", 
        width: "50vw", 
        height: "68vh",
        overflowY: "scroll",
        borderRadius: "8px", 
        backgroundColor: "#fff", 
    },

    containerChild: {
        paddingTop: "32px", 
        display: "flex", 
        alignItems: "center", 
        gap: "16px", 
        width: "100%" 
    },
});