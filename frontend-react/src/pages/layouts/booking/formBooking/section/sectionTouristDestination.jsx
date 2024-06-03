import { 
    Box, 
    Button, 
    Divider, 
    Paper, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Typography 
} from "@mui/material";
import { ArrowForward, Delete, Save } from "@mui/icons-material";
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
    handleMouseLeave, 
    handleSelectedData, 
    selectedData, 
    handleDelete 
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

    return (
        <Box className={classes.containerParent}>
            <Box className={classes.containerChild}>
                <Box className={classes.setForm}>
                    {selectedData?.length > 0 ? (
                        <>
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    fontWeight: "bold", 
                                    textAlign: "center", 
                                    letterSpacing: "1px" 
                                }}
                            >
                                Daftar Pilihan
                            </Typography>
                            <Box 
                                className={classes.boxTouristData} 
                                sx={{ 
                                    height: selectedData.length >= 3 && "30vh", 
                                    // overflowY: selectedData.length >= 3 && "scroll" 
                                }}
                            >
                                <TableContainer component={Paper} sx={{ maxHeight: "100%" }}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={styles.tableCell}>No</TableCell>
                                                <TableCell align="center" style={styles.tableCell}>Tujuan</TableCell>
                                                <TableCell align="center" style={styles.tableCell}>Transportasi</TableCell>
                                                <TableCell align="center" style={styles.tableCell}>Unit</TableCell>
                                                <TableCell align="center" style={styles.tableCell}>Aksi</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {selectedData?.map((row, index) => (
                                                <TableRow
                                                    key={index}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">{row.no + 1}.</TableCell>
                                                    <TableCell align="center">{row.tujuan}</TableCell>
                                                    <TableCell align="center">{row.transportasi}</TableCell>
                                                    <TableCell align="center">{row.unit}</TableCell>
                                                    <TableCell align="center">
                                                        <Delete 
                                                            sx={{ cursor: "pointer" }} 
                                                            onClick={() => handleDelete(index)}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </>
                    ) : null}

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

                                                    <Typography
                                                        sx={{
                                                            paddingLeft: "70px", 
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
                    
                                                        <Typography
                                                            sx={{
                                                                paddingLeft: "70px", 
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
                            <Typography variant="span" className="form-label" sx={styles.label}>Mau Berapa Transportasi</Typography>
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
                    )}

                    <Box className={classes.boxPrevOrNext}>
                        <Button
                            sx={styles.buttonSave}
                            endIcon={<Save />}
                            onClick={handleSelectedData}
                        >
                            Simpan
                        </Button>

                        {selectedData?.length > 0 && (
                            <Button
                                sx={styles.buttonNext}
                                endIcon={<ArrowForward />}
                                onClick={handleNext}
                            >
                                Lanjut
                            </Button>
                        )}
                    </Box>
                </Box>
                
                <Box className={classes.boxKarikaturImage}>
                    <img src={KarikaturBeach} width={300} />
                </Box>
            </Box>
        </Box>
    );
};
