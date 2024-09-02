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
    ManageSearch, 
    Tune 
} from "@mui/icons-material";
import { useMediaQuery } from "react-responsive";
import { useListDataBookingStyles } from "./style";
import { orange } from "@mui/material/colors";
import Alert from "../../../../components/Alert/Alert";
import { apiDeleteDataBooking, apiEditPay, apiGetAllDataBooking } from "../../../../api/api";
import FormPembayaran from "./form/FormPembayaran";
import Select, { components } from "react-select";

export default function ListDataBooking ({
    props
}) {
    console.log(props);

    const isMobile = useMediaQuery({ maxWidth: 991 });
    const classes = useListDataBookingStyles({ isMobile });

    const styles = {
        label: {
            fontWeight: "700",
            fontSize: "18px",
            textTransform: "capitalize",
        },

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
    const [selectState, setSelectState] = useState({
        status: {
            selectedState: "",
            states: [
                { value: "aktif", label: "AKTIF" },
                { value: "belum bayar", label: "BELUM BAYAR" },
                { value: "selesai", label: "SELESAI" },
                { value: "kadaluarsa", label: "KADALUARSA" }
            ]
        }
    });

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
    };

    const handleChangeSelectState = (name, state) => {
        setSelectState((prev) => ({
            ...prev,
            [name]: {
                ...prev[name],
                selectedState: state,
            },
        }));
    };

    const customControl = ({ children, ...props }) => (
        <components.Control {...props}>
            <Tune sx={{ marginLeft: "8px" }} /> {children}
        </components.Control>
    );

    const isBookingExpired = (lastBooking, currentDate) => {
        return lastBooking > currentDate;
    };

    const handleOpenDetail = (data) => {
        setDetailListDataBooking(data);
        setOpenDetail(true);
    };

    const handleCloseDetail = () => {
        setOpenDetail(false);
    };

    const handleBayar = async (e) => {
        e.preventDefault();
        props.doLoad();
        try {
            let payload = {
                kode_booking: detailListDataBooking.kode_booking
            };

            const result = await apiEditPay({
                body: JSON.stringify(payload)
            });

            const  { code, status, message, data } = result;

            if(status === "success") {
                handleAlert(
                    true,
                    "successNoReload",
                    "Success",
                    message
                );
                props.doLoad();
            }
        } catch (err) {
            console.log(err);
            props.doLoad();
        }
    };

    const handleDeleteListDataBooking = async (value) => {
        try {
            let payload = value;

            const result = await apiDeleteDataBooking({
                body: JSON.stringify(payload)
            });

            const { code, status, message, data } = result;

            if(status === "success") {
                handleAlert(
                    true,
                    "successNoReload",
                    "Success",
                    message
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    console.log(detailListDataBooking);

    return (
        <>
            <Box className={classes.containerParent}>
                <Box className={classes.containerChild}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>List Data Booking</Typography>
                    <Select
                        placeholder="filter status"
                        components={{ Control: customControl }}
                        onChange={(state) => handleChangeSelectState("status", state)}
                        value={selectState.status.selectedState}
                        options={selectState.status.states}
                        styles={{
                            container: (baseStyles, state) => ({
                                ...baseStyles,
                                ...styles.label,
                                fontSize: 14,
                                width: "21%"
                            }),
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                textIndent: "10px",
                                backgroundColor: state.isDisabled && "#d8d4d4",
                            }),
                            singleValue: (baseStyles, state) => ({
                                ...baseStyles,
                                color: "#000000",
                            }),
                        }}
                        // isDisabled={props.boolDicabut ? true : false}
                        className="form-input"
                    />
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
                                        ) : data.is_bayar === 1 ? (
                                            "Selesai"
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
                                                onClick={() => handleDeleteListDataBooking(data)}
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
                    currentDate={currentDate}
                    isBookingExpired={isBookingExpired}
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
