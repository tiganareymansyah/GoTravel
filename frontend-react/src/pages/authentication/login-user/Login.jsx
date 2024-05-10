import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { apiLoginAccount } from "../../../api/api.js";
import Alert from "../../../components/Alert/Alert.jsx";
import { useLoginStyles } from "./style";
import { useMediaQuery } from "react-responsive";

export default function Login() {
  const isMobile = useMediaQuery({ maxWidth: 991 });
  const classes = useLoginStyles({ isMobile });
  
  const [showPassword, setShowPassword] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const inputRefEmail = useRef(null);
  const inputRefPassword = useRef(null);

  const [token, setToken] = useState(localStorage.getItem('userLogin'));

  useEffect(() => {
    const checkTokenExpiration = () => {
      const storedToken = localStorage.getItem('userLogin');
      const storedTimestamp = localStorage.getItem('tokenTimestamp');

      if (storedToken && storedTimestamp) {
        // const expirationTime = 60 * 1000; // 1 menit
        const expirationTime = 24 * 60 * 60 * 1000 // 1 hari
        const currentTimestamp = new Date().getTime();

        if (currentTimestamp - parseInt(storedTimestamp, 10) > expirationTime) {
          localStorage.removeItem('userLogin');
          localStorage.removeItem('tokenTimestamp');
          setToken(null);
        }
      }
    };

    checkTokenExpiration();

    const intervalId = setInterval(() => {
      checkTokenExpiration();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [token]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      handleLogin(values);
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
    // window.location.href = "/";
  }

  const handleLogin = async (params) => {
    try {
      const result = await apiLoginAccount({
        body: JSON.stringify(params)
      });

      const { status, message, data } = result;

      if(status === "success") {
        setToken(JSON.stringify(data));

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
        <Box className={classes.loginContainer}>
          <Box>
            <h2>Mau kemana hari ini</h2>
          </Box>

          <Box className={classes.loginForm}>
            <h3 
              style={{ 
                fontFamily: "Curlz MT", 
                textAlign: "center", 
                letterSpacing: "5px" 
              }}
            >
              LOGIN
            </h3>
            <form 
              onKeyDown={(e) => {
                if(e.key === "Enter") {
                  // e.preventDefault();
                  formik.handleSubmit();
                }
              }}
              style={{
                margin: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "32px"
              }}
            >
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                inputRef={inputRefEmail}
                defaultValue={formik.values.email}
                onChange={() => handleChange("email", inputRefEmail.current?.value)}
                required
              />
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
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
                sx={{ 
                  border: "1px solid", 
                  backgroundColor: "blue" 
                }}
                onClick={formik.handleSubmit}
              >
                Login
              </Button>
            </form>
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
