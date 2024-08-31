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
import { apiAddDestinasi, apiDeleteDestinasi, apiEditDestinasi, apiGetTouristDestination } from "../../../../api/api";
import FormDialogAdd from "./form/FormDialogAdd";
import { useMediaQuery } from "react-responsive";
import { useKelolaDestinasiStyles } from "./style";
import Alert from "../../../../components/Alert/Alert";
import FormDialogEdit from "./form/FormDialogEdit";

export default function KelolaDestinasi ({
    props
}) {
    console.log(props);

    const isMobile = useMediaQuery({ maxWidth: 991 });
    const classes = useKelolaDestinasiStyles({ isMobile });

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

    const [dataDestinasi, setDataDestinasi] = useState([]);
    const [pageDestinasi, setPageDestinasi] = useState(1);
    const [openDialog, setOpenDialog] = useState(false);
    const [editDataDestinasi, setEditDataDestinasi] = useState();
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [severity, setSeverity] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [addDestinasi, setAddDestinasi] = useState({
        id: "",
        valueDestinasi: "",
        namaDestinasi: ""
    });

    let itemPerPagesDestinasi = 5;

    useEffect(() => {
        handleGetDataDestinasi();
    }, []);

    useEffect(() => {
        if(openEditDialog) {
            setAddDestinasi((prev) => ({
                ...prev,
                id: editDataDestinasi.id,
                valueDestinasi: editDataDestinasi.value,
                namaDestinasi: editDataDestinasi.nama_tujuan_wisata
            }));
        }
    }, [openEditDialog]);

    const handleGetDataDestinasi = async () => {
        try {
          const result = await apiGetTouristDestination();
    
          const { code, status, message, data } = result;
    
          if(status === "success") {
            setDataDestinasi(data);
          }
        } catch (err) {
          console.log(err);
        }
    };

    const handleChangePageDestinasi = (event, value) => {
        setPageDestinasi(value);
    };

    const totalPagesDestinasi = Math.ceil(dataDestinasi?.length / itemPerPagesDestinasi);
    const dataMapDestinasi = dataDestinasi?.slice((pageDestinasi - 1) * itemPerPagesDestinasi, pageDestinasi * itemPerPagesDestinasi);

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
        setAddDestinasi((prev) => ({
            ...prev,
            valueDestinasi: "",
            namaDestinasi: ""
        }));
    };

    const handleChange = (name, value) => {
        setAddDestinasi((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCloseAdd = () => {
        setOpenDialog(false);
    };

    const handleAddDestinasi = async (e) => {
        e.preventDefault();
        props.doLoad();
        try {
            let dataAdd = {
                value: addDestinasi.valueDestinasi,
                nama_tujuan_wisata: addDestinasi.namaDestinasi
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
        setEditDataDestinasi(data);
        setOpenEditDialog(true);
    };

    const handleCloseEdit = () => {
        setOpenEditDialog(false);
    };

    const handleEditDestinasi = async (e) => {
        e.preventDefault();
        try {
            let dataEdit = {
                id: addDestinasi.id,
                value: addDestinasi.valueDestinasi,
                nama_tujuan_wisata: addDestinasi.namaDestinasi
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

    const handleDeleteDestinasi = async (id) => {
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

    console.log(dataDestinasi, editDataDestinasi);

    return (
        <>
            <Box className={classes.containerParent}>
                <Box className={classes.containerChild}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>Kelola Destinasi</Typography>
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
                                <TableCell sx={{ fontWeight: "bold" }} align="center">Nama Destinasi</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {dataMapDestinasi?.map((data, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">{(pageDestinasi - 1) * itemPerPagesDestinasi + index + 1}.</TableCell>
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
                                                onClick={() => handleDeleteDestinasi(data.id)}
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
                        count={totalPagesDestinasi} 
                        page={pageDestinasi} 
                        onChange={handleChangePageDestinasi} 
                        variant="outlined" 
                        sx={styles.pagination}
                    />
                </Stack>
            </Box>
            
            {openDialog && (
                <FormDialogAdd
                    openDialog={openDialog}
                    addDestinasi={addDestinasi}
                    handleChange={handleChange}
                    handleCloseAdd={handleCloseAdd}
                    handleAddDestinasi={handleAddDestinasi}
                />
            )}

            {openEditDialog && (
                <FormDialogEdit
                    openEditDialog={openEditDialog}
                    addDestinasi={addDestinasi}
                    handleChange={handleChange}
                    handleCloseEdit={handleCloseEdit}
                    handleEditDestinasi={handleEditDestinasi}
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
