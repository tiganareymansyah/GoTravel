import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  styled,
  TextField
} from "@mui/material";
import { 
  CalendarToday,
  Close,
  Send,
  VisibilityOff,
  Visibility,
  Save,
} from "@mui/icons-material";
import DatePicker from "react-datepicker";
import InputMask from "react-input-mask";
import "react-datepicker/dist/react-datepicker.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

// BootstrapDialogTitle.propTypes = {
//   children: PropTypes.node,
//   onClose: PropTypes.func.isRequired,
// };

export default function FormDialogAdd({
  classes,
  openDialog,
  payloadRegisterPegawaiBaru,
  handleChange,
  handleCloseAdd,
  handleAddRegisterPegawaiBaru
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleInputClick = (e) => {
    if (e && e.target) {
      e.target.readOnly = true;
      e.target.placeholder = "dd/MM/yyyy";
      e.target.blur();
      e.target.readOnly = false;
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
    
  return (
    <>
      <BootstrapDialog
        onClose={handleCloseAdd}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
        PaperProps={{ style: { width: "500px", padding: "20px" } }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleCloseAdd}
        >
          Tambah Register Pegawai Baru
        </BootstrapDialogTitle>

          <DialogContent dividers>
              <Box>
                <form onSubmit={(e) => handleAddRegisterPegawaiBaru(e)}>
                  <TextField
                    label="Nama Lengkap"
                    name="namaLengkap"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={payloadRegisterPegawaiBaru.namaLengkap}
                    onChange={(e) => handleChange("namaLengkap", e.target.value)}
                  />

                  <Box className={classes.datePickerWrapper}>
                    <DatePicker
                      // placeholderText="Tanggal Lahir (dd/mm/yyyy)"
                      fullWidth
                      dropdownMode="select"
                      //   disabled={
                      //     props.dataRequest &&
                      //     props.userLogin.roleName !== "VERIFIKATOR"
                      //       ? true
                      //       : false
                      //   }
                      onInputClick={handleInputClick}
                      dateFormat={"dd/MM/yyyy"}
                      showYearDropdown
                      showMonthDropdown
                      yearDropdownItemNumber={100}
                      maxDate={new Date()}
                      scrollableYearDropdown
                      popperClassName={classes.datePickerPopper}
                      className={classes.calendarContainer}
                      calendarClassName={classes.calendar}
                      selected={
                        payloadRegisterPegawaiBaru.dob &&
                        new Date(payloadRegisterPegawaiBaru.dob)
                      }
                      // popperPlacement="right-start"
                      onChangeRaw={(event) => {
                        const rawInput = event.target.value;
                        const isValidInput = /^[0-3]?[0-9]\/[0-1]?[0-9]{0,4}$/.test(
                          rawInput
                        );

                        if (isValidInput) {
                          if (rawInput.length === 10) {
                            const [day, month, year] = rawInput.split("/");
                            const parsedDate = new Date(`${year}-${month}-${day}`);

                            if (!isNaN(parsedDate.getTime())) {
                              handleChange("dob", parsedDate)
                            } else {
                              console.log("Invalid date");
                            }
                          }
                        } else {
                          console.log("Invalid input format");
                        }
                      }}
                      onChange={(e) => handleChange("dob", e)}
                      customInput={
                        <InputMask
                          mask="99/99/9999"
                          // value={props.value}
                        >
                          {(inputProps) => (
                            <TextField
                              {...inputProps}
                              label="Birthday (dd/mm/yyyy)"
                              fullWidth
                              margin="normal"
                              type="tel"
                              variant="outlined"
                              disableUnderline
                              sx={{
                                cursor: "pointer",
                                "& .Mui-disabled": {
                                  WebkitTextFillColor: "black !important",
                                  background: "#ffffff",
                                },
                              }}
                              InputProps={{
                                style: { cursor: "pointer", width: "100%" },
                                autoComplete: "off",
                                endAdornment: <CalendarToday sx={{ paddingBottom: "6px" }} />
                              }}
                            />
                          )}
                        </InputMask>
                      }
                    />
                  </Box>


                  <FormControl sx={{ paddingTop: "16px" }}>
                    <FormLabel id="demo-row-radio-buttons-group-label">Jenis Kelamin</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                        <FormControlLabel 
                            value="l" 
                            control={
                                <Radio 
                                    color="default" 
                                    value="l"
                                    onChange={(e) => handleChange("jenisKelamin", e.target.value)}
                                />
                            } 
                            label="Laki-laki" 
                        />
                      <FormControlLabel 
                        value="p" 
                        control={
                          <Radio 
                            color="default" 
                            value="p"
                            onChange={(e) => handleChange("jenisKelamin", e.target.value)}
                          />
                        } 
                        label="Perempuan" 
                      />
                    </RadioGroup>
                  </FormControl>

                  <TextField
                    label="Email"
                    name="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={payloadRegisterPegawaiBaru.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />

                  <FormControl variant="outlined" sx={{ width: "100%", marginTop: "16px" }}>
                    <InputLabel htmlFor="standard-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="password"
                      label="Password"
                      value={payloadRegisterPegawaiBaru.password}
                      onChange={(e) =>
                        handleChange("password", e.target.value)
                      }
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>

                  <Box
                    sx={{
                      paddingTop: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "end",
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        background: "#18345c",
                        color: "white",
                        fontWeight: "bold",
                        marginTop: "5px",
                        width: "30%"
                      }}
                      startIcon={<Save />}
                    >
                      Save
                    </Button>
                  </Box>
                </form>
              </Box>
          </DialogContent>
      </BootstrapDialog>
    </>
  );
}
