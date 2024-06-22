import { makeStyles } from "@mui/styles";

export const useAlertStyles = makeStyles({
    rowContainer: {
        paddingTop: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        justifyContent: "center",
        alignItems: "center",
        width: props => props.isMobile ? "150px" : "250px"
    },

    dialogTitle: {
        position: "relative"
    },

    iconClose : {
        cursor: "pointer",
        position: "absolute",
        right: "0px",
        top: "0px",
        color: "#000"
    },

    textTitle: {
        fontFamily: "sans-serif",
        fontSize: "24px",
        fontWeight: "bold",
        textTransform: "uppercase",
    },

    textMessage: {
        textAlign: "center",
        fontFamily: "sans-serif",
        fontSize: "16px",
        fontWeight: "bold"
    },

    textRedirect: {
        fontFamily: "sans-serif",
        fontSize: "12px",
    },
});