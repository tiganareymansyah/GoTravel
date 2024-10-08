import { useState } from "react";
import { 
    Box, 
    Button, 
    TextField, 
    Typography 
} from "@mui/material";
import { 
    Email,
    Facebook,
    GitHub,
    Instagram, 
    Send, 
    WhatsApp
} from "@mui/icons-material";
import Navbar from "../../../components/navbar/Navbar";
import { useMediaQuery } from "react-responsive";
import { useContactStyles } from "./style";
import Alert from "../../../components/Alert/Alert";
import { apiSendMessage } from "../../../api/api";

export default function Contact(props) {
    console.log(props);

    const isMobile = useMediaQuery({ maxWidth: 991 });
    const classes = useContactStyles({ isMobile });

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

    const [openAlert, setOpenAlert] = useState(false);
    const [severity, setSeverity] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [dataContact, setDataContact] = useState({
        fromEmail: props.userLogin?.email,
        toEmail: "tiganareymansyah2502@gmail.com",
        idUser: props.userLogin?.id_user,
        chat: ""
    });

    const handleAlert = (open, severity, title, message) => {
        setOpenAlert(open);
        setSeverity(severity);
        setTitle(title);
        setMessage(message);
    };

    const handleCloseAlert = () => {
        setOpenAlert(false);
        if(severity === "successNoReload") {
            location.href = "/contact";
        }
    }

    const handleChange = (field, value) => {
        setDataContact((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSendChat = async () => {
        if(dataContact.chat === "") {
            handleAlert(
                true,
                "warning",
                "Pemberitahuan",
                "Form tidak boleh kosong"
            );

            return false;
        }

        props.doLoad();
        try {
            let payload = {
                id_user: dataContact.idUser,
                message: dataContact.chat
            };

            const result = await apiSendMessage({
                body: JSON.stringify(payload)
            });

            const { code, status, message, data } = result;

            if(status === "success") {
                handleAlert(
                    true,
                    "successNoReload",
                    "Sukses",
                    message
                )
                props.doLoad();
            }
        } catch (err) {
            console.log(err);
            props.doLoad();
        }
    };

    console.log(dataContact);

    return (
        <>
            <Box className={classes.contactBackground}>
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
                        Hubungi Kami
                    </Typography>

                    <Box className={classes.containerChild}>
                        <Box className={classes.boxInfoContact}>
                            <Typography
                                sx={{
                                    fontWeight: "bold", 
                                    paddingLeft: "16%", 
                                    fontSize: 20 
                                }}
                            >
                                Kontak Lainnya : 
                            </Typography>
                            <Box
                                sx={{
                                    paddingTop: "1vw", 
                                    display: "flex", 
                                    paddingLeft: "16%", 
                                    gap: "4px"
                                }}
                            >
                                <Email />
                                <Typography>tiganareymansyah2502@gmail.com</Typography>
                            </Box>
                            <Box
                                sx={{
                                    paddingTop: "0.5vw", 
                                    display: "flex", 
                                    paddingLeft: "16%", 
                                    gap: "4px"
                                }}
                            >
                                <WhatsApp />
                                <Typography>082267274100</Typography>
                            </Box>
                            <Box
                                sx={{
                                    paddingTop: "0.5vw", 
                                    display: "flex", 
                                    paddingLeft: "16%", 
                                    gap: "4px"
                                }}
                            >
                                <Instagram />
                                <Typography>@tigana_reymansyah</Typography>
                            </Box>
                            <Box
                                sx={{
                                    paddingTop: "0.5vw", 
                                    display: "flex", 
                                    paddingLeft: "16%", 
                                    gap: "4px"
                                }}
                            >
                                <Facebook />
                                <Typography>Tigana Reymansyah</Typography>
                            </Box>
                            <Box
                                sx={{
                                    paddingTop: "0.5vw", 
                                    display: "flex", 
                                    paddingLeft: "16%", 
                                    gap: "4px"
                                }}
                            >
                                <GitHub />
                                <Typography>tiganareymansyah</Typography>
                            </Box>
                        </Box>

                        <Box className={classes.boxFormContact}>
                            <Typography
                                sx={{
                                    fontWeight: "bold", 
                                    textAlign: "center", 
                                    fontSize: 22 
                                }}
                            >
                                Ayo Ngobrol!
                            </Typography>
                            <Box className={classes.formContact}>
                                <TextField 
                                    id="sender"
                                    name="sender"
                                    variant="outlined"
                                    fullWidth
                                    defaultValue={`Dari : ${dataContact.fromEmail}`}
                                    disabled
                                    InputProps={{
                                        classes: {
                                            disabled: classes.disabled 
                                        },
                                    }}
                                    sx={styles.clearMarginTextField}
                                />

                                <TextField 
                                    id="recipient"
                                    name="recipient"
                                    variant="outlined"
                                    fullWidth
                                    defaultValue={`Ke : ${dataContact.toEmail}`}
                                    disabled
                                    InputProps={{
                                        classes: {
                                            disabled: classes.disabled 
                                        },
                                    }}
                                    sx={styles.clearMarginTextField}
                                />

                                <TextField 
                                    placeholder="Silahkan isi..."
                                    id="chat"
                                    name="chat"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={5}
                                    value={dataContact.chat}
                                    onChange={(e) => handleChange("chat", e.target.value)}
                                />
                            </Box>
                            <Box className={classes.boxButtonSend}>
                                <Button
                                    sx={styles.buttonAdd}
                                    startIcon={<Send />}
                                    onClick={handleSendChat}
                                >
                                    Kirim
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {openAlert && (
                <Alert
                    open={openAlert}
                    close={handleCloseAlert}
                    severity={severity}
                    title={title}
                    message={message}
                />
            )}
        </>
    );
};
