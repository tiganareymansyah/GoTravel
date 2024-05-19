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
import { AirportShuttle, Logout } from "@mui/icons-material";
import { useFormik } from "formik";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { apiLoginAdminAccount } from "../../../api/api.js";
import Alert from "../../../components/Alert/Alert.jsx";
import { useLoginAdminStyles } from "./style";
import { useMediaQuery } from "react-responsive";
import MoveContent from "../../../components/MoveContent/MoveContent.jsx";
import { orange } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

export default function LoginAdmin() {
  const isMobile = useMediaQuery({ maxWidth: 991 });
  const classes = useLoginAdminStyles({ isMobile });

  const styles = {
    judulNavbarLoginAdmin: {
      margin: 0,
      padding: 0,
      color: "white",
      fontStyle: "italic",
      fontWeight: "bold",
      fontSize: "32px",
      display: "flex",
    },

    textGoTravel: {
      textAlign: "center",
      color: `${orange[100]}`,
      fontSize: "70px",
      fontFamily: "Curlz MT",
      letterSpacing: "10px",
    },

    buttonBackLoginAdmin: {
      padding: "7px 14px",
      fontFamily: "serif",
      textAlign: "center",
      cursor: "pointer",
      borderRadius: "4px",
      color: "black",
      backgroundColor: "#fff",
      "&:hover": {
        color: "white",
      },
    },

    textMoveContent: {
      color: `${orange[100]}`,
      textAlign: "center",
      letterSpacing: "2px",
    },

    judulFormLoginAdmin: {
      textAlign: "center",
      letterSpacing: "5px",
    },

    button: {
      border: "1px solid",
      backgroundColor: "blue",
      color: "white",
      border: "none",
      fontFamily: "serif",
      letterSpacing: "2px",
      fontWeight: "bold",
    },

    formLoginAdmin: {
      margin: "32px",
      display: "flex",
      flexDirection: "column",
      gap: "32px",
    },

    footer: {
      color: `${orange[100]}`,
      fontStyle: "italic",
      letterSpacing: "4px",
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
    if(token && location.pathname.includes("/admin") && !location.pathname.includes("/home")) {
      navigate("/home");
    }
  }, [token]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      handleLoginAdmin(values);
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
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
    if(severity === "successNoReload") {
      location.href = "/home";
    } else {
      navigate("/admin");
    }
  };

  const handleLoginAdmin = async (params) => {
    try {
      const result = await apiLoginAdminAccount({
        body: JSON.stringify(params),
      });

      const { status, message, data } = result;

      if (status === "success") {
        Promise.all([
          localStorage.setItem("userLogin", JSON.stringify(data)),
          localStorage.setItem(
            "tokenTimestamp",
            new Date().getTime().toString()
          ),
        ]);

        handleAlert(true, "successNoReload", "Sukses", message);
      } else {
        handleAlert(true, "error", "Gagal", message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  console.log(formik.values);

  return (
    <>
      <Box className={classes.loginAdminBackground}>
        <Box className={classes.containerRoot}>
          <Box className={classes.containerNavbarLoginAdmin}>
            <Box className={classes.navbarIcon}>
              <p>
                <AirportShuttle fontSize="large" sx={{ color: "#fff" }} />
              </p>
              <p style={styles.judulNavbarLoginAdmin}>
                Go<Box sx={{ color: `${orange[100]}` }}>Travel</Box>
              </p>
            </Box>

            <Box className={classes.buttonBackLoginAmin}>
              <Button
                startIcon={<Logout />}
                sx={styles.buttonBackLoginAdmin}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
              >
                Kembali
              </Button>
            </Box>
          </Box>

          <Box className={classes.containerFormLoginAdmin}>
            <Box className={classes.containerLoginAdminGoTravel}>
              <Box>
                <p style={styles.textGoTravel}>GoTravel</p>
                <p style={styles.textMoveContent}>
                  <MoveContent />
                </p>
              </Box>
            </Box>

            <Box className={classes.containerForm}>
              <Box className={classes.loginAdminForm}>
                <h3 style={styles.judulFormLoginAdmin}>LOGIN ADMIN</h3>
                <form
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      // e.preventDefault();
                      formik.handleSubmit();
                    }
                  }}
                  style={styles.formLoginAdmin}
                >
                  <TextField
                    id="email"
                    label="Email"
                    variant="standard"
                    inputRef={inputRefEmail}
                    defaultValue={formik.values.email}
                    onChange={() =>
                      handleChange("email", inputRefEmail.current?.value)
                    }
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
                        handleChange(
                          "password",
                          inputRefPassword.current?.value
                        )
                      }
                      required
                    />
                  </FormControl>
                  <Button sx={styles.button} onClick={formik.handleSubmit}>
                    Login
                  </Button>
                </form>
              </Box>
            </Box>
          </Box>

          <Box className={classes.containerFooter}>
            <footer style={styles.footer}>
              &copy; 2024. Tigana Reymansyah
            </footer>
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
