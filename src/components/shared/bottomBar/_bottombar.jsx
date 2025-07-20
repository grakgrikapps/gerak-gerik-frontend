"use client";
import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

// Import icons
import HomeFilledIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import Groups2RoundedIcon from "@mui/icons-material/Groups2Rounded";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import SmsRoundedIcon from "@mui/icons-material/SmsRounded";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ShareIcon from "@mui/icons-material/Share";
import { color } from "@/lib/mui/theme";
import BottomBar_comment from "./_bottomBar.comment";
import BottomBar_replies from "./_bottomBar.replies";

function Bottombar() {
  const [value, setValue] = React.useState(0);
  const [openCommentDrawer, setCommentDrawer] = React.useState(false);
  const [openReplyDrawer, setReplyDrawer] = React.useState(false);
  const [replyDetails, setReplyDetails] = React.useState(null);

  const toggleComment = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setCommentDrawer(open);
  };

  const toggleReplies = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setReplyDrawer(open);
  };

  return (
    <Box
      sx={{
        borderTop: "0.5px solid",
        borderColor: color.light_grey,
        height: "57px",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);

          if (newValue === 2) {
            toggleComment(true)();
          }
        }}
        sx={{
          width: "100%",
          "& .Mui-selected": {
            color: "#000 !important",
          },
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={
            value === 0 ? (
              <HomeFilledIcon sx={{ fontSize: "30px", height: "30px" }} />
            ) : (
              <HomeOutlinedIcon sx={{ fontSize: "30px", height: "30px" }} />
            )
          }
        />
        <BottomNavigationAction
          label="Arena"
          icon={
            value === 1 ? (
              <Groups2RoundedIcon sx={{ fontSize: "30px", height: "30px" }} />
            ) : (
              <Groups2OutlinedIcon sx={{ fontSize: "30px", height: "30px" }} />
            )
          }
        />
        <BottomNavigationAction
          label="Comment"
          icon={
            value === 2 ? (
              <SmsRoundedIcon sx={{ fontSize: "30px", height: "30px" }} />
            ) : (
              <SmsOutlinedIcon sx={{ fontSize: "30px", height: "30px" }} />
            )
          }
        />
        <BottomNavigationAction
          label="Bookmark"
          icon={
            value === 3 ? (
              <BookmarkIcon sx={{ fontSize: "30px", height: "30px" }} />
            ) : (
              <BookmarkBorderOutlinedIcon
                sx={{ fontSize: "30px", height: "30px" }}
              />
            )
          }
        />
        <BottomNavigationAction
          label="Share"
          icon={
            value === 4 ? (
              <ShareIcon sx={{ fontSize: "30px", height: "30px" }} />
            ) : (
              <ShareOutlinedIcon sx={{ fontSize: "30px", height: "30px" }} />
            )
          }
        />
      </BottomNavigation>

      {/*  Comment */}
      <BottomBar_comment
        open={openCommentDrawer}
        handleClose={() => {
          setValue(0);
          setCommentDrawer(false);
        }}
        handleOpen={() => toggleComment(true)()}
        handleOpenReplies={(detailReplies) => {
          toggleReplies(true)();
          setReplyDetails(detailReplies);
        }}
      />

      <BottomBar_replies
        open={openReplyDrawer}
        replyDetails={replyDetails}
        handleClose={() => {
          setValue(0);
          toggleReplies(false)();
          setReplyDetails(null);
        }}
      />
    </Box>
  );
}

export default Bottombar;
