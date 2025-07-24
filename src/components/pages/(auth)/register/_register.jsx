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
import Link from "next/link";

const validationSchema = yup.object({
  email: yup
    .string("Please enter email")
    .email("Enter a valid email")
    .required("Please enter email"),
  password: yup
    .string("Please enter password")
    .required("Please enter password"),
});

function Register_page() {
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
            Create an account
          </Typography>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <Box mb={2}>
            <Typography
              component="label"
              htmlFor="name"
              fontWeight={500}
              display="block"
              variant="h4"
            >
              Name
            </Typography>

            <TextField
              id="name"
              fullWidth
              name="name"
              placeholder="Enter your name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              margin="dense"
            />
          </Box>

          <Box mb={2}>
            <Typography
              component="label"
              htmlFor="email"
              fontWeight={500}
              display="block"
              variant="h4"
            >
              Username
            </Typography>

            <TextField
              id="username"
              fullWidth
              name="username"
              type="username"
              placeholder="Enter your username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              margin="dense"
            />
          </Box>

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

          <Button
            variant="contained"
            size="large"
            color="inherit"
            type="submit"
            fullWidth
          >
            Sign up
          </Button>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={2}
            gap="5px"
          >
            <Typography fontSize="16px" color="#999DA3">
              Already have an account?
            </Typography>
            <Link passHref href="/login">
              <Typography fontSize="16px" variant="h6" color="#253DC5" >
                Sign in here
              </Typography>
            </Link>
          </Box>
        </form>
      </Container>
    </Box>
  );
}

export default Register_page;
