"use client";

import React from "react";
import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Typography,
  TextField,
  Checkbox,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { setToken, setProfile } from "@/lib/rtk/features/auth/authSlice";
import http from "@/lib/axios/http";
import Cookies from "js-cookie";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string("Please enter email")
    .email("Enter a valid email")
    .required("Please enter email"),
  password: yup
    .string("Please enter password")
    .required("Please enter password"),
});

function Login_page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const request = await http.post("/auth/login", values);

        Cookies.set("token", request?.data?.token);
        dispatch(setToken(request?.data?.token));

        const profile = await http.get("auth/profile");
        dispatch(setProfile(profile.data?.profile));

        router.replace("/home");
      } catch (error) {
        if (error?.response?.data?.messages === "User not exist") {
          formik.setFieldError(
            "email",
            "We couldn’t find an account with that email."
          );
        } else {
             formik.setFieldError(
               "email",
               "Something wrong with your email or password."
             );
        }
      }
    },
  });

  return (
    <Box
      display="flex"
      height="100dvh"
      alignItems="center"
      justifyContent="center"
    >
      <Container>
        <Box mb="50px">
          <Typography variant="h1" gutterBottom>
            Login
          </Typography>
          <Typography variant="body2" fontSize="18px">
            Welcome back to the app
          </Typography>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <Box mb={2}>
            <Typography
              component="label"
              htmlFor="email"
              fontWeight={500}
              display="block"
              variant="h4"
            >
              Email Address
            </Typography>

            <TextField
              id="email"
              fullWidth
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              margin="dense"
            />
          </Box>

          <Box mb={2}>
            <Typography
              component="label"
              htmlFor="password"
              fontWeight={500}
              display="block"
              variant="h4"
            >
              Password
            </Typography>

            <TextField
              fullWidth
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="dense"
            />
          </Box>

          <Box mb={1}>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={
                <Typography variant="body2" fontSize="16px" color="#191D23">
                  Keep me signed in
                </Typography>
              }
            />
          </Box>

          <Button
            variant="contained"
            size="large"
            color="inherit"
            type="submit"
            fullWidth
          >
            Login
          </Button>
        </form>
      </Container>
    </Box>
  );
}

export default Login_page;
