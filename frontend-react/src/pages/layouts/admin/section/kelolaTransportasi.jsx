// import { useState } from "react";
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

export const kelolaTransportasi = (
    classes, 
    props, 
    pageTransportasi, 
    itemPerPagesTransportasi, 
    handleChangePageTransportasi, 
    totalPagesTransportasi, 
    dataMapTransportasi 
) => {
    console.log(props);

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

    return (
        <Box sx={{ marginLeft: "10vw", marginRight: "10vw", marginTop: "5vw", marginBottom: "5vw" }}>
            <Box sx={{ marginBottom: "10px", display: "flex", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>Kelola Transportasi</Typography>
                <Button
                    sx={styles.buttonAdd}
                    startIcon={<AddCircle />}
                    // onClick={}
                >
                    Tambah
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
                                    <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                        <Button 
                                            sx={styles.buttonEdit}
                                            startIcon={<Edit />}
                                            // onClick={}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            sx={styles.buttonDelete}
                                            startIcon={<DeleteForever />}
                                            // onClick={}
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
                    count={totalPagesTransportasi} 
                    page={pageTransportasi} 
                    onChange={handleChangePageTransportasi} 
                    variant="outlined" 
                    sx={styles.pagination}
                />
            </Stack>
        </Box>
    );
};
