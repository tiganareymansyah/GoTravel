import {
    Box, 
    Button, 
    Dialog, 
    DialogContent, 
    DialogTitle, 
    IconButton, 
    styled, 
    TextField 
} from "@mui/material";
import { 
    Close, 
    Save, 
    Send 
} from "@mui/icons-material";
import Select from "react-select";
  
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
        // overflow: "hidden"
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
  
export default function FormDialogAdd({
    openDialog, 
    addInformasiDanLayanan, 
    selectState, 
    handleChange, 
    handleChangeSelectState, 
    handleCloseAdd, 
    handleAddInformasiDanLayanan 
}) {
    return (
        <>
            <BootstrapDialog
                onClose={handleCloseAdd}
                aria-labelledby="customized-dialog-title"
                open={openDialog}
                PaperProps={{ style: { width: "500px", padding: "20px" } }}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleCloseAdd}
                >
                    Tambah Kelola Informasi Dan Layanan
                </BootstrapDialogTitle>

                <DialogContent dividers>
                    <Box>
                        <form onSubmit={(e) => handleAddInformasiDanLayanan(e)}>
                            <Select 
                                value={selectState.destinationName.selectedState}
                                options={selectState.destinationName.states}
                                onChange={(state) => {
                                    handleChangeSelectState("destinationName", state);
                                }}
                                styles={{
                                    container: (baseStyles, state) => ({
                                        ...baseStyles,
                                        fontSize: 16,
                                        zIndex: 2
                                    }),
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        textIndent: "10px"
                                    }),
                                    singleValue: (baseStyles, state) => ({
                                        ...baseStyles,
                                        color: "#000000"
                                    }),
                                }}
                                className="form-input"
                            />
            
                            <TextField
                                label="Informasi Dan Layanan"
                                name="informasiDanLayanan"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                multiline
                                rows={5}
                                value={addInformasiDanLayanan.informasiDanLayanan}
                                onChange={(e) => handleChange("informasiDanLayanan", e.target.value)}
                            />
            
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "end",
                                }}
                            >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        background: "#18345c",
                                        color: "white",
                                        fontWeight: "bold",
                                        marginTop: "5px",
                                        width: "30%"
                                    }}
                                    startIcon={<Save />}
                                >
                                    Simpan
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </DialogContent>
            </BootstrapDialog>
        </>
    );
}
  