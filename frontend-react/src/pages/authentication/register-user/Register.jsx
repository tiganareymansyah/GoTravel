import { useRef, useState } from "react";
import { 
    Box, 
    Button, 
    FormControl, 
    FormControlLabel, 
    FormLabel, 
    IconButton, 
    Input, 
    InputAdornment, 
    InputLabel, 
    Radio, 
    RadioGroup, 
    TextField 
} from "@mui/material";
import { 
    AirportShuttle,
    VisibilityOff,
    Visibility,
    Logout,
    CalendarToday
} from '@mui/icons-material';
import { useFormik } from "formik";
import { apiRegisterAccount } from "../../../api/api.js";
import { useRegisterStyles } from "./style.js";
import { useMediaQuery } from "react-responsive";
import MoveContent from "../../../components/MoveContent/MoveContent.jsx";
import { orange } from "@mui/material/colors";
import DatePicker from "react-datepicker";
import InputMask from "react-input-mask";

export default function Register() {
    const styles = {
        judulNavbarRegister: {
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
        
        judulFormRegister: {
          fontFamily: "Curlz MT",
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

        buttonBackRegister: {
            padding: "7px 14px",
            textAlign: "center",
            cursor: "pointer",
            borderRadius: "4px",
            color: "#000",
            backgroundColor: "#fff",
            "&:hover": {
                color: "white"
            }
        },
    
        formRegister: {
          margin: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "24px"
        },
    
        disclaimerAkun: {
          color: "white",
          letterSpacing: "1px"
        },
    
        footer: {
          color: `${orange[100]}`,
          fontStyle: "italic",
          letterSpacing: "4px"
        },
    };
    
    const isMobile = useMediaQuery({ maxWidth: 991 });
    const classes = useRegisterStyles({ isMobile });

    const [showPassword, setShowPassword] = useState(false);

    const inputRefFullName = useRef(null);
    const inputRefTbt = useRef(null);
    const inputRefGender = useRef(null);
    const inputRefEmail = useRef(null);
    const inputRefPassword = useRef(null);

    const formik = useFormik({
        initialValues: {
            fullname: "",
            tbt: "",
            gender: "",
            email: "",
            password: "",
        },
    
        onSubmit: async (values) => {
          handleRegister(values);
        },
    });

    const handleRegister = async (data) => {
        try {
            const result = await apiRegisterAccount({
                body: JSON.stringify(data)
            });

            const { status, message } = result;

            if (status === "success") {
                alert("Register Berhasil");
            } else {
                console.log(message);
            }
        } catch (err) {
            throw err
        }
    }

    const handleChange = (field, value) => {
        formik.setFieldValue(field, value);
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleInputClick = (e) => {
        if (e && e.target) {
          e.target.readOnly = true;
          e.target.placeholder = "dd/MM/yyyy";
          e.target.blur();
          e.target.readOnly = false;
        }
    };

    console.log(formik.values);

    return (
        <>
            <Box className={classes.registerBackground}>
                <Box className={classes.containerRoot}>
                    <Box className={classes.containerNavbarRegister}>
                        <Box className={classes.navbarIcon}>
                            <p><AirportShuttle fontSize="large" sx={{ color: "#fff" }} /></p>
                            <p style={styles.judulNavbarRegister}>
                                Go<Box sx={{ color: `${orange[100]}` }}>Travel</Box>
                            </p>
                        </Box>

                        <Box className={classes.buttonBackRegister}>
                            <Button 
                                startIcon={<Logout />} 
                                sx={styles.buttonBackRegister}
                                onClick={(e) => {
                                    e.preventDefault();
                                    location.href = "/"
                                }}
                            >
                                Kembali
                            </Button>
                        </Box>
                    </Box>

                    <Box className={classes.containerFormRegister}>
                        <Box className={classes.containerRegisterGoTravel}>
                            <Box>
                                <p style={styles.textGoTravel}>GoTravel</p>
                                <p style={styles.textMoveContent}><MoveContent /></p>
                            </Box>
                        </Box>

                        <Box className={classes.containerForm}>
                            <Box className={classes.registerForm}>
                                <h3 style={styles.judulFormRegister}>REGISTER</h3>
                                <form 
                                    onKeyDown={
                                        (e) => e.key === "Enter" && formik.handleSubmit()
                                    }
                                    style={styles.formRegister}
                                >
                                    <TextField
                                        id="fullname"
                                        label="Fullname"
                                        variant="standard"
                                        inputRef={inputRefFullName}
                                        defaultValue={formik.values.fullname}
                                        onChange={() => handleChange("fullname", inputRefFullName.current?.value)}
                                        required
                                    />

                                    <Box className={classes.rowContainer}>
                                        Birthday
                                        <Box
                                            sx={{
                                                flex: 2,
                                                width: "100%",
                                                "& .react-datepicker-wrapper": {
                                                    width: "100%",
                                                },
                                                "& .MuiOutlinedInput-input": {
                                                    cursor: "pointer",
                                                },
                                            }}
                                        >
                                            <DatePicker
                                                placeholderText="dd/mm/yyyy"
                                                dropdownMode="select"
                                                // disabled={}
                                                onInputClick={handleInputClick}
                                                dateFormat={"dd/MM/yyyy"}
                                                showYearDropdown
                                                showMonthDropdown
                                                yearDropdownItemNumber={100}
                                                maxDate={new Date()}
                                                scrollableYearDropdown
                                                className={classes.calendarContainer}
                                                calendarClassName={classes.calendar}
                                                selected={formik.values.tbt && new Date(formik.values.tbt)}
                                                onChangeRaw={(event) => {
                                                    const rawInput = event.target.value;
                                                    const isValidInput = /^[0-3]?[0-9]\/[0-1]?[0-9]\/[0-9]{0,4}$/.test(rawInput);

                                                    if (isValidInput) {
                                                        if (rawInput.length === 10) {
                                                            const [day, month, year] = rawInput.split("/");
                                                            const parsedDate = new Date(`${year}-${month}-${day}`);

                                                            if (!isNaN(parsedDate.getTime())) {
                                                                formik.setFieldValue("tbt", parsedDate);
                                                            } else {
                                                                console.log("Invalid date");
                                                            }
                                                        }
                                                    } else {
                                                        console.log("Invalid input format");
                                                    }
                                                }}
                                                onChange={(value) => {
                                                    formik.setFieldValue("tbt", value);
                                                }}
                                                customInput={
                                                    <InputMask mask="99/99/9999">
                                                        {(inputProps) => (
                                                            <TextField
                                                                {...inputProps}
                                                                type="tel"
                                                                disableUnderline
                                                                size="small"
                                                                variant="outlined"
                                                                sx={{
                                                                    width: "100%",
                                                                    cursor: "pointer",
                                                                    "& .Mui-disabled": {
                                                                        WebkitTextFillColor: "black !important",
                                                                        background: "#d8d4d4",
                                                                    },
                                                                }}
                                                                InputProps={{
                                                                    style: { cursor: "pointer" },
                                                                    autoComplete: "off",
                                                                    endAdornment: <CalendarToday />,
                                                                }}
                                                            />
                                                        )}
                                                    </InputMask>
                                                }
                                            />
                                        </Box>
                                    </Box>

                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                        >
                                            <FormControlLabel 
                                                value="l" 
                                                control={
                                                    <Radio 
                                                        color="default" 
                                                        value="l"
                                                        onChange={(e) => handleChange("gender", e.target.value)}
                                                    />
                                                } 
                                                label="Laki-laki" 
                                            />
                                            <FormControlLabel 
                                                value="p" 
                                                control={
                                                    <Radio 
                                                        color="default" 
                                                        value="p"
                                                        onChange={(e) => handleChange("gender", e.target.value)}
                                                    />
                                                } 
                                                label="Perempuan" 
                                            />
                                        </RadioGroup>
                                    </FormControl>
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
                                        Daftar
                                    </Button>
                                </form>
                            </Box>
                        </Box>
                    </Box>

                    <Box className={classes.containerFooter}>
                        <footer style={styles.footer}>&copy; 2024. Tigana Reymansyah</footer>
                    </Box>
                </Box>
            </Box>
        </>    
    )
}