import { Box, Button, TextField, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import Select from "react-select";
import KarikaturBeach from "../../../../../media/karikatur_beach2.jpg";

export const sectionTouristPayment = (
    classes, 
    formik, 
    handleNext, 
    handlePrev, 
    selectState, 
    handleChangeSelectState 
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
                        <Typography variant="span" className="form-label" sx={styles.label}>Total Keseluruhan</Typography>
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
                        <Typography variant="span" className="form-label" sx={styles.label}>Metode Pembayaran</Typography>
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

                    <Box className={classes.boxPrevOrNext}>
                        <Button
                            sx={styles.buttonPrev}
                            startIcon={<ArrowBack />}
                            onClick={handlePrev}
                        >
                            Kembali
                        </Button>

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
