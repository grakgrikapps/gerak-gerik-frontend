import {
  Avatar,
  Box,
  Grid,
  Typography,
  CircularProgress,
  Tooltip,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import React from "react";

// icon
import ThumbUpIcon from "@/components/shared/icons/hand-thumb-up";
import ThumbUpOutlineIcon from "@/components/shared/icons/hand-thumb-up-outline";
import ThumbDownIcon from "@/components/shared/icons/hand-thumb-down";
import ThumbDownOutlineIcon from "@/components/shared/icons/hand-thumb-down-outline";
import ShareUpIcon from "@/components/shared/icons/share-up";
import ChatBubleIcon from "@/components/shared/icons/chat-buble";
import BookmarkIcon from "@/components/shared/icons/bookmark";

function Post_Card() {
  const [isVoting, setIsVoting] = React.useState(false);
  const [loadingReply, setLoadingReply] = React.useState(false);
  const [upvotes, setUpvotes] = React.useState([]);
  const [downvotes, setDownvotes] = React.useState([]);

  const auth = useSelector((state) => state.auth);
  const userId = auth?.profile?.id;
  return (
    <Grid container justifyContent="space-between" spacing={2}>
      <Grid size={1}>
        <Avatar />
      </Grid>
      <Grid size={10.7}>
        <Typography variant="h5">Pixsellz</Typography>
        <Typography variant="body1" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod
        </Typography>

        <Box
          height="290px"
          width="100%"
          bgcolor="lightgrey"
          borderRadius="15px"
          className="player-wrapper"
        >
          <ReactPlayer
            src="https://www.youtube.com/watch?v=LXb3EKWsInQ"
            light={`https://img.youtube.com/vi/LXb3EKWsInQ/0.jpg`}
            width="100%"
            height="100%"
            playsInline
            playing
            controls
            // controls={true}
            style={{ borderRadius: "12px", overflow: "hidden" }}
            className="iframe-player"
          />
        </Box>

        {/* Comment Footer */}
        <Box display="flex" gap="5px" mt="5px">
          {/* UPVOTE */}
          <Box display="flex" alignItems="center" gap="2px" marginRight="5px">
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
                    <ThumbUpIcon size={{ width: "18px", height: "18px" }} />
                  ) : (
                    <ThumbUpOutlineIcon
                      size={{ width: "18px", height: "18px" }}
                    />
                  )}
                </IconButton>
              </Tooltip>
            </motion.div>

            <>
              {isVoting ? (
                <CircularProgress size="12px" color="inherit" />
              ) : (
                <Typography fontSize="12px">{upvotes?.length}</Typography>
              )}
            </>
          </Box>

          {/* DOWNVOTE */}
          <Box display="flex" alignItems="center" gap="2px" marginRight="5px">
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
                    <ThumbDownIcon size={{ width: "18px", height: "18px" }} />
                  ) : (
                    <ThumbDownOutlineIcon
                      size={{ width: "18px", height: "18px" }}
                    />
                  )}
                </IconButton>
              </Tooltip>
            </motion.div>

            <>
              {isVoting ? (
                <CircularProgress size="12px" color="inherit" />
              ) : (
                <Typography fontSize="12px">{downvotes?.length}</Typography>
              )}
            </>
          </Box>

          {/* REPLY */}
          <Box display="flex" alignItems="center" gap="2px" marginRight="5px">
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
                  <ChatBubleIcon size={{ width: "18px", height: "18px" }} />
                </IconButton>
              </Tooltip>
            </motion.div>

            <>
              {loadingReply ? (
                <CircularProgress size="12px" color="inherit" />
              ) : (
                <Typography fontSize="12px">0</Typography>
              )}
            </>
          </Box>

          <motion.div
            whileTap={{ scale: 1.3 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            style={{ border: "none", background: "none", padding: 0 }}
          >
            <Tooltip
              title="Share"
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
              <IconButton size="small">
                <ShareUpIcon size={{ width: "18px", height: "18px" }} />
              </IconButton>
            </Tooltip>
          </motion.div>

          <motion.div
            whileTap={{ scale: 1.3 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            style={{ border: "none", background: "none", padding: 0 }}
          >
            <Tooltip
              title="Bookmark"
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
              <IconButton size="small">
                <BookmarkIcon size={{ width: "18px", height: "18px" }} />
              </IconButton>
            </Tooltip>
          </motion.div>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Post_Card;
