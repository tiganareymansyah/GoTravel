import { Box, Button, TextField, Typography } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import Select from "react-select";
import KarikaturBeach from "../../../../../media/karikatur_beach.jpg";

export const sectionTouristDestination = (
    props, 
    classes, 
    formik, 
    handleNext, 
    handlePrev, 
    selectState, 
    handleChangeSelectState, 
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
        <Box
            sx={{
                margin: "auto", 
                padding: "16px", 
                boxSizing: "border-box", 
                width: "72%", 
                height: "500px", 
                borderRadius: "8px", 
                backgroundColor: "#fff",
                // boxShadow: "8px 8px 0 rgba(0, 0, 0, 0.5)"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <Box sx={{ width: "60%" }}>
                    <Box
                        sx={{
                            paddingLeft: "5%", 
                            display: "flex", 
                            justifyContent: "space-between", 
                            alignItems: "center",
                            paddingBottom: "4%"
                        }}
                    >
                        <Typography variant="span" className="form-label" sx={styles.label}>Tujuan Wisata</Typography>
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
                    
                    <Box
                        sx={{
                            paddingLeft: "5%", 
                            display: "flex", 
                            justifyContent: "space-between", 
                            alignItems: "center", 
                            paddingBottom: "4%"
                        }}
                    >
                        <Typography variant="span" className="form-label" sx={styles.label}>Transportasi Wisata</Typography>
                        <Select 
                            value={selectState.touristTransportation.selectedState}
                            options={selectState.touristTransportation.states}
                            onChange={(state) => {
                                handleChangeSelectState("touristTransportation", state);
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

                    {selectState.touristTransportation.selectedState !== "" && (
                        <Box
                            sx={{
                                paddingLeft: "5%", 
                                display: "flex", 
                                justifyContent: "space-between", 
                                alignItems: "center", 
                                paddingBottom: "4%"
                            }}
                        >
                            <Typography variant="span" className="form-label" sx={styles.label}>Muatan</Typography>
                            <TextField 
                                id="muatan"
                                name="muatan"
                                variant="outlined"
                                value={
                                    selectState.touristTransportation.selectedState && 
                                    `${selectState.touristTransportation.selectedState.muatan} orang`
                                }
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
                    )}

                    <Box sx={{ paddingTop: "48px", display: "flex", justifyContent: "space-between" }}>
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
                
                <Box
                    sx={{
                        width: "40%",
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <img src={KarikaturBeach} width={300} />
                </Box>
            </Box>
        </Box>
    );
};
