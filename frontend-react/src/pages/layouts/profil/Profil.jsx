import { useEffect, useState } from "react";
import { 
    Box, 
    Button, 
    FormControl, 
    FormControlLabel, 
    FormLabel, 
    IconButton, 
    InputAdornment, 
    InputLabel, 
    OutlinedInput, 
    Radio, 
    RadioGroup, 
    TextField, 
    Typography 
} from "@mui/material";
import { 
    AddCircle, 
    ArrowBack, 
    CalendarToday, 
    Close, 
    DeleteForever, 
    LockReset, 
    Person, 
    Save,
    Visibility,
    VisibilityOff
} from "@mui/icons-material";
import { useMediaQuery } from "react-responsive";
import { useProfilStyles } from "./style";
import { orange } from "@mui/material/colors";
import Navbar from "../../../components/navbar/Navbar";
import DatePicker from "react-datepicker";
import InputMask from "react-input-mask";
import "react-datepicker/dist/react-datepicker.css";
import { formatDateYYYYMMDD } from "../../../services/utils";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { apiEditRegisterUser } from "../../../api/api";
import Alert from "../../../components/Alert/Alert";

export default function Profil(props) {
    console.log(props);

    const isMobile = useMediaQuery({ maxWidth: 991 });
    const classes = useProfilStyles({ isMobile });

    const styles = {
        buttonAdd: {
            padding: "7px 14px",
            textAlign: "center",
            cursor: "pointer",
            borderRadius: "6px",
            color: "#fff",
            backgroundColor: "#0F67B1",
            "&:hover": {
                backgroundColor: "#3FA2F6",
            },

        },

        buttonEdit: {
            padding: "7px 14px",
            textAlign: "center",
            cursor: "pointer",
            borderRadius: "6px",
            color: "#fff",
            backgroundColor: "#367E18",
            "&:hover": {
                backgroundColor: "#54B435",
            },
        },

        buttonDelete: {
            padding: "7px 14px",
            textAlign: "center",
            cursor: "pointer",
            borderRadius: "6px",
            color: "#fff",
            backgroundColor: "#D21312",
            "&:hover": {
                backgroundColor: "#FF0303",
            },
        },

        clearMarginTextField: {
            "&.MuiFormControl-marginNormal": {
                marginTop: "0px" 
            }
        }
    };

    const [dataProfile, setDataProfile] = useState({
        id_user: "",
        fullname: "",
        tbt: "",
        gender: "",
        email: "",
        password: ""
    });
    const [boolUbahDataProfil, setBoolUbahDataProfil] = useState(false);
    const [boolUbahPassword, setBoolUbahPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [severity, setSeverity] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [cekEdit, setCekEdit] = useState("");

    let profil = true;

    useEffect(() => {
        if(props.userLogin && 
        !boolUbahDataProfil) {
            setDataProfile((prev) => ({
                ...prev,
                id_user: props.userLogin.id_user,
                fullname: props.userLogin.fullname,
                tbt: props.userLogin.tbt,
                gender: props.userLogin.gender,
                email: props.userLogin.email,
                password: ""
            }));
        }
    }, [props.userLogin, boolUbahDataProfil]);

    const handleAlert = (open, severity, title, message, cekEdit) => {
        setOpenAlert(open);
        setSeverity(severity);
        setTitle(title);
        setMessage(message);
        setCekEdit(cekEdit);
    };

    const handleCloseAlert = () => {
        setOpenAlert(false);
        if(severity === "successNoReload") {
            if(cekEdit === 1) {
                location.href = "/";
            } else {
                location.href = "/booking";
            }
        }
    }

    const handleUbahDataProfil = () => {
        setBoolUbahDataProfil(true);
    };

    const handleBatalDataProfil = () => {
        setBoolUbahDataProfil(false);
    };

    const handleUbahPassword = () => {
        setBoolUbahPassword((show) => !show);
        setDataProfile((prev) => ({
            ...prev,
            password: ""
        }));
    };

    const handleInputClick = (e) => {
        if (e && e.target) {
            e.target.readOnly = true;
            e.target.placeholder = "dd/MM/yyyy";
            e.target.blur();
            e.target.readOnly = false;
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleChange = (field, value) => {
        setDataProfile((prev) => ({
            ...prev,
            [field]: field === "tbt" ? formatDateYYYYMMDD(value) : value
        }));
    };

    const handleEditRegisterUser = async (e) => {
        e.preventDefault();

        if(boolUbahPassword && 
        dataProfile.password === "") {
            handleAlert(
                true,
                "warning",
                "Pemberitahuan",
                "Password tidak boleh kosong"
            );

            return false;
        }

        try {
            let dataEdit = {};

            if(boolUbahPassword) {
                dataEdit = {
                    id: dataProfile.id_user,
                    password: dataProfile.password,
                    is_edit: 1
                }
            } else {
                dataEdit = {
                    id: dataProfile.id_user,
                    fullname: dataProfile.fullname,
                    tbt: formatDateYYYYMMDD(dataProfile.tbt),
                    gender: dataProfile.gender,
                    email: dataProfile.email,
                    is_edit: 0
                };
            }

            const result = await apiEditRegisterUser({
                body: JSON.stringify(dataEdit)
            });

            const { code, status, message, data } = result;

            if(status === "success") {
                if(dataEdit.is_edit === 1) {
                    handleAlert(
                        true,
                        "successNoReload",
                        "Success",
                        `${message}, silahkan login ulang`,
                        1
                    );

                    localStorage.removeItem("userLogin");
                    localStorage.removeItem("tokenTimestamp");
                } else {
                    handleAlert(
                        true,
                        "successNoReload",
                        "Success",
                        message,
                        0
                    );
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    console.log(dataProfile);

    return (
        <>
            <Box className={classes.profilBackground}>
                <Navbar />
                <Box className={classes.containerParent}>
                    <Typography 
                        sx={{ 
                            textAlign: "center", 
                            fontSize: 24,
                            fontWeight: "bold",
                            letterSpacing: "2px"
                        }}
                    >
                        Profile
                    </Typography>

                    <Box className={classes.containerChild}>
                        <Box className={classes.setProfil}>
                            <Box className={classes.boxProfil}>
                                {profil ? (
                                    <Zoom>
                                        <img 
                                            src={"https://i.pinimg.com/564x/52/df/9f/52df9f251e55b28c5ea69444fdb3c0db.jpg"}
                                            style={{ 
                                                width: "16.5vw", 
                                                height: "39vh", 
                                                borderRadius: "16px" 
                                            }}
                                        />
                                    </Zoom>
                                ) : (
                                    <Person 
                                        style={{ 
                                            fontSize: "16.5vw",
                                            color: "#f3f3f3"
                                        }}
                                    />
                                )}
                            </Box>

                            {boolUbahDataProfil ? (
                                <Box className={classes.boxButtonProfil} sx={{ display: "none" }}>
                                    <Button
                                        sx={styles.buttonDelete}
                                        startIcon={<DeleteForever />}
                                        // onClick={() => handleDeleteDestinasi(data.id)}
                                    >
                                        Hapus Profil
                                    </Button>

                                    {profil ? (
                                        <Button
                                            sx={styles.buttonEdit}
                                            startIcon={<LockReset />}
                                            // onClick={() => handleDeleteDestinasi(data.id)}
                                        >
                                            Ubah Profil
                                        </Button>
                                    ) : (
                                        <Button
                                            sx={styles.buttonAdd}
                                            startIcon={<AddCircle />}
                                            // onClick={() => handleDeleteDestinasi(data.id)}
                                        >
                                            Tambah Profil
                                        </Button>
                                    )}
                                </Box>
                            ) : null}
                        </Box>

                        <Box className={classes.setForm}>
                            {!boolUbahPassword ? (
                                <>
                                    <TextField
                                        // label={boolUbahDataProfil ? "Nama Lengkap" : ""}
                                        label={
                                            <>
                                                Nama Lengkap<span style={{ color: "red" }}> *</span>
                                            </>
                                        }
                                        name="namaLengkap"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        value={dataProfile?.fullname}
                                        onChange={(e) => handleChange("fullname", e.target.value)}
                                        disabled={!boolUbahDataProfil}
                                        InputProps={{
                                            classes: {
                                                disabled: classes.disabled, 
                                                input: classes.inputCapitalize 
                                            },
                                        }}
                                        sx={{
                                            ...styles.clearMarginTextField,
                                            "& .MuiInputLabel-root.Mui-disabled": {
                                                WebkitTextFillColor: "#aaa !important",
                                            },
                                        }}
                                    />

                                    <Box className={classes.datePickerWrapper}>
                                        <DatePicker
                                            // placeholderText="dd/mm/yyyy"
                                            fullWidth
                                            dropdownMode="select"
                                            disabled={!boolUbahDataProfil}
                                            onInputClick={handleInputClick}
                                            dateFormat={"dd/MM/yyyy"}
                                            showYearDropdown
                                            showMonthDropdown
                                            yearDropdownItemNumber={100}
                                            maxDate={new Date()}
                                            scrollableYearDropdown
                                            className={classes.calendarContainer}
                                            calendarClassName={classes.calendar}
                                            selected={
                                                dataProfile?.tbt &&
                                                new Date(dataProfile.tbt)
                                            }
                                            // popperPlacement="right-start"
                                            onChangeRaw={(event) => {
                                                const rawInput = event.target.value;
                                                const isValidInput = /^[0-3]?[0-9]\/[0-1]?[0-9]{0,4}$/.test(
                                                    rawInput
                                                );

                                                if (isValidInput) {
                                                    if (rawInput.length === 10) {
                                                        const [day, month, year] = rawInput.split("/");
                                                        const parsedDate = new Date(`${year}-${month}-${day}`);

                                                        if (!isNaN(parsedDate.getTime())) {
                                                            handleChange("tbt", parsedDate)
                                                        } else {
                                                            console.log("Invalid date");
                                                        }
                                                    }
                                                } else {
                                                    console.log("Invalid input format");
                                                }
                                            }}
                                            onChange={(e) => handleChange("tbt", e)}
                                            customInput={
                                                <InputMask
                                                    mask="99/99/9999"
                                                    // value={props.value}
                                                >
                                                    {(inputProps) => (
                                                        <TextField
                                                            {...inputProps}
                                                            // label="Birthday (dd/mm/yyyy)"
                                                            label={
                                                                <>
                                                                    Birthday (dd/mm/yyyy)<span style={{ color: "red" }}> *</span>
                                                                </>
                                                            }
                                                            variant="outlined"
                                                            fullWidth
                                                            margin="normal"
                                                            type="tel"
                                                            // disableUnderline
                                                            disabled={!boolUbahDataProfil}
                                                            sx={{
                                                                cursor: "pointer",
                                                                "& .Mui-disabled": {
                                                                    WebkitTextFillColor: "black !important",
                                                                    backgroundColor: "#fffff",
                                                                },
                                                                "& .MuiInputLabel-root.Mui-disabled": {
                                                                    WebkitTextFillColor: "#aaa !important",
                                                                },
                                                            }}
                                                            InputProps={{
                                                                style: { cursor: "pointer", width: "100%" },
                                                                autoComplete: "off",
                                                                endAdornment: <CalendarToday sx={{ paddingBottom: "6px" }} />
                                                            }}
                                                        />
                                                    )}
                                                </InputMask>
                                            }
                                        />
                                    </Box>

                                    <FormControl sx={{ paddingTop: "16px" }} disabled={!boolUbahDataProfil}>
                                        <FormLabel id="demo-row-radio-buttons-group-label">
                                            Jenis Kelamin
                                            <span style={{ color: !boolUbahDataProfil ? "#aaa" : "red" }}>&nbsp;*</span>
                                        </FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            value={dataProfile?.gender}
                                            onChange={(e) => handleChange("gender", e.target.value)}
                                        >
                                            <FormControlLabel
                                                value="L"
                                                control={<Radio color="default" />}
                                                label="Laki-laki"
                                            />
                                            <FormControlLabel
                                                value="P"
                                                control={<Radio color="default" />}
                                                label="Perempuan"
                                            />
                                        </RadioGroup>
                                    </FormControl>

                                    <TextField
                                        label="Email"
                                        name="email"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        value={dataProfile?.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                        disabled
                                        InputProps={{
                                            classes: {
                                                disabled: classes.disabled 
                                            },
                                        }}
                                    />
                                </>
                            ) : (
                                <FormControl
                                    variant="outlined"
                                    sx={{ width: "100%", marginTop: "16px" }}
                                    disabled={!boolUbahDataProfil}
                                >
                                    <InputLabel htmlFor="standard-adornment-password">
                                        Password Baru
                                        <span style={{ color: "red" }}>&nbsp;*</span>
                                    </InputLabel>
                                    <OutlinedInput
                                        id="passwordBaru"
                                        label="Password Baru"
                                        value={dataProfile?.password}
                                        onChange={(e) => handleChange("password", e.target.value)}
                                        type={showPassword ? "text" : "password"}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickShowPassword}>
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            )}

                            <Box sx={{ paddingTop: "16px", display: "flex", justifyContent: "end" }}>
                                {boolUbahDataProfil ? (
                                    <Box sx={{ display: "flex", gap: "12px" }}>
                                        {!boolUbahPassword && (
                                            <Button
                                                sx={styles.buttonDelete}
                                                startIcon={<Close />}
                                                onClick={handleBatalDataProfil}
                                            >
                                                Batalkan
                                            </Button>
                                        )}

                                        <Button
                                            sx={styles.buttonEdit}
                                            startIcon={!boolUbahPassword ? <LockReset /> : <ArrowBack />}
                                            onClick={handleUbahPassword}
                                        >
                                            {!boolUbahPassword ? "Ubah Password" : "Kembali"}
                                        </Button>

                                        <Button
                                            sx={styles.buttonAdd}
                                            startIcon={<Save />}
                                            onClick={(e) => handleEditRegisterUser(e)}
                                        >
                                            Save
                                        </Button>
                                    </Box>
                                ) : (
                                    <Button
                                        sx={styles.buttonEdit}
                                        startIcon={<LockReset />}
                                        onClick={handleUbahDataProfil}
                                    >
                                        Edit
                                    </Button>
                                )}
                            </Box>
                        </Box>
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