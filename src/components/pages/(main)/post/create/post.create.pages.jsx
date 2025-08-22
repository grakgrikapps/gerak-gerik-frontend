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
  Autocomplete,
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
import { useRouter } from "next/navigation";

const validationSchema = yup.object({
  url: yup.string().required("Video is required"),
  arena_id: yup.string().required("Arena is required"),
  caption: yup.string().max(300, "Maximum 300 characters allowed"),
});

function Post_create_pages({ uploadUrl, id }) {
  const router = useRouter();
  const [arenaList, setArenaList] = React.useState([]);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [selectedVideo, setSelectedVideo] = React.useState(null);

  const [uppy, setUppy] = React.useState(null);

  React.useEffect(() => {
    const instance = new Uppy({
      autoProceed: true,
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

    instance.on("upload-success", () => {
      http.get(`/videos/mux/${id}`).then((response) => {
        setSelectedVideo(response.data);
        formik.setFieldValue("url", response.data?.asset?.id);
      });
    });

    instance.on("error", (err) => {
      console.error("❌ Upload error:", err);
    });

    setUppy(instance);

    return () => {
      if (instance && instance.close()) instance?.close();
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
          url: selectedVideo?.asset?.id,
          thumbnail: "",
          duration: "0",
        });

        setSnackbarMessage("Post uploaded successfully!");
        setOpenSnackbar(true);

        resetForm();
        // Redirect or show success message

        router.push(`/posts/${request?.data?.slug}`);
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

  console.log(formik);

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
        <Typography
          align="center"
          color="#687684"
          fontWeight={400}
          sx={{ mb: "20px" }}
        >
          Found something interesting, funny, or inspiring? Just paste the link
          below, we’ll embed it beautifully for you. No need to download or
          reupload.
        </Typography>

        <Box mb="20px">
          {uppy && !selectedVideo && (
            <Dashboard
              theme="light"
              uppy={uppy}
              proudlyDisplayPoweredByUppy={false}
              // note="Pilih file video kamu untuk upload"
              height={200}
            />
          )}

          {formik.touched.url && formik.errors.url && (
            <Typography color="error" sx={{ mt: "5px" }}>
              {formik.errors.url}
            </Typography>
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
        </Box>

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
          <Autocomplete
            disablePortal
            options={arenaList}
            getOptionLabel={(props) => props.name}
            fullWidth
            size="small"
            onChange={(e, value) => {
              formik.setFieldValue("arena_id", value ? value.id : null);
              formik.setFieldTouched("arena_id", false); // jangan langsung true
            }}
            onBlur={() => formik.setFieldTouched("arena_id", true)}
            disableClearable
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return (
                <Box
                  key={key}
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...optionProps}
                >
                  <img
                    loading="lazy"
                    width="20"
                    srcSet={
                      option?.photo
                        ? option?.photo
                        : `https://api.dicebear.com/9.x/initials/svg?seed=${option.name}`
                    }
                    src={
                      option?.photo
                        ? option?.photo
                        : `https://api.dicebear.com/9.x/initials/svg?seed=${option.name}`
                    }
                    alt=""
                  />
                  {option.name}
                </Box>
              );
            }}
            renderInput={(params) => (
              <TextField {...params} label="Select arena" />
            )}
          />

          {/* <Select
            size="small"
            sx={{ borderRadius: "8px", minHeight: "40px" }}
            fullWidth
            name="arena_id"
            value={formik.values?.arena_id ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.arena_id && formik.errors.arena_id}
            displayEmpty
          >
            <MenuItem selected hidden disabled>
              Select Arena
            </MenuItem>
            {React.Children.toArray(
              (arenaList ?? [])?.map((item) => (
                <MenuItem value={item?.id}>{item?.name}</MenuItem>
              ))
            )}
          </Select> */}

          {formik.touched.arena_id && formik.errors.arena_id && (
            <Typography color="error" sx={{ mt: "5px" }}>
              {formik.errors.arena_id}
            </Typography>
          )}
        </Box>

        {console.log(formik)}

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
