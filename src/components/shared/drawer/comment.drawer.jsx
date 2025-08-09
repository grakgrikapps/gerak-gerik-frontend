import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import {
  setComment,
  setCommentReplies,
  clearCommentReplies,
  setPauseVideo,
} from "@/lib/rtk/features/posts/postSlice";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Skeleton,
  Grid,
} from "@mui/material";
import { useFormik } from "formik";
import http from "@/lib/axios/http";
import SendIcon from "@/components/shared/icons/send";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Comment_list from "../list/comment/comment.list";
import * as yup from "yup";

const validationSchema = yup.object({
  comment: yup
    .string("Please enter comment")
    .min(1)
    .required("Please enter comment"),
});

function Comment_drawer(props) {
  const dispatch = useDispatch();
  const commentInput = useRef();
  const auth = useSelector((state) => state.auth);
  const posts = useSelector((state) => state.posts);

  const [selectedReplies, setSelectedReplies] = React.useState(null);
  const [isSending, setIsSending] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false); // ⬅️ loading state

  const postId = posts?.current?.id;

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const trimmed = values.comment.trim();
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
        comment_parent: selectedReplies?.id ?? null,
      };

      try {
        const request = await http.post("/comments", {
          post_id: postId,
          comment: trimmed,
          comment_parent: selectedReplies?.id ?? null,
        });

        // checking type replies or not
        if (!selectedReplies?.id) {
          dispatch(
            setComment([
              { ...tempComment, id: request?.data?.id },
              ...posts?.comments,
            ])
          );
        } else {
          dispatch(
            setCommentReplies({
              id: selectedReplies?.id,
              replies: [
                ...posts?.replies?.[selectedReplies?.id],
                { ...tempComment, id: request?.data?.id },
              ],
            })
          );

          // increment total comment
          dispatch(
            setComment(
              posts?.comments?.map((item) => {
                if (item.id === selectedReplies?.id) {
                  return {
                    ...item,
                    replies: [...item.replies, { id: request?.data?.id }],
                  };
                } else {
                  return item;
                }
              })
            )
          );
        }

        formik.handleReset();

        // Optional: replace temp comment with actual from server if ID is important
      } catch (err) {
        console.error("Gagal kirim komentar:", err);
        // Rollback optimistic update jika mau

        dispatch(
          setComment(posts?.comments.filter((c) => c.id !== tempComment.id))
        );
      } finally {
        setIsSending(false);
        setSelectedReplies(null);
      }
    },
  });

  React.useEffect(() => {
    if (props.open) {
      dispatch(setPauseVideo(true));
      setIsLoading(true); // mulai loading
      http
        .get(`/comments?post_id=${postId}`)
        .then((res) => {
          dispatch(setComment(res?.data ?? []));
          dispatch(clearCommentReplies());
        })
        .catch((err) => {
          console.error("Gagal fetch komentar:", err);
        })
        .finally(() => {
          setIsLoading(false); // selesai loading
        });
    } else {
      setTimeout(() => {
        dispatch(setComment([]));
        dispatch(clearCommentReplies());
      }, 200);
    }
  }, [props?.open]);

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
            {isLoading ? (
              // ⬅️ SKELETON LOADING
              [...Array(3)].map((_, i) => (
                <Box
                  key={i}
                  display="flex"
                  flexDirection="column"
                  gap={1}
                  py={2}
                >
                  <Grid container justifyContent="space-between">
                    <Grid size={1}>
                      <Skeleton variant="circular" width={40} height={40} />
                    </Grid>
                    <Grid size={{ xs: 10.3, sm: 10.7 }}>
                      <Skeleton
                        variant="rectangular"
                        height={20}
                        width="80%"
                        sx={{ mb: 1 }}
                      />
                      <Skeleton variant="rectangular" height={15} width="60%" />
                    </Grid>
                  </Grid>
                </Box>
              ))
            ) : posts?.comments.length === 0 ? (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                py={6}
                sx={{ opacity: 0.6 }}
              >
                <Typography variant="h4" fontWeight={500}>
                  No comments yet
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Be the first to start the discussion.
                </Typography>
              </Box>
            ) : (
              posts?.comments?.map((item, key) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, type: "spring" }}
                >
                  <Comment_list
                    {...item}
                    handleReplies={() => {
                      formik.setFieldValue(
                        "comment",
                        `@${item?.profile?.username} `
                      );
                      setSelectedReplies(item);
                      commentInput.current.focus();
                    }}
                  />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </Box>

        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          px="15px"
          py="10px"
          display="flex"
          alignItems="center"
          gap="10px"
        >
          <TextField
            id="comment"
            name="comment"
            inputRef={commentInput}
            placeholder="Add Comment"
            variant="outlined"
            size="small"
            multiline
            fullWidth
            sx={{ "& fieldset": { borderRadius: "10px !important" } }}
            value={formik.values.comment}
            onChange={(e) => {
              if (e.target.value?.length === 0) {
                setSelectedReplies(null);
              }

              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.comment && Boolean(formik.errors.comment)}
          />

          <IconButton
            type="submit"
            disabled={isSending || !formik.values.comment.trim()}
          >
            <SendIcon
              color={
                isSending || !formik.values.comment.trim()
                  ? "lightgray"
                  : "#1C1C1C"
              }
            />
          </IconButton>
        </Box>
      </SwipeableDrawer>
    </>
  );
}

export default Comment_drawer;
