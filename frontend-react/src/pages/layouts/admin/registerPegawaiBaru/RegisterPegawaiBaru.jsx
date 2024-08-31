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
import { apiAddRegisterPegawaiBaru, apiDeleteRegisterPegawaiBaru, apiEditRegisterPegawaiBaru, apiGetAdminAccount } from "../../../../api/api";
import { useMediaQuery } from "react-responsive";
import { useRegisterPegawaiBaruStyles } from "./style";
import FormDialogAdd from "./form/FormDialogAdd";
import FormDialogEdit from "./form/FormDialogEdit";
import Alert from "../../../../components/Alert/Alert";
import { formatDateYYYYMMDD } from "../../../../services/utils";

export default function RegisterPegawaiBaru ({
    props
}) {
    console.log(props);

    const isMobile = useMediaQuery({ maxWidth: 991 });
    const classes = useRegisterPegawaiBaruStyles({ isMobile });

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

    const [dataRegisterPegawaiBaru, setDataRegisterPegawaiBaru] = useState([]);
    const [pageRegisterPegawaiBaru, setPageRegisterPegawaiBaru] = useState(1);
    const [openDialog, setOpenDialog] = useState(false);
    const [editDataRegisterPegawaiBaru, setEditDataRegisterPegawaiBaru] = useState();
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [payloadRegisterPegawaiBaru, setPayloadRegisterPegawaiBaru] = useState({
        id: "",
        namaLengkap: "",
        dob: "",
        jenisKelamin: "",
        email: "",
        password: ""
    });
    const [openAlert, setOpenAlert] = useState(false);
    const [severity, setSeverity] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [boolChangePassword, setBoolChangePassword] = useState(false);

    let itemPerPagesRegisterPegawaiBaru = 5;

    useEffect(() => {
        handleGetDataRegisterPegawaiBaru();
    }, []);

    useEffect(() => {
        if(openEditDialog) {
            setPayloadRegisterPegawaiBaru((prev) => ({
                ...prev,
                id: editDataRegisterPegawaiBaru.id_admin,
                namaLengkap: editDataRegisterPegawaiBaru.fullname,
                dob: editDataRegisterPegawaiBaru.tbt,
                jenisKelamin: editDataRegisterPegawaiBaru.gender,
                email: editDataRegisterPegawaiBaru.email
            }));
        }
    }, [openEditDialog]);

    const handleGetDataRegisterPegawaiBaru = async () => {
        try {
          const result = await apiGetAdminAccount();
    
          const { code, status, message, data } = result;
    
          if(status === "success") {
            setDataRegisterPegawaiBaru(data);
          }
        } catch (err) {
          console.log(err);
        }
    };

    const handleChangePageRegisterPegawaiBaru = (event, value) => {
        setPageRegisterPegawaiBaru(value);
    };

    const totalPagesRegisterPegawaiBaru = Math.ceil(dataRegisterPegawaiBaru?.length / itemPerPagesRegisterPegawaiBaru);
    const dataMapRegisterPegawaiBaru = dataRegisterPegawaiBaru?.slice((pageRegisterPegawaiBaru - 1) * itemPerPagesRegisterPegawaiBaru, pageRegisterPegawaiBaru * itemPerPagesRegisterPegawaiBaru);

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
        setPayloadRegisterPegawaiBaru((prev) => ({
            ...prev,
            namaLengkap: "",
            dob: "",
            jenisKelamin: "",
            email: ""
        }));
    };

    const handleChange = (name, value) => {
        setPayloadRegisterPegawaiBaru((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCloseAdd = () => {
        setOpenDialog(false);
    };

    const handleAddRegisterPegawaiBaru = async (e) => {
        e.preventDefault();
        props.doLoad();
        try {
            let dataAdd = {
                fullname: payloadRegisterPegawaiBaru.namaLengkap,
                tbt: formatDateYYYYMMDD(payloadRegisterPegawaiBaru.dob),
                gender: payloadRegisterPegawaiBaru.jenisKelamin,
                email: payloadRegisterPegawaiBaru.email,
                password: payloadRegisterPegawaiBaru.password
            };

            const result = await apiAddRegisterPegawaiBaru({
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
        setEditDataRegisterPegawaiBaru(data);
        setOpenEditDialog(true);
    };

    const handleCloseEdit = () => {
        setOpenEditDialog(false);
    };

    const handleEditRegisterPegawaiBaru = async (e) => {
        e.preventDefault();
        try {
            let dataEdit = {};

            if(boolChangePassword) {
                dataEdit = {
                    id: payloadRegisterPegawaiBaru.id,
                    password: payloadRegisterPegawaiBaru.password,
                    is_edit: 1
                }
            } else {
                dataEdit = {
                    id: payloadRegisterPegawaiBaru.id,
                    fullname: payloadRegisterPegawaiBaru.namaLengkap,
                    tbt: formatDateYYYYMMDD(payloadRegisterPegawaiBaru.dob),
                    gender: payloadRegisterPegawaiBaru.jenisKelamin,
                    email: payloadRegisterPegawaiBaru.email,
                    is_edit: 0
                };
            }

            const result = await apiEditRegisterPegawaiBaru({
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

    const handleDeleteRegisterPegawaiBaru = async (id) => {
        try {
            let urlParams = id;

            const result = await apiDeleteRegisterPegawaiBaru(urlParams);

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

    const handleChangePassword = (value) => {
        if(value === "batal") {
            setBoolChangePassword(false);
            handleChange("password", "");
        } else {
            setBoolChangePassword(true);
        }
    };

    console.log(payloadRegisterPegawaiBaru);

    return (
        <>
            <Box className={classes.containerParent}>
                <Box className={classes.containerChild}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>Register Pegawai Baru</Typography>
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
                                <TableCell sx={{ fontWeight: "bold" }} align="center">Nama Lengkap</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} align="center">Tanggal Lahir</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} align="center">Jenis Kelamin</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} align="center">Email</TableCell>
                                {/* <TableCell sx={{ fontWeight: "bold" }} align="center">Password</TableCell> */}
                                <TableCell sx={{ fontWeight: "bold" }} align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {dataMapRegisterPegawaiBaru?.map((data, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">{(pageRegisterPegawaiBaru - 1) * itemPerPagesRegisterPegawaiBaru + index + 1}.</TableCell>
                                    <TableCell align="center">{data.fullname}</TableCell>
                                    <TableCell align="center">{data.tbt}</TableCell>
                                    <TableCell align="center">{data.gender === "L" ? "Laki-laki" : "Perempuan"}</TableCell>
                                    <TableCell align="center">{data.email}</TableCell>
                                    {/* <TableCell align="center">{data.password}</TableCell> */}
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
                                                onClick={() => handleDeleteRegisterPegawaiBaru(data.id_admin)}
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
                        count={totalPagesRegisterPegawaiBaru} 
                        page={pageRegisterPegawaiBaru} 
                        onChange={handleChangePageRegisterPegawaiBaru} 
                        variant="outlined" 
                        sx={styles.pagination}
                    />
                </Stack>
            </Box>

            {openDialog && (
                <FormDialogAdd
                    classes={classes}
                    openDialog={openDialog}
                    payloadRegisterPegawaiBaru={payloadRegisterPegawaiBaru}
                    handleChange={handleChange}
                    handleCloseAdd={handleCloseAdd}
                    handleAddRegisterPegawaiBaru={handleAddRegisterPegawaiBaru}
                />
            )}

            {openEditDialog && (
                <FormDialogEdit
                    classes={classes}
                    openEditDialog={openEditDialog}
                    payloadRegisterPegawaiBaru={payloadRegisterPegawaiBaru}
                    handleChange={handleChange}
                    handleCloseEdit={handleCloseEdit}
                    handleEditRegisterPegawaiBaru={handleEditRegisterPegawaiBaru}
                    boolChangePassword={boolChangePassword}
                    handleChangePassword={handleChangePassword}
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
