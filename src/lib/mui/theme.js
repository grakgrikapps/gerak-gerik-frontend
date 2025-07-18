"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const color = {
  dark_grey: "#545454",
  light_grey: "#e0e0e05f",
};

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h5: {
      fontSize: "16px",
      fontWeight: 600
    },
    h6: {
      fontSize: "14px",
    },
    body1: {
      fontSize: '12px',
      color: color.dark_grey,
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& fieldset": {
            border: "1px solid",
            borderColor: color.dark_grey,
            borderRadius: "50px",
          },
        },
      },
    },
  },
});

export default theme;
