import { makeStyles } from "@mui/styles";
import background from "../../../media/sean-oulashin-KMn4VEeEPR8-unsplash.jpg";

export const useBerandaStyles = makeStyles({
    berandaBackground: {
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

    slideContent: {
        position: 'relative',
    },

    slideImage: {
        width: '100%',
        height: '72vh',
        // objectFit: 'cover',
        objectFit: 'fill',
    },

    overlay: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '20px',
        borderRadius: '10px',
    },

    overlayTitle: {
        fontSize: '3rem',
        marginBottom: '10px',
    },

    overlayText: {
        fontSize: '1.5rem',
    },

    paginationBullet: {
        background: 'white',
        opacity: 0.8,
    },

    paginationBulletActive: {
        backgroundColor: '#007bff',
        opacity: 1,
    }
});