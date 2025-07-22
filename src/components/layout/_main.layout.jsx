"use client";

import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Bottom_bar from "../shared/bar/bottom.bar";
import Top_bar from "../shared/bar/top.bar";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

function Main_layout({ children }) {
  const route = useRouter();
  const auth = useSelector((state) => state.auth);

  // React.useEffect(() => {
  //   if (!auth?.token) {
  //     route.replace("/login");
  //   }
  // }, []);

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
          height="99.5dvh"
        >
          {/* Top Bar */}
          <Top_bar />

          {/* Main content area */}
          <Box
            sx={{
              height: "calc(100dvh - 157px)",
              overflow: "auto",
              "&::-webkit-scrollbar": { display: "none" },
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
