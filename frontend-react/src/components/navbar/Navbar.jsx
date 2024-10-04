import { useEffect, useState } from "react";
import { 
  Badge,
  Box, 
  Button, 
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from "@mui/material";
import { 
  EditCalendar,
  Call,
  AirportShuttle,
  GridView,
  Info,
  Logout,
  Notifications,
  Person,
  Home
} from "@mui/icons-material";
import { orange } from "@mui/material/colors";
import { useNavbarStyles } from "./style";
import { useMediaQuery } from "react-responsive";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logoGoTravel from "../../media/logo_gotravel1.png";
import { apiGetDataUserLogin } from "../../api/api";

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
      width: "43px",
      borderRadius: "20px",
      backgroundColor: "#cccc"
    },

    profile: {
      width: "43px",
      height: "43px",
      borderRadius: "20px",
    },

    activeProfile: {
      backgroundColor: "#15F5BA",
      width: "10px",
      height: "10px",
      borderRadius: "7px",
      position: "absolute",
      top: "31px",
      left: "31px"
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

  const [openNotifkasi, setOpenNotifikasi] = useState(false);
  const [dataDummy, setDataDummy] = useState([
    {
      id: 1,
      value: "Selamat, Pesanan anda telah berhasil dikirim.",
      created_at: "2024-07-07 09:00"
    },
    {
      id: 2,
      value: "Halo, Selamat datang pada aplikasi GoTravel. Silahkan menikmati fitur-fiturnya :).",
      created_at: "2024-10-10 08:21"
    }
  ]);
  const [dataUserLogin, setDataUserLogin] = useState();
  const [profil, setProfil] = useState({
    foto: ""
  });
  
  let cekLogin = localStorage.getItem("userLogin") ? JSON.parse(localStorage.getItem("userLogin")) : null

  useEffect(() => {
    handleGetUserLogin();
  }, []);

  useEffect(() => {
    fetchDataProfil();
  }, [dataUserLogin]);

  const handleGetUserLogin = async () => {
    try {
      let urlParams = cekLogin.email;

      const result = await apiGetDataUserLogin(urlParams);

      const { code, status, message, data } = result;

      if(status === "success") {
        setDataUserLogin(data[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const convertImageToBlob = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);

      if (!response.ok) {
          throw new Error("Network response was not ok");
      }

      const blob = await response.blob();

      return blob;
    } catch (error) {
      console.error("Error fetching image:", error);

      return "";
    }
  };

  const fetchDataProfil = async () => {
    if (dataUserLogin) {
      let profilBlob = "";

      if (dataUserLogin.foto_profil) {
        profilBlob = await convertImageToBlob(`http://localhost/aplikasi-ta-kuliah/backend-php/profilImages/${dataUserLogin.foto_profil}`);
      }

      setProfil((prev) => ({
        ...prev,
        foto: dataUserLogin.foto_profil ? URL.createObjectURL(profilBlob) : ""
      }));
    }
  };

  const handleClickOpen = () => setOpenNotifikasi(prev => !prev);

  const handleLogout = () => {
    localStorage.removeItem("userLogin");
    localStorage.removeItem("tokenTimestamp");
    navigate("/");
  }

  console.log("Haha", dataUserLogin);

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
          <NavLink>
            <Box sx={{ ...styles.boxNotification, display: "none" }} onClick={handleClickOpen}>
              <Badge badgeContent={dataDummy.length} color="primary" sx={{ position: "relative" }}>
                <Notifications color="action" sx={styles.notification} />

                {openNotifkasi && (
                  <Box 
                    sx={{ 
                      position: "absolute",
                      top: isMobile ? "7vw" : "3.5vw",
                      left: isMobile ? "-12.35vw" : "-15.82vw"
                    }}
                  >
                    <Box
                      sx={{
                        overflow: "visible",
                        position: "relative"
                      }}
                    >
                      <Box
                        className={classes.cardNotifikasi}
                        sx={{ 
                          width: "32vw",
                          overflowY: "scroll",
                          position: "relative"
                        }}
                      >
                        <Typography 
                          variant="h5" 
                          sx={{ 
                            color: "#000", 
                            textAlign: "center",
                            letterSpacing: 2
                          }}
                        >
                          Notifikasi
                        </Typography>

                        <Box 
                          sx={{ 
                            display: "flex", 
                            borderBottom: "1px solid #000", 
                            paddingTop: "8px" 
                          }} 
                        />

                        <Box sx={{ paddingTop: "16px", width: "100%" }}>
                          {dataDummy.map((item) => (
                            <Box 
                              sx={{ 
                                display: "flex", 
                                alignItems: "center" 
                              }}
                            >
                              <Typography
                                key={item.id}
                                variant="span"
                                sx={{ 
                                  display: "block", 
                                  color: "#000", 
                                  fontFamily: "arial",
                                  width: "75%"
                                }}
                              >
                                <ul>
                                  <li>{item.value}</li>
                                </ul>
                              </Typography>

                              <Typography
                                variant="span"
                                sx={{ 
                                  display: "block", 
                                  color: "#aaa", 
                                  fontSize: 12,
                                  fontFamily: "arial",
                                  width: "25%",
                                  textAlign: "end"
                                }}
                              >
                                {item.created_at}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          width: 0,
                          height: 5,
                          borderLeft: "16px solid transparent",
                          borderRight: "16px solid transparent",
                          transform: "translate(-50%, -50%) rotate(180deg)",
                          // borderTop: "70px solid #EAEAEA",
                          borderTop: "32px solid #fff",
                          position: "absolute",
                          right: "40.7%",
                          top: "-1%",
                          zIndex: 4,
                        }}
                      />
                    </Box>
                  </Box>
                )}
              </Badge>
            </Box>

          </NavLink>

          <NavLink to="/profil">
            <Box sx={styles.backgroundProfile}>
              {profil.foto ? (
                <img 
                  src={profil.foto}
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
          </NavLink>

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
              startIcon={<Home />}
              sx={styles.colorBar(isActive)}
            >
              Beranda
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
              Pemesanan
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
              Tentang
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
              Kontak
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
