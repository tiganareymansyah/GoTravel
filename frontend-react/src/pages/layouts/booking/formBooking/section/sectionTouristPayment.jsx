import { Box, Button, TextField, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import Select from "react-select";
import KarikaturBeach from "../../../../../media/karikatur_beach2.jpg";
import QRCode from "react-qr-code";
import logoQris from "../../../../../media/logo_qris.png"

export const sectionTouristPayment = (
    classes, 
    formik, 
    handleRequestDataBooking, 
    selectState, 
    handleChangeSelectState, 
    kodePembayaran 
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

        buttonPrev: {
            padding: "7px 14px",
            textAlign: "center",
            cursor: "pointer",
            borderRadius: "8px",
            color: "black",
            backgroundColor: "#f00",
            "&:hover": {
                color: "black",
            },
        },

        buttonNext: {
            padding: "7px 14px",
            textAlign: "center",
            cursor: "pointer",
            borderRadius: "8px",
            color: "black",
            backgroundColor: "#0f0",
            "&:hover": {
                color: "black",
            },
        },
    };

    function formatToCurrency(price, currency) {
        const numericPrice = Number(price);
      
        if (isNaN(numericPrice)) {
            return "Invalid Price";
        }
      
        if (currency) {
            const formattedPrice = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency,
                currencyDisplay: "narrowSymbol",
            }).format(numericPrice);
      
            const spaceSeparatedFormattedPrice = formattedPrice.replace(/\s+/g, " ");
      
            return spaceSeparatedFormattedPrice;
        }
      
        return "";
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
                            Kode Pembayaran
                            <span style={{ color: "red" }}>&nbsp;*</span>
                        </Typography>
                        <TextField 
                            id="kodePembayaran"
                            name="kodePembayaran"
                            variant="outlined"
                            value={kodePembayaran}
                            InputProps={{
                                classes: {
                                    disabled: classes.disabled,
                                    input: classes.inputUppercase,
                                },
                            }}
                            sx={styles.textField}
                            disabled
                        />
                    </Box>

                    <Box className={classes.boxTouristData}>
                        <Typography 
                            variant="span" 
                            className="form-label" 
                            sx={styles.label}
                        >
                            Total Keseluruhan
                            <span style={{ color: "red" }}>&nbsp;*</span>
                        </Typography>
                        <TextField 
                            id="biaya"
                            name="biaya"
                            variant="outlined"
                            value={formatToCurrency(formik?.values?.total, "IDR")}
                            InputProps={{
                                classes: {
                                    disabled: classes.disabled,
                                    input: classes.inputUppercase,
                                },
                            }}
                            sx={styles.textField}
                            disabled
                        />
                    </Box>

                    <Box className={classes.boxTouristData}>
                        <Typography 
                            variant="span" 
                            className="form-label" 
                            sx={styles.label}
                        >
                            Metode Pembayaran
                            <span style={{ color: "red" }}>&nbsp;*</span>
                        </Typography>
                        <Select 
                            value={selectState.paymentMethod.selectedState}
                            options={selectState.paymentMethod.states}
                            onChange={(state) => {
                                handleChangeSelectState("paymentMethod", state);
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

                    {selectState.paymentMethod.selectedState.value === "qris" && (
                        <Box sx={{ paddingTop: "16px" }}>
                            <Box className={classes.boxTouristData}>
                                <img 
                                    src={logoQris} 
                                    width={200} 
                                    // style={{
                                    //     display: "flex",
                                    //     margin: "auto"
                                    // }} 
                                />
                            </Box>

                            <Typography 
                                variant="h5" 
                                sx={{
                                    textAlign: "center", 
                                    fontWeight: "bold", 
                                    paddingBottom: "16px"
                                }}
                            >
                                GoTravel
                            </Typography>

                            <QRCode 
                                size={200} 
                                value={`
                                    Total Bayar: ${formatToCurrency(formik?.values?.total, "IDR")} 
                                    No Rek BRI: 382701037299536 
                                    Atas Nama: GoTravel
                                `} 
                                style={{
                                    display: "flex",
                                    margin: "auto",
                                    paddingBottom: "32px"
                                }}
                                className={`form-input`} 
                            />
                        </Box>
                    )}

                    <Box className={classes.boxPrevOrNext}>
                        <Box />
                        <Button
                            sx={styles.buttonNext}
                            endIcon={<ArrowForward />}
                            onClick={handleRequestDataBooking}
                        >
                            Submit
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
