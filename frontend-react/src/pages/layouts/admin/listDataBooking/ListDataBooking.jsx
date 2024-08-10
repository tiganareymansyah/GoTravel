import { useEffect, useState } from "react";
import { 
    Box, 
    Button, 
    Pagination, 
    Paper, 
    Stack, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Typography 
} from "@mui/material";
import { 
    DeleteForever,
    ManageSearch  
} from "@mui/icons-material";
import { useMediaQuery } from "react-responsive";
import { useListDataBookingStyles } from "./style";
import { orange } from "@mui/material/colors";
import Alert from "../../../../components/Alert/Alert";
import { apiGetAllDataBooking } from "../../../../api/api";
import FormPembayaran from "./form/FormPembayaran";

export default function ListDataBooking ({
    props
}) {
    console.log(props);

    const isMobile = useMediaQuery({ maxWidth: 991 });
    const classes = useListDataBookingStyles({ isMobile });

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

        buttonCekDetail: {
            padding: "7px 14px",
            textAlign: "center",
            cursor: "pointer",
            borderRadius: "6px",
            color: "#fff",
            backgroundColor: "#0F67B1",
            "&:hover": {
                backgroundColor: "#3FA2F6",
            },
            // backgroundColor: "#367E18",
            // "&:hover": {
            //     backgroundColor: "#54B435",
            // },
        },

        buttonPayment: {
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

        stackPagination: {
            paddingTop: "16px", 
            "& .MuiPagination-root": {
                display: "flex", 
                justifyContent: "end" 
            }
        },

        pagination: {
            "& .MuiPaginationItem-root": {
                color: "#000", 
                borderColor: "#000", 
                "&.Mui-selected": {
                    color: "#000", 
                    backgroundColor: orange[100], 
                    borderColor: orange[100], 
                },
                "&:hover": {
                    color: orange[100], 
                    backgroundColor: "#0000", 
                    borderColor: orange[100] 
                }
            }
        },
    };

    const [listDataBooking, setListDataBooking] = useState([]);
    const [pageListDataBooking, setPageListDataBooking] = useState(1);
    const [detailListDataBooking, setDetailListDataBooking] = useState();
    const [openDetail, setOpenDetail] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [severity, setSeverity] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    let itemPerPagesListDataBooking = 5;
    const currentDate = new Date();

    useEffect(() => {
        handleGetListDataBooking();
    }, []);

    const handleGetListDataBooking = async () => {
        try {
          const result = await apiGetAllDataBooking();
    
          const { code, status, message, data } = result;
    
          if(status === "success") {
            setListDataBooking(data);
          }
        } catch (err) {
          console.log(err);
        }
    };

    const handleChangePageListDataBooking = (event, value) => {
        setPageListDataBooking(value);
    };

    const totalPagesListDataBooking = Math.ceil(listDataBooking?.length / itemPerPagesListDataBooking);
    const mapListDataBooking = listDataBooking?.slice((pageListDataBooking - 1) * itemPerPagesListDataBooking, pageListDataBooking * itemPerPagesListDataBooking);

    const handleAlert = (open, severity, title, message) => {
        setOpenAlert(open);
        setSeverity(severity);
        setTitle(title);
        setMessage(message);
    };

    const handleCloseAlert = () => {
        setOpenAlert(false);
        if(severity === "successNoReload") {
            location.href = "/kelola-admin";
        }
    }

    const handleOpenDetail = (data) => {
        setDetailListDataBooking(data);
        setOpenDetail(true);
    };

    const handleCloseDetail = () => {
        setOpenDetail(false);
    };

    const handleBayar = () => {
        console.log("Masuk");
    };

    const isBookingExpired = (lastBooking, currentDate) => {
        return lastBooking > currentDate;
    };

    console.log(detailListDataBooking);

    return (
        <>
            <Box className={classes.containerParent}>
                <Box className={classes.containerChild}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>List Data Booking</Typography>
                </Box>

                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table sx={{ minWidth: 650 }} size='small' aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }} align="center">No.</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} align="center">Kode Booking</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} align="center">Nama Lengkap</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} align="center">Alamat</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} align="center">Mulai Booking</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} align="center">Akhir Booking</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} align="center">Status</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {mapListDataBooking?.map((data, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">{(pageListDataBooking - 1) * itemPerPagesListDataBooking + index + 1}.</TableCell>
                                    <TableCell align="center">{data.kode_booking}</TableCell>
                                    <TableCell align="center" sx={{ textTransform: "capitalize" }}>{data.nama_lengkap}</TableCell>
                                    <TableCell align="center" sx={{ textTransform: "capitalize" }}>{data.alamat}</TableCell>
                                    <TableCell align="center">{data.mulai_booking}</TableCell>
                                    <TableCell align="center">{data.akhir_booking}</TableCell>
                                    <TableCell 
                                        align="center"
                                        sx={{
                                            fontWeight: "bold",
                                            color: 
                                                isBookingExpired(new Date(data.akhir_booking), 
                                                new Date(currentDate.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }))) ? 
                                                    data.is_bayar === 1 ? "green" : "red"
                                                : "grey",
                                            textTransform: "uppercase"
                                        }}
                                    >
                                        {isBookingExpired(new Date(data.akhir_booking), 
                                        new Date(currentDate.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }))) ? (
                                            <>
                                                {data.is_bayar === 1 ? "aktif" : "belum bayar"}
                                            </>
                                        ) : "Kadaluarsa"}
                                    </TableCell>
                                    <TableCell sx={{ display: "flex", justifyContent: "center", }}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                            <Button
                                                sx={styles.buttonCekDetail}
                                                startIcon={<ManageSearch />}
                                                onClick={() => handleOpenDetail(data)}
                                            >
                                                Detail
                                            </Button>

                                            <Button
                                                sx={styles.buttonPayment}
                                                startIcon={<DeleteForever />}
                                                onClick={() => handleDeleteListDataBooking(data.id)}
                                            >
                                                Hapus
                                            </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack spacing={2} sx={styles.stackPagination}>
                    <Pagination 
                        count={totalPagesListDataBooking} 
                        page={pageListDataBooking} 
                        onChange={handleChangePageListDataBooking} 
                        variant="outlined" 
                        sx={styles.pagination}
                    />
                </Stack>
            </Box>

            {openDetail && (
                <FormPembayaran
                    classes={classes}
                    openDetail={openDetail}
                    detailListDataBooking={detailListDataBooking}
                    handleCloseDetail={handleCloseDetail}
                    handleBayar={handleBayar}
                />
            )}

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
