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
  
export default function FormDialogAdd({
    openDialog,
    addInformasiDanLayanan,
    handleChange,
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
                            <TextField
                                label="Value Informasi Dan Layanan"
                                name="valueInformasiDanLayanan"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={addInformasiDanLayanan.valueInformasiDanLayanan}
                                onChange={(e) => handleChange("valueInformasiDanLayanan", e.target.value)}
                            />
            
                            <TextField
                                label="Nama Informasi Dan Layanan"
                                name="namaInformasiDanLayanan"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={addInformasiDanLayanan.namaInformasiDanLayanan}
                                onChange={(e) => handleChange("namaInformasiDanLayanan", e.target.value)}
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
  