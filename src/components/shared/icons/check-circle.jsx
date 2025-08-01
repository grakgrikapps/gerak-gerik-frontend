import React from "react";
import { SvgIcon } from "@mui/material";

function Check_circle({ color }) {
  return (
    <SvgIcon sx={{ width: "65px", height: "65px" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={color}
        className="size-6"
      >
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
          clipRule="evenodd"
        />
      </svg>
    </SvgIcon>
  );
}

export default Check_circle;
