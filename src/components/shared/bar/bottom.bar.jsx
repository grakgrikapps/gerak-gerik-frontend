import React from "react";
import { Box, IconButton, Typography } from "@mui/material";

import HomeIcon from "../icons/home";
import ArenaIcon from "../icons/arena";
import ChatIcon from "../icons/chat";
import ShareIcon from "../icons/share";
import BookmarkIcon from "../icons/bookmark";

function Bottom_bar() {
  const [selected, setSelected] = React.useState("Home");

  return (
    <Box
      height="65px"
      borderTop="1px solid #95959599"
      display="flex"
      alignItems="center"
      justifyContent="space-around"
    >
      {[
        {
          label: "Home",
          icon: <HomeIcon color="#1C1C1C" />,
        },
        { label: "Arena", icon: <ArenaIcon /> },
        { label: "Comment", icon: <ChatIcon /> },
        { label: "Share", icon: <ShareIcon /> },
        { label: "Save", icon: <BookmarkIcon /> },
      ].map((item, index) => (
        <IconButton
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "0 10px",
            borderRadius: "5px",
            width: "50px",
          }}
          disableFocusRipple
          key={index}
          onClick={() => setSelected(item.label)}
        >
          {item.icon}
          <Typography variant="body2" fontSize="10px">
            {item.label}
          </Typography>
        </IconButton>
      ))}
    </Box>
  );
}

export default Bottom_bar;
