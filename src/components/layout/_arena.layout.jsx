"use client";

import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ArrowLeftIcon from "@/components/shared/icons/arrow-left";
import { Container, IconButton, Typography } from "@mui/material";

function Arena_layout({ children }) {
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
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            height="60px"
          >
            <Container
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <Link href="/home">
                <IconButton size="small">
                  <ArrowLeftIcon />
                </IconButton>
              </Link>

              <Typography variant="h4">Arena</Typography>

              <IconButton size="small">
                {/* <SearchIcon color="#999DA3" /> */}
              </IconButton>
            </Container>
          </Box>

          {/* Main content area */}
          <Box
            sx={{
              height: "calc(100dvh - 60px)",
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

export default Arena_layout;
