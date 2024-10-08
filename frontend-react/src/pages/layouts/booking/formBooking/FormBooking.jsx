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
import { apiGetKodePembayaran, apiGetPaymentMethod, apiGetTouristDestination, apiGetTouristTransportation, apiPaymentGatewayMidtrans, apiRequestDataBooking } from "../../../../api/api";
import Alert from "../../../../components/Alert/Alert";
import { hitungJarakHari } from "../../../../services/utils";

export default function FormBooking(props) {
    console.log(props);

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
    const [hoveredOption, setHoveredOption] = useState(null);
    const [openAlert, setOpenAlert] = useState(false);
    const [severity, setSeverity] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [kodePembayaran, setKodePembayaran] = useState("");

    const inputRefFullName = useRef(null);
    const inputRefNik = useRef(null);
    // const inputRefEmail = useRef(null);
    const inputRefNomorHp = useRef(null);
    const inputRefAlamat = useRef(null);

    let total = 0;
    
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
            startBooking: "", 
            lastBooking: "", 
            dariJam: "", 
            keJam: "", 
            listData: [], 
            fullName: "", 
            nik: "", 
            // email: "", 
            nomorHp: "", 
            alamat: "", 
            total: "", 
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
            
            for(let a = 0; a < formik.values.listData.length; a++) {
                total+=formik.values.listData[a].total;
                formik.setFieldValue("total", total);
            };
        }
    }, [step]);

    useEffect(() => {
        if(formik.values.dariJam !== "") {
            formik.setFieldValue("keJam", formik.values.dariJam);
        }
    }, [formik.values.dariJam]);

    const handleAlert = (open, severity, title, message) => {
        setOpenAlert(open);
        setSeverity(severity);
        setTitle(title);
        setMessage(message);
    }
    
    const handleCloseAlert = async (cek) => {
        if(cek === "lanjut") {
            props.doLoad();
            try {
                const result = await apiGetKodePembayaran();

                const { code, status, message, data } = result;

                if(status === "success") {
                    setKodePembayaran(data);
                    setStep(step + 1);
                    setOpenAlert(false);
                    props.doLoad();
                }
            } catch (err) {
                console.log(err);
                props.doLoad();
            }
        } else if(severity === "successNoReload") {
            location.href = "/booking";
        } else {
            setOpenAlert(false);
        }
    }

    const handleNext = () => {
        if(step === 0) {
            if(formik.values.touristDestination === "" || 
            formik.values.touristTransportation === "" || 
            formik.values.unitTransportation === "" || 
            formik.values.startBooking === "" || 
            formik.values.lastBooking === "" || 
            formik.values.dariJam === "" || 
            formik.values.keJam === "") {
                handleAlert(
                    true,
                    "warning",
                    "Pemberitahuan",
                    "Form tidak boleh kosong"
                );
            } else {
                /* 
                    >>> Perhitungan Gaji Pegawai <<<

                    1. Hitung dulu jarak hari.
                    2. Harga satuan transportasi dibagi 2 dulu yang gunanya untuk membagi hasil uang 
                       yang didapat untuk ke pegawai dan untuk ke perusahaan. Baru dikalikan dengan hasil jarak hari.
                    3. Jika hasil jarak hari sama dengan 1, maka harga satuan dikali dengan unit booking transportasi.
                       Jika hasil jarak hari lebih dari 1, maka harga satuan dikali dengan unit booking transportasi 
                       ditambah dengan hasil perhitungan yang diawal tadi.
                    4. Segitulah gaji pegawai tetapi tidak termasuk biaya bensin, makan, dll.
                */

                let resultDurasi = hitungJarakHari(formik.values.startBooking, formik.values.lastBooking);
    
                let hargaDariDurasi = (selectState.touristTransportation.selectedState.harga / 2) * resultDurasi;
                let totalHarga;
    
                if(resultDurasi === 1) {
                    totalHarga = selectState.touristTransportation.selectedState.harga * 
                    formik.values.unitTransportation;
                } else {
                    totalHarga = selectState.touristTransportation.selectedState.harga * 
                    formik.values.unitTransportation + hargaDariDurasi;
                }
    
                let listData = [{
                    tujuan: selectState.touristDestination.selectedState.label,
                    id_transportasi: selectState.touristTransportation.selectedState.value, 
                    unit: parseInt(selectState.unitTransportation.selectedState.label),
                    satuan: selectState.touristTransportation.selectedState.harga,
                    total: totalHarga
                }];
    
                formik.setFieldValue("listData", listData);
                setStep(step + 1);
            }
        } else if (step === 1) {
            if(formik.values.fullName === "" ||
            formik.values.nik === "" ||
            // formik.values.email === "" ||
            formik.values.nomorHp === "" ||
            formik.values.alamat === "") {
                handleAlert(
                    true,
                    "warning",
                    "Pemberitahuan",
                    "Form tidak boleh kosong"
                );
            } else {
                handleAlert(
                    true,
                    "choose",
                    "Peringatan",
                    "Pastikan data yang diisi semua sudah sesuai dengan keinginan anda, sebelum lanjut ke tahap pembayaran."
                );
            }
        } else {
            setStep(step + 1);
        }
    };

    const handlePrev = () => {
        step === 0 ? setStep(0) : setStep(step - 1);
    };

    const handleMouseOver = (option) => {
        setHoveredOption(option);
    };

    const handleMouseLeave = () => {
        setHoveredOption(null);
    };

    const getTouristDestination = async () => {
        try {
            const record = await apiGetTouristDestination();

            const { code, status, message, data } = record;

            if(status === "success") {
                const dataMapped = data?.map((item) => ({
                    ...item,
                    label: item.nama_tujuan_wisata,
                    value: item.value
                }));

                setSelectState((prev) => ({
                    ...prev,
                    touristDestination: {
                        ...prev["touristDestination"],
                        states: dataMapped,
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

            const { code, status, message, data } = record;

            if(status === "success") {
                const dataMapped = data?.map((item) => ({
                    ...item,
                    label: item.nama_transportasi_wisata,
                    value: item.id
                }));

                setSelectState((prev) => ({
                    ...prev,
                    touristTransportation: {
                        ...prev["touristTransportation"],
                        states: dataMapped,
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

            const { code, status, message, data } = record;

            if(status === "success") {
                const dataMapped = data?.map((item) => ({
                    ...item,
                    label: item.nama_payment_method,
                    value: item.value
                }));

                setSelectState((prev) => ({
                    ...prev,
                    paymentMethod: {
                        ...prev["paymentMethod"],
                        states: dataMapped,
                    },
                }));
            } else {
                console.log("Not Found Payment Method");
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

    const handleRequestDataBooking = async () => {
        if(formik.values.paymentMethod === "") {
            handleAlert(
                true,
                "warning",
                "Pemberitahuan",
                "Form tidak boleh kosong"
            );
            
            return false;
        }

        props.doLoad();
        try {
            let payload = {
                data_perjalanan: formik.values.listData,
                mulai_booking: formik.values.startBooking,
                akhir_booking: formik.values.lastBooking,
                dari_jam: formik.values.dariJam,
                ke_jam: formik.values.keJam,
                nama_lengkap: formik.values.fullName,
                nik: formik.values.nik,
                email: props.userLogin.email,
                nomor_hp: formik.values.nomorHp,
                alamat: formik.values.alamat,
                kode_pembayaran: kodePembayaran,
                metode_pembayaran: formik.values.paymentMethod
            }

            if(payload.metode_pembayaran === "pg") {
                const result = await apiPaymentGatewayMidtrans({
                    body: JSON.stringify(payload)
                })
    
                const { code, status, message, data } = result;
    
                if(status === "success") {
                    window.snap.pay(data);
    
                    await apiRequestDataBooking({
                        body: JSON.stringify(payload)
                    });
                    
                    props.doLoad();
                }
            } else {
                const result = await apiRequestDataBooking({
                    body: JSON.stringify(payload)
                });

                const { code, status, message, data } = result;
                
                if(status === "success") {
                    handleAlert(
                        true, 
                        "successNoReload", 
                        "Sukses", 
                        "Data anda sudah terkirim"
                    );
                    props.doLoad();
                }
            }

        } catch (err) {
            console.log(err);
            props.doLoad();
        }
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
                                    formik, 
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
                                    props, 
                                    formik, 
                                    handleNext, 
                                    handlePrev, 
                                    inputRefFullName, 
                                    inputRefNik, 
                                    // inputRefEmail, 
                                    inputRefNomorHp, 
                                    inputRefAlamat 
                                )}
                            </>
                        ) : step === 2 ? (
                            <>
                                {sectionTouristPayment(
                                    classes, 
                                    formik, 
                                    handleRequestDataBooking, 
                                    selectState, 
                                    handleChangeSelectState, 
                                    kodePembayaran 
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
