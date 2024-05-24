import { Box, Button, Pagination, Stack, Typography } from "@mui/material";
import { Add } from '@mui/icons-material';
import Navbar from "../../../components/navbar/Navbar";
import { useMediaQuery } from "react-responsive";
import { useBookingStyles } from "./style";
import { orange } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

export default function Booking(props) {
    console.log(props);

    const isMobile = useMediaQuery({ maxWidth: 991 });
    const classes = useBookingStyles({ isMobile });
    const navigate = useNavigate();

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
            }
        },
    };

    let data = "ada";

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

                        {data === "ada" ? (
                            <>
                                <Box className={classes.setCard}>
                                    <Box className={classes.boxCard}>
                                        Data 1
                                    </Box>
                                    <Box className={classes.boxCard}>
                                        Data 2
                                    </Box>
                                    <Box className={classes.boxCard}>
                                        Data 3
                                    </Box>
                                </Box>
                                <Stack spacing={2} sx={styles.stackPagination}>
                                    <Pagination 
                                        count={10} 
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
