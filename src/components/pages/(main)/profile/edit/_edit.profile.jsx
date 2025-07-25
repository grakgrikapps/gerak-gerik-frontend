import React from "react";
import Link from "next/link";
import {
  Container,
  Box,
  Typography,
  Button,
  Avatar,
  Grid,
  TextField,
} from "@mui/material";

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
          <Link href="/profile">
            <Button color="inherit" sx={{ textTransform: "capitalize" }}>
              Cancel
            </Button>
          </Link>

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

      <Box display="flex" justifyContent="center" mt="20px" mb="50px">
        <Avatar sx={{ width: "95px", height: "95px" }} />
      </Box>

      <Box
        borderTop="1px solid #3C3C434A"
        borderBottom="1px solid #3C3C434A"
        py="20px"
      >
        <Container>
          <Grid container spacing={2} alignItems="center" mb={2}>
            <Grid size={2.5}>
              <Typography fontSize="15px">Name</Typography>
            </Grid>
            <Grid size={9.5}>
              <TextField variant="standard" fullWidth />
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems="center" mb={2}>
            <Grid size={2.5}>
              <Typography fontSize="15px">Username</Typography>
            </Grid>
            <Grid size={9.5}>
              <TextField variant="standard" fullWidth />
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems="center" mb={2}>
            <Grid size={2.5}>
              <Typography fontSize="15px">Website</Typography>
            </Grid>
            <Grid size={9.5}>
              <TextField variant="standard" fullWidth />
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems="center" mb={2}>
            <Grid size={2.5}>
              <Typography fontSize="15px">Bio</Typography>
            </Grid>
            <Grid size={9.5}>
              <TextField variant="standard" multiline fullWidth />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Private Information */}
      <Container>
        <Typography fontSize="15px" my="20px">
          Private Information
        </Typography>
        <Grid container spacing={2} alignItems="center" mb={2}>
          <Grid size={2.5}>
            <Typography fontSize="15px">Email</Typography>
          </Grid>
          <Grid size={9.5}>
            <TextField variant="standard" fullWidth />
          </Grid>
        </Grid>

        <Grid container spacing={2} alignItems="center" mb={2}>
          <Grid size={2.5}>
            <Typography fontSize="15px">Phone</Typography>
          </Grid>
          <Grid size={9.5}>
            <TextField variant="standard" fullWidth />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Edit_Profile_Page;
