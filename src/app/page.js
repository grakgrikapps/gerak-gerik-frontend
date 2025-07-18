"use client";

import * as React from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";

// import {
//   selectCount,
//   selectStatus,
// } from "@/lib/rtk/features/counter/counterSlice";

// import { useAppDispatch, useAppSelector } from "@/lib/rtk/hooks";

export default function Home() {
  // const count = useAppSelector(selectCount);
  // const status = useAppSelector(selectStatus);

  return (
    <>
      <Box height="100%" width="100%" padding="15px">
        {/* Content Video */}
        <Box
          height="calc(100% - 80px)"
          width="100%"
          bgcolor="lightgrey"
          borderRadius="15px"
        />

        {/* Profile */}
        <Box
          display="flex"
          width="100%"
          gap={1}
          height="95px"
          paddingY="10px"
        >
          <Avatar />

          <Box width="100%">
            <Box display="flex" width="100%" justifyContent="space-between">
              <Box mb={0} display="flex" alignItems="center" gap={0.4}>
                <Typography variant="h5">Nama</Typography>
                <VerifiedRoundedIcon
                  htmlColor="#1673EE"
                  sx={{ fontSize: "14px" }}
                />
                <Typography color="textDisabled">@namanama</Typography>
              </Box>

              <Typography color="textDisabled">1h ago</Typography>
            </Box>
            <Typography>
              Caption - Lorem ipsum dolor sit amet, consectetur adipiscing sit
              amet sit amet...
            </Typography>

            <Button
              size="small"
              color="inherit"
              sx={{
                minWidth: "fit-content",
                height: "0px",
                padding: "0px",
                textTransform: "lowercase",
              }}
            >
              Selengkapnya
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
