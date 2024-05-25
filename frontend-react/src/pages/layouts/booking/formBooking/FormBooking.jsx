import { Box, Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { ArrowBack } from '@mui/icons-material';
import { useMediaQuery } from "react-responsive";
import { useFormBookingStyles } from "./style";
import { orange } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { sectionTouristDestination } from "./section/sectionTouristDestination";
import { sectionTouristData } from "./section/sectionTouristData";
import { sectionTouristPayment } from "./section/sectionTouristPayment";
import { useFormik } from "formik";
import { apiGetTouristDestination, apiGetTouristTransportation } from "../../../../api/api";

export default function FormBooking(props) {
    const isMobile = useMediaQuery({ maxWidth: 991 });
    const classes = useFormBookingStyles({ isMobile });

    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const stepDone = [
        'Tujuan Wisata',
        'Data Wisatawan',
        'Pembayaran',
    ];

    const [selectState, setSelectState] = useState({
        touristTransportation: {
            selectedState: "",
            states: [],
        },
        touristDestination: {
            selectedState: "",
            states: [],
        },
    });

    const styles = {
        buttonBack: {
            padding: "7px 14px",
            textAlign: "center",
            cursor: "pointer",
            borderRadius: "8px",
            color: "black",
            backgroundColor: "#fff",
            "&:hover": {
                color: orange[100],
            },
        },

        footer: {
            color: "#fff",
            fontStyle: "italic",
            letterSpacing: "4px"
        },
    };

    const formik = useFormik({
        initialValues: {
            touristDestination: "", 
            touristTransportation: "", 
            touristLading: "" 
        },
    
        onSubmit: async (values) => {
            // handleLoginUser(values);
        },
    });

    useEffect(() => {
        if(selectState.touristTransportation.selectedState) {
            formik.setFieldValue("touristLading", selectState.touristTransportation.selectedState.muatan)
        }
    }, [selectState.touristTransportation.selectedState]);

    useEffect(() => {
        getTouristTransportation();
        getTouristDestination();
    }, []);

    const getTouristDestination = async () => {
        try {
            const record = await apiGetTouristDestination();

            const { status, data } = record;

            if(status === "success") {
                setSelectState((prev) => ({
                    ...prev,
                    touristDestination: {
                        ...prev["touristDestination"],
                        states: data,
                    },
                }));
            } else {
                console.log("Not Found");
            }
        } catch (err) {
            console.log(err)
        }
    };

    const getTouristTransportation = async () => {
        try {
            const record = await apiGetTouristTransportation();

            const { status, data } = record;

            if(status === "success") {
                setSelectState((prev) => ({
                    ...prev,
                    touristTransportation: {
                        ...prev["touristTransportation"],
                        states: data,
                    },
                }));
            } else {
                console.log("Not Found");
            }
        } catch (err) {
            console.log(err)
        }
    };

    const handleChangeSelectState = (name, state) => {
        setSelectState((prev) => ({
          ...prev,
          [name]: {
            ...prev[name],
            selectedState: state,
          },
        }));

        formik.setFieldValue(name, state.value);
    };

    // const handleBlur = (fieldName, value) => {
    //     formik.setFieldValue(fieldName, value);
    // };

    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrev = () => {
        step === 0 ? setStep(0) : setStep(step - 1);
    };

    const [hoveredOption, setHoveredOption] = useState(null);

    const handleMouseOver = (option) => {
        setHoveredOption(option);
    };

    const handleMouseLeave = () => {
        setHoveredOption(null);
    };

    console.log(formik.values);
    console.log(selectState);

    return (
        <>
            <Box className={classes.formBookingBackground}>
                <Box className={classes.containerNavbarFormBooking}>
                    <Box className={classes.buttonBack}>
                        <Button
                            sx={styles.buttonBack}
                            startIcon={<ArrowBack />}
                            onClick={(e) => {
                                e.preventDefault()
                                navigate("/booking")
                            }}
                        >
                            Kembali
                        </Button>
                    </Box>
                </Box>

                <Box className={classes.containerFormBooking}>
                    <Box sx={{ width: "100%", paddingTop: "32px" }}>
                        <Stepper activeStep={step} alternativeLabel>
                            {stepDone.map((label) => (
                                <Step key={label}>
                                    <StepLabel
                                        StepIconProps={{
                                            sx: {
                                                "&.Mui-completed": { color: "#0f0" }, 
                                                "&.Mui-active": { color: "#00f" }, 
                                                // '&.Mui-disabled': { color: 'rgba(0, 0, 0, 0.6)' },
                                            },
                                        }}
                                        sx={{ 
                                            // "& .MuiStepLabel-label": { color: "#fff" }, 
                                            "& .MuiStepLabel-label.Mui-completed": { color: "#0f0" }, 
                                            "& .MuiStepLabel-label.Mui-active": { color: "#fff" } 
                                        }}
                                    >
                                        {label}
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>

                    <Box sx={{ paddingTop: "32px" }}>
                        {step === 0 ? (
                            <>
                                {sectionTouristDestination(
                                    isMobile, 
                                    classes, 
                                    handleNext, 
                                    selectState, 
                                    handleChangeSelectState, 
                                    hoveredOption, 
                                    handleMouseOver, 
                                    handleMouseLeave 
                                )}
                            </>
                        ) : step === 1 ? (
                            <>
                                {sectionTouristData(
                                    classes, 
                                    formik, 
                                    handleNext, 
                                    handlePrev, 
                                )}
                            </>
                        ) : step === 2 ? (
                            <>
                                {sectionTouristPayment(
                                    props, 
                                    classes, 
                                    formik, 
                                    handleNext, 
                                    handlePrev, 
                                    selectState, 
                                    handleChangeSelectState, 
                                )}
                            </>
                        ) : (
                           console.log("Not Found")
                        )}
                    </Box>
                </Box>

                <Box className={classes.containerFooter}>
                    <footer style={styles.footer}>&copy; 2024. Tigana Reymansyah</footer>
                </Box>
            </Box>
        </>
    );
};
