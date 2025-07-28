import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import ReactPlayer from "react-player";
import React from "react";
import ArrowLeft from "@/components/shared/icons/arrow-left";
import Link from "next/link";

function Post_create_pages() {
  return (
    <Container>
      <Link href="/home">
        <IconButton>
          <ArrowLeft color="#101418" />
        </IconButton>
      </Link>
      <Typography align="center" variant="h4" sx={{ mb: "15px", mt: "30px" }}>
        Share your favorite YouTube content with
        <br /> the community.
      </Typography>

      <Typography align="center" color="#687684" fontWeight={400}>
        Found something interesting, funny, or inspiring? Just paste the link
        below, we’ll embed it beautifully for you. No need to download or
        reupload.
      </Typography>

      <Box display="flex" mt="30px" mb="20px">
        <TextField
          fullWidth
          size="small"
          placeholder="https://www.youtube.com/watch?v=LXb3EKWsInQ"
          sx={{
            "& fieldset": {
              borderRadius: "8px 0px 0px 8px !important",
            },
          }}
        />
        <Button
          variant="contained"
          color="inherit"
          sx={{ minWidth: "150px", borderRadius: "0px 8px 8px 0px" }}
        >
          Upload Link
        </Button>
      </Box>

      <ReactPlayer
        width="100%"
        style={{
          borderRadius: "8px",
          overflow: "hidden",
          marginBottom: "15px",
        }}
        height="300px"
        src="https://www.youtube.com/watch?v=LXb3EKWsInQ"
      />

      <Typography fontSize="12px" fontWeight={500} mb="10px">
        Arena
      </Typography>
      <Box mb="15px">
        <Select size="small" sx={{ borderRadius: "8px" }} fullWidth>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </Box>

      <Typography fontSize="12px" fontWeight={500} mb="10px">
        Caption
      </Typography>
      <TextField fullWidth multiline rows={4} sx={{ mb: "15px" }} />

      <Button variant="contained" color="inherit" size="large" fullWidth>
        Upload
      </Button>
    </Container>
  );
}

export default Post_create_pages;
