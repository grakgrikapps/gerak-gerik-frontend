"use client";
import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CommentRepliesList from "@/components/shared/commentList/commentRepliesList";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import SentimentSatisfiedAltRoundedIcon from "@mui/icons-material/SentimentSatisfiedAltRounded";
import { color } from "@/lib/mui/theme";
import http from "@/lib/axios/http";

function BottomBar_replies(props) {
  const [newComment, setNewComment] = React.useState("");
  const [isSending, setIsSending] = React.useState(false);

  const [replyDetails, setReplyDetails] = React.useState(
    props.replyDetails || null
  );

  React.useEffect(() => {
    setReplyDetails(props.replyDetails);
  }, [props.replyDetails]);

  const handleComment = async () => {
    const trimmed = newComment.trim();
    if (!trimmed || isSending) return;

    setIsSending(true);
    setNewComment("");

    try {
      await http.post("/comments", {
        post_id: replyDetails?.post_id,
        comment_parent: replyDetails?.id,
        comment: trimmed,
      });

      const request = await http.get(`/comments/${replyDetails?.id}`);
      setReplyDetails(request?.data);

      // Optional: replace temp comment with actual from server if ID is important
    } catch (err) {
      console.error("Gagal kirim komentar:", err);
      // Rollback optimistic update jika mau
    } finally {
      setIsSending(false);
    }
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={props?.open}
      onClose={() => {
        props.handleClose();
      }}
      onOpen={() => {}}
      sx={{
        "& .MuiPaper-root": {
          margin: "auto",
          backgroundColor: "#fff",
          borderRadius: "20px 20px 0px 0px",
          maxWidth: "500px",
        },
      }}
    >
      <Box
        p="10px"
        display="flex"
        alignItems="center"
        gap="12px"
        sx={{
          borderBottom: "0.5px solid",
          borderColor: color.light_grey,
        }}
      >
        <IconButton size="small" onClick={() => props.handleClose()}>
          <ArrowBackRoundedIcon />
        </IconButton>
        <Typography variant="h5" textAlign="center">
          Balasan
        </Typography>
      </Box>

      <Box display="flex" width="100%" gap={1} padding="10px">
        <Box
          sx={{
            maxHeight: "50dvh",
            overflowY: "auto",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <CommentRepliesList
            id={replyDetails?.id}
            profile={replyDetails?.profile}
            comment={replyDetails?.comment}
            createdAt={replyDetails?.createdAt}
            upvotes={replyDetails?.upvote}
            downvotes={replyDetails?.downvote}
            post_id={replyDetails?.post_id}
            replies={replyDetails?.replies}
          />
        </Box>
      </Box>

      <Box
        p="10px"
        display="flex"
        alignItems="center"
        gap="10px"
        sx={{
          borderTop: "0.5px solid",
          borderColor: color.light_grey,
        }}
      >
        <TextField
          id="outlined-basic"
          placeholder="Tambahkan komentar..."
          variant="outlined"
          size="small"
          multiline
          fullWidth
          sx={{ "& fieldset": { borderRadius: "10px !important" } }}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small">
                    <SentimentSatisfiedAltRoundedIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <IconButton
          size="small"
          onClick={handleComment}
          disabled={isSending || !newComment.trim()}
        >
          <SendRoundedIcon sx={{ fontSize: "30px", height: "30px" }} />
        </IconButton>
      </Box>
    </SwipeableDrawer>
  );
}

export default BottomBar_replies;
