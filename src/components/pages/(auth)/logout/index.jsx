"use client";
import Empty_layout from "@/components/layout/_empty.layout";
import { Typography, Box, CircularProgress } from "@mui/material";
import React from "react";
import Cookies from "js-cookie";

function Index() {
  React.useEffect(() => {
    localStorage.clear();
    const allCookies = Cookies.get();

    // Hapus setiap cookie
    Object.keys(allCookies).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });

    window.location.replace("/login");
  }, []);

  return (
    <Empty_layout>
      <Box
        sx={{
          display: "flex",
          height: "100dvh",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
        <Typography variant="h5" mt="20px">
          Logging out...
        </Typography>
      </Box>
    </Empty_layout>
  );
}

export default Index;
