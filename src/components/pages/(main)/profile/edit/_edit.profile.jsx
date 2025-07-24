import React from "react";
import Link from "next/link";
import { Container, Box, IconButton, Typography, Button } from "@mui/material";

function Edit_Profile_Page() {
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="60px"
      >
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <Button color="inherit" sx={{ textTransform: "capitalize" }}>
            Cancel
          </Button>

          <Typography variant="h4">Arena</Typography>

          <Button
            sx={{
              textTransform: "capitalize",
              color: "#3897F0",
              fontWeight: 600,
            }}
          >
            Done
          </Button>
        </Container>
      </Box>
    </>
  );
}

export default Edit_Profile_Page;
