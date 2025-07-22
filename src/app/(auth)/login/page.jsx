"use client";
import Empty_layout from "@/components/layout/_empty.layout";
import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import http from "@/lib/axios/http";
import { useDispatch } from "react-redux";
import { setToken, setProfile } from "@/lib/rtk/features/auth/authSlice";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      http.post("/auth/login", values).then(async (response) => {
        Cookies.set("token", response?.data?.token);
        dispatch(setToken(response?.data?.token));

        const profile = await http.get("auth/profile");
        dispatch(setProfile(profile.data));

        router.replace("/home");
      });
    },
  });

  return (
    <Empty_layout>
      <Box
        display="flex"
        height="100dvh"
        alignItems="center"
        justifyContent="center"
        padding="30px"
      >
        <Box width="100%">
          <Typography
            variant="h1"
            fontWeight={700}
            fontSize="32px"
            gutterBottom
          >
            Login
          </Typography>
          <Typography
            fontSize="18px"
            fontWeight={400}
            color="#4B5768"
            mb="50px"
          >
            Welcome back to the app
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Typography
              component="label"
              htmlFor="email"
              fontWeight={500}
              fontSize="16px"
              lineHeight="24px"
              display="block"
              mb="7px"
            >
              Email Address
            </Typography>
            <TextField
              id="email"
              fullWidth
              name="email"
              placeholder="Enter your email address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{
                "& fieldset": {
                  border: "1px solid",
                  borderColor: "#D0D5DD",
                  borderRadius: "8px",
                },
                "& .MuiFormLabel-root": {
                  fontSize: "0.8rem",
                },
                mb: "20px",
              }}
            />

            <Typography
              component="label"
              htmlFor="password"
              fontWeight={500}
              fontSize="16px"
              lineHeight="24px"
              display="block"
              mb="7px"
            >
              Password
            </Typography>
            <TextField
              id="password"
              fullWidth
              name="password"
              placeholder="Enter your password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{
                "& fieldset": {
                  border: "1px solid",
                  borderColor: "#D0D5DD",
                  borderRadius: "8px",
                },
                mb: "20px",
              }}
            />

            <Button
              variant="contained"
              type="submit"
              size="large"
              disableElevation
              fullWidth
              sx={{
                borderRadius: "32px",
                textTransform: "capitalize",
                fontSize: "16px",
                fontWeight: 500,
                mb: "20px",
              }}
            >
              Login
            </Button>

            <Button
              type="submit"
              size="large"
              disableElevation
              fullWidth
              sx={{
                borderRadius: "32px",
                textTransform: "initial",
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              Create an account
            </Button>
          </form>
        </Box>
      </Box>
    </Empty_layout>
  );
}

export default Page;
