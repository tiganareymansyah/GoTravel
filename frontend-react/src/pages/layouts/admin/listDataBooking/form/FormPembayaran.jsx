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
  import { Close, Payments } from "@mui/icons-material";
import { formatUangByKodeMataUang } from "../../../../../services/utils";
  
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
  
  export default function FormPembayaran({
    openDetail,
    detailListDataBooking,
    handleCloseDetail,
    handleBayar
  }) {
    return (
      <>
        <BootstrapDialog
          onClose={handleCloseDetail}
          aria-labelledby="customized-dialog-title"
          open={openDetail}
          PaperProps={{ style: { width: "500px", padding: "20px" } }}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleCloseDetail}
          >
            Detail Booking
          </BootstrapDialogTitle>
  
          <DialogContent dividers>
            <Box>
              <form onSubmit={(e) => handleBayar(e)}>
                <TextField
                  disabled
                  label="Kode Pembayaran"
                  name="kodePembayaran"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  defaultValue={detailListDataBooking.kode_pembayaran}
                />
  
                <TextField
                  disabled
                  label="Total Keseluruhan"
                  name="totalKeseluruhan"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  defaultValue={formatUangByKodeMataUang(detailListDataBooking.total_bayar, "IDR")}
                />

                <TextField
                  disabled
                  label="Metode Pembayaran"
                  name="metodePembayaran"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  defaultValue={detailListDataBooking.metode_pembayaran}
                />

                {detailListDataBooking.is_bayar === 0 && (
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
                      startIcon={<Payments />}
                    >
                      Bayar
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
  