import { Box, Button, TextField, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import KarikaturBeach from "../../../../../media/karikatur_beach1.jpg";

export const sectionTouristData = (
    classes, 
    props, 
    formik, 
    handleNext, 
    handlePrev, 
    inputRefFullName, 
    inputRefNik, 
    // inputRefEmail, 
    inputRefNomorHp, 
    inputRefAlamat 
) => {
    const styles = {
        label: {
            fontWeight: "bold",
            fontSize: "18px",
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif"
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
                        <Typography 
                            variant="span" 
                            className="form-label" 
                            sx={styles.label}
                        >
                            Nama Lengkap KTP
                            <span style={{ color: "red" }}>&nbsp;*</span>
                        </Typography>
                        <TextField 
                            id="namaLengkap"
                            name="namaLengkap"
                            // variant="standard"
                            variant="outlined"
                            size="small"
                            placeholder="Nama Lengkap"
                            inputRef={inputRefFullName}
                            defaultValue={formik?.values?.fullName}
                            onBlur={() => formik.setFieldValue("fullName", inputRefFullName.current?.value)}
                            required
                            sx={styles.textField}
                        />
                    </Box>

                    <Box className={classes.boxTouristData}>
                        <Typography 
                            variant="span" 
                            className="form-label" 
                            sx={styles.label}
                        >
                            NIK
                            <span style={{ color: "red" }}>&nbsp;*</span>
                        </Typography>
                        <TextField 
                            id="nik"
                            name="nik"
                            variant="outlined"
                            size="small"
                            placeholder="NIK"
                            inputRef={inputRefNik}
                            defaultValue={formik?.values?.nik}
                            onBlur={() => formik.setFieldValue("nik", inputRefNik.current?.value)}
                            required
                            sx={styles.textField}
                        />
                    </Box>

                    <Box className={classes.boxTouristData}>
                        <Typography 
                            variant="span" 
                            className="form-label" 
                            sx={styles.label}
                        >
                            Email
                            <span style={{ color: "red" }}>&nbsp;*</span>
                        </Typography>
                        <TextField 
                            id="email"
                            name="email"
                            variant="outlined"
                            size="small"
                            placeholder="Email"
                            // defaultValue={formik?.values?.email}
                            // inputRef={inputRefEmail}
                            // onBlur={() => formik.setFieldValue("email", inputRefEmail.current?.value)}
                            // required
                            defaultValue={props?.userLogin?.email}
                            disabled
                            sx={styles.textField}
                            InputProps={{
                                classes: {
                                    disabled: classes.disabled
                                },
                            }}
                        />
                    </Box>

                    <Box className={classes.boxTouristData}>
                        <Typography 
                            variant="span" 
                            className="form-label" 
                            sx={styles.label}
                        >
                            Nomor HP
                            <span style={{ color: "red" }}>&nbsp;*</span>
                        </Typography>
                        <TextField 
                            id="nomorHp"
                            name="nomorHp"
                            variant="outlined"
                            size="small"
                            placeholder="Nomor Hp"
                            inputRef={inputRefNomorHp}
                            defaultValue={formik?.values?.nomorHp}
                            onBlur={() => formik.setFieldValue("nomorHp", inputRefNomorHp.current?.value)}
                            required
                            sx={styles.textField}
                        />
                    </Box>
                    
                    <Box className={classes.boxTouristData}>
                        <Typography 
                            variant="span" 
                            className="form-label" 
                            sx={styles.label}
                        >
                            Alamat
                            <span style={{ color: "red" }}>&nbsp;*</span>
                        </Typography>
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
