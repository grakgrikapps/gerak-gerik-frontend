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
import Uppy from "@uppy/core";
// For now, if you do not want to install UI components you
// are not using import from lib directly.
import Dashboard from "@uppy/react/lib/Dashboard";
// import DashboardStore from "@uppy/dashboard";
import Tus from "@uppy/tus";
import XHR from "@uppy/xhr-upload";
import MuxUploader from "@mux/mux-uploader-react";
import MuxPlayer from "@mux/mux-player-react";
// import axios from "axios";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";

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

function Post_create_pages({ uploadUrl, id }) {
  const [arenaList, setArenaList] = React.useState([]);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [normalizedUrl, setNormalizedUrl] = React.useState("");
  const [videoId, setVideoId] = React.useState(null);
  const [selectedVideo, setSelectedVideo] = React.useState(null);

  const [uppy, setUppy] = React.useState(null);

  React.useEffect(() => {
    const instance = new Uppy({
      autoProceed: false,
      restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes: ["video/*"],
      },
    }).use(XHR, {
      endpoint: uploadUrl,
      method: "PUT",
      headers: {
        "Content-Type": "video/mp4", // atau file.type biar dinamis
      },
      formData: false,
      getResponseData: (xhr) => {
        // Karena Mux direct upload gak return body, kita bikin dummy
        return { status: xhr.status, uploadURL: xhr.responseURL };
      },
      getResponseError: (xhr) => {
        if (xhr.status >= 200 && xhr.status < 300) {
          return null; // artinya sukses
        }
        return new Error("Upload failed");
      },
    });

    instance.on("upload-success", (file, response) => {
      http
        .get(`/videos/mux/${id}`)
        .then((response) => setSelectedVideo(response.data));

      console.log("✅ Upload success:", file);
      console.log("📌 Mux Upload URL:", response?.uploadURL);
    });

    instance.on("error", (err) => {
      console.error("❌ Upload error:", err);
    });

    setUppy(instance);

    return () => {
      instance.close();
    };
  }, []);

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
        const request = await http.post("/posts", {
          ...values,
          description: values.caption,
        });
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
        <Typography align="center" color="#687684" fontWeight={400} sx={{mb: '20px'}}>
          Found something interesting, funny, or inspiring? Just paste the link
          below, we’ll embed it beautifully for you. No need to download or
          reupload.
        </Typography>

        {uppy && !selectedVideo && (
          <Dashboard
            theme="light"
            uppy={uppy}
            proudlyDisplayPoweredByUppy={false}
            // note="Pilih file video kamu untuk upload"
            height={200}
          />
        )}

        {selectedVideo && (
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingTop: "56.25%", // 16:9 ratio (9/16 = 0.5625)
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <MuxPlayer
              playbackId={selectedVideo?.asset?.id}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover", // biar tetap ter-crop rapi
              }}
            />
          </div>
        )}

        <Box mt="20px" mb="20px">
          <Typography fontSize="12px" fontWeight={500} mb="10px">
            Youtube Link
          </Typography>
          <TextField
            fullWidth
            size="small"
            name="url"
            placeholder="https://www.youtube.com/embed/zJWwZRhyzns"
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
              minHeight: "300px",
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
