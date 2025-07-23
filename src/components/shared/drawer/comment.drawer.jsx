import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { setComment } from "@/lib/rtk/features/posts/postSlice";
import { Box, Typography, TextField, IconButton } from "@mui/material";

import http from "@/lib/axios/http";
import SendIcon from "@/components/shared/icons/send";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Comment_list from "../list/comment/comment.list";

function Comment_drawer(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const posts = useSelector((state) => state.posts);

  const [newComment, setNewComment] = React.useState("");
  const [isSending, setIsSending] = React.useState(false);

  const postId = 1;

  React.useEffect(() => {
    if (props.open) {
      http.get(`/comments?post_id=${1}`).then((res) => {
        dispatch(setComment(res?.data ?? []));
      });
    }
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
              bgcolor="#EFF2F3"
            />
          </Box>
          <Typography variant="h6" textAlign="center" fontSize="14px">
            Comment
          </Typography>
        </Box>

        <Box
          paddingX="15px"
          sx={{
            maxHeight: "70dvh",
            overflowY: "auto",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {posts?.comments?.map((item, key) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, type: "spring" }}
              >
                <Comment_list {...item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>

        <Box px="15px" py="10px" display="flex" alignItems="center" gap="10px">
          <TextField
            placeholder="Add Comment"
            variant="outlined"
            size="small"
            multiline
            fullWidth
            sx={{ "& fieldset": { borderRadius: "10px !important" } }}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />

          <IconButton
            disabled={isSending || !newComment.trim()}
            onClick={() => handleComment()}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </SwipeableDrawer>
    </>
  );
}

export default Comment_drawer;
