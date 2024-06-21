import { 
  Box, 
  Button 
} from "@mui/material";
import { 
  EditCalendar,
  Call,
  AirportShuttle,
  GridView,
  Info,
  Logout,
  Notifications,
  Person
} from "@mui/icons-material";
import { orange } from "@mui/material/colors";
import { useNavbarStyles } from "./style";
import { useMediaQuery } from "react-responsive";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logoGoTravel from "../../media/logo_gotravel1.png";

export default function Navbar() {
  const isMobile = useMediaQuery({ maxWidth: 991 });
  const classes = useNavbarStyles({ isMobile });
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const styles = {
    colorBar: (isActive) => ({
      color: isActive ? orange[100] : "#fff",
      fontSize: "12px",
      height: "32px",
      borderBottom: isActive ? "3px solid #fff" : "none",
      borderRadius: 0,
      "&:hover": {
        color: orange[100],
        borderBottom: "3px solid #fff",
        borderRadius: 0,
      }
    }),

    button: {
      padding: "7px 14px",
      textAlign: "center",
      cursor: "pointer",
      borderRadius: "2px",
      color: "#000",
      backgroundColor: "#fff",
      "&:hover": {
        color: `${orange[100]}`
      }
    },

    backgroundProfile: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      position: "relative",
      width: "40px",
      borderRadius: "20px",
      backgroundColor: "#cccc"
    },

    profile: {
      width: "40px",
      height: "40px",
      borderRadius: "20px",
    },

    activeProfile: {
      backgroundColor: "#15F5BA",
      width: "10px",
      height: "10px",
      borderRadius: "7px",
      position: "absolute",
      top: "29px",
      left: "29px"
    },

    boxNotification: {
      cursor: "pointer"
    },

    notification: {
      fontSize: "38px",
      color: "#fff"
    },

    footer: {
      color: "#fff",
      fontStyle: "italic",
      letterSpacing: "4px"
    },
  };

  const handleLogout = () => {
    localStorage.removeItem("userLogin");
    localStorage.removeItem("tokenTimestamp");
    navigate("/");
  }

  let profil = true;

  return (
    <Box className={classes.root}>
      <Box className={classes.containerBar}>
        <Box className={classes.boxIcon}>
          {/* <p><AirportShuttle fontSize="large" sx={{ color: "#fff" }} /></p> */}
          <img src={logoGoTravel} width={70} height={70} style={{ paddingBottom: "16px" }} />
          <p className={classes.textIcon}>
            Go<Box sx={{ color: `${orange[100]}` }}>Travel</Box>
          </p>
        </Box>

        <Box className={classes.boxButton}>
          <Box sx={styles.boxNotification}>
            <Notifications sx={styles.notification} />
          </Box>

          <Box sx={styles.backgroundProfile}>
            {(profil) ? (
              <img 
                // src={`http://10.20.75.50/api/${fotoProfil}`}
                src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3GzszKKQDonXcCchn1vvL7dIoSBEOXUuoOw&usqp=CAU"}
                style={styles.profile}
              />
            ) : (
              <Person 
                style={{ 
                  fontSize: "40px",
                  color: "#f3f3f3"
                }}
              />
            )}
            <span style={styles.activeProfile} />
          </Box>

          <Button 
            startIcon={<Logout />} 
            sx={styles.button} 
            onClick={handleLogout} 
          >
            Keluar
          </Button>
        </Box>
      </Box>

      <Box className={classes.containerMenu}>
        <NavLink to="/dashboard" style={{ textDecoration: 'none' }}>
          {({ isActive }) => (
            <Button
              variant="text"
              startIcon={<GridView />}
              sx={styles.colorBar(isActive)}
            >
              Dashboard
            </Button>
          )}
        </NavLink>

        <NavLink to="/booking" style={{ textDecoration: 'none' }}>
          {({ isActive }) => (
            <Button
              variant="text"
              startIcon={<EditCalendar />}
              sx={styles.colorBar(isActive)}
            >
              Booking
            </Button>
          )}
        </NavLink>

        <NavLink to="/about" style={{ textDecoration: 'none' }}>
          {({ isActive }) => (
            <Button
              variant="text"
              startIcon={<Info />}
              sx={styles.colorBar(isActive)}
            >
              About
            </Button>
          )}
        </NavLink>

        <NavLink to="/contact" style={{ textDecoration: 'none' }}>
          {({ isActive }) => (
            <Button
              variant="text"
              startIcon={<Call />}
              sx={styles.colorBar(isActive)}
            >
              Contact
            </Button>
          )}
        </NavLink>
      </Box>

      <Box className={classes.containerFooter}>
        <footer style={styles.footer}>&copy; 2024. Tigana Reymansyah</footer>
      </Box>
    </Box>  
  )
};
