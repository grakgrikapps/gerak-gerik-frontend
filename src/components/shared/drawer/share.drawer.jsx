import React from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

function Share_drawer(props) {
  return (
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
          minHeight: "190px",
          "&::-webkit-scrollbar": { display: "none" },
        },
      }}
    >
      <Box p="10px">
        <Box display="flex" justifyContent="center" mb="5px">
          <Box
            width="40px"
            height="4px"
            borderRadius="20px"
            bgcolor="#EFF2F3"
          />
        </Box>
        <Typography variant="h6" textAlign="center" fontSize="14px">
          Share to
        </Typography>
      </Box>

      <Box p="20px">
        <Grid container>
          {[
            {
              name: "WhatsApp",
              icon: <img src="/whatsapp.png" width="50px" />,
            },
            {
              name: "Instagram",
              icon: <img src="/instagram.png" width="50px" />,
            },
          ].map((item) => (
            <Grid size={2.5} key={item.name}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <IconButton>{item.icon}</IconButton>
                <Typography color="#4E4F57">{item?.name}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </SwipeableDrawer>
  );
}

export default Share_drawer;
