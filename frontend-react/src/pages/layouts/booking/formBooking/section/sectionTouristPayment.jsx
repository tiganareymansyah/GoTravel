import { Box, Button, TextField, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import Select from "react-select";
import KarikaturBeach from "../../../../../media/karikatur_beach2.jpg";

export const sectionTouristPayment = (
    props, 
    classes, 
    formik, 
    handleNext, 
    handlePrev, 
    selectState, 
    handleChangeSelectState, 
    inputRefBiaya 
) => {
    console.log(props);

    const styles = {
        label: {
            fontWeight: "700",
            fontSize: "18px",
            letterSpacing: "1px"
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

    return (
        <Box className={classes.containerParent}>
            <Box className={classes.containerChild}>
                <Box className={classes.setForm}>
                    <Box className={classes.boxTouristData}>
                        <Typography variant="span" className="form-label" sx={styles.label}>Biaya</Typography>
                        <TextField 
                            id="biaya"
                            name="biaya"
                            variant="outlined"
                            defaultValue={"Rp.1.000.000,-"}
                            InputProps={{
                                classes: {
                                    disabled: classes.disabled,
                                    input: classes.inputUppercase,
                                },
                            }}
                            inputRef={inputRefBiaya}
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
                                }),
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    textIndent: "10px",
                                    // backgroundColor: state.isDisabled && "#d8d4d4",
                                    width: "300px"
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
