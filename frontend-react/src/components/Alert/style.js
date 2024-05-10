import { makeStyles } from "@mui/styles";

export const useAlertStyles = makeStyles({
    rowContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
        width: props => props.isMobile ? "150px" : "250px"
    },

    iconClose : {
        position: "absolute",
        right: 8,
        top: 8,
        color: "white",
        borderRadius: "8px",
        backgroundColor: "#aaa",
        padding: "5px",
        "&:hover": {
            backgroundColor: "#white",
        },
    },

    iconSuccess: {
        fontSize: "150px",
        color: "white",
        backgroundColor: "#A5DD9B",
        padding: 5,
        borderRadius: "50%",
    },

    iconError: {
        fontSize: "150px",
        color: "white",
        backgroundColor: "#D24545",
        padding: 5,
        borderRadius: "50%",
    },

    textTitle: {
        fontFamily: "sans-serif",
        fontSize: "24px",
        fontWeight: "bold",
        textTransform: "uppercase",
    },

    textMessage: {
        fontFamily: "sans-serif",
        fontSize: "16px",
        color: props => props.isMobile ? "red" : "blue"
    },

    textRedirect: {
        fontFamily: "sans-serif",
        fontSize: "12px",
    },
});