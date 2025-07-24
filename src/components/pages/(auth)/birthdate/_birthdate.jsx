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
  InputAdornment,
  Grid,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { setToken, setProfile } from "@/lib/rtk/features/auth/authSlice";
import http from "@/lib/axios/http";
import Cookies from "js-cookie";
import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object({
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required(),
});

function Birthdate_page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      //   const profile = await http.get("auth/profile");
      //   dispatch(setProfile(profile.data?.profile));

      router.push("/register");
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
              <Grid size={3}>
                <TextField
                  id="phone"
                  fullWidth
                  name="phone"
                  type="number"
                  inputProps={{ min: 1, max: 31 }}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  margin="dense"
                  sx={{
                    "& input": {
                      fontSize: "28px !important",
                      fontWeight: 500,
                      textAlign: "center",
                    },
                  }}
                />

                <Typography fontSize="16px" align="center">
                  Day
                </Typography>
              </Grid>
              <Grid size={3}>
                <TextField
                  id="phone"
                  fullWidth
                  name="phone"
                  type="number"
                  inputProps={{ min: 1, max: 31 }}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  margin="dense"
                  sx={{
                    "& input": {
                      fontSize: "28px !important",
                      fontWeight: 500,
                      textAlign: "center",
                    },
                  }}
                />

                <Typography fontSize="16px" align="center">
                  Month
                </Typography>
              </Grid>
              <Grid size={4}>
                <TextField
                  id="phone"
                  fullWidth
                  name="phone"
                  type="number"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  margin="dense"
                  sx={{
                    "& input": {
                      fontSize: "28px !important",
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
          >
            Continue
          </Button>
        </form>
      </Container>
    </Box>
  );
}

export default Birthdate_page;
