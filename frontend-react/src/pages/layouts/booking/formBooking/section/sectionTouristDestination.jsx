import { 
    Box, 
    Button, 
    Divider, 
    InputAdornment, 
    Paper, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    TextField, 
    Typography 
} from "@mui/material";
import { ArrowForward, CalendarToday, Delete, Save } from "@mui/icons-material";
import Select from "react-select";
import KarikaturBeach from "../../../../../media/karikatur_beach.jpg";
import DatePicker from "react-datepicker";
import InputMask from "react-input-mask";
import "react-datepicker/dist/react-datepicker.css";
import { formatDateYYYYMMDD } from "../../../../../services/utils";

export const sectionTouristDestination = (
    isMobile, 
    classes, 
    formik, 
    handleNext, 
    selectState, 
    handleChangeSelectState, 
    hoveredOption, 
    handleMouseOver, 
    handleMouseLeave 
) => {
    const styles = {
        label: {
            fontWeight: "bold",
            fontSize: "18px",
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif"
        },

        textField: {
            width: "47%",
            "& .MuiInputBase-root": {
                height: "40px" 
            },
            "& .MuiInputBase-input": {
                padding: "8px 14px", 
                textIndent: "6px"
            },
        },

        tableCell: {
            fontWeight: "bold", 
            position: "sticky", 
            top: 0, 
            backgroundColor: "#fff", 
            zIndex: 1 
        },

        buttonSave: {
            padding: "7px 14px",
            textAlign: "center",
            cursor: "pointer",
            borderRadius: "8px",
            color: "#fff",
            backgroundColor: "#00f",
            "&:hover": {
                color: "#000",
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
                color: "#000",
            },
        },
    };

    const handleInputClick = (e) => {
        if (e && e.target) {
            e.target.readOnly = true;
            e.target.placeholder = "dd/MM/yyyy";
            e.target.blur();
            e.target.readOnly = false;
        }
    };

    const handleChange = (field, value) => {
        if(field === "dariJam") {
            formik.setFieldValue(field, value);
        } else {
            formik.setFieldValue(field, formatDateYYYYMMDD(value));
        }
    };

    return (
        <Box className={classes.containerParent}>
            <Box className={classes.containerChild}>
                <Box className={classes.setForm}>
                    <Box className={classes.boxTouristData}>
                        <Typography 
                            variant="span" 
                            className="form-label" 
                            sx={styles.label}
                        >
                            Tujuan Wisata
                            <span style={{ color: "red" }}>&nbsp;*</span>
                        </Typography>
                        <Select 
                            value={selectState.touristDestination.selectedState}
                            options={selectState.touristDestination.states}
                            onChange={(state) => {
                                handleChangeSelectState("touristDestination", state);
                            }}
                            styles={{
                                container: (baseStyles, state) => ({
                                    ...baseStyles,
                                    fontSize: 20,
                                    width: "47%",
                                }),
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    textIndent: "10px",
                                    // backgroundColor: state.isDisabled && "#d8d4d4",
                                }),
                                singleValue: (baseStyles, state) => ({
                                    ...baseStyles,
                                    color: "#000000",
                                }),
                            }}
                            className="form-input"
                        />
                    </Box>
                    
                    <Box className={classes.boxTouristData}>
                        <Typography 
                            variant="span" 
                            className="form-label" 
                            sx={styles.label}
                        >
                            Transportasi Wisata
                            <span style={{ color: "red" }}>&nbsp;*</span>
                        </Typography>
                        <Select 
                            value={selectState.touristTransportation.selectedState}
                            options={selectState.touristTransportation.states}
                            onChange={(state) => {
                                if (state.stok > 0) {
                                    handleChangeSelectState("touristTransportation", state);
                                }
                            }}
                            styles={{
                                container: (baseStyles, state) => ({
                                    ...baseStyles,
                                    fontSize: 20,
                                    width: "47%",
                                }),
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    textIndent: "10px",
                                }),
                                singleValue: (baseStyles, state) => ({
                                    ...baseStyles,
                                    color: "#000000",
                                }),
                            }}
                            className="form-input"
                            components={{
                                Option: ({ innerProps, label, data }) => {
                                    const isDisabled = data.stok === 0;

                                    return (
                                        <>
                                            {isMobile ? (
                                                <Box
                                                    {...innerProps}
                                                    sx={{
                                                        padding: 1.5,
                                                        opacity: isDisabled ? 0.5 : 1,
                                                        "&:hover": {
                                                            background: isDisabled ? 'inherit' : '#f0f0f0',
                                                        },
                                                    }}
                                                >
                                                    <Box>{label}</Box>
                                                    <Box>
                                                        <Divider sx={{ height: 2 }} />
                                                        <Typography
                                                            sx={{
                                                                textAlign: "center", 
                                                                marginTop: "10px", 
                                                                fontSize: "11px", 
                                                                letterSpacing: "1px", 
                                                                fontStyle: "italic",
                                                                color: "#f00"  
                                                            }}
                                                            variant="body1"
                                                        >
                                                            {!isDisabled 
                                                                ? `Transportasi yang tersisa ${data.stok} lagi`
                                                                : "Transportasi tidak tersedia"
                                                            }
                                                        </Typography>

                                                        <Typography
                                                            sx={{
                                                                textAlign: "center", 
                                                                marginTop: "10px", 
                                                                fontSize: "11px", 
                                                                letterSpacing: "1px", 
                                                                fontStyle: "italic",
                                                                color: "#f00"  
                                                            }}
                                                            variant="body1"
                                                        >
                                                            Muatan {data.muatan} orang
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            ) : (
                                                <Box
                                                    {...innerProps}
                                                    sx={{
                                                        padding: 1.5,
                                                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                                                        opacity: isDisabled ? 0.5 : 1,
                                                        "&:hover": {
                                                            background: isDisabled ? 'inherit' : '#f0f0f0',
                                                        },
                                                    }}
                                                    onMouseOver={() => handleMouseOver(data)}
                                                    onMouseLeave={handleMouseLeave}
                                                >
                                                    <Box>{label}</Box>
                                                    {hoveredOption === data && (
                                                        <Box>
                                                            <Divider sx={{ height: 2 }} />
                                                            <Typography
                                                                sx={{
                                                                    textAlign: "center", 
                                                                    marginTop: "10px", 
                                                                    fontSize: "11px", 
                                                                    letterSpacing: "1px", 
                                                                    fontStyle: "italic",
                                                                    color: "#f00"  
                                                                }}
                                                                variant="body1"
                                                            >
                                                                {!isDisabled 
                                                                    ? `Transportasi yang tersisa ${data.stok} lagi`
                                                                    : "Transportasi tidak tersedia"
                                                                }
                                                            </Typography>
                        
                                                            <Typography
                                                                sx={{
                                                                    textAlign: "center", 
                                                                    marginTop: "10px", 
                                                                    fontSize: "11px", 
                                                                    letterSpacing: "1px", 
                                                                    fontStyle: "italic",
                                                                    color: "#f00"  
                                                                }}
                                                                variant="body1"
                                                            >
                                                                Muatan {data.muatan} orang
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                </Box>
                                            )}
                                        </>
                                    );
                                },
                            }}
                        />
                    </Box>

                    {selectState.touristDestination.selectedState !== "" && 
                    selectState.touristTransportation.selectedState !== "" && (
                        <>
                            <Box className={classes.boxTouristData}>
                                <Typography 
                                    variant="span" 
                                    className="form-label" 
                                    sx={styles.label}
                                >
                                    Satuan Transportasi Wisata
                                    <span style={{ color: "red" }}>&nbsp;*</span>
                                </Typography>
                                <Select 
                                    value={selectState.unitTransportation.selectedState}
                                    options={selectState.unitTransportation.states}
                                    onChange={(state) => {
                                        handleChangeSelectState("unitTransportation", state);
                                    }}
                                    styles={{
                                        container: (baseStyles, state) => ({
                                            ...baseStyles,
                                            fontSize: 20,
                                            width: "47%",
                                        }),
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            textIndent: "10px",
                                        }),
                                        singleValue: (baseStyles, state) => ({
                                            ...baseStyles,
                                            color: "#000000",
                                        }),
                                    }}
                                    className="form-input"
                                />
                            </Box>

                            <Box className={classes.boxTouristData}>
                                <Typography 
                                    variant="span" 
                                    className="form-label" 
                                    sx={styles.label}
                                >
                                    Mulai Booking
                                    <span style={{ color: "red" }}>&nbsp;*</span>
                                </Typography>
                                <Box
                                    sx={{
                                        width: "47%", 
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
                                            //   disabled={
                                            //     props.dataRequest &&
                                            //     props.userLogin.roleName !== "VERIFIKATOR"
                                            //       ? true
                                            //       : false
                                            //   }
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
                                                formik.values?.startBooking &&
                                                new Date(formik.values.startBooking)
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
                                                            handleChange("startBooking", parsedDate)
                                                        } else {
                                                            console.log("Invalid date");
                                                        }
                                                    }
                                                } else {
                                                    console.log("Invalid input format");
                                                }
                                            }}
                                            onChange={(e) => handleChange("startBooking", e)}
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
                                                            sx={{
                                                            cursor: "pointer",
                                                                "& .Mui-disabled": {
                                                                    WebkitTextFillColor: "black !important",
                                                                    background: "#ffffff",
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
                                        value={formik.values.dariJam}
                                        onChange={(e) => formik.setFieldValue("dariJam", e.target.value)}
                                        sx={{ width: "47%" }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 menit
                                        }}
                                    />
                                </Box>
                            </Box>
                            
                            <Box className={classes.boxTouristData}>
                                <Typography 
                                    variant="span" 
                                    className="form-label" 
                                    sx={styles.label}
                                >
                                    Akhir Booking
                                    <span style={{ color: "red" }}>&nbsp;*</span>
                                </Typography>
                                <Box
                                    sx={{
                                        width: "47%", 
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
                                            //   disabled={
                                            //     props.dataRequest &&
                                            //     props.userLogin.roleName !== "VERIFIKATOR"
                                            //       ? true
                                            //       : false
                                            //   }
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
                                                formik.values?.lastBooking &&
                                                new Date(formik.values.lastBooking)
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
                                                            handleChange("lastBooking", parsedDate)
                                                        } else {
                                                            console.log("Invalid date");
                                                        }
                                                    }
                                                } else {
                                                    console.log("Invalid input format");
                                                }
                                            }}
                                            onChange={(e) => handleChange("lastBooking", e)}
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
                                                            sx={{
                                                            cursor: "pointer",
                                                                "& .Mui-disabled": {
                                                                    WebkitTextFillColor: "black !important",
                                                                    background: "#ffffff",
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
                                        value={formik.values.keJam}
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
                        </>
                    )}

                    <Box className={classes.boxPrevOrNext}>
                        <Box />
                        <Button
                            sx={styles.buttonNext}
                            endIcon={<ArrowForward />}
                            onClick={handleNext}
                        >
                            Lanjut
                        </Button>
                    </Box>
                </Box>
                
                <Box className={classes.boxKarikaturImage}>
                    <img src={KarikaturBeach} width={300} />
                </Box>
            </Box>
        </Box>
    );
};
