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
    AddCircle, 
    DeleteForever, 
    Edit 
} from "@mui/icons-material";
import { orange } from "@mui/material/colors";
import { apiAddMetodePembayaran, apiDeleteMetodePembayaran, apiEditMetodePembayaran, apiGetPaymentMethod } from "../../../../api/api";
import { useMediaQuery } from "react-responsive";
import { useKelolaMetodePembayaranStyles } from "./style";
import FormDialogAdd from "./form/FormDialogAdd";
import Alert from "../../../../components/Alert/Alert";
import FormDialogEdit from "./form/FormDialogEdit";

export default function KelolaMetodePembayaran ({
    props
}) {
    console.log(props);

    const isMobile = useMediaQuery({ maxWidth: 991 });
    const classes = useKelolaMetodePembayaranStyles({ isMobile });

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

        buttonEdit: {
            padding: "7px 14px",
            textAlign: "center",
            cursor: "pointer",
            borderRadius: "6px",
            color: "#fff",
            backgroundColor: "#367E18",
            "&:hover": {
                backgroundColor: "#54B435",
            },
        },

        buttonDelete: {
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

    const [dataMetodePembayaran, setDataMetodePembayaran] = useState([]);
    const [pageMetodePembayaran, setPageMetodePembayaran] = useState(1);
    const [openDialog, setOpenDialog] = useState(false);
    const [editDataMetodePembayaran, setEditDataMetodePembayaran] = useState();
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [payloadMetodePembayaran, setPayloadMetodePembayaran] = useState({
        id: "",
        valueMetodePembayaran: "",
        namaMetodePembayaran: ""
    });
    const [openAlert, setOpenAlert] = useState(false);
    const [severity, setSeverity] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    let itemPerPagesMetodePembayaran = 5;

    useEffect(() => {
        handleGetDataMetodePembayaran();
    }, []);

    useEffect(() => {
        if(openEditDialog) {
            setPayloadMetodePembayaran((prev) => ({
                ...prev,
                id: editDataMetodePembayaran.id,
                valueMetodePembayaran: editDataMetodePembayaran.value,
                namaMetodePembayaran: editDataMetodePembayaran.nama_payment_method
            }));
        }
    }, [openEditDialog]);

    const handleGetDataMetodePembayaran = async () => {
        try {
          const result = await apiGetPaymentMethod();
    
          const { code, status, message, data } = result;
    
          if(status === "success") {
            setDataMetodePembayaran(data);
          }
        } catch (err) {
          console.log(err);
        }
    };

    const handleChangePageMetodePembayaran = (event, value) => {
        setPageMetodePembayaran(value);
    };
    
    const totalPagesMetodePembayaran = Math.ceil(dataMetodePembayaran?.length / itemPerPagesMetodePembayaran);
    const dataMapMetodePembayaran = dataMetodePembayaran?.slice((pageMetodePembayaran - 1) * itemPerPagesMetodePembayaran, pageMetodePembayaran * itemPerPagesMetodePembayaran);

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

    const handleAdd = () => {
        setOpenDialog(true);
        setPayloadMetodePembayaran((prev) => ({
            ...prev,
            valueMetodePembayaran: "",
            namaMetodePembayaran: ""
        }));
    };

    const handleChange = (name, value) => {
        setPayloadMetodePembayaran((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCloseAdd = () => {
        setOpenDialog(false);
    };

    const handleAddMetodePembayaran = async (e) => {
        e.preventDefault();
        props.doLoad();
        try {
            let dataAdd = {
                value: payloadMetodePembayaran.valueMetodePembayaran,
                nama_payment_method: payloadMetodePembayaran.namaMetodePembayaran
            };

            const result = await apiAddMetodePembayaran({
                body: JSON.stringify(dataAdd)
            });

            const { code, status, message, data } = result;

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

    const handleEdit = (data) => {
        setEditDataMetodePembayaran(data);
        setOpenEditDialog(true);
    };

    const handleCloseEdit = () => {
        setOpenEditDialog(false);
    };

    const handleEditMetodePembayaran = async (e) => {
        e.preventDefault();
        try {
            let dataEdit = {
                id: payloadMetodePembayaran.id,
                value: payloadMetodePembayaran.valueMetodePembayaran,
                nama_payment_method: payloadMetodePembayaran.namaMetodePembayaran
            };

            const result = await apiEditMetodePembayaran({
                body: JSON.stringify(dataEdit)
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

    const handleDeleteMetodePembayaran = async (id) => {
        try {
            let urlParams = id;

            const result = await apiDeleteMetodePembayaran(urlParams);

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

    return (
        <>
            <Box className={classes.containerParent}>
                <Box className={classes.containerChild}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>Kelola Metode Pembayaran</Typography>
                    <Button
                        sx={styles.buttonAdd}
                        startIcon={<AddCircle />}
                        onClick={handleAdd}
                    >
                        Tambah
                    </Button>
                </Box>

                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table sx={{ minWidth: 650 }} size='small' aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }} align="center">No.</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} align="center">Value</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} align="center">Nama Metode Pembayaran</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {dataMapMetodePembayaran?.map((data, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">{(pageMetodePembayaran - 1) * itemPerPagesMetodePembayaran + index + 1}.</TableCell>
                                    <TableCell align="center">{data.value}</TableCell>
                                    <TableCell align="center">{data.nama_payment_method}</TableCell>
                                    <TableCell sx={{ display: "flex", justifyContent: "center", }}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                            <Button 
                                                sx={styles.buttonEdit}
                                                startIcon={<Edit />}
                                                onClick={() => handleEdit(data)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                sx={styles.buttonDelete}
                                                startIcon={<DeleteForever />}
                                                onClick={() => handleDeleteMetodePembayaran(data.id)}
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
                        count={totalPagesMetodePembayaran} 
                        page={pageMetodePembayaran} 
                        onChange={handleChangePageMetodePembayaran} 
                        variant="outlined" 
                        sx={styles.pagination}
                    />
                </Stack>
            </Box>

            {openDialog && (
                <FormDialogAdd
                    openDialog={openDialog}
                    payloadMetodePembayaran={payloadMetodePembayaran}
                    handleChange={handleChange}
                    handleCloseAdd={handleCloseAdd}
                    handleAddMetodePembayaran={handleAddMetodePembayaran}
                />
            )}

            {openEditDialog && (
                <FormDialogEdit
                    openEditDialog={openEditDialog}
                    payloadMetodePembayaran={payloadMetodePembayaran}
                    handleChange={handleChange}
                    handleCloseEdit={handleCloseEdit}
                    handleEditMetodePembayaran={handleEditMetodePembayaran}
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
