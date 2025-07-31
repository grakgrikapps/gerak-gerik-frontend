import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import http from "@/lib/axios/http";
import { setCommentReplies } from "@/lib/rtk/features/posts/postSlice";
import moment from "moment";
import React from "react";

// icon
import ThumbUpIcon from "@/components/shared/icons/hand-thumb-up";
import ThumbUpOutlineIcon from "@/components/shared/icons/hand-thumb-up-outline";
import ThumbDownIcon from "@/components/shared/icons/hand-thumb-down";
import ThumbDownOutlineIcon from "@/components/shared/icons/hand-thumb-down-outline";
import ChatBubleIcon from "@/components/shared/icons/chat-buble";
import Link from "next/link";

function formatCommentText(text) {
  const regex = /@(\w+)/g;
  const formatted = text.replace(regex, (match) => `<strong>${match}</strong>`);
  return formatted;
}

function Comment_list(props) {
  const dispatch = useDispatch();

  const [expanded, setExpanded] = React.useState(false);
  const [upvotes, setUpvotes] = React.useState(props?.upvote || []);
  const [downvotes, setDownvotes] = React.useState(props?.downvote || []);
  const [isVoting, setIsVoting] = React.useState(false);
  const [loadingReply, setLoadingReply] = React.useState(false);

  const auth = useSelector((state) => state.auth);
  const replies = useSelector((state) => state.posts.replies?.[props?.id]);

  const maxLength = 150;
  const userId = auth?.profile?.id;

  const commentText = props?.comment || "";
  const isLongComment = commentText.length > maxLength;
  const shownText = expanded ? commentText : commentText.slice(0, maxLength);

  const handleVote = async (type) => {
    if (isVoting) return;

    setIsVoting(true);

    const isUpvote = type === "up";
    const voteList = isUpvote ? upvotes : downvotes;
    const setVoteList = isUpvote ? setUpvotes : setDownvotes;
    const oppositeList = isUpvote ? downvotes : upvotes;
    const setOppositeList = isUpvote ? setDownvotes : setUpvotes;

    const url = isUpvote
      ? `/comments/upvote/${props?.id}`
      : `/comments/downvote/${props?.id}`;

    const alreadyVoted = voteList.includes(userId);
    const updatedVotes = alreadyVoted
      ? voteList.filter((id) => id !== userId) // unvote
      : [...voteList, userId]; // vote

    const updatedOppositeVotes = oppositeList.includes(userId)
      ? oppositeList.filter((id) => id !== userId)
      : oppositeList;

    // Simpan original untuk rollback jika gagal
    const originalVotes = [...voteList];
    const originalOpposite = [...oppositeList];

    // Optimistic update
    setVoteList(updatedVotes);
    setOppositeList(updatedOppositeVotes);

    try {
      await http.get(url);
    } catch (err) {
      // Rollback
      setVoteList(originalVotes);
      setOppositeList(originalOpposite);
      console.error("Vote gagal:", err);
    } finally {
      setIsVoting(false);
    }
  };

  const handleGetReplies = async () => {
    try {
      setLoadingReply(true);
      const request = await http.get(`/comments/${props?.id}`);

      dispatch(
        setCommentReplies({ id: props?.id, replies: request?.data?.replies })
      );

      props.handleReplies(props?.id);
    } catch (error) {
      console.error("View failed:", error);
    } finally {
      setLoadingReply(false);
    }
  };

  return (
    <Grid container justifyContent="space-between" mb="10px">
      <Grid>
        <Link href={`/profile/${props?.profile?.username}`}>
          <Avatar
            sizes="small"
            alt={props?.profile?.fullname}
            src={props?.profile?.photo}
          />
        </Link>
      </Grid>
      <Grid size={10.7}>
        {/* Comment Head */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb="4px"
        >
          <Typography variant="body2" color="#959595">
            @{props?.profile?.username}
          </Typography>
          <Typography variant="body2" fontSize="10px" color="#959595">
            {moment(props?.createdAt).fromNow()}
          </Typography>
        </Box>

        {/* Comment Body */}
        <Typography
          whiteSpace="pre-line"
          color="#545454"
          dangerouslySetInnerHTML={{
            __html: formatCommentText(
              shownText + (!expanded && isLongComment ? "..." : "")
            ),
          }}
        ></Typography>

        {isLongComment && (
          <Button
            onClick={() => setExpanded(!expanded)}
            size="small"
            color="inherit"
            sx={{
              minWidth: "fit-content",
              height: "0px",
              padding: "0px",
              textTransform: "inherit",
              my: 1,
            }}
          >
            {expanded ? "Lebih sedikit" : "Tampilkan lebih banyak"}
          </Button>
        )}

        {/* Comment Footer */}
        <Box display="flex" gap="10px">
          {/* UPVOTE */}
          <Box display="flex" alignItems="center" gap="2px">
            <motion.div
              whileTap={{ scale: 1.3 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              style={{ border: "none", background: "none", padding: 0 }}
            >
              <IconButton
                size="small"
                disabled={isVoting}
                onClick={() => handleVote("up")}
              >
                {upvotes?.includes(userId) ? (
                  <ThumbUpIcon />
                ) : (
                  <ThumbUpOutlineIcon />
                )}
              </IconButton>
            </motion.div>

            {upvotes?.length > 0 && (
              <>
                {isVoting ? (
                  <CircularProgress size="12px" color="inherit" />
                ) : (
                  <Typography fontSize="12px">{upvotes?.length}</Typography>
                )}
              </>
            )}
          </Box>

          {/* DOWNVOTE */}
          <Box display="flex" alignItems="center" gap="2px">
            <motion.div
              whileTap={{ scale: 1.3 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              style={{ border: "none", background: "none", padding: 0 }}
            >
              <IconButton
                size="small"
                disabled={isVoting}
                onClick={() => handleVote("down")}
              >
                {downvotes?.includes(userId) ? (
                  <ThumbDownIcon />
                ) : (
                  <ThumbDownOutlineIcon />
                )}
              </IconButton>
            </motion.div>

            {downvotes?.length > 0 && (
              <>
                {isVoting ? (
                  <CircularProgress size="12px" color="inherit" />
                ) : (
                  <Typography fontSize="12px">{downvotes?.length}</Typography>
                )}
              </>
            )}
          </Box>

          {/* REPLY */}
          <Box display="flex" alignItems="center" gap="2px">
            <motion.div
              whileTap={{ scale: 1.3 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              style={{ border: "none", background: "none", padding: 0 }}
            >
              <IconButton
                size="small"
                disabled={loadingReply}
                onClick={() => handleGetReplies()}
              >
                <ChatBubleIcon />
              </IconButton>
            </motion.div>

            {props?.replies?.length > 0 && (
              <>
                {loadingReply ? (
                  <CircularProgress size="12px" color="inherit" />
                ) : (
                  <Typography fontSize="12px">
                    {props?.replies?.length}
                  </Typography>
                )}
              </>
            )}
          </Box>
        </Box>

        {/* Child replies */}
        {replies?.length > 0 && (
          <Box pt={1}>
            {replies?.map((item, key) => (
              <Comment_child key={key} item={item} />
            ))}
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

export function Comment_child({ item }) {
  const [expanded, setExpanded] = React.useState(false);
  const [upvotes, setUpvotes] = React.useState(item?.upvote || []);
  const [downvotes, setDownvotes] = React.useState(item?.downvote || []);
  const [isVoting, setIsVoting] = React.useState(false);

  const maxLength = 150;

  const auth = useSelector((state) => state.auth);

  const userId = auth?.profile?.id;

  const commentText = item?.comment || "";
  const isLongComment = commentText.length > maxLength;
  const shownText = expanded ? commentText : commentText.slice(0, maxLength);

  const handleVote = async (type) => {
    if (isVoting || !userId) return;

    setIsVoting(true);

    const isUpvote = type === "up";
    const voteList = isUpvote ? upvotes : downvotes;
    const setVoteList = isUpvote ? setUpvotes : setDownvotes;
    const oppositeList = isUpvote ? downvotes : upvotes;
    const setOppositeList = isUpvote ? setDownvotes : setUpvotes;

    const url = isUpvote
      ? `/comments/upvote/${item?.id}`
      : `/comments/downvote/${item?.id}`;

    const alreadyVoted = voteList.includes(userId);
    const updatedVotes = alreadyVoted
      ? voteList.filter((id) => id !== userId)
      : [...voteList, userId];

    const updatedOppositeVotes = oppositeList.includes(userId)
      ? oppositeList.filter((id) => id !== userId)
      : oppositeList;

    const originalVotes = [...voteList];
    const originalOpposite = [...oppositeList];

    // Optimistic update
    setVoteList(updatedVotes);
    setOppositeList(updatedOppositeVotes);

    try {
      await http.get(url);
    } catch (err) {
      // Rollback
      setVoteList(originalVotes);
      setOppositeList(originalOpposite);
      console.error("Vote failed:", err);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <Grid container justifyContent="space-between" mt={1} mb={1}>
      <Grid>
        <Avatar
          sizes="small"
          sx={{ width: "30px", height: "30px" }}
          alt={item?.profile?.fullname}
          src={item?.profile?.photo}
        />
      </Grid>
      <Grid size={10.9}>
        {/* Comment Head */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb="4px"
        >
          <Typography variant="body2" color="#959595">
            @{item?.profile?.username}
          </Typography>
          <Typography variant="body2" fontSize="10px" color="#959595">
            {moment(item?.createdAt).fromNow()}
          </Typography>
        </Box>

        {/* Comment Body */}
        <Typography
          whiteSpace="pre-line"
          color="#545454"
          dangerouslySetInnerHTML={{
            __html: formatCommentText(
              shownText + (!expanded && isLongComment ? "..." : "")
            ),
          }}
        ></Typography>

        {isLongComment && (
          <Button
            onClick={() => setExpanded(!expanded)}
            size="small"
            color="inherit"
            sx={{
              minWidth: "fit-content",
              height: "0px",
              padding: "0px",
              textTransform: "inherit",
              my: 1,
            }}
          >
            {expanded ? "Lebih sedikit" : "Tampilkan lebih banyak"}
          </Button>
        )}

        {/* Comment Footer */}
        <Box display="flex" gap="10px">
          {/* UPVOTE */}
          <Box display="flex" alignItems="center" gap="2px">
            <motion.div
              whileTap={{ scale: 1.3 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              style={{ border: "none", background: "none", padding: 0 }}
            >
              <IconButton
                size="small"
                disabled={isVoting}
                onClick={() => handleVote("up")}
              >
                {upvotes?.includes(userId) ? (
                  <ThumbUpIcon />
                ) : (
                  <ThumbUpOutlineIcon />
                )}
              </IconButton>
            </motion.div>

            {upvotes?.length > 0 && (
              <>
                {isVoting ? (
                  <CircularProgress size="12px" color="inherit" />
                ) : (
                  <Typography fontSize="12px">{upvotes?.length}</Typography>
                )}
              </>
            )}
          </Box>

          {/* DOWNVOTE */}
          <Box display="flex" alignItems="center" gap="2px">
            <motion.div
              whileTap={{ scale: 1.3 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              style={{ border: "none", background: "none", padding: 0 }}
            >
              <IconButton
                size="small"
                disabled={isVoting}
                onClick={() => handleVote("down")}
              >
                {downvotes?.includes(userId) ? (
                  <ThumbDownIcon />
                ) : (
                  <ThumbDownOutlineIcon />
                )}
              </IconButton>
            </motion.div>

            {downvotes?.length > 0 && (
              <>
                {isVoting ? (
                  <CircularProgress size="12px" color="inherit" />
                ) : (
                  <Typography fontSize="12px">{downvotes?.length}</Typography>
                )}
              </>
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Comment_list;
