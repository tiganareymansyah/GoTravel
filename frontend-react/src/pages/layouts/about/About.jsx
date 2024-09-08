import { 
    Box, 
    Typography 
} from "@mui/material";
import Navbar from "../../../components/navbar/Navbar";
import { useMediaQuery } from "react-responsive";
import { useAboutStyles } from "./style";
import logoGotravel from "../../../media/logo_gotravel2.png"

export default function About(props) {
    console.log(props);

    const isMobile = useMediaQuery({ maxWidth: 991 });
    const classes = useAboutStyles({ isMobile });

    return (
        <>
            <Box className={classes.aboutBackground}>
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
                        Sejarah Perusahaan
                    </Typography>

                    <Box className={classes.containerChild}>
                        <Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    width: "100%",
                                    paddingBottom: "8px"
                                }}
                            >
                                <Box
                                    sx={{
                                        // backgroundColor: "red",
                                        width: "45%",
                                        display: "flex"
                                    }}
                                >
                                    <img 
                                        // src="https://i.pinimg.com/236x/d6/4b/15/d64b1564458c459859a94bd11562de94.jpg"
                                        src={logoGotravel}
                                        style={{
                                            width: "50%",
                                            height: "90%",
                                            display: "flex",
                                            margin: "auto"
                                        }}
                                    />
                                </Box>
                                
                                <Box
                                    sx={{
                                        // backgroundColor: "blue",
                                        width: "55%"
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            textAlign: "center",
                                            fontWeight: "bold",
                                            fontSize: 22,
                                            paddingBottom: "24px"
                                        }}
                                    >
                                        GoTravel
                                    </Typography>

                                    <Typography
                                        sx={{
                                            textAlign: "justify",
                                            textIndent: "48px"
                                        }}
                                    >
                                        GoTravel adalah nama perusahaan yang berdiri pada tahun 2 Mei 2023 dan penanggung jawab keberlangsungan kinerja perusahaannya bernama Tigana Reymansyah. Perusahaan GoTravel 
                                        berlokasi di Jln. Kolonel Bangun Siregar BTN Sitio-tio Hilir AMD Kalangan. Perusahaan GoTravel bergerak dibidang pariwisata dengan jarak jangkau wisatanya hanya sekabupaten
                                        Tapanuli Tengah saja. Visi dari perusahaan GoTravel ini adalah <span style={{ fontWeight: "bold", fontStyle: "italic" }}>"Menjadi penyedia layanan transportasi darat 
                                        terkemuka yang mengutamakan kenyamanan, keselamatan, dan kepuasan pelanggan melalui inovasi teknologi dan pelayanan yang prima, serta berkontribusi pada pengembangan 
                                        pariwisata lokal dan nasional".</span>
                                    </Typography>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    // backgroundColor: "red",
                                }}
                            >
                                <Typography
                                    sx={{
                                        textAlign: "justify",
                                        // textIndent: "48px"
                                    }}
                                >
                                    Misinya adalah <span style={{ fontWeight: "bold", fontStyle: "italic" }}>"1. Memberikan layanan transportasi darat yang aman, nyaman, dan tepat waktu dengan armada transportasi 
                                    dan perawatan berkala. 2. Mempermudah transportasi untuk liburan dengan keluarga. 3. Berinovasi dalam teknologi untuk meningkatkan kompetensi tim operasional dan staf melalui 
                                    pelatihan rutin untuk menjaga standar layanan dan keselamatan".</span> Dahulu, perusahaan GoTravel sangat susah mempromosikan bidangnya kepada masyarakat. Sehingga, dibangunlah 
                                    aplikasi yang nama aplikasinya sendiri sama dengan nama perusahaan. Aplikasi ini telah dikembangkan dari bulan Juli - September 2024 yang kemudian di rilis pada bulan
                                    Oktober 2024. 
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};
