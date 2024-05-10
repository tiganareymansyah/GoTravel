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
            <DialogTitle>
                <IconButton aria-label="close" onClick={close} className={classes.iconClose}>
                    <Close />
                </IconButton>
            </DialogTitle>
  
            <DialogContent>
                <Box className={classes.rowContainer}>
                    {severity === "success" && (
                        <>
                            <Check className={classes.iconSuccess} />
                            <p className={classes.textTitle}>{title}</p>
                            <p className={classes.textMessage}>{message}</p>
                            <p className={classes.textRedirect}>Redirect dalam : {redirectCount}</p>
                        </>
                    )}

                    {severity === "successNoReload" && (
                        <>
                            <Check className={classes.iconSuccess} />
                            <p className={classes.textTitle}>{title}</p>
                            <p className={classes.textMessage}>{message}</p>
                        </>
                    )}

                    {severity === "error" && (
                        <>
                            <Close className={classes.iconError} />
                            <p className={classes.textTitle}>{title}</p>
                            <p className={classes.textMessage}>{message}</p>
                        </>
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
};
