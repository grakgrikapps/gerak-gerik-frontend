import React from "react";
import Grid from "@mui/material/Grid";
import Appbar from "@/components/shared/appBar/_appbar";
import Bottombar from "@/components/shared/bottomBar/_bottombar";
import Box from "@mui/material/Box";

function Main_layout({ children }) {
  return (
    <Grid
      container
      justifyContent="center"
      sx={{ backgroundColor: "#f5f5f5", width: "100%" }}
    >
      <Grid
        item
        size={{ lg: 3, xs: 12 }}
        sx={{ backgroundColor: "#fff", border: "1px solid #e0e0e0" }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
          height="100dvh"
        >
          {/* Sidebar or navigation area can go here */}
          <Appbar />
          {/* Main content area */}
          <Box sx={{ height: "calc(100dvh - 157px)" }}>{children}</Box>
          {/* Bottom area */}
          <Bottombar />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Main_layout;
