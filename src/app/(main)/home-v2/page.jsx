"use client";

import React, { useEffect, useRef, useState } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { Box } from "@mui/material";

const sections = [
  { id: "section1", color: "maroon" },
  { id: "section2", color: "navy" },
  { id: "section3", color: "plum" },
];

function Page() {
  const containerRef = useRef(null);
  const scroll = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    scroll.current = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true,
      direction: "vertical",
      multiplier: 1.2,
      getDirection: true,
    });

    return () => {
      if (scroll.current) scroll.current.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-scroll-container
      style={{
        height: "100dvh",
        // overflow: "hidden",
      }}
    >
      {sections.map((section, index) => (
        <section
          key={section.id}
          data-scroll-section
          style={{
            height: "100dvh",
            width: "100%",
          }}
        >
          <Box
            height="100%"
            width="100%"
            bgcolor={section.color}
            display="flex"
            justifyContent="center"
            alignItems="center"
            fontSize="3rem"
            color="#fff"
          >
            Section {index + 1}
          </Box>
        </section>
      ))}
    </div>
  );
}

export default Page;
