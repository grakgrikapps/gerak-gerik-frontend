"use client";

import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function Empty_layout({ children }) {
  return (
    <Grid
      container
      justifyContent="center"
      sx={{ backgroundColor: "#f5f5f5", width: "100%", overflow: "hidden" }}
    >
      <Grid
        item
        size={{ lg: 3, xs: 12 }}
        sx={{
          backgroundColor: "#fff",
          border: "1px solid #e0e0e0",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
          height="99.7dvh"
        >
          {/* Main content area */}
          <Box
            sx={{
              height: "calc(100dvh)",
              overflow: "auto",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {children}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Empty_layout;
