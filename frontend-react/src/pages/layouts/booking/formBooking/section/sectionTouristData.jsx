import { Box, Button, TextField, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import KarikaturBeach from "../../../../../media/karikatur_beach1.jpg";

export const sectionTouristData = (
    classes, 
    formik, 
    handleNext, 
    handlePrev, 
    inputRefFullName, 
    inputRefNik, 
    inputRefEmail, 
    inputRefNomorHp, 
    inputRefAlamat 
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
        <Box className={classes.containerParent}>
            <Box className={classes.containerChild}>
                <Box className={classes.setForm}>
                    <Box className={classes.boxTouristData}>
                        <Typography variant="span" className="form-label" sx={styles.label}>Nama Lengkap KTP</Typography>
                        <TextField 
                            id="namaLengkap"
                            name="namaLengkap"
                            variant="standard"
                            placeholder="Nama Lengkap"
                            inputRef={inputRefFullName}
                            defaultValue={formik?.values?.fullName}
                            onBlur={() => formik.setFieldValue("fullName", inputRefFullName.current?.value)}
                            required
                            sx={styles.textField}
                        />
                    </Box>

                    <Box className={classes.boxTouristData}>
                        <Typography variant="span" className="form-label" sx={styles.label}>NIK</Typography>
                        <TextField 
                            id="nik"
                            name="nik"
                            variant="standard"
                            placeholder="NIK"
                            inputRef={inputRefNik}
                            defaultValue={formik?.values?.nik}
                            onBlur={() => formik.setFieldValue("nik", inputRefNik.current?.value)}
                            required
                            sx={styles.textField}
                        />
                    </Box>

                    <Box className={classes.boxTouristData}>
                        <Typography variant="span" className="form-label" sx={styles.label}>Email</Typography>
                        <TextField 
                            id="email"
                            name="email"
                            variant="standard"
                            placeholder="Email"
                            inputRef={inputRefEmail}
                            defaultValue={formik?.values?.email}
                            onBlur={() => formik.setFieldValue("email", inputRefEmail.current?.value)}
                            required
                            sx={styles.textField}
                        />
                    </Box>

                    <Box className={classes.boxTouristData}>
                        <Typography variant="span" className="form-label" sx={styles.label}>Nomor HP</Typography>
                        <TextField 
                            id="nomorHp"
                            name="nomorHp"
                            variant="standard"
                            placeholder="Nomor Hp"
                            inputRef={inputRefNomorHp}
                            defaultValue={formik?.values?.nomorHp}
                            onBlur={() => formik.setFieldValue("nomorHp", inputRefNomorHp.current?.value)}
                            required
                            sx={styles.textField}
                        />
                    </Box>
                    
                    <Box className={classes.boxTouristData}>
                        <Typography variant="span" className="form-label" sx={styles.label}>Alamat</Typography>
                        <TextField 
                            id="alamat"
                            name="alamat"
                            variant="outlined"
                            placeholder="Alamat"
                            rows={3}
                            multiline
                            inputRef={inputRefAlamat}
                            defaultValue={formik?.values?.alamat}
                            onBlur={() => formik.setFieldValue("alamat", inputRefAlamat.current?.value)}
                            required
                            sx={styles.textField}
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
