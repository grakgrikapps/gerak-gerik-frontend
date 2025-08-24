"use client";
import { Inter } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const inter = Inter({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const neutral = {
  700: "#191D23",
  600: "#4B4B4B",
  500: "#8E8E8E",
  400: "#CACACA",
  300: "#E1E1E1",
  200: "#EEEEEE",
  100: "#F5F5F5",
  50: "#FAFAFA",
};

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: "#253DC5",
    },
    error: {
      main: "#EC2D30",
    },
    warning: {
      main: "#FE9B0E",
    },
    success: {
      main: "#0C9D61",
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      fontSize: "30px",
      fontWeight: 700,
      color: "#000000",
    },
    h4: {
      fontSize: "16px",
      fontWeight: 700,
      color: neutral?.[700],
    },
    h5: {
      fontSize: "14px",
      fontWeight: 600,
      color: "#141619",
    },
    h6: {
      fontSize: "12px",
      fontWeight: 600,
      color: "#141619",
    },
    body1: {
      fontSize: "12px",
      color: "#141619",
    },
    body2: {
      fontSize: "12px",
      color: neutral?.[600],
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& input": {
            fontSize: "16px !important",
          },
          "& .MuiInputAdornment-root p": {
            fontSize: "16px !important",
            color: "#141619",
          },
          "& fieldset": {
            borderRadius: "8px",
          },
          "& .MuiFormHelperText-root": {
            fontSize: "14px !important",
            marginLeft: "0 !important",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedInherit: {
          backgroundColor: neutral?.[700],
          color: "#fff",
          textTransform: "capitalize",
        },
        outlinedInherit: {
          textTransform: "capitalize",
          color: neutral?.[700],
        },
        containedSizeLarge: {
          borderRadius: "10px",
          color: "#fff",
          fontSize: "16px",
          fontWeight: 500,
          textTransform: "capitalize",
          minHeight: "48px",
        },
        outlinedSizeLarge: {
          borderRadius: "10px",
          minHeight: "48px",
          fontSize: "16px",
          fontWeight: 500,
          textTransform: "capitalize",
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          // backgroundColor: "red",
          // minWidth: 0,
          // maxWidth: 0,
          fontSize: "12px",
          textTransform: "capitalize",
          color: "#141619 !important",
        },
      },
    },
  },
});

export default theme;
