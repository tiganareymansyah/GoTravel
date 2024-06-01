import { makeStyles } from "@mui/styles";
import background from "../../../media/ethan-robertson-SYx3UCHZJlo-unsplash.jpg";

export const useRegisterStyles = makeStyles({
  registerBackground: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
  },

  containerRoot: {
    minHeight: "100vh",
  },

  containerNavbarRegister: {
    backgroundColor: "#0005",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  navbarIcon: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "24px",
    cursor: "pointer",
  },

  buttonBackRegister: {
    paddingRight: "16px",
  },

  containerFormRegister: {
    marginTop: "48px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  containerRegisterGoTravel: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
  },

  containerForm: {
    width: "40%",
    display: "flex",
    justifyContent: "center",
  },

  registerForm: {
    backgroundColor: "#fff5",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    width: "70%",
  },

  registerFormCekAccount: {
    display: "flex",
    justifyContent: "center",
    fontSize: "12px",
    gap: "4px",
  },

  containerFooter: {
    backgroundColor: "#0005",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "16px",
    position: "fixed",
    bottom: 0,
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
});
