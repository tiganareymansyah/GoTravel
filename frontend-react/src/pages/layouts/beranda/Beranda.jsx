import { Box, Typography } from "@mui/material"
import Navbar from "../../../components/navbar/Navbar"
import { useMediaQuery } from "react-responsive";
import { useBerandaStyles } from "./style";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import Slide1 from "../../../media/slide1_beranda.jpeg";
import Slide2 from "../../../media/slide2_beranda.jpeg";
import Slide3 from "../../../media/slide3_beranda.jpeg";

export default function Beranda(props) {
    console.log(props);

    const isMobile = useMediaQuery({ maxWidth: 991 });
    const classes = useBerandaStyles({ isMobile });   

    return (
        <>
            <Box className={classes.berandaBackground}>
                <Navbar />
                <Swiper
                    modules={[Autoplay, Pagination, Navigation, EffectFade]}
                    effect="fade"
                    spaceBetween={30}
                    slidesPerView={1}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    navigation
                    loop={true}
                >
                    <SwiperSlide>
                        <div className={classes.slideContent}>
                            <img
                                src={Slide1}
                                alt="Slide 1"
                                className={classes.slideImage}
                            />
                            <div className={classes.overlay}>
                                <h2 className={classes.overlayTitle}>Selamat Datang di aplikasi GoTravel</h2>
                                <p className={classes.overlayText}>
                                    Ayo buruan pesan sekarang agar anda tidak kehabisan transportasi untuk pergi ke tempat 
                                    wisata pantai yang anda inginkan.
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className={classes.slideContent}>
                            <img
                                src={Slide2}
                                alt="Slide 2"
                                className={classes.slideImage}
                            />
                            <div className={classes.overlay}>
                                <h2 className={classes.overlayTitle}>Wisata Pantai</h2>
                                <p className={classes.overlayText}>Browse our amazing collection of items.</p>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className={classes.slideContent}>
                            <img
                                src={Slide3}
                                alt="Slide 3"
                                className={classes.slideImage}
                            />
                            <div className={classes.overlay}>
                                <h2 className={classes.overlayTitle}>Transportasi</h2>
                                <p className={classes.overlayText}>Be part of a vibrant community that shares your passion.</p>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </Box>
        </>
    )
};
