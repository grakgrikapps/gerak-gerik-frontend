"use client";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import ReactPlayer from "react-player";
import React from "react";
import ArrowLeft from "@/components/shared/icons/arrow-left";
import Link from "next/link";
import http from "@/lib/axios/http";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  url: yup
    .string()
    .url("Please enter a valid YouTube URL")
    .required("URL is required"),
  arena_id: yup.string().required("Arena is required"),
  caption: yup.string().max(300, "Maximum 300 characters allowed"),
});

function normalizeYouTubeUrl(url) {
  if (!url) return "";
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regex);
  return match ? `https://www.youtube.com/watch?v=${match[1]}` : url;
}

function getYoutubeVideoId(url) {
  if (!url) return null;
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function Post_create_pages() {
  const [arenaList, setArenaList] = React.useState([]);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [normalizedUrl, setNormalizedUrl] = React.useState("");
  const [videoId, setVideoId] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      url: "",
      arena_id: null,
      caption: "",
      title: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const request = await http.post("/posts", values);
        await http.post("/videos", {
          post_id: request?.data?.id,
          title: "",
          url: values.url,
          thumbnail: "",
          duration: "0",
        });

        setSnackbarMessage("Post uploaded successfully!");
        setOpenSnackbar(true);

        resetForm();
        // Redirect or show success message
      } catch (err) {
        setSnackbarMessage("Failed to upload post. Please try again.");
        setOpenSnackbar(true);

        console.error(err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  React.useEffect(() => {
    http.get("/arena").then((response) => setArenaList(response.data));
  }, []);

  React.useEffect(() => {
    const id = getYoutubeVideoId(formik.values.url);
    setNormalizedUrl(normalizeYouTubeUrl(formik.values.url));
    setVideoId(id);
  }, [formik.values.url]);

  return (
    <Container sx={{ mb: "50px" }}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={
            snackbarMessage.includes("successfully") ? "success" : "error"
          }
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Link href="/home">
        <IconButton>
          <ArrowLeft color="#101418" />
        </IconButton>
      </Link>
      <form onSubmit={formik.handleSubmit}>
        <Typography align="center" variant="h4" sx={{ mb: "15px", mt: "30px" }}>
          Share your favorite YouTube content with
          <br /> the community.
        </Typography>
        <Typography align="center" color="#687684" fontWeight={400}>
          Found something interesting, funny, or inspiring? Just paste the link
          below, we’ll embed it beautifully for you. No need to download or
          reupload.
        </Typography>
        <Box mt="30px" mb="20px">
          <Typography fontSize="12px" fontWeight={500} mb="10px">
            Youtube Link
          </Typography>
          <TextField
            fullWidth
            size="small"
            name="url"
            placeholder="https://www.youtube.com/watch?v=LXb3EKWsInQ"
            value={formik.values.url}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.url && Boolean(formik.errors.url)}
            helperText={formik.touched.url && formik.errors.url}
          />
        </Box>

        {normalizedUrl && ReactPlayer.canPlay(normalizedUrl) && (
          <ReactPlayer
            key={normalizedUrl}
            width="100%"
            height="300px"
            style={{
              borderRadius: "8px",
              overflow: "hidden",
              marginBottom: "15px",
              height: "300px",
              minHeight: '300px'
            }}
            src={normalizedUrl}
            muted
            controls
          />
        )}

        <Typography fontSize="12px" fontWeight={500} mb="10px">
          Caption
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          name="caption"
          value={formik.values.caption}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.caption && Boolean(formik.errors.caption)}
          helperText={formik.touched.caption && formik.errors.caption}
          sx={{ mb: "15px" }}
        />

        <Typography fontSize="12px" fontWeight={500} mb="10px">
          Arena
        </Typography>
        <Box mb="15px">
          <Select
            size="small"
            sx={{ borderRadius: "8px", minHeight: "40px" }}
            fullWidth
            name="arena_id"
            value={formik.values.arena_id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.arena_id && Boolean(formik.errors.arena_id)}
            displayEmpty
          >
            <MenuItem value={null} selected hidden disabled>
              Select Arena
            </MenuItem>
            {React.Children.toArray(
              arenaList?.map((item) => (
                <MenuItem value={item?.id}>{item?.name}</MenuItem>
              ))
            )}
          </Select>
        </Box>

        <Button
          variant="contained"
          color="inherit"
          size="large"
          type="submit"
          disabled={formik.isSubmitting}
          fullWidth
        >
          Upload
        </Button>
      </form>
    </Container>
  );
}

export default Post_create_pages;
