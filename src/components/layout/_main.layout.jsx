"use client";

import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Bottom_bar from "../shared/bar/bottom.bar";
import Top_bar from "../shared/bar/top.bar";

import moment from "moment";
import "moment/locale/id";
moment.locale("id");

function Main_layout({ children }) {
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
          height="100dvh"
        >
          {/* Top Bar */}
          <Top_bar />

          {/* Main content area */}
          <Box
            sx={{
              height: "100dvh",
            }}
          >
            {children}
          </Box>

          {/* Bottom Bar */}
          <Bottom_bar />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Main_layout;
