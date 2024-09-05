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
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum labore quia laborum nostrum animi iusto mollitia maiores obcaecati omnis facere optio quod cupiditate adipisci et illum porro, doloremque veritatis natus.
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero aperiam laboriosam facere impedit voluptates eligendi distinctio unde reiciendis omnis iusto quidem nemo ratione at, nihil error molestiae, nam explicabo quod.
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni omnis velit nulla soluta laborum et quia ex sunt reprehenderit autem, eius, adipisci excepturi impedit quaerat id. Velit, exercitationem? Non, dolore!
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
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum labore quia laborum nostrum animi iusto mollitia maiores obcaecati omnis facere optio quod cupiditate adipisci et illum porro, doloremque veritatis natus.
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero aperiam laboriosam facere impedit voluptates eligendi distinctio unde reiciendis omnis iusto quidem nemo ratione at, nihil error molestiae, nam explicabo quod.
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni omnis velit nulla soluta laborum et quia ex sunt reprehenderit autem, eius, adipisci excepturi impedit quaerat id. Velit, exercitationem? Non, dolore!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum corporis porro consectetur ipsum a perferendis, deleniti fuga libero, maxime quae sed iure veniam aut aliquam ut nobis sit eveniet error?
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo pariatur maxime amet doloribus quia cum ipsam nostrum atque, ullam sit illum odit aut suscipit necessitatibus dolorem neque magnam accusamus nulla!
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat quas eveniet expedita corrupti recusandae temporibus dicta, adipisci officia. Necessitatibus libero quo itaque debitis illo ea deserunt ipsam saepe molestias enim?
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};
