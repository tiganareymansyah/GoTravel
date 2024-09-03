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
import { apiAddTransportasi, apiDeleteTransportasi, apiEditTransportasi, apiGetTouristTransportation } from "../../../../api/api";
import { useMediaQuery } from "react-responsive";
import { useKelolaTranportasiStyles } from "./style";
import FormDialogAdd from "./form/FormDialogAdd";
import FormDialogEdit from "./form/FormDialogEdit";
import Alert from "../../../../components/Alert/Alert";

export default function KelolaTransportasi ({
    props
}) {
    console.log(props);

    const isMobile = useMediaQuery({ maxWidth: 991 });
    const classes = useKelolaTranportasiStyles({ isMobile });

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

    const [dataTransportasi, setDataTransportasi] = useState([]);
    const [pageTransportasi, setPageTransportasi] = useState(1);
    const [openDialog, setOpenDialog] = useState(false);
    const [editDataTransportasi, setEditDataTransportasi] = useState();
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [payloadTransportasi, setPayloadTransportasi] = useState({
        id: "",
        valueTransportasi: "",
        namaTransportasi: "",
        muatanTransportasi: "",
        stokTransportasi: "",
        hargaTransportasi: ""
    });
    const [openAlert, setOpenAlert] = useState(false);
    const [severity, setSeverity] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    let itemPerPagesTransportasi = 5;

    useEffect(() => {
        handleGetDataTransportasi();
    }, []);

    useEffect(() => {
        if(openEditDialog) {
            setPayloadTransportasi((prev) => ({
                ...prev,
                id: editDataTransportasi.id,
                valueTransportasi: editDataTransportasi.value,
                namaTransportasi: editDataTransportasi.nama_transportasi_wisata,
                muatanTransportasi: editDataTransportasi.muatan,
                stokTransportasi: editDataTransportasi.stok,
                hargaTransportasi: editDataTransportasi.harga
            }));
        }
    }, [openEditDialog]);

    const handleGetDataTransportasi = async () => {
        try {
          const result = await apiGetTouristTransportation();
    
          const { code, status, message, data } = result;
    
          if(status === "success") {
            setDataTransportasi(data);
          }
        } catch (err) {
          console.log(err);
        }
    };

    const handleChangePageTransportasi = (event, value) => {
        setPageTransportasi(value);
    };

    const totalPagesTransportasi = Math.ceil(dataTransportasi?.length / itemPerPagesTransportasi);
    const dataMapTransportasi = dataTransportasi?.slice((pageTransportasi - 1) * itemPerPagesTransportasi, pageTransportasi * itemPerPagesTransportasi);

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
        setPayloadTransportasi((prev) => ({
            ...prev,
            valueTransportasi: "",
            namaTransportasi: "",
            muatanTransportasi: "",
            stokTransportasi: "",
            hargaTransportasi: ""
        }));
    };

    const handleChange = (name, value) => {
        setPayloadTransportasi((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCloseAdd = () => {
        setOpenDialog(false);
    };

    const handleAddTransportasi = async (e) => {
        e.preventDefault();
        props.doLoad();
        try {
            let dataAdd = {
                value: payloadTransportasi.valueTransportasi,
                nama_transportasi_wisata: payloadTransportasi.namaTransportasi,
                muatan: parseInt(payloadTransportasi.muatanTransportasi),
                stok: parseInt(payloadTransportasi.stokTransportasi),
                harga: parseInt(payloadTransportasi.hargaTransportasi)
            };

            const result = await apiAddTransportasi({
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
        setEditDataTransportasi(data);
        setOpenEditDialog(true);
    };

    const handleCloseEdit = () => {
        setOpenEditDialog(false);
    };

    const handleEditTransportasi = async (e) => {
        e.preventDefault();
        try {
            let dataEdit = {
                id: payloadTransportasi.id,
                value: payloadTransportasi.valueTransportasi,
                nama_transportasi_wisata: payloadTransportasi.namaTransportasi,
                muatan: parseInt(payloadTransportasi.muatanTransportasi),
                stok: parseInt(payloadTransportasi.stokTransportasi),
                harga: parseInt(payloadTransportasi.hargaTransportasi)
            };

            const result = await apiEditTransportasi({
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

    const handleDeleteTransportasi = async (id) => {
        try {
            let urlParams = id;

            const result = await apiDeleteTransportasi(urlParams);

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
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>Kelola Transportasi</Typography>
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
                                <TableCell sx={{ fontWeight: "bold" }} align="center">Nama Transportasi</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} align="center">Muatan</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} align="center">Stok</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} align="center">Harga</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        {dataMapTransportasi?.length > 0 ? (
                            <>
                                <TableBody>
                                    {dataMapTransportasi?.map((data, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center">{(pageTransportasi - 1) * itemPerPagesTransportasi + index + 1}.</TableCell>
                                            <TableCell align="center">{data.value}</TableCell>
                                            <TableCell align="center">{data.nama_transportasi_wisata}</TableCell>
                                            <TableCell align="center">{data.muatan}</TableCell>
                                            <TableCell align="center">{data.stok}</TableCell>
                                            <TableCell align="center">{data.harga}</TableCell>
                                            <TableCell sx={{ display: "flex", justifyContent: "center", }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                    <Button 
                                                        sx={styles.buttonEdit}
                                                        startIcon={<Edit />}
                                                        onClick={() => handleEdit(data)}
                                                    >
                                                        Ubah
                                                    </Button>
                                                    <Button
                                                        sx={styles.buttonDelete}
                                                        startIcon={<DeleteForever />}
                                                        onClick={() => handleDeleteTransportasi(data.id)}
                                                    >
                                                        Hapus
                                                    </Button>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </>
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    <Typography sx={{ fontStyle: "italic" }}>
                                        Tidak ada data transportasi.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </Table>
                </TableContainer>
                
                <Stack spacing={2} sx={styles.stackPagination}>
                    <Pagination 
                        count={totalPagesTransportasi} 
                        page={pageTransportasi} 
                        onChange={handleChangePageTransportasi} 
                        variant="outlined" 
                        sx={styles.pagination}
                    />
                </Stack>
            </Box>

            {openDialog && (
                <FormDialogAdd
                    openDialog={openDialog}
                    payloadTransportasi={payloadTransportasi}
                    handleChange={handleChange}
                    handleCloseAdd={handleCloseAdd}
                    handleAddTransportasi={handleAddTransportasi}
                />
            )}

            {openEditDialog && (
                <FormDialogEdit
                    openEditDialog={openEditDialog}
                    payloadTransportasi={payloadTransportasi}
                    handleChange={handleChange}
                    handleCloseEdit={handleCloseEdit}
                    handleEditTransportasi={handleEditTransportasi}
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
