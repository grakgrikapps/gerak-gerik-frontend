"use client";
import React from "react";
import moment from "moment";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import { motion } from "framer-motion";
import { color } from "@/lib/mui/theme";
import http from "@/lib/axios/http";

function CommentList(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [upvotes, setUpvotes] = React.useState(props?.upvotes || []);
  const [downvotes, setDownvotes] = React.useState(props?.downvotes || []);
  const [isVoting, setIsVoting] = React.useState(false);
  const [loadingReply, setLoadingReply] = React.useState(false);

  const maxLength = 150;
  const userId = 4; // ganti dengan user login

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

      props?.handleReplies(request?.data);
    } catch (error) {
      console.error("View failed:", error);
    } finally {
      setLoadingReply(false);
    }
  };

  return (
    <>
      <Box display="flex" width="100%" gap={1} padding="10px">
        <Box>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            // badgeContent={
            //   <VerifiedRoundedIcon
            //     htmlColor="#1673EE"
            //     sx={{
            //       fontSize: "12px",
            //       backgroundColor: "#fff",
            //       borderRadius: "100%",
            //     }}
            //   />
            // }
          >
            <Avatar
              alt={props?.profile?.fullname}
              src={props?.profile?.photo}
            />
          </Badge>
        </Box>

        <Box width="100%">
          <Box display="flex" width="100%" justifyContent="space-between">
            <Box mb={0.2} display="flex" alignItems="center" gap={0.4}>
              <Typography color="textDisabled" fontWeight={500}>
                @{props?.profile?.username}
              </Typography>
            </Box>

            <Typography color="textDisabled">
              {moment(props?.createdAt).fromNow()}
            </Typography>
          </Box>

          <Typography sx={{ color: color.dark_grey, whiteSpace: "pre-line" }}>
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
                textTransform: "lowercase",
                color: "#959595",
                mt: 0.5,
              }}
            >
              {expanded ? "Lebih sedikit" : "Tampilkan lebih banyak"}
            </Button>
          )}

          <Box display="flex" gap="10px" mt="5px">
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
                  {upvotes.includes(userId) ? (
                    <ThumbUpAltIcon
                      sx={{ fontSize: "17px", color: "#1673EE" }}
                    />
                  ) : (
                    <ThumbUpAltOutlinedIcon sx={{ fontSize: "17px" }} />
                  )}
                </IconButton>
              </motion.div>
              {upvotes.length > 0 && (
                <Typography fontSize="12px">{upvotes.length}</Typography>
              )}
            </Box>

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
                  {downvotes.includes(userId) ? (
                    <ThumbDownAltIcon
                      sx={{ fontSize: "17px", color: "#E53935" }}
                    />
                  ) : (
                    <ThumbDownAltOutlinedIcon sx={{ fontSize: "17px" }} />
                  )}
                </IconButton>
              </motion.div>
              {downvotes.length > 0 && (
                <Typography fontSize="12px">{downvotes.length}</Typography>
              )}
            </Box>

            <IconButton size="small">
              <CommentIcon sx={{ fontSize: "17px" }} />
            </IconButton>
          </Box>

          {props?.replies?.length > 0 && (
            <Button
              size="small"
              color="inherit"
              sx={{
                marginTop: "10px",
                minWidth: "fit-content",
                padding: "0px",
                textTransform: "lowercase",
                color: color.dark_grey,
                "& span": {
                  marginLeft: "0px",
                },
              }}
              endIcon={<ChevronRightRoundedIcon />}
              onClick={() => handleGetReplies(props?.id)}
              disabled={loadingReply}
              loading={loadingReply}
            >
              {props?.replies?.length} Balasan
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
}

export default CommentList;
