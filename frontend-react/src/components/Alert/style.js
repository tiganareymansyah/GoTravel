import { makeStyles } from "@mui/styles";

export const useAlertStyles = makeStyles({
    rowContainer: {
        paddingTop: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        justifyContent: "center",
        alignItems: "center",
        width: props => props.isMobile ? "150px" : "300px"
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

    boxButton: {
        paddingTop: "24px",
        display: "flex",
        gap: "128px"
    }
});