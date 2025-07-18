"use client";

import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import NextLink from "next/link";

import {
  selectCount,
  selectStatus,
} from "@/lib/rtk/features/counter/counterSlice";

import { useAppDispatch, useAppSelector } from "@/lib/rtk/hooks";

export default function Home() {
  const count = useAppSelector(selectCount);
  const status = useAppSelector(selectStatus);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Material UI - Next.js App Router example in JavaScript
        </Typography>
        <Link href="/about" color="secondary" component={NextLink}>
          Go to the about page
        </Link>
      </Box>
    </Container>
  );
}
