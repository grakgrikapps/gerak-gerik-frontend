"use client";
import { color } from "@/lib/mui/theme";
import React from "react";
import Box from "@mui/material/Box";
import http from "@/lib/axios/http";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CommentList from "@/components/shared/commentList/commentList";
import SentimentSatisfiedAltRoundedIcon from "@mui/icons-material/SentimentSatisfiedAltRounded";

import { useSelector, useDispatch } from "react-redux";
import { setComment } from "@/lib/rtk/features/posts/postSlice";

function BottomBar_comment(props) {
  const dispatch = useDispatch();

  const [newComment, setNewComment] = React.useState("");
  const [isSending, setIsSending] = React.useState(false);

  const posts = useSelector((state) => state.posts);
  const auth = useSelector((state) => state.auth.profile);

  const postId = posts?.current?.id;

  React.useEffect(() => {
    if (props?.open)
      http.get(`/comments?post_id=${postId}`).then((res) => {
        dispatch(setComment(res?.data ?? []));
      });
  }, [props?.open]);

  const handleComment = async () => {
    const trimmed = newComment.trim();
    if (!trimmed || isSending) return;

    setIsSending(true);

    // Optimistic update
    const tempComment = {
      id: Date.now(),
      comment: trimmed,
      profile: {
        username: auth?.profile?.username,
        fullname: auth?.profile?.fullname,
        photo: auth?.profile?.photo, // Sesuaikan default
      },
      createdAt: new Date().toISOString(),
      upvote: [],
      downvote: [],
      replies: [],
    };

    dispatch(setComment([tempComment, ...posts?.comments]));
    setNewComment("");

    try {
      await http.post("/comments", {
        post_id: postId,
        comment: trimmed,
      });

      // Optional: replace temp comment with actual from server if ID is important
    } catch (err) {
      console.error("Gagal kirim komentar:", err);
      // Rollback optimistic update jika mau

      dispatch(
        setComment(posts?.comments.filter((c) => c.id !== tempComment.id))
      );
    } finally {
      setIsSending(false);
    }
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
              bgcolor={color.dark_grey}
            />
          </Box>
          <Typography variant="h6" textAlign="center">
            Komentar
          </Typography>
        </Box>

        <Box
          sx={{
            maxHeight: "50dvh",
            overflowY: "auto",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {React.Children.toArray(
            posts?.comments?.map((comment) => (
              <CommentList
                key={comment?.id}
                id={comment?.id}
                profile={comment?.profile}
                comment={comment?.comment}
                createdAt={comment?.createdAt}
                upvotes={comment?.upvote}
                downvotes={comment?.downvote}
                post_id={comment?.post_id}
                replies={comment?.replies}
                handleReplies={(detailComment) => {
                  props.handleOpenReplies(detailComment);
                }}
              />
            ))
          )}
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
    </>
  );
}

export default BottomBar_comment;
