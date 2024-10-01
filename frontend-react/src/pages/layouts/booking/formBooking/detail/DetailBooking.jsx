import { useEffect, useState } from "react";
import {
    Box, 
    Button, 
    TextField, 
    Typography
} from "@mui/material";
import { 
    ArrowBack, 
    RecordVoiceOverOutlined, 
    CalendarToday,  
    ArrowForward,
    Close,
    EditCalendar,
    Person,
    LocationOn,
    Payments
} from "@mui/icons-material";
import { useMediaQuery } from "react-responsive";
import { useDetailBookingStyles } from "./style";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { orange } from "@mui/material/colors";
import DatePicker from "react-datepicker";
import InputMask from "react-input-mask";
import "react-datepicker/dist/react-datepicker.css";
import { formatDateYYYYMMDD, formatUangByKodeMataUang } from "../../../../../services/utils";
// import  from '@mui/icons-material/Person';

export default function DetailBooking(props) {
    console.log(props);

    const location = useLocation();
    const dataByKodePermohonan = location.state?.dataByKodePermohonan;

    console.log(dataByKodePermohonan);

    const isMobile = useMediaQuery({ maxWidth: 991 });
    const classes = useDetailBookingStyles({ isMobile });

    const styles = {
        labelHeader: {
            fontWeight: "700",
            // color: "#18345c",
        },

        label: {
            fontWeight: "700",
            fontSize: "18px",
        },

        textField: {
            width: "60%" 
        },

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

        buttonReschedule: {
            padding: "7px 14px",
            textAlign: "center",
            cursor: "pointer",
            borderRadius: "8px",
            color: "#000",
            backgroundColor: "#0F67B1",
            "&:hover": {
                color: "black",
            },
        },

        buttonNext: {
            padding: "7px 14px",
            textAlign: "center",
            cursor: "pointer",
            borderRadius: "8px",
            color: "#000",
            backgroundColor: "#0f0",
            "&:hover": {
                color: "black",
            },
        },

        buttonCancel: {
            padding: "7px 14px",
            textAlign: "center",
            cursor: "pointer",
            borderRadius: "8px",
            color: "#000",
            backgroundColor: "#f00",
            "&:hover": {
                color: "black",
            },
        },

        footer: {
            color: "#fff",
            fontStyle: "italic",
            letterSpacing: "4px"
        },
    };

    const [dataBooking, setDataBooking] = useState({
        kode_booking: "",
        tujuan: "",
        transportasi: "",
        unit: "",
        mulaiBooking: "",
        dariJam: "",
        akhirBooking: "",
        keJam: "",
        namaLengkap: "",
        nik: "",
        email: "",
        nomorHp: "",
        alamat: "",
        kodePembayaran: "",
        totalKeseluruhan: "",
        metodePembayaran: ""
    });
    const [selectState, setSelectState] = useState({
        destinasi: {
            selectedState: { value: "pantai bosur", label: "Pantai Bosur" },
            states: [],
        },
        transportasi: {
            selectedState: { value: "mobil angkot", label: "Mobil Angkot" },
            states: [],
        },
        unit: {
            selectedState: { value: 1, label: 1 },
            states: [],
        },
        metodePembayaran: {
            selectedState: { value: "pg", label: "Payment Gateway" },
            states: [],
        }
    });
    const [boolReschedule, setBoolReschedule] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if(dataByKodePermohonan) {
            setDataBooking((prev) => ({
                ...prev,
                kode_booking: dataByKodePermohonan.kode_booking,
                tujuan: "",
                transportasi: "",
                unit: "",
                mulaiBooking: dataByKodePermohonan.mulai_booking,
                dariJam: dataByKodePermohonan.dari_jam,
                akhirBooking: dataByKodePermohonan.akhir_booking,
                keJam: dataByKodePermohonan.ke_jam,
                namaLengkap: dataByKodePermohonan.nama_lengkap,
                nik: dataByKodePermohonan.nik,
                email: dataByKodePermohonan.email,
                nomorHp: dataByKodePermohonan.nomor_hp,
                alamat: dataByKodePermohonan.alamat,
                kodePembayaran: dataByKodePermohonan.kode_pembayaran,
                totalKeseluruhan: dataByKodePermohonan.total_bayar,
                metodePembayaran: ""
            }));
        }
    }, [dataByKodePermohonan]);

    useEffect(() => {
        if(dataBooking.dariJam !== "") {
            setDataBooking((prev) => ({
                ...prev,
                keJam: dataBooking.dariJam
            }));
        }
    }, [dataBooking.dariJam]);

    const handleChange = (field, value) => {
        if(field === "mulaiBooking" || 
        field === "akhirBooking") {
            setDataBooking((prev) => ({
                ...prev,
                [field]: formatDateYYYYMMDD(value)
            }));
        } else {
            setDataBooking((prev) => ({
                ...prev,
                [field]: value
            }));
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

        setDataBooking((prev) => ({
            ...prev,
            [name]: state.value
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

    const handleReschedule = () => {
        setBoolReschedule(true);
    };

    const handleCancel = () => {
        setBoolReschedule(false);
    };

    console.log(dataBooking);
    console.log(selectState);

    return(
        <>
            <Box className={classes.detailBookingBackground}>
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

                <Box 
                    className={classes.containerParent}
                    sx={{ marginTop: "32px" }}
                >
                    <Typography
                        sx={{
                            textAlign: "center",
                            fontSize: 24,
                            fontWeight: "bold",
                            paddingBottom: "32px"
                        }}
                    >
                        Detail Pemesanan
                    </Typography>
                    
                    <Box>
                        <Box className={classes.boxHeader}>
                            <LocationOn
                                fontSize="large"
                                className={classes.icon}
                            />
                            <Typography
                                variant="h5" 
                                sx={styles.labelHeader}
                            >
                                Destinasi
                            </Typography>
                        </Box>

                        <Box className={classes.boxContent} sx={{ paddingTop: "20px" }}>
                            <Box className={classes.boxForm}>
                                <Typography
                                    variant="h6"
                                    className="form-label"
                                    sx={styles.label}
                                >
                                    Kode Booking
                                    <span style={{ color: "red" }}>&nbsp;*</span>
                                </Typography>
                                <TextField 
                                    id="kodeBooking"
                                    name="kodeBooking"
                                    variant="outlined"
                                    size="small"
                                    placeholder="Kode Booking"
                                    value={dataBooking.kode_booking}
                                    onChange={(e) => handleChange("kode_booking", e.target.value)}
                                    disabled
                                    sx={styles.textField}
                                    InputProps={{
                                        classes: {
                                            disabled: classes.disabled
                                        },
                                    }}
                                    required
                                />
                            </Box>
                        </Box>

                        <Box className={classes.boxContent}>
                            <Box className={classes.boxForm}>
                                <Typography
                                    variant="h6"
                                    className="form-label"
                                    sx={styles.label}
                                >
                                    Tujuan Wisata
                                    <span style={{ color: "red" }}>&nbsp;*</span>
                                </Typography>
                                <Select
                                    isDisabled={true}
                                    onChange={(state) => handleChangeSelectState("destinasi", state)}
                                    value={selectState.destinasi.selectedState}
                                    options={selectState.destinasi.states}
                                    styles={{
                                        container: (baseStyles, state) => ({
                                            ...baseStyles,
                                            ...styles.label,
                                            fontSize: 20,
                                        }),
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            backgroundColor: state.isDisabled && "#d8d4d4",
                                            width: "100%",
                                            height: "100%",
                                        }),
                                        singleValue: (baseStyles, state) => ({
                                            ...baseStyles,
                                            color: "#000000",
                                            textTransform: "uppercase",
                                            fontFamily: "Roboto, sans-serif",
                                        }),
                                        option: (baseStyles, state) => ({
                                            ...baseStyles,
                                            textTransform: "uppercase",
                                            fontFamily: "Roboto, sans-serif",
                                        }),
                                    }}
                                    className="form-input"
                                />
                            </Box>
                        </Box>

                        <Box className={classes.boxContent}>
                            <Box className={classes.boxForm}>
                                <Typography
                                    variant="h6"
                                    className="form-label"
                                    sx={styles.label}
                                >
                                    Transportasi Wisata
                                    <span style={{ color: "red" }}>&nbsp;*</span>
                                </Typography>
                                <Select
                                    isDisabled={true}
                                    onChange={(state) => handleChangeSelectState("transportasi", state)}
                                    value={selectState.transportasi.selectedState}
                                    options={selectState.transportasi.states}
                                    styles={{
                                        container: (baseStyles, state) => ({
                                            ...baseStyles,
                                            ...styles.label,
                                            fontSize: 20,
                                        }),
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            backgroundColor: state.isDisabled && "#d8d4d4",
                                            width: "100%",
                                            height: "100%",
                                        }),
                                        singleValue: (baseStyles, state) => ({
                                            ...baseStyles,
                                            color: "#000000",
                                            textTransform: "uppercase",
                                            fontFamily: "Roboto, sans-serif",
                                        }),
                                        option: (baseStyles, state) => ({
                                            ...baseStyles,
                                            textTransform: "uppercase",
                                            fontFamily: "Roboto, sans-serif",
                                        }),
                                    }}
                                    className="form-input"
                                />
                            </Box>
                        </Box>

                        <Box className={classes.boxContent}>
                            <Box className={classes.boxForm}>
                                <Typography
                                    variant="h6"
                                    className="form-label"
                                    sx={styles.label}
                                >
                                    Satuan Transportasi
                                    <span style={{ color: "red" }}>&nbsp;*</span>
                                </Typography>
                                <Select
                                    isDisabled={true}
                                    onChange={(state) => handleChangeSelectState("unit", state)}
                                    value={selectState.unit.selectedState}
                                    options={selectState.unit.states}
                                    styles={{
                                        container: (baseStyles, state) => ({
                                            ...baseStyles,
                                            ...styles.label,
                                            fontSize: 20,
                                        }),
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            backgroundColor: state.isDisabled && "#d8d4d4",
                                            width: "100%",
                                            height: "100%",
                                        }),
                                        singleValue: (baseStyles, state) => ({
                                            ...baseStyles,
                                            color: "#000000",
                                            textTransform: "uppercase",
                                            fontFamily: "Roboto, sans-serif",
                                        }),
                                        option: (baseStyles, state) => ({
                                            ...baseStyles,
                                            textTransform: "uppercase",
                                            fontFamily: "Roboto, sans-serif",
                                        }),
                                    }}
                                    className="form-input"
                                />
                            </Box>
                        </Box>

                        <Box className={classes.boxContent}>
                            <Box className={classes.boxForm}>
                                <Typography 
                                    variant="h6" 
                                    className="form-label" 
                                    sx={styles.label}
                                >
                                    Mulai Booking
                                    <span style={{ color: "red" }}>&nbsp;*</span>
                                </Typography>
                                <Box
                                    sx={{
                                        width: "60%", 
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >
                                    <Box className={classes.datePickerWrapper} sx={{ width: "48%" }}>
                                        <DatePicker
                                            placeholderText="dd/mm/yyyy"
                                            fullWidth
                                            dropdownMode="select"
                                            disabled={!boolReschedule}
                                            onInputClick={handleInputClick}
                                            dateFormat={"dd/MM/yyyy"}
                                            showYearDropdown
                                            showMonthDropdown
                                            yearDropdownItemNumber={100}
                                            // maxDate={new Date()}
                                            scrollableYearDropdown
                                            className={classes.calendarContainer}
                                            calendarClassName={classes.calendar}
                                            selected={
                                                dataBooking?.mulaiBooking &&
                                                new Date(dataBooking.mulaiBooking)
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
                                                            handleChange("mulaiBooking", parsedDate)
                                                        } else {
                                                            console.log("Invalid date");
                                                        }
                                                    }
                                                } else {
                                                    console.log("Invalid input format");
                                                }
                                            }}
                                            onChange={(e) => handleChange("mulaiBooking", e)}
                                            customInput={
                                                <InputMask
                                                    mask="99/99/9999"
                                                    // value={props.value}
                                                >
                                                    {(inputProps) => (
                                                        <TextField
                                                            {...inputProps}
                                                            fullWidth
                                                            size="small"
                                                            type="tel"
                                                            variant="outlined"
                                                            disabled={!boolReschedule}
                                                            sx={{
                                                            cursor: "pointer",
                                                                "& .Mui-disabled": {
                                                                    WebkitTextFillColor: "black !important",
                                                                    background: "#d8d4d4",
                                                                    fontWeight: "600"
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
                                    -
                                    <TextField
                                        // label="Pilih Waktu"
                                        size="small"
                                        type="time"
                                        value={dataBooking.dariJam}
                                        onChange={(e) => handleChange("dariJam", e.target.value)}
                                        disabled={!boolReschedule}
                                        sx={{ width: "47%" }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 menit
                                        }}
                                        InputProps={{
                                            classes: {
                                                disabled: classes.disabled
                                            },
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>

                        <Box className={classes.boxContent}>
                            <Box className={classes.boxForm}>
                                <Typography 
                                    variant="h6" 
                                    className="form-label" 
                                    sx={styles.label}
                                >
                                    Akhir Booking
                                    <span style={{ color: "red" }}>&nbsp;*</span>
                                </Typography>
                                <Box
                                    sx={{
                                        width: "60%", 
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >
                                    <Box className={classes.datePickerWrapper} sx={{ width: "48%" }}>
                                        <DatePicker
                                            placeholderText="dd/mm/yyyy"
                                            fullWidth
                                            dropdownMode="select"
                                            disabled={!boolReschedule}
                                            onInputClick={handleInputClick}
                                            dateFormat={"dd/MM/yyyy"}
                                            showYearDropdown
                                            showMonthDropdown
                                            yearDropdownItemNumber={100}
                                            // maxDate={new Date()}
                                            scrollableYearDropdown
                                            className={classes.calendarContainer}
                                            calendarClassName={classes.calendar}
                                            selected={
                                                dataBooking?.akhirBooking &&
                                                new Date(dataBooking.akhirBooking)
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
                                                            handleChange("akhirBooking", parsedDate)
                                                        } else {
                                                            console.log("Invalid date");
                                                        }
                                                    }
                                                } else {
                                                    console.log("Invalid input format");
                                                }
                                            }}
                                            onChange={(e) => handleChange("akhirBooking", e)}
                                            customInput={
                                                <InputMask
                                                    mask="99/99/9999"
                                                    // value={props.value}
                                                >
                                                    {(inputProps) => (
                                                        <TextField
                                                            {...inputProps}
                                                            fullWidth
                                                            size="small"
                                                            type="tel"
                                                            variant="outlined"
                                                            disabled={!boolReschedule}
                                                            sx={{
                                                            cursor: "pointer",
                                                                "& .Mui-disabled": {
                                                                    WebkitTextFillColor: "black !important",
                                                                    background: "#d8d4d4",
                                                                    fontWeight: "600"
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
                                    -
                                    <TextField
                                        size="small"
                                        type="time"
                                        value={dataBooking.keJam}
                                        disabled
                                        sx={{ width: "47%" }}
                                        InputProps={{
                                            classes: {
                                                disabled: classes.disabled
                                            },
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box 
                        sx={{ 
                            marginTop: "32px",
                            borderBottom: "1px solid", 
                            marginLeft: "32px"
                        }} 
                    />

                    <Box sx={{ paddingTop: "32px" }}>
                        <Box className={classes.boxHeader}>
                            <Person
                                fontSize="large"
                                className={classes.icon}
                            />
                            <Typography
                                variant="h5" 
                                sx={styles.labelHeader}
                            >
                                Data Pribadi
                            </Typography>
                        </Box>

                        <Box className={classes.boxContent} sx={{ paddingTop: "20px" }}>
                            <Box className={classes.boxForm}>
                                <Typography
                                    variant="h6"
                                    className="form-label"
                                    sx={styles.label}
                                >
                                    Nama Lengkap KTP
                                    <span style={{ color: "red" }}>&nbsp;*</span>
                                </Typography>
                                <TextField 
                                    id="namaLengkap"
                                    name="namaLengkap"
                                    variant="outlined"
                                    size="small"
                                    placeholder="Nama Lengkap"
                                    value={dataBooking.namaLengkap}
                                    onChange={(e) => handleChange("namaLengkap", e.target.value)}
                                    disabled
                                    sx={styles.textField}
                                    InputProps={{
                                        classes: {
                                            disabled: classes.disabled
                                        },
                                    }}
                                    required
                                />
                            </Box>
                        </Box>

                        <Box className={classes.boxContent}>
                            <Box className={classes.boxForm}>
                                <Typography
                                    variant="h6"
                                    className="form-label"
                                    sx={styles.label}
                                >
                                    NIK
                                    <span style={{ color: "red" }}>&nbsp;*</span>
                                </Typography>
                                <TextField 
                                    id="nik"
                                    name="nik"
                                    variant="outlined"
                                    size="small"
                                    placeholder="NIK"
                                    value={dataBooking.nik}
                                    onChange={(e) => handleChange("nik", e.target.value)}
                                    disabled
                                    sx={styles.textField}
                                    InputProps={{
                                        classes: {
                                            disabled: classes.disabled
                                        },
                                    }}
                                    required
                                />
                            </Box>
                        </Box>
                        
                        <Box className={classes.boxContent}>
                            <Box className={classes.boxForm}>
                                <Typography
                                    variant="h6"
                                    className="form-label"
                                    sx={styles.label}
                                >
                                    Email
                                    <span style={{ color: "red" }}>&nbsp;*</span>
                                </Typography>
                                <TextField 
                                    id="email"
                                    name="email"
                                    variant="outlined"
                                    size="small"
                                    placeholder="Email"
                                    value={dataBooking.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    disabled
                                    sx={styles.textField}
                                    InputProps={{
                                        classes: {
                                            disabled: classes.disabled
                                        },
                                    }}
                                    required
                                />
                            </Box>
                        </Box>

                        <Box className={classes.boxContent}>
                            <Box className={classes.boxForm}>
                                <Typography
                                    variant="h6"
                                    className="form-label"
                                    sx={styles.label}
                                >
                                    Nomor HP
                                    <span style={{ color: "red" }}>&nbsp;*</span>
                                </Typography>
                                <TextField 
                                    id="nomorHp"
                                    name="nomorHp"
                                    variant="outlined"
                                    size="small"
                                    placeholder="Nomor Hp"
                                    value={dataBooking.nomorHp}
                                    onChange={(e) => handleChange("nomorHp", e.target.value)}
                                    disabled
                                    sx={styles.textField}
                                    InputProps={{
                                        classes: {
                                            disabled: classes.disabled
                                        },
                                    }}
                                    required
                                />
                            </Box>
                        </Box>

                        <Box className={classes.boxContent}>
                            <Box className={classes.boxForm}>
                                <Typography
                                    variant="h6"
                                    className="form-label"
                                    sx={styles.label}
                                >
                                    Alamat
                                    <span style={{ color: "red" }}>&nbsp;*</span>
                                </Typography>
                                <TextField 
                                    id="alamat"
                                    name="alamat"
                                    variant="outlined"
                                    placeholder="Alamat"
                                    rows={3}
                                    multiline
                                    value={dataBooking.alamat}
                                    onChange={(e) => handleChange("alamat", e.target.value)}
                                    disabled
                                    sx={{
                                        ...styles.textField,
                                        "& .MuiInputBase-input": {
                                            textIndent: "12px",
                                            paddingTop: "10px"
                                        }
                                    }}
                                    InputProps={{
                                        classes: {
                                            disabled: classes.disabled
                                        }

                                    }}
                                    required
                                />
                            </Box>
                        </Box>
                    </Box>

                    <Box 
                        sx={{ 
                            marginTop: "32px",
                            borderBottom: "1px solid", 
                            marginLeft: "32px"
                        }} 
                    />

                    <Box sx={{ paddingTop: "32px" }}>
                        <Box className={classes.boxHeader}>
                            <Payments
                                fontSize="large"
                                className={classes.icon}
                            />
                            <Typography
                                variant="h5" 
                                sx={styles.labelHeader}
                            >
                                Pembayaran
                            </Typography>
                        </Box>

                        <Box className={classes.boxContent} sx={{ paddingTop: "20px" }}>
                            <Box className={classes.boxForm}>
                                <Typography
                                    variant="h6"
                                    className="form-label"
                                    sx={styles.label}
                                >
                                    Kode Pembayaran
                                    <span style={{ color: "red" }}>&nbsp;*</span>
                                </Typography>
                                <TextField 
                                    id="kodePembayaran"
                                    name="kodePembayaran"
                                    variant="outlined"
                                    size="small"
                                    placeholder="Kode Pembayaran"
                                    value={dataBooking.kodePembayaran}
                                    onChange={(e) => handleChange("kodePembayaran", e.target.value)}
                                    disabled
                                    sx={styles.textField}
                                    InputProps={{
                                        classes: {
                                            disabled: classes.disabled
                                        },
                                    }}
                                    required
                                />
                            </Box>
                        </Box>

                        <Box className={classes.boxContent}>
                            <Box className={classes.boxForm}>
                                <Typography
                                    variant="h6"
                                    className="form-label"
                                    sx={styles.label}
                                >
                                    Total Keseluruhan
                                    <span style={{ color: "red" }}>&nbsp;*</span>
                                </Typography>
                                <TextField 
                                    id="totalKeseluruhan"
                                    name="totalKeseluruhan"
                                    variant="outlined"
                                    size="small"
                                    placeholder="Total Keseluruhan"
                                    value={formatUangByKodeMataUang(dataBooking.totalKeseluruhan, "IDR")}
                                    onChange={(e) => handleChange("totalKeseluruhan", e.target.value)}
                                    disabled
                                    sx={styles.textField}
                                    InputProps={{
                                        classes: {
                                            disabled: classes.disabled
                                        },
                                    }}
                                    required
                                />
                            </Box>
                        </Box>
                        
                        <Box className={classes.boxContent}>
                            <Box className={classes.boxForm}>
                                <Typography
                                    variant="h6"
                                    className="form-label"
                                    sx={styles.label}
                                >
                                    Metode Pembayaran
                                    <span style={{ color: "red" }}>&nbsp;*</span>
                                </Typography>
                                <Select
                                    isDisabled={!boolReschedule ? true : false}
                                    onChange={(state) => handleChangeSelectState("metodePembayaran", state)}
                                    value={selectState.metodePembayaran.selectedState}
                                    options={selectState.metodePembayaran.states}
                                    styles={{
                                        container: (baseStyles, state) => ({
                                            ...baseStyles,
                                            ...styles.label,
                                            fontSize: 20,
                                        }),
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            backgroundColor: state.isDisabled && "#d8d4d4",
                                            width: "100%",
                                            height: "100%",
                                        }),
                                        singleValue: (baseStyles, state) => ({
                                            ...baseStyles,
                                            color: "#000000",
                                            textTransform: "uppercase",
                                            fontFamily: "Roboto, sans-serif",
                                        }),
                                        option: (baseStyles, state) => ({
                                            ...baseStyles,
                                            textTransform: "uppercase",
                                            fontFamily: "Roboto, sans-serif",
                                        }),
                                    }}
                                    className="form-input"
                                />
                            </Box>
                        </Box>
                    </Box>

                    {!boolReschedule ? (
                        <Box
                            sx={{
                                paddingTop: "32px",
                                display: "flex",
                                justifyContent: "end"
                            }}
                        >
                            <Button
                                sx={styles.buttonReschedule}
                                startIcon={<EditCalendar />}
                                onClick={handleReschedule}
                            >
                                Reschedule
                            </Button>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                paddingTop: "32px",
                                display: "flex",
                                justifyContent: "end",
                                gap: "16px"
                            }}
                        >
                            <Button
                                sx={styles.buttonCancel}
                                startIcon={<Close />}
                                onClick={handleCancel}
                            >
                                Batalkan
                            </Button>

                            <Button
                                sx={styles.buttonNext}
                                endIcon={<ArrowForward />}
                                // onClick={handleRequestDataBooking}
                            >
                                Submit
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
}
