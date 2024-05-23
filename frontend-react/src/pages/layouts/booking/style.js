import { makeStyles } from "@mui/styles";
import background from "../../../media/sean-oulashin-KMn4VEeEPR8-unsplash.jpg";

export const useBookingStyles = makeStyles({
    bookingBackground: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background})`, 
        backgroundSize: "cover", 
        backgroundRepeat: "no-repeat", 
        backgroundPosition: "center", 
        minHeight: "100vh" 
    },

    containerParent: {
        width: "100%" 
    },

    setCardAndButton: {
        height: "72vh", 
        width: "85%", 
        margin: "auto" 
    },

    setCard: {
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center"
    },

    boxCard: {
        padding: "16px", 
        boxSizing: "border-box", 
        width: "400px", 
        height: "400px", 
        borderRadius: "8px", 
        backgroundColor: "#fff",
        boxShadow: "8px 8px 0 rgba(0, 0, 0, 0.5)"
    },

    buttonTambah: {
        paddingTop: "32px", 
        display: "flex", 
        justifyContent: "end", 
        marginBottom: "16px" 
    },

    boxNoData: {
        display: "flex", 
        justifyContent: "center" 
    },
});