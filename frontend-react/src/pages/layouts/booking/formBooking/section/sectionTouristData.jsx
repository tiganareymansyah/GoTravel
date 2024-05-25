import { Box, Button, TextField, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import Select from "react-select";
import KarikaturBeach from "../../../../../media/karikatur_beach1.jpg";

export const sectionTouristData = (
    classes, 
    formik, 
    handleNext, 
    handlePrev, 
) => {
    const styles = {
        label: {
            fontWeight: "700",
            fontSize: "18px",
            letterSpacing: "1px" 
        },

        textField: {
            width: "47%" 
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
                        <Typography variant="span" className="form-label" sx={styles.label}>Nama Lengkap KTP</Typography>
                        <TextField 
                            id="namaLengkap"
                            name="namaLengkap"
                            variant="standard"
                            placeholder="Nama Lengkap"
                            // inputRef={inputRefFullName}
                            // defaultValue={formik.values.fullname}
                            // onChange={() => handleChange("fullname", inputRefFullName.current?.value)}
                            required
                            sx={styles.textField}
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
                        <Typography variant="span" className="form-label" sx={styles.label}>NIK</Typography>
                        <TextField 
                            id="nik"
                            name="nik"
                            variant="standard"
                            placeholder="NIK"
                            // inputRef={inputRefFullName}
                            // defaultValue={formik.values.fullname}
                            // onChange={() => handleChange("fullname", inputRefFullName.current?.value)}
                            required
                            sx={styles.textField}
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
                        <Typography variant="span" className="form-label" sx={styles.label}>Email</Typography>
                        <TextField 
                            id="email"
                            name="email"
                            variant="standard"
                            placeholder="Email"
                            // inputRef={inputRefFullName}
                            // defaultValue={formik.values.fullname}
                            // onChange={() => handleChange("fullname", inputRefFullName.current?.value)}
                            required
                            sx={styles.textField}
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
                        <Typography variant="span" className="form-label" sx={styles.label}>Nomor HP</Typography>
                        <TextField 
                            id="nomorHp"
                            name="nomorHp"
                            variant="standard"
                            placeholder="Nomor Hp"
                            // inputRef={inputRefFullName}
                            // defaultValue={formik.values.fullname}
                            // onChange={() => handleChange("fullname", inputRefFullName.current?.value)}
                            required
                            sx={styles.textField}
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
                        <Typography variant="span" className="form-label" sx={styles.label}>Alamat</Typography>
                        <TextField 
                            id="alamat"
                            name="alamat"
                            variant="outlined"
                            placeholder="Alamat"
                            rows={3}
                            multiline
                            // inputRef={inputRefFullName}
                            // defaultValue={formik.values.fullname}
                            // onChange={() => handleChange("fullname", inputRefFullName.current?.value)}
                            required
                            sx={styles.textField}
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
