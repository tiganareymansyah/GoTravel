import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { 
  Person, 
  AirportShuttle
} from '@mui/icons-material';
import { useFormik } from "formik";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { apiLoginUserAccount } from "../../../api/api.js";
import Alert from "../../../components/Alert/Alert.jsx";
import { useLoginStyles } from "./style";
import { useMediaQuery } from "react-responsive";
import MoveContent from "../../../components/MoveContent/MoveContent.jsx";
import { orange } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const isMobile = useMediaQuery({ maxWidth: 991 });
  const classes = useLoginStyles({ isMobile });

  const styles = {
    judulNavbarLogin: {
      margin: 0,
      padding: 0,
      color: "white",
      fontStyle: "italic",
      fontWeight: "bold",
      fontSize: "32px",
      display: "flex"
    },

    textGoTravel: {
      textAlign: "center",
      color: `${orange[100]}`,
      fontSize: "70px",
      fontFamily: "Curlz MT",
      letterSpacing: "10px"
    },

    textMoveContent: {
      color: `${orange[100]}`,
      textAlign: "center",
      letterSpacing: "2px"
    },
    
    judulFormLogin: {
      textAlign: "center", 
      letterSpacing: "5px"
    },

    button: {
      border: "1px solid", 
      backgroundColor: "blue",
      color: "white",
      border: "none", 
      fontFamily: "serif", 
      letterSpacing: "2px", 
      fontWeight: "bold"
    },

    formLogin: {
      margin: "32px",
      display: "flex",
      flexDirection: "column",
      gap: "32px"
    },

    disclaimerAkun: {
      color: "white",
      letterSpacing: "1px"
    },

    toRegister: {
      color: "blue",
      borderBottom: "1px solid blue",
      letterSpacing: "1px",
      fontWeight: "bold",
      cursor: "pointer",
      "&:hover": {
        color: "black",
      }
    },

    footer: {
      color: `${orange[100]}`,
      fontStyle: "italic",
      letterSpacing: "4px"
    },
  };
  
  const [showPassword, setShowPassword] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const inputRefEmail = useRef(null);
  const inputRefPassword = useRef(null);

  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("userLogin"));

  useEffect(() => {
    if(token && location.pathname.includes("/") && !location.pathname.includes("/home")) {
      navigate("/home");
    }
  }, [token]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      handleLoginUser(values);
    },
  });

  const handleChange = (field, value) => {
    formik.setFieldValue(field, value);
  };

  const handleAlert = (open, severity, title, message) => {
    setOpenAlert(open);
    setSeverity(severity);
    setTitle(title);
    setMessage(message);
  }

  const handleCloseAlert = () => {
    setOpenAlert(false);
    if(severity === "successNoReload") {
      location.href = "/dashboard";
    } else {
      navigate("/");
    }
  }

  const handleLoginUser = async (params) => {
    try {
      const result = await apiLoginUserAccount({
        body: JSON.stringify(params)
      });

      const { status, message, data } = result;

      if(status === "success") {
        Promise.all([
          localStorage.setItem("userLogin", JSON.stringify(data)),
          localStorage.setItem('tokenTimestamp', new Date().getTime().toString())
        ]);
        
        handleAlert(
          true,
          "successNoReload",
          "Sukses",
          message
        );
      } else {
        handleAlert(
          true,
          "error",
          "Gagal",
          message
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  console.log(formik.values);

  return (
    <>
      <Box className={classes.loginBackground}>
        <Box className={classes.containerRoot}>
          <Box className={classes.containerNavbarLogin}>
            <Box className={classes.navbarIcon}>
              <p><AirportShuttle fontSize="large" sx={{ color: "#fff" }} /></p>
              <p style={styles.judulNavbarLogin}>
                Go<Box sx={{ color: `${orange[100]}` }}>Travel</Box>
              </p>
            </Box>

            <Box>
              <p>
                <Person 
                  fontSize="large" 
                  sx={{ 
                    color: `${orange[100]}`, 
                    cursor: "pointer",
                    paddingRight: "32px" 
                  }} 
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/admin");
                  }}
                />
              </p>
            </Box>
          </Box>

          <Box className={classes.containerFormLogin}>
            <Box className={classes.containerLoginGoTravel}>
              <Box>
                <p style={styles.textGoTravel}>GoTravel</p>
                <p style={styles.textMoveContent}><MoveContent /></p>
              </Box>
            </Box>

            <Box className={classes.containerForm}>
              <Box className={classes.loginForm}>
                <h3 style={styles.judulFormLogin}>LOGIN</h3>
                <form 
                  onKeyDown={(e) => {
                    if(e.key === "Enter") {
                      // e.preventDefault();
                      formik.handleSubmit();
                    }
                  }}
                  style={styles.formLogin}
                >
                  <TextField
                    id="email"
                    label="Email"
                    variant="standard"
                    inputRef={inputRefEmail}
                    defaultValue={formik.values.email}
                    onChange={() => handleChange("email", inputRefEmail.current?.value)}
                    required
                  />
                  <FormControl variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">
                      Password
                    </InputLabel>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      inputRef={inputRefPassword}
                      defaultValue={formik.values.password}
                      onChange={() =>
                        handleChange("password", inputRefPassword.current?.value)
                      }
                      required
                    />
                  </FormControl>
                  <Button 
                    sx={styles.button}
                    onClick={formik.handleSubmit}
                  >
                    Login
                  </Button>
                </form>

                <Box className={classes.loginFormCekAccount}>
                  <p style={styles.disclaimerAkun}>Belum punya akun ?</p>
                  <p 
                    style={styles.toRegister} 
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/register");
                    }}
                  >
                    Daftar
                  </p>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box className={classes.containerFooter}>
            <footer style={styles.footer}>&copy; 2024. Tigana Reymansyah</footer>
          </Box>
        </Box>
      </Box>

      {openAlert && (
        <Alert
          open={openAlert}
          close={handleCloseAlert}
          severity={severity}
          title={title}
          message={message}
        />
      )}
    </>
  );
}
