import {
    Check,
    Close,
} from "@mui/icons-material";
import {
    Box,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlertStyles } from "./style.js";
import { useMediaQuery } from "react-responsive";
  
export default function Alert({ open, close, severity, title, message }) {
    const isMobile = useMediaQuery({ maxWidth: 991 });
    const classes = useAlertStyles({ isMobile });

    const [redirectCount, setRedirectCount] = useState(3);
  
    const handleAutoClose = () => {
      if (open && redirectCount > 0) {
        setTimeout(() => setRedirectCount(redirectCount - 1), 1000);
      } else if (redirectCount === 0) {
        close();
        setRedirectCount(3);
      }
    };
  
    useEffect(() => {
      if (severity === "success") {
        handleAutoClose();
        if (!open) {
          setRedirectCount(3);
        }
      }
    }, [open, redirectCount]);
  
    return (
        <Dialog
            open={open}
            onClose={close}
            PaperProps={{
                style: {
                    borderRadius: "10px",
                    padding: 20,
                    zIndex: 999999999,
                },
            }}
        >
            <DialogTitle className={classes.dialogTitle}>
                <Close 
                    onClick={close} 
                    className={classes.iconClose} 
                    sx={{
                        backgroundColor: "#bbb",
                        padding: "4px",
                        borderRadius: "16px",
                        "&:hover": {
                            backgroundColor: "#aaa"
                        }
                    }}
                />
            </DialogTitle>
  
            <DialogContent>
                <Box className={classes.rowContainer}>
                    {severity === "success" && (
                        <>
                            <Check 
                                sx={{
                                    fontSize: 100,
                                    color: "white",
                                    backgroundColor: "#A5DD9B",
                                    padding: 5,
                                    borderRadius: "50%",
                                }}
                            />
                            <p className={classes.textTitle}>{title}</p>
                            <p className={classes.textMessage}>{message}</p>
                            <p className={classes.textRedirect}>Redirect dalam : {redirectCount}</p>
                        </>
                    )}

                    {severity === "successNoReload" && (
                        <>
                            <Check 
                                sx={{
                                    fontSize: 100,
                                    color: "white",
                                    backgroundColor: "#A5DD9B",
                                    padding: 5,
                                    borderRadius: "50%",
                                }}
                            />
                            <p className={classes.textTitle}>{title}</p>
                            <p className={classes.textMessage}>{message}</p>
                        </>
                    )}

                    {severity === "error" && (
                        <>
                            <Close 
                                sx={{
                                    fontSize: 100,
                                    color: "white",
                                    backgroundColor: "#b81414",
                                    padding: 3,
                                    borderRadius: "50%",
                                }}
                            />
                            <p className={classes.textTitle}>{title}</p>
                            <p className={classes.textMessage}>{message}</p>
                        </>
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
};
