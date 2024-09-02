import { makeStyles } from "@mui/styles";
import background from "../../../../media/sean-oulashin-KMn4VEeEPR8-unsplash.jpg";

export const useFormBookingStyles = makeStyles({
    formBookingBackground: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background})`, 
        backgroundSize: "cover", 
        backgroundRepeat: "no-repeat", 
        backgroundPosition: "center", 
        minHeight: "100vh" 
    },

    containerNavbarFormBooking: {
        backgroundColor: "#0005",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 1
    },

    buttonBack: {
        padding: "8px 16px"
    },

    containerFormBooking: {
        width: "100%"
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

    inputUppercase: {
        fontFamily: "Nunito Sans",
        fontWeight: "bold",
        textTransform: "capitalize",
        WebkitTextFillColor: "black"
    },

    disabled: {
        "& .MuiInputBase-input": {
            color: "black !important",
            fontSize: 17,
            fontWeight: "600",
            fontFamily: "Nunito Sans",
            WebkitTextFillColor: "black !important",
            textTransform: "capitalize",
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
    },

    containerParent: {
        margin: "auto", 
        padding: "16px", 
        boxSizing: "border-box", 
        width: "72%", 
        height: "70vh",
        overflowY: "scroll",
        borderRadius: "8px", 
        backgroundColor: "#fff", 
        // boxShadow: "8px 8px 0 rgba(0, 0, 0, 0.5)"
    },

    containerChild: {
        display: "flex", 
        alignItems: "center" 
    },

    setForm: {
        width: "60%" 
    },

    boxTouristData: {
        paddingLeft: "5%", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        paddingBottom: "4%" 
    },

    boxPrevOrNext: {
        paddingLeft: "5%", 
        paddingTop: "24px", 
        display: "flex", 
        justifyContent: "space-between" 
    },

    boxKarikaturImage: {
        width: "40%", 
        display: "flex", 
        justifyContent: "center" 
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
            backgroundColor: "#d8d4d4",
        },
        "&.css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root": {
            padding: "0px"
        }
    },

    calendarContainer: {
        display: "flex",
        flexDirection: "row",
        "& .react-datepicker__portal": {
            zIndex: "1 !important"
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

    datePickerPopper: {
        zIndex: 3
    },

    datePickerWrapper: {
        "& .react-datepicker-wrapper": {
            width: "100%"
        }
    }
});
