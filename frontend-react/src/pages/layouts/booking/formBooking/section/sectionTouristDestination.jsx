import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import Select from "react-select";
import KarikaturBeach from "../../../../../media/karikatur_beach.jpg";

export const sectionTouristDestination = (
    isMobile, 
    classes, 
    handleNext, 
    selectState, 
    handleChangeSelectState, 
    hoveredOption, 
    handleMouseOver, 
    handleMouseLeave 
) => {
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
        <Box className={classes.containerParent}>
            <Box className={classes.containerChild}>
                <Box className={classes.setForm}>
                    <Box className={classes.boxTouristData}>
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
                    
                    <Box className={classes.boxTouristData}>
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
                            components={{
                                Option: ({ innerProps, label, data }) => (
                                    <>
                                        {isMobile ? (
                                            <Box
                                                {...innerProps}
                                                sx={{
                                                    padding: 1.5,
                                                    cursor: "pointer",
                                                    "&:hover": {
                                                        background: "#f0f0f0",
                                                    },
                                                }}
                                            >
                                                <div>{label}</div>
                                                <div>
                                                    <Divider sx={{ height: 2 }} />
                                                    <Typography
                                                        sx={{
                                                            paddingLeft: "32px", 
                                                            marginTop: "10px", 
                                                            fontSize: "11px", 
                                                            letterSpacing: "1px", 
                                                            fontStyle: "italic",
                                                            color: "#f00"  
                                                        }}
                                                        variant="body1"
                                                    >
                                                        Transportasi yang tersisa {data.stok} lagi
                                                    </Typography>
                
                                                    {/* <Typography
                                                        sx={{
                                                            marginLeft: "10px",
                                                            marginTop: "10px",
                                                            fontSize: "12px",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        {!data.label_distance
                                                            ? "Jarak: -"
                                                            : `Jarak: ${data.label_distance}`}
                                                    </Typography> */}
                                                </div>
                                            </Box>
                                        ) : (
                                            <Box
                                                {...innerProps}
                                                sx={{
                                                    padding: 1.5,
                                                    cursor: "pointer",
                                                    "&:hover": {
                                                        background: "#f0f0f0",
                                                    },
                                                }}
                                                onMouseOver={() => handleMouseOver(data)}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                <div>{label}</div>
                                                {hoveredOption === data && (
                                                    <div>
                                                        <Divider sx={{ height: 2 }} />
                                                        <Typography
                                                            sx={{
                                                                paddingLeft: "32px", 
                                                                marginTop: "10px", 
                                                                fontSize: "11px", 
                                                                letterSpacing: "1px", 
                                                                fontStyle: "italic",
                                                                color: "#f00"  
                                                            }}
                                                            variant="body1"
                                                        >
                                                            Transportasi yang tersisa {data.stok} lagi
                                                        </Typography>
                    
                                                        {/* <Typography
                                                            sx={{
                                                                marginLeft: "10px",
                                                                marginTop: "10px",
                                                                fontSize: "12px",
                                                                fontWeight: "bold",
                                                            }}
                                                        >
                                                            {!data.label_distance
                                                                ? "Jarak: -"
                                                                : `Jarak: ${data.label_distance}`}
                                                        </Typography> */}
                                                    </div>
                                                )}
                                            </Box>
                                        )}
                                    </>
                                ),
                            }}
                        />
                    </Box>

                    {selectState.touristTransportation.selectedState !== "" && (
                        <Box className={classes.boxTouristData}>
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
