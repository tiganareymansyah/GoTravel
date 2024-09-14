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
        paddingTop: "16px", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        gap: "78px", 
        height: "72%", 
        paddingBottom: "16px" 
    },

    boxCard: {
        padding: "16px", 
        boxSizing: "border-box", 
        width: "400px", 
        height: "450px", 
        borderRadius: "8px", 
        backgroundColor: "#fff", 
        transition: "all 0.3s cubic-bezier(.25,.8,.25,1)", 
        boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)", 
        "&:hover": {
          boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)"
        }, 
        "&:hover": {
            cursor: "pointer", 
            width: "410px", 
            height: "460px" 
        }  
    },

    cardHeader: {
        width: "100%", 
        display: "flex", 
        justifyContent: "space-around", 
        alignItems: "center" 
    },

    cardBody: {
        paddingTop: "16px", 
        display: "flex", 
        flexDirection: "column", 
        gap: "10px", 
        alignItems: "flex-start", 
        paddingLeft: "20px", 
        boxSizing: "border-box" 
    },

    buttonTambah: {
        paddingTop: "16px", 
        display: "flex", 
        justifyContent: "end", 
        marginBottom: "16px" 
    },

    boxNoData: {
        display: "flex", 
        justifyContent: "center" 
    },
});