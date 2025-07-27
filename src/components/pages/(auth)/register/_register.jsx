"use client";

import React from "react";
import { Box, Button, Container, Typography, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setRegister } from "@/lib/rtk/features/auth/authSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import Link from "next/link";

const validationSchema = yup.object({
  fullname: yup.string("Please enter your name").required("Name is required"),
  username: yup
    .string("Please enter username")
    .matches(/^[a-zA-Z0-9]+$/, "Username must be alphanumeric only")
    .min(5, "Username should be at least 5 characters")
    .required("Username is required"),
  email: yup
    .string("Please enter email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Please enter password")
    .min(8, "Password should be at least 8 characters")
    .required("Password is required"),
});

function Register_page() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      fullname: auth?.register?.fullname,
      username: auth?.register?.username,
      email: auth?.register?.email,
      password: auth?.register?.password,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(setRegister(values));
        router.push("/phone");
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
              id="fullname"
              fullWidth
              name="fullname"
              placeholder="Enter your name"
              value={formik.values.fullname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullname && Boolean(formik.errors.fullname)}
              helperText={formik.touched.fullname && formik.errors.fullname}
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
              <Typography fontSize="16px" variant="h6" color="#253DC5">
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
