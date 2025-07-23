"use client";

import React from "react";
import Arena_list from "@/components/shared/list/arena.list";
import { Box, Container } from "@mui/material";

function Arena_pages() {
  return (
    <Container>
      {[...new Array(50)].map((item, index) => (
        <Arena_list key={index} />
      ))}
    </Container>
  );
}

export default Arena_pages;
