import { useState } from "react";
import { 
    Box, 
    Button, 
    TextField, 
    Typography 
} from "@mui/material";
import { 
    AddCircle, 
    Close, 
    DeleteForever, 
    LockReset, 
    Person, 
    Save
} from "@mui/icons-material";
import { useMediaQuery } from "react-responsive";
import { useProfilStyles } from "./style";
import { orange } from "@mui/material/colors";
import Navbar from "../../../components/navbar/Navbar";

export default function Profil(props) {
    console.log(props);

    const isMobile = useMediaQuery({ maxWidth: 991 });
    const classes = useProfilStyles({ isMobile });

    const styles = {
        buttonAdd: {
            padding: "7px 14px",
            textAlign: "center",
            cursor: "pointer",
            borderRadius: "6px",
            color: "#fff",
            backgroundColor: "#0F67B1",
            "&:hover": {
                backgroundColor: "#3FA2F6",
            },

        },

        buttonEdit: {
            padding: "7px 14px",
            textAlign: "center",
            cursor: "pointer",
            borderRadius: "6px",
            color: "#fff",
            backgroundColor: "#367E18",
            "&:hover": {
                backgroundColor: "#54B435",
            },
        },

        buttonDelete: {
            padding: "7px 14px",
            textAlign: "center",
            cursor: "pointer",
            borderRadius: "6px",
            color: "#fff",
            backgroundColor: "#D21312",
            "&:hover": {
                backgroundColor: "#FF0303",
            },
        },

        clearMarginTextField: {
            "&.MuiFormControl-marginNormal": {
                marginTop: "0px" 
            }
        }
    };

    const [boolUbahDataProfil, setBoolUbahDataProfil] = useState(false);

    let profil = true;

    const handleUbahDataProfil = () => {
        setBoolUbahDataProfil(true);
    };

    const handleBatalDataProfil = () => {
        setBoolUbahDataProfil(false);
    };

    return (
        <>
            <Box className={classes.profilBackground}>
                <Navbar />
                <Box className={classes.containerParent}>
                    <Typography 
                        sx={{ 
                            textAlign: "center", 
                            fontSize: 24,
                            fontWeight: "bold",
                            letterSpacing: "2px"
                        }}
                    >
                        Profile
                    </Typography>

                    <Box className={classes.containerChild}>
                        <Box className={classes.setProfil}>
                            <Box className={classes.boxProfil}>
                                {profil ? (
                                    <img 
                                        src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3GzszKKQDonXcCchn1vvL7dIoSBEOXUuoOw&usqp=CAU"}
                                        style={{ 
                                            width: "16.5vw", 
                                            height: "39vh", 
                                            borderRadius: "16px" 
                                        }}
                                    />
                                ) : (
                                    <Person 
                                        style={{ 
                                            fontSize: "16.5vw",
                                            color: "#f3f3f3"
                                        }}
                                    />
                                )}
                            </Box>

                            {boolUbahDataProfil ? (
                                <Box className={classes.boxButtonProfil}>
                                    <Button
                                        sx={styles.buttonDelete}
                                        startIcon={<DeleteForever />}
                                        // onClick={() => handleDeleteDestinasi(data.id)}
                                    >
                                        Hapus Profil
                                    </Button>

                                    {profil ? (
                                        <Button
                                            sx={styles.buttonEdit}
                                            startIcon={<LockReset />}
                                            // onClick={() => handleDeleteDestinasi(data.id)}
                                        >
                                            Ubah Profil
                                        </Button>
                                    ) : (
                                        <Button
                                            sx={styles.buttonAdd}
                                            startIcon={<AddCircle />}
                                            // onClick={() => handleDeleteDestinasi(data.id)}
                                        >
                                            Tambah Profil
                                        </Button>
                                    )}
                                </Box>
                            ) : null}
                        </Box>

                        <Box className={classes.setForm}>
                            <TextField
                                label={boolUbahDataProfil ? "Nama Lengkap" : ""}
                                name="namaLengkap"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                defaultValue={props.userLogin.fullname}
                                disabled={!boolUbahDataProfil}
                                InputProps={{
                                    classes: {
                                        disabled: classes.disabled, 
                                        input: classes.inputCapitalize 
                                    },
                                }}
                                sx={styles.clearMarginTextField}
                            />

                            <Box sx={{ display: "flex", justifyContent: "end" }}>
                                {boolUbahDataProfil ? (
                                    <Box sx={{ display: "flex", gap: "12px" }}>
                                        <Button
                                            sx={styles.buttonDelete}
                                            startIcon={<Close />}
                                            onClick={handleBatalDataProfil}
                                        >
                                            Batalkan
                                        </Button>

                                        <Button
                                            sx={styles.buttonAdd}
                                            startIcon={<Save />}
                                            // onClick={handleBatalDataProfil}
                                        >
                                            Save
                                        </Button>
                                    </Box>
                                ) : (
                                    <Button
                                        sx={styles.buttonEdit}
                                        startIcon={<LockReset />}
                                        onClick={handleUbahDataProfil}
                                    >
                                        Edit
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}