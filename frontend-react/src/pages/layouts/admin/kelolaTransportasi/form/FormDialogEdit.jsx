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
import { Close, Save, Send } from "@mui/icons-material";

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
  openEditDialog,
  payloadTransportasi,
  handleChange,
  handleCloseEdit,
  handleEditTransportasi,
}) {
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
          Edit Transportasi
        </BootstrapDialogTitle>

        <DialogContent dividers>
          <Box>
            <form onSubmit={(e) => handleEditTransportasi(e)}>
              <TextField
                label="Value Transportasi"
                name="valueTransportasi"
                variant="outlined"
                fullWidth
                margin="normal"
                value={payloadTransportasi.valueTransportasi}
                onChange={(e) =>
                  handleChange("valueTransportasi", e.target.value)
                }
              />

              <TextField
                label="Nama Transportasi"
                name="namaTransportasi"
                variant="outlined"
                fullWidth
                margin="normal"
                value={payloadTransportasi.namaTransportasi}
                onChange={(e) =>
                  handleChange("namaTransportasi", e.target.value)
                }
              />

              <TextField
                label="Muatan Transportasi"
                name="muatanTransportasi"
                variant="outlined"
                fullWidth
                margin="normal"
                value={payloadTransportasi.muatanTransportasi}
                onChange={(e) =>
                  handleChange("muatanTransportasi", e.target.value)
                }
              />

              <TextField
                label="Stok Transportasi"
                name="stokTransportasi"
                variant="outlined"
                fullWidth
                margin="normal"
                value={payloadTransportasi.stokTransportasi}
                onChange={(e) =>
                  handleChange("stokTransportasi", e.target.value)
                }
              />

              <TextField
                label="Harga Transportasi"
                name="hargaTransportasi"
                variant="outlined"
                fullWidth
                margin="normal"
                value={payloadTransportasi.hargaTransportasi}
                onChange={(e) =>
                  handleChange("hargaTransportasi", e.target.value)
                }
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
