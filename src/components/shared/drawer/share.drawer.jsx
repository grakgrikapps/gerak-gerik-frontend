import React from "react";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import LinkIcon from "@/components/shared/icons/link";
import { useSelector } from "react-redux";

function Share_drawer(props) {
  const post = useSelector((state) => state.posts);
  const currentUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/home?slug=${post?.current?.slug}`
      : "";

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleShare = (platform) => {
    let url = "";
    const encodedUrl = encodeURIComponent(currentUrl);

    switch (platform) {
      case "whatsapp":
        url = `https://wa.me/?text=${encodedUrl}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?url=${encodedUrl}`;
        break;
      case "instagram":
        url = `https://www.instagram.com/`; // Tidak bisa share langsung via URL
        break;
      default:
        return;
    }

    window.open(url, "_blank");
  };

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
          <Grid container justifyContent="space-evenly">
            {[
              {
                name: "Copy Link",
                icon: (
                  <Box
                    height="50px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bgcolor="#E8E8E7"
                    width="50px"
                    borderRadius="100%"
                  >
                    <LinkIcon />
                  </Box>
                ),
                onclick: handleCopyLink,
              },
              {
                name: "Whatsapp",
                icon: <img src="/whatsapp.png" width="50px" />,
                onclick: () => handleShare("whatsapp"),
              },
              {
                name: "Facebook",
                icon: <img src="/facebook.webp" width="50px" />,
                onclick: () => handleShare("facebook"),
              },
              {
                name: "Twitter",
                icon: <img src="/twitter.png" width="50px" />,
                onclick: () => handleShare("twitter"),
              },
            ].map((item) => (
              <Grid size={2} key={item.name}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IconButton onClick={item.onclick}>{item.icon}</IconButton>
                  <Typography color="#4E4F57">{item?.name}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </SwipeableDrawer>

      {/* Snackbar for Copy Link */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Link copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
}

export default Share_drawer;
