import { useState } from "react";
import { 
    Box, 
    Button, 
    Dialog, 
    DialogContent, 
    DialogTitle, 
    IconButton, 
    Typography 
} from "@mui/material";
import { Close } from "@mui/icons-material";
import OTPInput from "react-otp-input";
import { useMediaQuery } from "react-responsive";
import { useFormik } from "formik";
import { apiValidationOtp } from "../../api/api";
import Alert from "../Alert/Alert"

export default function FormOtp({
    props, 
    email, 
    handleClose 
}) {
    const isMobile = useMediaQuery({ maxWidth: 991 });

    const [openAlert, setOpenAlert] = useState(false);
    const [severity, setSeverity] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    const formik = useFormik({
        initialValues: {
            email: email, 
            kode_otp: "" 
        },
    
        onSubmit: async (values) => {
            handleValidationOtp(values);
        },
    });

    const handleAlert = (open, severity, title, message) => {
        setOpenAlert(open);
        setSeverity(severity);
        setTitle(title);
        setMessage(message);
    }
    
    const handleCloseAlert = () => {
        setOpenAlert(false);
        if(severity === "successNoReload") {
            location.href = "/";
        } else if(severity === "error") {
            navigate("/register");
        } else {
            navigate("/");
        }
    }

    const handleChange = (value) => {
        formik.setFieldValue("kode_otp", value);
    };

    const handleValidationOtp = async (data) => {
        props.doLoad();
        try {
            const result = await apiValidationOtp({
                body: JSON.stringify(data)
            });

            const { code, status, message } = result;

            if (status === "success") {
                handleAlert(
                    true,
                    "successNoReload",
                    "Success",
                    "Register berhasil"
                )
                props.doLoad();
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                handleAlert(
                    true,
                    "error",
                    "Error",
                    err.response.data.message
                );
                props.doLoad();
            }
        }
    }

    console.log(formik.values);

    return (
        <>
            <Dialog
                fullScreen={isMobile ? true : false}
                open={open}
                PaperProps={{
                    style: {
                        width: "800px",
                        borderRadius: "10px",
                        padding: isMobile ? 0 : 20,
                        marginTop: isMobile ? 20 : 0,
                    },
                }}
            >
                <DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: "white",
                            borderRadius: "5px",
                            backgroundColor: "#18345c",
                            padding: "5px",
                            "&:hover": {
                                backgroundColor: "gray",
                            },
                        }}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <Box>
                        <Typography
                            sx={{
                                fontSize: 20,
                                fontWeight: 700,
                                marginBottom: 5,
                            }}
                        >
                            Verifikasi Kode OTP
                        </Typography>
                        <OTPInput
                            value={formik.values.kode_otp}
                            onChange={handleChange}
                            numInputs={6}
                            renderSeparator={<span>&nbsp;</span>}
                            renderInput={(props) => <input {...props} />}
                            inputStyle={{
                                fontSize: isMobile ? 24 : 26,
                                padding: isMobile ? 6 : 16,
                                borderRadius: "10px",
                            }}
                            containerStyle={{
                                margin: 10,
                                gap: "10px",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        />

                        <Typography
                            sx={{
                                fontSize: 14,
                                fontWeight: 700,
                                marginBottom: 5,
                                textAlign: "center",
                            }}
                        >
                            Silahkan periksa email anda untuk mendapatkan Kode OTP
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Button
                                onClick={formik.handleSubmit}
                                sx={{
                                    textAlign: "center",
                                    backgroundColor: "#18345c",
                                    color: "white",
                                    gap: "10px",
                                    borderRadius: "5px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    cursor: "pointer",
                                    textTransform: "capitalize",
                                    margin: 1,
                                    "&:hover": {
                                    backgroundColor: "#d8d4d4",
                                    color: "black",
                                    },
                                }}
                            >
                                <Typography>Verifikasi</Typography>
                            </Button>
                        </Box>

                        {/* <Box
                            sx={{
                                fontFamily: "Nunito Sans",
                                fontSize: 14,
                                fontWeight: 700,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            {seconds === 0 ? (
                                <Typography style={{ color: "red" }}>Kode OTP Telah kadaluwarsa</Typography>
                            ) : (
                                <Typography>
                                Kode OTP akan kadaluwarsa dalam waktu {minutes} menit {remainingSeconds} detik
                                </Typography>
                            )}
                        </Box>

                        {seconds === 0 ? (
                            <Box
                                sx={{
                                display: "flex",
                                justifyContent: "center",
                                }}
                            >
                                <Button
                                    onClick={() => OTPLoad(email)}
                                    sx={{
                                        textAlign: "center",
                                        backgroundColor: "#18345c",
                                        color: "white",
                                        gap: "10px",
                                        borderRadius: "5px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        cursor: "pointer",
                                        textTransform: "capitalize",
                                        margin: 1,
                                        "&:hover": {
                                        backgroundColor: "#d8d4d4",
                                        color: "black",
                                        },
                                    }}
                                >
                                    <Typography>Kirim Ulang Kode OTP</Typography>
                                </Button>
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                display: "flex",
                                justifyContent: "center",
                                }}
                            >
                                <Button
                                    onClick={formik.handleSubmit}
                                    sx={{
                                        textAlign: "center",
                                        backgroundColor: "#18345c",
                                        color: "white",
                                        gap: "10px",
                                        borderRadius: "5px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        cursor: "pointer",
                                        textTransform: "capitalize",
                                        margin: 1,
                                        "&:hover": {
                                        backgroundColor: "#d8d4d4",
                                        color: "black",
                                        },
                                    }}
                                >
                                    <Typography>Verifikasi</Typography>
                                </Button>
                            </Box>
                        )} */}
                    </Box>
                </DialogContent>
            </Dialog>

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
};