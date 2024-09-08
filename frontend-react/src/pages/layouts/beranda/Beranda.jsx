import { Box, Typography } from "@mui/material"
import Navbar from "../../../components/navbar/Navbar"
import { useMediaQuery } from "react-responsive";
import { useBerandaStyles } from "./style";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

export default function Beranda(props) {
    console.log(props);

    const isMobile = useMediaQuery({ maxWidth: 991 });
    const classes = useBerandaStyles({ isMobile });   

    return (
        <>
            <Box className={classes.berandaBackground}>
                <Navbar />
                <Box className={classes.containerParent}>
                    <Typography 
                        sx={{ 
                            textAlign: "center", 
                            fontSize: 24,
                            fontWeight: "bold",
                            letterSpacing: "2px"
                        }}
                    >
                        Beranda
                    </Typography>

                    <Box className={classes.containerChild}>
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={50}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            loop={true}
                        >
                            <SwiperSlide>
                                <img 
                                    src="https://i.pinimg.com/236x/40/ad/52/40ad52cf1439ec5e9ef8aa5c0e5b96d6.jpg" alt="Image 1" 
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img 
                                    src="https://i.pinimg.com/236x/1e/94/9b/1e949bfc9d98d046fa02fefdfccb77cd.jpg" alt="Image 2" 
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img 
                                    src="https://i.pinimg.com/236x/c4/1a/55/c41a550dc281bd319f1134838acfe7bf.jpg" alt="Image 3" 
                                />
                            </SwiperSlide>
                        </Swiper>
                    </Box>
                </Box>
            </Box>
        </>
    )
};
