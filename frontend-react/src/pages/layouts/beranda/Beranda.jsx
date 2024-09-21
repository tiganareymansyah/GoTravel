import { useEffect, useState } from "react";
import { 
    Box, 
    Paper, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Typography 
} from "@mui/material"
import Navbar from "../../../components/navbar/Navbar"
import { useMediaQuery } from "react-responsive";
import { useBerandaStyles } from "./style";
import { 
    Swiper, 
    SwiperSlide 
} from 'swiper/react';
import { 
    Navigation, 
    Pagination, 
    Autoplay, 
    EffectFade 
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import Slide1 from "../../../media/slide1_beranda.jpeg";
import Slide2 from "../../../media/slide2_beranda.jpeg";
import Slide3 from "../../../media/slide3_beranda.jpeg";
import { apiGetInformationAndServices, apiGetTouristTransportation } from "../../../api/api";
import { formatUangByKodeMataUang } from "../../../services/utils";

export default function Beranda(props) {
    console.log(props);

    const isMobile = useMediaQuery({ maxWidth: 991 });
    const classes = useBerandaStyles({ isMobile });

    const styles = {};

    const [dataInfLay, setDataInfLay] = useState([]);
    const [dataTransportasi, setDataTransportasi] = useState([]);

    useEffect(() => {
        handleInfLay();
        handleTransportasi();
    }, [])

    const handleInfLay = async () => {
        try {
            const result = await apiGetInformationAndServices();

            const { code, status, message, data } = result;

            if(status === "success") {
                setDataInfLay(data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleTransportasi = async () => {
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

    console.log(dataInfLay);
    console.log(dataTransportasi);

    return (
        <>
            <Box className={classes.berandaBackground}>
                <Navbar />
                <Swiper
                    modules={[Autoplay, Pagination, Navigation, EffectFade]}
                    effect="fade"
                    spaceBetween={30}
                    slidesPerView={1}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    navigation
                    loop={true}
                >
                    <SwiperSlide>
                        <Box className={classes.slideContent}>
                            <img
                                src={Slide1}
                                alt="Slide 1"
                                className={classes.slideImage}
                            />
                            <Box className={classes.overlay}>
                                <Typography 
                                    variant="h2" 
                                    className={classes.overlayTitle}
                                    sx={{ 
                                        textAlign: "center" 
                                    }}
                                >
                                    Selamat Datang di aplikasi GoTravel
                                </Typography>

                                <Typography 
                                    className={classes.overlayText}
                                >
                                    Ayo buruan pesan sekarang agar anda tidak kehabisan transportasi untuk pergi ke tempat 
                                    wisata pantai yang anda inginkan.
                                </Typography>
                            </Box>
                        </Box>
                    </SwiperSlide>

                    <SwiperSlide>
                        <Box className={classes.slideContent}>
                            <img
                                src={Slide2}
                                alt="Slide 2"
                                className={classes.slideImage}
                            />

                            <Box className={classes.overlay}>
                                <Typography 
                                    variant="h2" 
                                    className={classes.overlayTitle}
                                    sx={{ 
                                        textAlign: "center"
                                    }}
                                >
                                    Wisata Pantai
                                </Typography>

                                <Box className={classes.boxContent}>
                                    {dataInfLay?.map((data) => (
                                        <>
                                            <Typography 
                                                className={classes.overlayText}
                                            >
                                                Nama Wisata : <Typography variant="span" sx={{ fontSize: "1rem !important" }}>{data.nama_tujuan_wisata}</Typography>
                                            </Typography>

                                            <Typography 
                                                className={classes.overlayText}
                                                sx={{
                                                    paddingBottom: "20px"
                                                }}
                                            >
                                                Informasi : <Typography variant="span" sx={{ fontSize: "1rem !important" }}>{data.informasi_dan_layanan}</Typography>
                                            </Typography>
                                        </>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    </SwiperSlide>

                    <SwiperSlide>
                        <Box className={classes.slideContent}>
                            <img
                                src={Slide3}
                                alt="Slide 3"
                                className={classes.slideImage}
                            />

                            <Box className={classes.overlay}>
                                <Typography 
                                    variant="h2" 
                                    className={classes.overlayTitle}
                                    sx={{ 
                                        textAlign: "center" 
                                    }}
                                >
                                    Transportasi
                                </Typography>

                                <Box className={classes.boxContent}>
                                    <TableContainer component={Paper} className={classes.tableContainer}>
                                        <Table sx={{ minWidth: 650 }} size='small' aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: "bold" }} align="center">No.</TableCell>
                                                    <TableCell sx={{ fontWeight: "bold" }} align="center">Nama Transportasi</TableCell>
                                                    <TableCell sx={{ fontWeight: "bold" }} align="center">Muatan</TableCell>
                                                    <TableCell sx={{ fontWeight: "bold" }} align="center">Sisa Transportasi</TableCell>
                                                    <TableCell sx={{ fontWeight: "bold" }} align="center">Harga Satuan</TableCell>
                                                </TableRow>
                                            </TableHead>

                                            <TableBody>
                                                {dataTransportasi?.length > 0 ? (
                                                    <>
                                                        {dataTransportasi?.map((data, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell align="center">{index + 1}.</TableCell>
                                                                <TableCell align="center">{data.nama_transportasi_wisata}</TableCell>
                                                                <TableCell align="center">{data.muatan}</TableCell>
                                                                <TableCell align="center">{data.stok}</TableCell>
                                                                <TableCell align="center">{formatUangByKodeMataUang(data.harga, "IDR")}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </>
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={5} align="center">
                                                            <Typography sx={{ fontStyle: "italic" }}>
                                                                Tidak ada data destinasi.
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>

                            </Box>
                        </Box>
                    </SwiperSlide>
                </Swiper>
            </Box>
        </>
    )
};
