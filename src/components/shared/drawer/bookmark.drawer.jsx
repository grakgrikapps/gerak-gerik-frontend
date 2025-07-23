import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import CheckCircleIcon from "@/components/shared/icons/check-circle";

function Bookmark_drawer(props) {
  return (
    <>
      <SwipeableDrawer
        anchor={"bottom"}
        open={props?.open}
        onClose={() => {
          props.handleClose();
        }}
        onOpen={() => props.handleOpen()}
        sx={{
          "& .MuiPaper-root": {
            margin: "auto",
            backgroundColor: "#fff",
            borderRadius: "20px 20px 0px 0px",
            maxWidth: "500px",
            minHeight: "200px",
            padding: "20px",
            "&::-webkit-scrollbar": { display: "none" },
          },
        }}
      >
        <Box display="flex" justifyContent="center" mb="10px">
          <CheckCircleIcon color="#0088FF" />
        </Box>
        <Typography
          align="center"
          variant="h4"
          fontSize="16px"
          color="#0088FF"
          sx={{ mb: "10px" }}
        >
          Bookmark Success!
        </Typography>
        <Typography align="center" fontSize="14px">
          You’ve successfully saved this content. <br /> You can view all your
          bookmarks anytime from <br />
          the Bookmarks section in your profile.
        </Typography>
      </SwipeableDrawer>
    </>
  );
}

export default Bookmark_drawer;
