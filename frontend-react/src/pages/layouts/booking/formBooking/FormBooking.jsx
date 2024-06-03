import { Box, Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { ArrowBack } from '@mui/icons-material';
import { useMediaQuery } from "react-responsive";
import { useFormBookingStyles } from "./style";
import { orange } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { sectionTouristDestination } from "./section/sectionTouristDestination";
import { sectionTouristData } from "./section/sectionTouristData";
import { sectionTouristPayment } from "./section/sectionTouristPayment";
import { useFormik } from "formik";
import { apiGetPaymentMethod, apiGetTouristDestination, apiGetTouristTransportation } from "../../../../api/api";

export default function FormBooking(props) {
    const isMobile = useMediaQuery({ maxWidth: 991 });
    const classes = useFormBookingStyles({ isMobile });

    const [step, setStep] = useState(0);
    const [selectState, setSelectState] = useState({
        touristDestination: {
            selectedState: "",
            states: [],
        },
        touristTransportation: {
            selectedState: "",
            states: [],
        },
        unitTransportation: {
            selectedState: "",
            states: [],
        },
        paymentMethod: {
            selectedState: "",
            states: [],
        },
    });
    const [selectedData, setSelectedData] = useState([]);

    const inputRefFullName = useRef(null);
    const inputRefNik = useRef(null);
    const inputRefEmail = useRef(null);
    const inputRefNomorHp = useRef(null);
    const inputRefAlamat = useRef(null);
    const inputRefBiaya = useRef(null);
    
    const navigate = useNavigate();
    const stepDone = [
        'Tujuan Wisata',
        'Data Wisatawan',
        'Pembayaran',
    ];

    const formik = useFormik({
        initialValues: {
            touristDestination: "", 
            touristTransportation: "", 
            unitTransportation: "", 
            fullName: "", 
            nik: "", 
            email: "", 
            nomorHp: "", 
            alamat: "", 
            biaya: "", 
            paymentMethod: "", 
        },
    
        onSubmit: async (values) => {
            // handleLoginUser(values);
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

    useEffect(() => {
        if(selectState.touristTransportation.selectedState) {
            const max = selectState.touristTransportation.selectedState.stok;
            const unitTransportation = Array.from({ length: max }, (_, i) => ({ value: i + 1, label: (i + 1).toString() }));
            setSelectState((prev) => ({
                ...prev,
                unitTransportation: {
                    ...prev["unitTransportation"],
                    states: unitTransportation,
                },
            }));
        }
    }, [selectState.touristTransportation.selectedState]);

    useEffect(() => {
        if(step === 0) {
            getTouristDestination();
            getTouristTransportation();
        } else if(step === 2) {
            getPaymentMethod();
            formik.setFieldValue("biaya", inputRefBiaya.current?.value);
        }
    }, [step]);

    useEffect(() => {
        if(selectState.length !== 0) {
            setSelectState((prev) => ({
                ...prev,
                touristDestination: {
                  ...prev["touristDestination"],
                  selectedState: "",
                },
                touristTransportation: {
                  ...prev["touristTransportation"],
                  selectedState: "",
                },
                unitTransportation: {
                  ...prev["unitTransportation"],
                  selectedState: "",
                },
            }));
        }
    }, [selectedData]);

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
                console.log("Not Found Destination");
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
                console.log("Not Found Transportation");
            }
        } catch (err) {
            console.log(err)
        }
    };

    const getPaymentMethod = async () => {
        try {
            const record = await apiGetPaymentMethod();

            const { status, data } = record;

            if(status === "success") {
                setSelectState((prev) => ({
                    ...prev,
                    paymentMethod: {
                        ...prev["paymentMethod"],
                        states: data,
                    },
                }));
            } else {
                console.log("Not Found Payment Method");
            }
        } catch (err) {
            console.log(err)
        }
    };

    const handleSelectedData = () => {
        setSelectedData((prev) => ([
            ...prev, 
            {
                no: prev.length, 
                tujuan: selectState.touristDestination.selectedState.label,
                transportasi: selectState.touristTransportation.selectedState.label, 
                unit: selectState.unitTransportation.selectedState.label
            }
        ]));
    };

    const handleDelete = (id) => {
        setSelectedData(prev => prev.filter(item => item.no !== id));
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
                    <Box sx={{ width: "100%", paddingTop: "16px" }}>
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

                    <Box sx={{ paddingTop: "16px" }}>
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
                                    handleMouseLeave, 
                                    handleSelectedData, 
                                    selectedData, 
                                    handleDelete
                                )}
                            </>
                        ) : step === 1 ? (
                            <>
                                {sectionTouristData(
                                    classes, 
                                    formik, 
                                    handleNext, 
                                    handlePrev, 
                                    inputRefFullName, 
                                    inputRefNik, 
                                    inputRefEmail, 
                                    inputRefNomorHp, 
                                    inputRefAlamat 
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
                                    inputRefBiaya 
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
