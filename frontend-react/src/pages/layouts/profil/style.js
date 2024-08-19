import { makeStyles } from "@mui/styles";
import background from "../../../media/sean-oulashin-KMn4VEeEPR8-unsplash.jpg";

export const useProfilStyles = makeStyles({
    profilBackground: {
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
        // boxShadow: "8px 8px 0 rgba(0, 0, 0, 0.5)"
    },

    containerChild: {
        paddingTop: "32px", 
        display: "flex", 
        // alignItems: "center", 
        gap: "32px", 
        width: "100%" 
    },
    
    setProfil: {
        width: "35%", 
        display: "flex", 
        flexDirection: "column", 
        gap: "24px", 
        borderRadius: "16px" 
    },

    boxProfil: {
        display: "flex", 
        alignItems: "end", 
        justifyContent: "center", 
        width: "16.5vw", 
        height: "39vh", 
        backgroundColor: "#D8D2CB", 
        borderRadius: "16px", 
        margin: "auto" 
    },

    boxButtonProfil: {
        display: "flex", 
        flexDirection: "column", 
        gap: "12px" 
    },

    setForm: {
        width: "65%", 
        // backgroundColor: "blue" 
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
            // fontWeight: "600",
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

    calendarContainer: {
        display: "flex",
        flexDirection: "row",
        "& .react-datepicker__portal": {
            zIndex: "1 !important",
        },
    },
    
    calendar: {
        width: "100%",
        fontFamily: "Nunito Sans",
        backgroundColor: "white",
        "& .react-datepicker__day--disabled": {
            backgroundColor: "#d3d3d3",
        },
        "& .react-datepicker__header": {
            backgroundColor: "white",
            border: "0px",
            margin: 0,
        },
        "& .react-datepicker__day-name": {
            color: "#18345c",
            padding: "0.7vw",
            fontSize: 15,
            paddingBottom: 0,
        },
        "& .react-datepicker__day": {
            color: "#18345c",
            padding: "0.7vw",
        },
        "& .react-datepicker__day:hover": {
            color: "white",
            backgroundColor: "#18345c",
        },
        "& .react-datepicker__current-month": {
            marginBottom: 4,
        },
        "& .react-datepicker__header__dropdown": {
            paddingBottom: 0,
        },
        "& .react-datepicker__month-select": {
            padding: 2,
        },
        "& .react-datepicker__year-select": {
            padding: 2,
        },
        // "& .react-datepicker__triangle": {
        //   fill: 'blue',
        //   top: '-8px',
        // },
    },

    // datePickerPopper: {
    //     zIndex: 3
    // },

    datePickerWrapper: {
        "& .react-datepicker-wrapper": {
            width: "100%"
        }
    }
});
