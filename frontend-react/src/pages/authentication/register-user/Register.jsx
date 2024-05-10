import { useRef } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { apiRegisterAccount } from "../../../api/api.js";

export default function Register() {
    const inputRefFullName = useRef(null);
    const inputRefTbt = useRef(null);
    const inputRefGender = useRef(null);
    const inputRefEmail = useRef(null);
    const inputRefPassword = useRef(null);

    const formik = useFormik({
        initialValues: {
            fullname: "",
            tbt: "",
            gender: "",
            email: "",
            password: "",
        },
    
        onSubmit: async (values) => {
          handleRegister(values);
        },
    });

    const handleRegister = async (data) => {
        try {
            const result = await apiRegisterAccount({
                body: JSON.stringify(data)
            });

            const { status, message } = result;

            if (status === "success") {
                alert("Register Berhasil");
            } else {
                console.log(message);
            }
        } catch (err) {
            throw err
        }
    }

    const handleChange = (field, value) => {
        formik.setFieldValue(field, value);
    };

    console.log(formik.values);

    return (
        <>
            <Box>
                <form onKeyDown={(e) => e.key === "Enter" && formik.handleSubmit()}>
                    <TextField
                        id="fullname"
                        label="Fullname"
                        variant="outlined"
                        inputRef={inputRefFullName}
                        defaultValue={formik.values.fullname}
                        onChange={() => handleChange("fullname", inputRefFullName.current?.value)}
                        required
                        autoFocus
                    />
                    <TextField
                        id="tbt"
                        label="Birthday"
                        variant="outlined"
                        inputRef={inputRefTbt}
                        defaultValue={formik.values.tbt}
                        onChange={() => handleChange("tbt", inputRefTbt.current?.value)}
                        required
                    />
                    <TextField
                        id="gender"
                        label="Gender"
                        variant="outlined"
                        inputRef={inputRefGender}
                        defaultValue={formik.values.gender}
                        onChange={() => handleChange("gender", inputRefGender.current?.value)}
                        required
                    />
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        inputRef={inputRefEmail}
                        defaultValue={formik.values.email}
                        onChange={() => handleChange("email", inputRefEmail.current?.value)}
                        required
                    />
                    <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        inputRef={inputRefPassword}
                        defaultValue={formik.values.password}
                        onChange={() => handleChange("password", inputRefPassword.current?.value)}
                        required
                    />
                    <Button 
                        sx={{ 
                            border: "1px solid", 
                            backgroundColor: "blue" 
                        }}
                        onClick={formik.handleSubmit}
                    >
                        Daftar
                    </Button>
                </form>
            </Box>
        </>    
    )
}