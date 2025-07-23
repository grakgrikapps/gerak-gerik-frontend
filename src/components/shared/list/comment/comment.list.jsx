import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import http from "@/lib/axios/http";
import moment from "moment";
import React from "react";

// icon
import ThumbUpIcon from "@/components/shared/icons/hand-thumb-up";
import ThumbUpOutlineIcon from "@/components/shared/icons/hand-thumb-up-outline";
import ThumbDownIcon from "@/components/shared/icons/hand-thumb-down";
import ThumbDownOutlineIcon from "@/components/shared/icons/hand-thumb-down-outline";
import ChatBubleIcon from "@/components/shared/icons/chat-buble";

function Comment_list(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [upvotes, setUpvotes] = React.useState(props?.upvote || []);
  const [downvotes, setDownvotes] = React.useState(props?.downvote || []);
  const [isVoting, setIsVoting] = React.useState(false);
  const [loadingReply, setLoadingReply] = React.useState(false);

  const auth = useSelector((state) => state.auth);

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
    } catch (error) {
      console.error("View failed:", error);
    } finally {
      setLoadingReply(false);
    }
  };

  return (
    <Grid container justifyContent="space-between" mb="10px">
      <Grid>
        <Avatar
          sizes="small"
          alt={props?.profile?.fullname}
          src={props?.profile?.photo}
        />
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
        <Typography whiteSpace="pre-line" color="#545454">
          {shownText}
          {!expanded && isLongComment && "..."}
        </Typography>

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
              <Tooltip
                title="Upvote"
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -5],
                        },
                      },
                    ],
                  },
                }}
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
              </Tooltip>
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
              <Tooltip
                title="Downvote"
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -5],
                        },
                      },
                    ],
                  },
                }}
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
              </Tooltip>
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
              <Tooltip
                title="Reply"
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -5],
                        },
                      },
                    ],
                  },
                }}
              >
                <IconButton
                  size="small"
                  disabled={loadingReply}
                  onClick={() => handleGetReplies()}
                >
                  <ChatBubleIcon />
                </IconButton>
              </Tooltip>
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
      </Grid>
    </Grid>
  );
}

export default Comment_list;
