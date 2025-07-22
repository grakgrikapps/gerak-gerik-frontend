"use client";
import Empty_layout from "@/components/layout/_empty.layout";
import { Typography, Box, CircularProgress } from "@mui/material";
import React from "react";

function Index() {
  React.useEffect(() => {
    window.location.replace("/home");
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
          Preparing page...
        </Typography>
      </Box>
    </Empty_layout>
  );
}

export default Index;
