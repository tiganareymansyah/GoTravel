import { makeStyles } from "@mui/styles";

export const useNavbarStyles = makeStyles({
    root: {
        width: "100%",
    },

    containerBar: {
        backgroundColor: "#0005",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },

    boxIcon: {
        display: "flex",
        alignItems: "center",
        paddingLeft: "24px",
        cursor: "pointer"
    },

    textIcon: {
        color: "white",
        fontStyle: "italic",
        fontWeight: "bold",
        fontSize: "32px",
        display: "flex",
    },

    boxButton: {
        paddingRight: "24px",
        display: "flex",
        alignItems: "center",
        gap: "40px"
    },

    containerMenu: {
        backgroundColor: "#0005",
        display: "flex", 
        justifyContent: "center",
        gap: "8rem",
        padding: "16px"
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

    cardNotifikasi: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        borderLeft: "1px solid #ccc",
        borderRight: "1px solid #ccc",
        borderBottom: "1px solid #ccc",
        borderRadius: "8px",
        height: "32vh",
        padding: "3%",
        position: "relative",
        zIndex: 5,
    },
});