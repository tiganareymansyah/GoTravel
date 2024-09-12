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
import { useMediaQuery } from "react-responsive";
import { useKelolaInformasiDanLayananStyles } from "./style";
import { orange } from "@mui/material/colors";
import { apiAddDestinasi, apiDeleteDestinasi, apiEditDestinasi, apiGetTouristDestination } from "../../../../api/api";
import FormDialogAdd from "./form/FormDialogAdd";
import FormDialogEdit from "./form/FormDialogEdit";
import Alert from "../../../../components/Alert/Alert";

export default function KelolaInformasiDanLayanan ({
    props 
}) {
    console.log(props);

    const isMobile = useMediaQuery({ maxWidth: 991 });
    const classes = useKelolaInformasiDanLayananStyles({ isMobile });

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

    const [dataInformasiDanLayanan, setDataInformasiDanLayanan] = useState([]);
    const [pageInformasiDanLayanan, setPageInformasiDanLayanan] = useState(1);
    const [openDialog, setOpenDialog] = useState(false);
    const [editDataInformasiDanLayanan, setEditDataInformasiDanLayanan] = useState();
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [severity, setSeverity] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [addInformasiDanLayanan, setAddInformasiDanLayanan] = useState({
        id: "",
        valueInformasiDanLayanan: "",
        namaInformasiDanLayanan: ""
    });

    let itemPerPagesInformasiDanLayanan = 5;

    useEffect(() => {
        handleGetDataInformasiDanLayanan();
    }, []);

    useEffect(() => {
        if(openEditDialog) {
            setAddInformasiDanLayanan((prev) => ({
                ...prev,
                id: editDataInformasiDanLayanan.id,
                valueInformasiDanLayanan: editDataInformasiDanLayanan.value,
                namaInformasiDanLayanan: editDataInformasiDanLayanan.nama_tujuan_wisata
            }));
        }
    }, [openEditDialog]);

    const handleGetDataInformasiDanLayanan = async () => {
        try {
          const result = await apiGetTouristDestination();
    
          const { code, status, message, data } = result;
    
          if(status === "success") {
            setDataInformasiDanLayanan(data);
          }
        } catch (err) {
          console.log(err);
        }
    };

    const handleChangePageInformasiDanLayanan = (event, value) => {
        setPageInformasiDanLayanan(value);
    };

    const totalPagesInformasiDanLayanan = Math.ceil(dataInformasiDanLayanan?.length / itemPerPagesInformasiDanLayanan);
    const dataMapInformasiDanLayanan = dataInformasiDanLayanan?.slice((pageInformasiDanLayanan - 1) * itemPerPagesInformasiDanLayanan, pageInformasiDanLayanan * itemPerPagesInformasiDanLayanan);

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
        setAddInformasiDanLayanan((prev) => ({
            ...prev,
            valueInformasiDanLayanan: "",
            namaInformasiDanLayanan: ""
        }));
    };

    const handleChange = (name, value) => {
        setAddInformasiDanLayanan((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCloseAdd = () => {
        setOpenDialog(false);
    };

    const handleAddInformasiDanLayanan = async (e) => {
        e.preventDefault();
        props.doLoad();
        try {
            let dataAdd = {
                value: addInformasiDanLayanan.valueInformasiDanLayanan,
                nama_tujuan_wisata: addInformasiDanLayanan.namaInformasiDanLayanan
            };

            const result = await apiAddDestinasi({
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
        setEditDataInformasiDanLayanan(data);
        setOpenEditDialog(true);
    };

    const handleCloseEdit = () => {
        setOpenEditDialog(false);
    };

    const handleEditInformasiDanLayanan = async (e) => {
        e.preventDefault();
        try {
            let dataEdit = {
                id: addInformasiDanLayanan.id,
                value: addInformasiDanLayanan.valueInformasiDanLayanan,
                nama_tujuan_wisata: addInformasiDanLayanan.namaInformasiDanLayanan
            };

            const result = await apiEditDestinasi({
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

    const handleDeleteInformasiDanLayanan = async (id) => {
        try {
            let urlParams = id;

            const result = await apiDeleteDestinasi(urlParams);

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

    console.log(dataInformasiDanLayanan, editDataInformasiDanLayanan);

    return (
        <>
            <Box className={classes.containerParent}>
                <Box className={classes.containerChild}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>Kelola Informasi Dan Layanan</Typography>
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
                                <TableCell sx={{ fontWeight: "bold" }} align="center">Nama Informasi Dan Layanan</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {dataMapInformasiDanLayanan?.length > 0 ? (
                                <>
                                    {dataMapInformasiDanLayanan?.map((data, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center">{(pageInformasiDanLayanan - 1) * itemPerPagesInformasiDanLayanan + index + 1}.</TableCell>
                                            <TableCell align="center">{data.value}</TableCell>
                                            <TableCell align="center">{data.nama_tujuan_wisata}</TableCell>
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
                                                        onClick={() => handleDeleteInformasiDanLayanan(data.id)}
                                                    >
                                                        Hapus
                                                    </Button>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </>
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        <Typography sx={{ fontStyle: "italic" }}>
                                            Tidak ada data Informasi Dan Layanan.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                
                <Stack spacing={2} sx={styles.stackPagination}>
                    <Pagination 
                        count={totalPagesInformasiDanLayanan} 
                        page={pageInformasiDanLayanan} 
                        onChange={handleChangePageInformasiDanLayanan} 
                        variant="outlined" 
                        sx={styles.pagination}
                    />
                </Stack>
            </Box>
            
            {openDialog && (
                <FormDialogAdd
                    openDialog={openDialog}
                    addInformasiDanLayanan={addInformasiDanLayanan}
                    handleChange={handleChange}
                    handleCloseAdd={handleCloseAdd}
                    handleAddInformasiDanLayanan={handleAddInformasiDanLayanan}
                />
            )}

            {openEditDialog && (
                <FormDialogEdit
                    openEditDialog={openEditDialog}
                    addInformasiDanLayanan={addInformasiDanLayanan}
                    handleChange={handleChange}
                    handleCloseEdit={handleCloseEdit}
                    handleEditInformasiDanLayanan={handleEditInformasiDanLayanan}
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
