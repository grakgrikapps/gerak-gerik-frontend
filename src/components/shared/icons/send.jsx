import React from "react";
import { SvgIcon } from "@mui/material";

function Icon({ color = "#1C1C1C" }) {
  return (
    <SvgIcon sx={{ width: "30px", height: "30px" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill={color}
        className="size-5"
      >
        <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
      </svg>
    </SvgIcon>
  );
}

export default Icon;
