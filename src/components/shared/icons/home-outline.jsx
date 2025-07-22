import React from "react";
import { SvgIcon } from "@mui/material";

function Icon({ color = "#1C1C1C" }) {
  return (
    <SvgIcon sx={{ width: "30px", height: "30px" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={color}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12l9-9 9 9M4.5 10.5v9A1.5 1.5 0 006 21h3.75v-6h4.5v6H18a1.5 1.5 0 001.5-1.5v-9"
        />
      </svg>
    </SvgIcon>
  );
}

export default Icon;
