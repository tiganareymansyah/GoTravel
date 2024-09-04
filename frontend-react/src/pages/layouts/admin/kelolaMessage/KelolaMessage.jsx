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
import { apiContactGetData } from "../../../../api/api";
import FormDialogAdd from "./form/FormDialogAdd";
import { useMediaQuery } from "react-responsive";
import { useKelolaMessageStyles } from "./style";
import Alert from "../../../../components/Alert/Alert";

export default function KelolaMessage ({
    props
}) {
    console.log(props);

    const isMobile = useMediaQuery({ maxWidth: 991 });
    const classes = useKelolaMessageStyles({ isMobile });

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

    const [dataMessage, setDataMessage] = useState([]);
    const [pageMessage, setPageMessage] = useState(1);
    const [editDataMessage, setEditDataMessage] = useState();
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [severity, setSeverity] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [addMessage, setAddMessage] = useState({
        message: "",
        answer: ""
    });

    let itemPerPagesMessage = 5;

    useEffect(() => {
        handleGetDataMessage();
    }, []);

    useEffect(() => {
        if(openEditDialog) {
            setAddMessage((prev) => ({
                ...prev,
                message: editDataMessage.message,
                answer: editDataMessage.answer
            }));
        }
    }, [openEditDialog]);

    const handleGetDataMessage = async () => {
        try {
          const result = await apiContactGetData();
    
          const { code, status, message, data } = result;
    
          if(status === "success") {
            setDataMessage(data);
          }
        } catch (err) {
          console.log(err);
        }
    };

    const handleChangePageMessage = (event, value) => {
        setPageMessage(value);
    };

    const totalPagesMessage = Math.ceil(dataMessage?.length / itemPerPagesMessage);
    const dataMapMessage = dataMessage?.slice((pageMessage - 1) * itemPerPagesMessage, pageMessage * itemPerPagesMessage);

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

    const handleChange = (name, value) => {
        setAddMessage((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAnswer = (data) => {
        setEditDataMessage(data);
        setOpenEditDialog(true);
    };

    const handleCloseEdit = () => {
        setOpenEditDialog(false);
    };

    const handleEditMessage = async (e) => {
        e.preventDefault();
        try {
            let dataEdit = {
                id_user: dataMessage.id_user,
                answer: addMessage.answer
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

    // const handleDeleteMessage = async (id) => {
    //     try {
    //         let urlParams = id;

    //         const result = await apiDeleteDestinasi(urlParams);

    //         const { code, status, message, data } = result;

    //         if(status === "success") {
    //             handleAlert(
    //                 true,
    //                 "successNoReload",
    //                 "Success",
    //                 message
    //             );
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    console.log(dataMessage, editDataMessage);

    return (
        <>
            <Box className={classes.containerParent}>
                <Box className={classes.containerChild}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>Kelola Message</Typography>
                </Box>

                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table sx={{ minWidth: 650 }} size='small' aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }} align="center">No.</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} align="center">Email</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} align="center">Pertanyaan</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} align="center">Jawaban</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }} align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {dataMapMessage?.length > 0 ? (
                                <>
                                    {dataMapMessage?.map((data, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center">{(pageMessage - 1) * itemPerPagesMessage + index + 1}.</TableCell>
                                            <TableCell align="center">{data.email}</TableCell>
                                            <TableCell align="center">{data.message}</TableCell>
                                            <TableCell align="center">{data.answer}</TableCell>
                                            <TableCell sx={{ display: "flex", justifyContent: "center", }}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                    <Button 
                                                        sx={styles.buttonEdit}
                                                        startIcon={<Edit />}
                                                        onClick={() => handleAnswer(data)}
                                                    >
                                                        Jawab
                                                    </Button>
                                                    <Button
                                                        sx={styles.buttonDelete}
                                                        startIcon={<DeleteForever />}
                                                        // onClick={() => handleDeleteMessage(data.id)}
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
                                    <TableCell colSpan={5} align="center">
                                        <Typography sx={{ fontStyle: "italic" }}>
                                            Tidak ada data Pesan.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                
                <Stack spacing={2} sx={styles.stackPagination}>
                    <Pagination 
                        count={totalPagesMessage} 
                        page={pageMessage} 
                        onChange={handleChangePageMessage} 
                        variant="outlined" 
                        sx={styles.pagination}
                    />
                </Stack>
            </Box>
            
            {openEditDialog && (
                <FormDialogAdd
                    openEditDialog={openEditDialog}
                    addMessage={addMessage}
                    handleChange={handleChange}
                    handleCloseEdit={handleCloseEdit}
                    handleEditMessage={handleEditMessage}
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
