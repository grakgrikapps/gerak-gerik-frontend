import React from "react";
import { SvgIcon } from "@mui/material";

function Check_circle({ color }) {
  return (
    <SvgIcon sx={{ width: "20px", height: "20px" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill={color}
        className="size-5"
      >
        <path
          fillRule="evenodd"
          d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
          clipRule="evenodd"
        />
      </svg>
    </SvgIcon>
  );
}

export default Check_circle;
