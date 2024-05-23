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
});