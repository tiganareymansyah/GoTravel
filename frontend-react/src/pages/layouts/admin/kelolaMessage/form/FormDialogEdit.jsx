import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    styled,
    TextField,
  } from "@mui/material";
  import { 
    Close, 
    Save, 
    Send 
} from "@mui/icons-material";
  
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));
  
  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }
  
  // BootstrapDialogTitle.propTypes = {
  //   children: PropTypes.node,
  //   onClose: PropTypes.func.isRequired,
  // };
  
  export default function FormDialogEdit({
    classes,
    openEditDialog,
    addMessage,
    editDataMessage,
    handleChange,
    handleCloseEdit,
    handleAddAnswer,
}) {
    console.log(addMessage);

    const styles = {
        buttonSend: {
            padding: "7px 14px",
            textAlign: "center",
            cursor: "pointer",
            borderRadius: "6px",
            color: "#fff",
            backgroundColor: "#0F67B1",
            "&:hover": {
                backgroundColor: "#3FA2F6",
            },
        }
    };

    return (
        <>
            <BootstrapDialog
                onClose={handleCloseEdit}
                aria-labelledby="customized-dialog-title"
                open={openEditDialog}
                PaperProps={{ style: { width: "500px", padding: "20px" } }}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleCloseEdit}
                >
                    {addMessage.answer ? "Pesan Terjawab" : "Tambah Jawaban"}
                </BootstrapDialogTitle>

                <DialogContent dividers>
                    <Box>
                        <form onSubmit={(e) => handleAddAnswer(e)}>
                            <TextField
                                InputProps={{
                                    classes: {
                                        disabled: classes.disabled,
                                        // input: classes.inputCapitalize,
                                    },
                                }}
                                // sx={{
                                //     "& .css-8ewcdo-MuiInputBase-root-MuiOutlinedInput-root": {
                                //         padding: 0.1
                                //     },
                                // }}
                                disabled
                                label="Message"
                                name="message"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                multiline
                                rows={5}
                                value={addMessage.message}
                                onChange={(e) => handleChange("message", e.target.value)}
                            />

                            <TextField
                                InputProps={{
                                    classes: {
                                        disabled: classes.disabled
                                    },
                                }}
                                disabled={editDataMessage.answer}
                                label="Answer"
                                name="answer"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                multiline
                                rows={5}
                                value={addMessage.answer}
                                onChange={(e) => handleChange("answer", e.target.value)}
                            />

                            {!editDataMessage.answer && (
                                <Box
                                    sx={{
                                        paddingTop: "16px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "end",
                                    }}
                                >
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={styles.buttonSend}
                                        startIcon={<Send />}
                                    >
                                        Kirim
                                    </Button>
                                </Box>
                            )}
                        </form>
                    </Box>
                </DialogContent>
            </BootstrapDialog>
        </>
    );
}
