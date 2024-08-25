import { makeStyles } from "@mui/styles";
import background from "../../../media/sean-oulashin-KMn4VEeEPR8-unsplash.jpg";

export const useContactStyles = makeStyles({
    contactBackground: {
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
        // overflowY: "scroll",
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

    boxInfoContact: {
        width: "50%", 
    },

    boxFormContact: {
        width: "50%", 
    },

    formContact: {
        paddingTop: "32px", 
        display: "flex", 
        flexDirection: "column", 
        gap: "16px"
    },

    boxButtonSend: {
        paddingTop: "24px", 
        display: "flex", 
        justifyContent: "end" 
    },

    inputUppercase: {
        fontFamily: "Roboto, sans-serif",
        textTransform: "uppercase",
        WebkitTextFillColor: "black"
    },

    inputCapitalize: {
        fontFamily: "Roboto, sans-serif",
        textTransform: "capitalize",
        WebkitTextFillColor: "black"
    },
    
    disabled: {
        "& .MuiInputBase-input": {
            color: "black !important",
            fontSize: 17,
            fontFamily: "Roboto, sans-serif",
            WebkitTextFillColor: "black !important",
        },
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderWidth: 0,
            },
            "&:hover fieldset": {
                borderWidth: 0,
            },
            "& fieldset": {
                borderWidth: 0,
            },
        },
        "& .Mui-disabled": {
            borderRadius: "5px",
            backgroundColor: "#d8d4d4",
        },
        "&.css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root": {
            padding: "0px"
        }
    },
});