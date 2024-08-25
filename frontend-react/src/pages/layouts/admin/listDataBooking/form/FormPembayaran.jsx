import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
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
  classes,
  openDetail,
  detailListDataBooking,
  handleCloseDetail,
  handleBayar,
  currentDate,
  isBookingExpired
}) {
  const styles = {
    tableCell: {
      fontWeight: "bold", 
      position: "sticky", 
      top: 0, 
      backgroundColor: "#fff", 
      zIndex: 1 
    },
  };

  return (
    <>
      <BootstrapDialog
        onClose={handleCloseDetail}
        aria-labelledby="customized-dialog-title"
        open={openDetail}
        PaperProps={{ 
          style: { 
            width: "1000px", 
            padding: "20px" 
          } 
        }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleCloseDetail}
        >
          Detail Booking
        </BootstrapDialogTitle>

        <DialogContent dividers>
          <Box>
            <form>
              {detailListDataBooking?.data_perjalanan?.length > 0 ? (
                <>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontWeight: "bold", 
                      textAlign: "center", 
                      letterSpacing: "1px" 
                    }}
                  >
                    Daftar Pilihan
                  </Typography>

                  <Box 
                    className={classes.boxTouristData} 
                    sx={{ 
                      height: detailListDataBooking?.data_perjalanan?.length >= 3 && "30vh", 
                      // overflowY: listData.length >= 3 && "scroll" 
                    }}
                  >
                    <TableContainer component={Paper} sx={{ maxHeight: "100%" }}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                        <TableHead>
                          <TableRow>
                            <TableCell style={styles.tableCell}>No</TableCell>  
                            <TableCell align="center" style={styles.tableCell}>Tujuan</TableCell>
                            <TableCell align="center" style={styles.tableCell}>Transportasi</TableCell>
                            <TableCell align="center" style={styles.tableCell}>Unit</TableCell>
                            <TableCell align="center" style={styles.tableCell}>Durasi</TableCell>
                            <TableCell align="center" style={styles.tableCell}>Satuan</TableCell>
                            <TableCell align="center" style={styles.tableCell}>Total</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {detailListDataBooking?.data_perjalanan?.map((row, index) => (
                            <TableRow
                              key={index}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">{index + 1}.</TableCell>
                              <TableCell align="center">{row.tujuan}</TableCell>
                              <TableCell align="center">{row.transportasi}</TableCell>
                              <TableCell align="center">{row.unit}</TableCell>
                              <TableCell align="center">{row.durasi} hari</TableCell>
                              <TableCell align="center">{row.satuan}</TableCell>
                              <TableCell align="center">{row.total}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </>
              ) : null}

              <TextField
                InputProps={{
                  classes: {
                    disabled: classes.disabled
                  },
                }}
                disabled
                label="Kode Booking"
                name="kodeBooking"
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue={detailListDataBooking.kode_booking}
              />

              <TextField
                InputProps={{
                  classes: {
                    disabled: classes.disabled,
                    input: classes.inputCapitalize,
                  },
                }}
                disabled
                label="Nama Lengkap"
                name="namaLengkap"
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue={detailListDataBooking.nama_lengkap}
              />

              <TextField
                InputProps={{
                  classes: {
                    disabled: classes.disabled
                  },
                }}
                disabled
                label="NIK"
                name="nik"
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue={detailListDataBooking.nik}
              />

              <TextField
                InputProps={{
                  classes: {
                    disabled: classes.disabled
                  },
                }}
                disabled
                label="Email"
                name="email"
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue={detailListDataBooking.email}
              />

              <TextField
                InputProps={{
                  classes: {
                    disabled: classes.disabled
                  },
                }}
                disabled
                label="Nomor Hp"
                name="nomorHp"
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue={detailListDataBooking.nomor_hp}
              />

              <TextField
                InputProps={{
                  classes: {
                    disabled: classes.disabled,
                    input: classes.inputCapitalize,
                  },
                }}
                disabled
                label="Alamat"
                name="alamat"
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue={detailListDataBooking.alamat}
              />

              <TextField
                InputProps={{
                  classes: {
                    disabled: classes.disabled
                  },
                }}
                disabled
                label="Mulai Booking"
                name="mulaiBooking"
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue={detailListDataBooking.mulai_booking}
              />

              <TextField
                InputProps={{
                  classes: {
                    disabled: classes.disabled
                  },
                }}
                disabled
                label="Akhir Booking"
                name="akhirBooking"
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue={detailListDataBooking.akhir_booking}
              />

              <TextField
                InputProps={{
                  classes: {
                    disabled: classes.disabled
                  },
                }}
                disabled
                label="Kode Pembayaran"
                name="kodePembayaran"
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue={detailListDataBooking.kode_pembayaran}
              />

              <TextField
                InputProps={{
                  classes: {
                    disabled: classes.disabled
                  },
                }}
                disabled
                label="Total Keseluruhan"
                name="totalKeseluruhan"
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue={formatUangByKodeMataUang(detailListDataBooking.total_bayar, "IDR")}
              />

              <TextField
                InputProps={{
                  classes: {
                    disabled: classes.disabled,
                    input: classes.inputUppercase,
                  },
                }}
                disabled
                label="Metode Pembayaran"
                name="metodePembayaran"
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue={detailListDataBooking.metode_pembayaran}
              />

              {detailListDataBooking.is_bayar === 0 && 
              isBookingExpired(new Date(detailListDataBooking.akhir_booking), 
              new Date(currentDate.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }))) && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      background: "#18345c",
                      color: "white",
                      fontWeight: "bold",
                      marginTop: "5px",
                      width: "30%"
                    }}
                    startIcon={<Payments />}
                    onClick={(e) => handleBayar(e)}
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
  