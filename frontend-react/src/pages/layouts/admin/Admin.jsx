import { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  DirectionsBus,
  FormatListBulleted,
  LocationOn,
  Logout,
  ManageAccounts,
  Menu,
  MiscellaneousServices,
  Payment,
} from "@mui/icons-material";
import MuiAppBar from "@mui/material/AppBar";
import { orange } from "@mui/material/colors";
import logoGoTravel from "../../../media/logo_gotravel1.png";
import { useMediaQuery } from "react-responsive";
import { useAdminStyles } from "./style";
import { useNavigate } from "react-router-dom";
import ListDataBooking from "./listDataBooking/ListDataBooking";
import KelolaDestinasi from "./kelolaDestinasi/KelolaDestinasi";
import KelolaTransportasi from "./kelolaTransportasi/KelolaTransportasi";
import KelolaMetodePembayaran from "./kelolaMetodePembayaran/KelolaMetodePembayaran";
import KelolaInformasiDanLayanan from "./kelolaInformasiDanLayanan/KelolaInformasiDanLayanan";
import RegisterPegawaiBaru from "./registerPegawaiBaru/RegisterPegawaiBaru";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  backgroundColor: "#181c24"
}));

export default function Admin(props) {
  console.log(props);

  const isMobile = useMediaQuery({ maxWidth: 991 });
  const classes = useAdminStyles({ isMobile });

  const styles = {
    button: {
      padding: "7px 14px",
      textAlign: "center",
      cursor: "pointer",
      borderRadius: "2px",
      color: "#000",
      backgroundColor: "#fff",
      "&:hover": {
        color: `${orange[100]}`,
      },
    },
  };

  const [open, setOpen] = useState(false);
  const [section, setSection] = useState("/list-data-booking");

  const theme = useTheme();
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menu = [
    {
      name: "List Data Booking",
      to: "/list-data-booking"
    },
    {
      name: "Kelola Destinasi",
      to: "/kelola-destinasi"
    },
    {
      name: "Kelola Transportasi",
      to: "/kelola-transportasi"
    },
    {
      name: "Kelola Metode Pembayaran",
      to: "/kelola-metode-pembayaran"
    },
    {
      name: "Kelola Informasi & Layanan",
      to: "/kelola-informasi-dan-layanan"
    },
    {
      name: "Register Pegawai Baru",
      to: "/register-pegawai-baru"
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("userLogin");
    localStorage.removeItem("tokenTimestamp");
    navigate("/admin");
  };

  return (
    <Box 
      // className={classes.adminBackground}
    >
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} sx={{ backgroundColor: "#181c24" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <Menu />
            </IconButton>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  width: "16%"
                }}
              >
                {!isMobile && (
                  <>
                    {!open && (
                      <img
                        src={logoGoTravel}
                        width={70}
                        height={70}
                        style={{ paddingBottom: "12px" }}
                      />  
                    )}
                    <Typography
                      variant="h6"
                      noWrap
                      component="div"
                      sx={{
                        fontStyle: "italic",
                        display: "flex",
                        fontWeight: "bold",
                        fontSize: "25px",
                        width: "100%",
                      }}
                    >
                      Go<Box sx={{ color: `${orange[100]}` }}>Travel</Box>
                    </Typography>
                  </>  
                )}
              </Box>

              <Button
                startIcon={<Logout />}
                sx={styles.button}
                onClick={handleLogout}
              >
                Keluar
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
            position: "relative"
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <img
              src={logoGoTravel}
              width={130}
              style={{
                paddingTop: "32px",
                display: "flex",
                margin: "auto"
              }}
            />
          </DrawerHeader>

          <List
            sx={{
              backgroundColor: "#181c24",
              height: "100vh",
              paddingTop: "32px"
            }}
          >
            {menu.map((menu, index) => (
              <ListItem key={menu} disablePadding
                sx={{
                  "&.MuiListItem-root": {
                    paddingBottom: "16px"
                  }
                }}
              >
                <ListItemButton 
                  sx={{
                    position: 'relative',
                    "&::before, &::after": {
                      content: '""',
                      position: 'absolute',
                      left: '50%',
                      width: '0%',
                      transition: 'width 0.3s ease',
                    },
                    "&::before": {
                      top: 0,
                      borderTop: '2px solid #fff',
                      transform: 'translateX(-30%)',
                    },
                    "&::after": {
                      bottom: 0,
                      borderBottom: '2px solid #fff',
                      transform: 'translateX(-70%)',
                    },
                    "&:hover::before, &:hover::after": {
                      width: '60%',
                    }
                  }}
                  onClick={() => setSection(menu.to)}
                >
                  <ListItemIcon sx={{ color: "#fff" }}>
                    {index === 0 ? (
                      <FormatListBulleted />
                    ) : index === 1 ? (
                      <LocationOn />
                    ) : index === 2 ? (
                      <DirectionsBus />
                    ) : index === 3 ? (
                      <Payment />
                    ) : index === 4 ? (
                      <MiscellaneousServices />
                    ) : index === 5 ? (
                      <ManageAccounts />
                    ) : null}
                  </ListItemIcon>
                  <ListItemText primary={menu.name} sx={{ color: "#fff" }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <IconButton 
            onClick={handleDrawerClose} 
            sx={{ 
              color: "#000", 
              position: "absolute", 
              top: "90%", 
              left: "40%", 
              display: "flex", 
              backgroundColor: "#fff", 
              zIndex: 5,
              "&:hover": { 
                color: "#fff" 
              }
            }}
          >
            <ChevronLeft />
          </IconButton>
        </Drawer>

        <Main open={open} sx={{ paddingTop: "100px" }}>
          {section === "/list-data-booking" ? (
            <ListDataBooking
              props={props}
            />
          ) : section === "/kelola-destinasi" ? (
            <KelolaDestinasi
              props={props}
            />
          ) : section === "/kelola-transportasi" ? (
            <KelolaTransportasi
              props={props}
            />
          ) : section === "/kelola-metode-pembayaran" ? (
            <KelolaMetodePembayaran
              props={props}
            />
          ) : section === "/kelola-informasi-dan-layanan" ? (
            <KelolaInformasiDanLayanan
              props={props}
            />
          ) : section === "/register-pegawai-baru" ? (
            <RegisterPegawaiBaru
              props={props}
            />
          ) : null}
        </Main>
      </Box>
    </Box>
  );
}

// backgorundColor: #181c24 atau #18345c, color: #ff0000
