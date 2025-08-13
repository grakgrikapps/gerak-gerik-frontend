"use client";

import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { setPhone } from "@/lib/rtk/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object({
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
});

function Phone_page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      phone: auth?.register?.phone,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        dispatch(setPhone(values.phone));

        router.push("/birthdate");
      } catch (error) {
        console.error(error);
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
            Enter phone number
          </Typography>
          <Typography variant="body2" fontSize="18px">
            Please enter your phone number.
          </Typography>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <Box mb={2}>
            <TextField
              id="phone"
              fullWidth
              name="phone"
              type="tel"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              margin="dense"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">+62</InputAdornment>
                  ),
                },
              }}
            />
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

export default Phone_page;
