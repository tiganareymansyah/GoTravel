import { makeStyles } from "@mui/styles";

export const useListDataBookingStyles = makeStyles({
    containerParent: {
        marginLeft: "10vw", 
        marginRight: "10vw", 
        marginTop: "5vw", 
        marginBottom: "5vw"
    },

    containerChild: {
        marginBottom: "10px", 
        display: "flex", 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },

    tableContainer: {
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center"
    },

    inputUppercase: {
        fontFamily: "Roboto, sans-serif",
        // fontWeight: "bold",
        textTransform: "uppercase",
        WebkitTextFillColor: "black"
    },

    inputCapitalize: {
        fontFamily: "Roboto, sans-serif",
        // fontWeight: "bold",
        textTransform: "capitalize",
        WebkitTextFillColor: "black"
    },
    
    disabled: {
        "& .MuiInputBase-input": {
            color: "black !important",
            fontSize: 17,
            fontWeight: "600",
            fontFamily: "Roboto, sans-serif",
            WebkitTextFillColor: "black !important",
            //   textTransform: "UPPERCASE",
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
            // backgroundColor: "#d8d4d4",
        },
        "&.css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root": {
            padding: "0px"
        }
    },
});
