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
import { ArrowForward, Delete, Save } from "@mui/icons-material";
import Select from "react-select";
import KarikaturBeach from "../../../../../media/karikatur_beach.jpg";

export const sectionTouristDestination = (
    isMobile, 
    classes, 
    formik, 
    handleNext, 
    selectState, 
    handleChangeSelectState, 
    hoveredOption, 
    handleMouseOver, 
    handleMouseLeave, 
    inputRefDurasi, 
    handleListData, 
    listData, 
    handleListDelete 
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

    return (
        <Box className={classes.containerParent}>
            <Box className={classes.containerChild}>
                <Box className={classes.setForm}>
                    {listData?.length > 0 ? (
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
                                    height: listData.length >= 3 && "30vh", 
                                    // overflowY: listData.length >= 3 && "scroll" 
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
                                                <TableCell align="center" style={styles.tableCell}>Durasi</TableCell>
                                                <TableCell align="center" style={styles.tableCell}>Satuan</TableCell>
                                                <TableCell align="center" style={styles.tableCell}>Total</TableCell>
                                                <TableCell align="center" style={styles.tableCell}>Aksi</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {listData?.map((row, index) => {
                                                const matchedItem = selectState?.touristTransportation?.states?.find((f) => 
                                                    f.value === row.transportasi
                                                );
                                                
                                                return (
                                                    <TableRow
                                                        key={index}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">{index + 1}.</TableCell>
                                                        <TableCell align="center">{row.tujuan}</TableCell>
                                                        <TableCell align="center">{matchedItem ? matchedItem.label : "Tidak ditemukan"}</TableCell>
                                                        <TableCell align="center">{row.unit}</TableCell>
                                                        <TableCell align="center">{row.durasi} hari</TableCell>
                                                        <TableCell align="center">{row.satuan}</TableCell>
                                                        <TableCell align="center">{row.total}</TableCell>
                                                        <TableCell align="center">
                                                            <Delete 
                                                                sx={{ cursor: "pointer" }} 
                                                                onClick={() => handleListDelete(index)}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
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
                                <Typography variant="span" className="form-label" sx={styles.label}>Satuan Transportasi Wisata</Typography>
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
                                <Typography variant="span" className="form-label" sx={styles.label}>Lama Wisata</Typography>
                                <TextField 
                                    id="lamaWisata"
                                    name="lamaWisata"
                                    placeholder="Input dalam jumlah hari"
                                    type="number"
                                    inputRef={inputRefDurasi}
                                    defaultValue={formik?.values?.durasi}
                                    onBlur={() => formik.setFieldValue("durasi", parseInt(inputRefDurasi.current?.value))}
                                    inputProps={{ min: 1 }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">Hari</InputAdornment>,
                                    }}
                                    required
                                    sx={styles.textField}
                                />
                            </Box>
                        </>
                    )}

                    <Box className={classes.boxPrevOrNext}>
                        <Button
                            sx={styles.buttonSave}
                            endIcon={<Save />}
                            onClick={handleListData}
                        >
                            Simpan
                        </Button>

                        {listData?.length > 0 && (
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
