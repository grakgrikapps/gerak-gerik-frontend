"use client";

import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Grid,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  setBirthdate,
  setToken,
  setProfile,
} from "@/lib/rtk/features/auth/authSlice";
import * as yup from "yup";
import http from "@/lib/axios/http";
import Cookies from "js-cookie";

const validationSchema = yup.object({
  day: yup
    .number()
    .typeError("Must be a number")
    .required("Day is required")
    .min(1, "Day must be at least 1")
    .max(31, "Day can't be more than 31"),
  month: yup
    .number()
    .typeError("Must be a number")
    .required("Month is required")
    .min(1, "Month must be at least 1")
    .max(12, "Month can't be more than 12"),
  year: yup
    .number()
    .typeError("Must be a number")
    .required("Year is required")
    .min(1900, "Too old")
    .max(new Date().getFullYear(), "Year can't be in the future"),
});

function Birthdate_page() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      day: auth?.register?.birthdate?.day,
      month: auth?.register?.birthdate?.month,
      year: auth?.register?.birthdate?.year,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(setBirthdate(values));
        const request = await http.post(`/auth/register`, {
          email: auth.register?.email,
          password: auth.register?.password,
          fullname: auth.register?.fullname,
          username: auth?.register?.username,
        });

        dispatch(setProfile(request?.data?.result?.profile));
        dispatch(setToken(request?.data?.token));
        Cookies.set("token", request?.data?.token);

        window.location.href = "/home";
      } catch (error) {
        console.log(error);
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
        <Box mb="10px">
          <Typography variant="h1" gutterBottom>
            Enter your birthdate
          </Typography>
          <Typography variant="body2" fontSize="18px">
            Used to verify your age and personalize your experience.
          </Typography>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <Box mb={2}>
            <Grid container spacing={2}>
              <Grid size={3.5}>
                <TextField
                  id="day"
                  name="day"
                  type="number"
                  fullWidth
                  inputProps={{ min: 1, max: 31 }}
                  value={formik.values.day}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.day && Boolean(formik.errors.day)}
                  helperText={formik.touched.day && formik.errors.day}
                  margin="dense"
                  sx={{
                    "& input": {
                      fontSize: "28px",
                      fontWeight: 500,
                      textAlign: "center",
                    },
                  }}
                />

                <Typography fontSize="16px" align="center">
                  Day
                </Typography>
              </Grid>
              <Grid size={3.5}>
                <TextField
                  id="month"
                  name="month"
                  type="number"
                  fullWidth
                  inputProps={{ min: 1, max: 12 }}
                  value={formik.values.month}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.month && Boolean(formik.errors.month)}
                  helperText={formik.touched.month && formik.errors.month}
                  margin="dense"
                  sx={{
                    "& input": {
                      fontSize: "28px",
                      fontWeight: 500,
                      textAlign: "center",
                    },
                  }}
                />

                <Typography fontSize="16px" align="center">
                  Month
                </Typography>
              </Grid>
              <Grid size={5}>
                <TextField
                  id="year"
                  name="year"
                  type="number"
                  fullWidth
                  inputProps={{ min: 1900, max: new Date().getFullYear() }}
                  value={formik.values.year}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.year && Boolean(formik.errors.year)}
                  helperText={formik.touched.year && formik.errors.year}
                  margin="dense"
                  sx={{
                    "& input": {
                      fontSize: "28px",
                      fontWeight: 500,
                      textAlign: "center",
                    },
                  }}
                />

                <Typography fontSize="16px" align="center">
                  Year
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Button
            variant="contained"
            size="large"
            color="inherit"
            type="submit"
            fullWidth
            loading={formik.isSubmitting}
            disabled={formik.isSubmitting || !formik.isValid}
          >
            Continue
          </Button>
        </form>
      </Container>
    </Box>
  );
}

export default Birthdate_page;
