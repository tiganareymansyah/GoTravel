import { useEffect, useState } from "react";
import { Box, Button, Chip, Divider, Pagination, Stack, Typography } from "@mui/material";
import { Add } from '@mui/icons-material';
import Navbar from "../../../components/navbar/Navbar";
import { useMediaQuery } from "react-responsive";
import { useBookingStyles } from "./style";
import { orange } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { capitalizeWords, formatDateToCustomString } from "../../../services/utils";
import DetailBooking from "./formBooking/detail/DetailBooking";

export default function Booking(props) {
    console.log(props);

    const isMobile = useMediaQuery({ maxWidth: 991 });
    const classes = useBookingStyles({ isMobile });

    const [page, setPage] = useState(1);

    const navigate = useNavigate();
    const currentDate = new Date();

    const styles = {
        buttonTambah: {
            padding: "7px 14px",
            textAlign: "center",
            cursor: "pointer",
            borderRadius: "8px",
            color: "black",
            backgroundColor: "#fff",
            "&:hover": {
                color: orange[100],
            },
        },

        stackPagination: {
            paddingTop: "16px", 
            "& .MuiPagination-root": {
                display: "flex", 
                justifyContent: "end" 
            }
        },

        pagination: {
            "& .MuiPaginationItem-root": {
                color: orange[100], 
                borderColor: orange[100], 
                "&.Mui-selected": {
                    color: "#000", 
                    backgroundColor: "#fff", 
                    borderColor: "#fff", 
                },
                "&:hover": {
                    color: orange[100], 
                    backgroundColor: "#0000", 
                    borderColor: orange[100] 
                }
            }
        },
    };

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const totalPages = Math.ceil(props?.dataBooking?.length / 3);
    const dataBooking = props?.dataBooking?.slice((page - 1) * 3, page * 3);

    const handleRequestByKodeBooking = (data) => {
        navigate("/booking/detail-booking", { state: { dataByKodePermohonan: data } });
    };

    const isBookingExpired = (lastBooking, currentDate) => {
        return lastBooking > currentDate;
    };

    console.log(dataBooking);

    return (
        <>
            <Box className={classes.bookingBackground}>
                <Navbar />
                <Box className={classes.containerParent}>
                    <Box className={classes.setCardAndButton}>
                        <Box className={classes.buttonTambah}>
                            <Button
                                sx={styles.buttonTambah}
                                startIcon={<Add />}
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate("/booking/form-booking");
                                }}
                            >
                                Tambah
                            </Button>
                        </Box>

                        {dataBooking?.length > 0 ? (
                            <>
                                <Box className={classes.setCard}>
                                    {dataBooking?.map((data) => (
                                        <Box 
                                            className={classes.boxCard}
                                            onClick={() => handleRequestByKodeBooking(data)}
                                        >
                                            <Box className={classes.cardHeader}>
                                                <Typography>{data.kode_booking}</Typography>
                                                <Typography
                                                    sx={{
                                                        backgroundColor: 
                                                        isBookingExpired(new Date(data.akhir_booking), 
                                                        new Date(currentDate.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }))) ? 
                                                            data.is_bayar === 1 ? "#06D001" : "#FF0000"
                                                        : "grey",
                                                        color: "white",
                                                        padding: "5px",
                                                        borderRadius: "5px",
                                                    }}
                                                >
                                                    {isBookingExpired(new Date(data.akhir_booking), 
                                                    new Date(currentDate.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }))) ? (
                                                        <>
                                                            {data.is_bayar === 1 
                                                                ? capitalizeWords("Sudah Bayar")
                                                                : capitalizeWords("Belum Bayar")
                                                            }
                                                        </>
                                                    ) : data.is_bayar === 1 ? (
                                                        capitalizeWords("Selesai")
                                                    ) : capitalizeWords("Kadaluarsa")}
                                                </Typography>
                                            </Box>

                                            <Divider
                                                flexItem
                                                sx={{ 
                                                    width: "90%", 
                                                    margin: "auto", 
                                                    paddingTop: "8px" 
                                                }}
                                            />

                                            <Box className={classes.cardBody}>
                                                <Typography>
                                                    {capitalizeWords(data.nama_lengkap)}
                                                </Typography>
                                                <Typography>
                                                    {capitalizeWords(data.alamat)}
                                                </Typography>
                                                {isBookingExpired(new Date(data.akhir_booking), 
                                                new Date(currentDate.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }))) ? (
                                                    <>
                                                        {data.is_bayar === 0 ? (
                                                            <Box>
                                                                <Chip
                                                                    label="Silahkan datang ke perusahaan untuk pembayaran"
                                                                    sx={{
                                                                        marginLeft: "8px",
                                                                        marginTop: "16px",
                                                                    }}
                                                                />
        
                                                                <Typography
                                                                    sx={{
                                                                        fontFamily: "Nunito Sans",
                                                                        marginTop: "20px",
                                                                        textDecoration: "underline #FF0000",
                                                                        color: "#FF0000",
                                                                    }}
                                                                >
                                                                    {capitalizeWords("pembayaran")}
                                                                </Typography>
                                                            </Box>
                                                        ) : (
                                                            <Typography
                                                                sx={{
                                                                    fontFamily: "Nunito Sans",
                                                                    marginTop: "20px",
                                                                    textDecoration: "underline #06D001",
                                                                    color: "#06D001",
                                                                }}
                                                            >
                                                                {capitalizeWords("Aktif")}
                                                            </Typography>
                                                        )}
                                                    </>
                                                ) : null}
                                                <Box
                                                    sx={{
                                                    textTransform: "capitalize",
                                                    padding: "10px",
                                                    marginTop: "100px",
                                                    width: "100%",
                                                    textAlign: "end",
                                                    boxSizing: "border-box",
                                                    }}
                                                >
                                                    <Typography>
                                                        Tanggal Pembookingan
                                                    </Typography>
                                                    <Typography sx={{ paddingTop: "16px" }}>
                                                        {formatDateToCustomString(data.created_at)}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                                <Stack spacing={2} sx={styles.stackPagination}>
                                    <Pagination 
                                        count={totalPages} 
                                        page={page} 
                                        onChange={handleChangePage} 
                                        variant="outlined" 
                                        sx={styles.pagination}
                                    />
                                </Stack>
                            </>
                        ) : (
                            <Box className={classes.boxNoData}>
                                <Typography 
                                    variant="body2" 
                                    gutterBottom // property gutterBottom pada component Typography berfungsi membuat marginBottom sebesar 0.35em jika ada component lain
                                    sx={{ color: "#fff", fontStyle: "italic", letterSpacing: "2px" }}
                                >
                                    Tidak ada data booking.
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    );
};
