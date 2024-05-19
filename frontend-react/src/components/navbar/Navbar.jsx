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

export default function Navbar() {
  const isMobile = useMediaQuery({ maxWidth: 991 });
  const classes = useNavbarStyles({ isMobile });

  const styles = {
    colorBar: {
      color: "#fff",
      fontSize: "12px",
      height: "32px",
      "&:hover": {
          color: `${orange[100]}`,
          borderBottom: "3px solid #fff",
          borderRadius: 0,
      },
    },

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
      color: `${orange[100]}`,
      fontStyle: "italic",
      letterSpacing: "4px"
    },
  };

  let profil = true;

  return (
    <Box className={classes.root}>
      <Box className={classes.containerBar}>
        <Box className={classes.boxIcon}>
          <p><AirportShuttle fontSize="large" sx={{ color: "#fff" }} /></p>
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
          >
            Keluar
          </Button>
        </Box>
      </Box>

      <Box className={classes.containerMenu}>
        <Button
          variant="text"
          startIcon={<GridView />}
          sx={styles.colorBar}
          href="/dashboard"
        >
          Dashboard
        </Button>

        <Button
          variant="text"
          startIcon={<EditCalendar />}
          sx={styles.colorBar}
          href="/booking"
        >
          Booking
        </Button>

        <Button
          variant="text"
          startIcon={<Info />}
          sx={styles.colorBar}
          href="/about"
        >
          About
        </Button>

        <Button
          variant="text"
          startIcon={<Call />}
          sx={styles.colorBar}
          href="/contact"
        >
          Contact
        </Button>
      </Box>

      <Box className={classes.containerFooter}>
        <footer style={styles.footer}>&copy; 2024. Tigana Reymansyah</footer>
      </Box>
    </Box>  
  )
}
