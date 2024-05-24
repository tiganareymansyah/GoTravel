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
) => {
    console.log(props);

    const styles = {
        label: {
            fontWeight: "700",
            fontSize: "18px",
            letterSpacing: "1px"
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
                            // value={selectState.nationality.selectedState}
                            // options={selectState.nationality.states}
                            // onChange={(state) => {
                            //     handleChangeSelectState("nationality", state);
                            // }}
                            styles={{
                                // container: (baseStyles, state) => ({
                                //     ...baseStyles,
                                //     ...style.label,
                                //     fontSize: 20,
                                // }),
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    // textIndent: "10px",
                                    // border: "none",
                                    // // backgroundColor: state.isDisabled && "#d8d4d4",
                                    width: "300px"
                                }),
                                // singleValue: (baseStyles, state) => ({
                                //     ...baseStyles,
                                //     color: "#000000",
                                // }),
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
                            // value={selectState.nationality.selectedState}
                            // options={selectState.nationality.states}
                            // onChange={(state) => {
                            //     handleChangeSelectState("nationality", state);
                            // }}
                            styles={{
                                // container: (baseStyles, state) => ({
                                //     ...baseStyles,
                                //     ...style.label,
                                //     fontSize: 20,
                                // }),
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    // textIndent: "10px",
                                    // border: "none",
                                    // // backgroundColor: state.isDisabled && "#d8d4d4",
                                    width: "300px"
                                }),
                                // singleValue: (baseStyles, state) => ({
                                //     ...baseStyles,
                                //     color: "#000000",
                                // }),
                            }}
                            className="form-input"
                        />
                    </Box>

                    <Box 
                        sx={{ 
                            paddingLeft: "5%", 
                            paddingTop: "48px", 
                            display: "flex", 
                            justifyContent: "space-between" 
                        }}
                    >
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
