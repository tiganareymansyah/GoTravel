import { makeStyles } from "@mui/styles";

export const useKelolaMessageStyles = makeStyles({
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
    }
});
