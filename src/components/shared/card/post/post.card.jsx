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
import BookmarkOutlineIcon from "@/components/shared/icons/bookmark-outline";
import BookmarkIcon from "@/components/shared/icons/bookmark";
import moment from "moment";
import { getYouTubeIdFromEmbedUrl } from "@/utils/helper";
import http from "@/lib/axios/http";
import MuxPlayer from "@mux/mux-player-react";

function Post_Card(props) {
  const [isVoting, setIsVoting] = React.useState(false);
  const [loadingReply, setLoadingReply] = React.useState(false);

  const auth = useSelector((state) => state.auth);
  const userId = auth?.profile?.id;

  const videoId = getYouTubeIdFromEmbedUrl(props?.videos?.[0]?.url);

  const profile = props?.profile;

  const hasBookmark = props?.bookmarks?.find(
    (item) => item.profile_id === auth?.profile?.id
  );

  const handleSave = async () => {
    try {
      if (hasBookmark) {
        await http.delete(`/bookmarks/${props?.id}`);
      } else {
        await http.get(`/bookmarks/${props?.id}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      props.handleRefresh();
    }
  };

  return (
    <Grid container justifyContent="space-between">
      <Grid size={1}>
        <Avatar src={profile?.photo} />
      </Grid>
      <Grid size={{ lg: 10.5, xs: 10.4 }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb="4px"
        >
          <Box display="flex" alignItems="center" gap="5px">
            <Typography variant="h5">{profile?.fullname}</Typography>
            <Typography variant="body2" color="#959595">
              @{profile?.username}
            </Typography>
          </Box>

          <Typography variant="body2" fontSize="10px" color="#959595">
            {moment(props?.createdAt).fromNow()}
          </Typography>
        </Box>

        <Typography variant="body1" gutterBottom>
          {props?.description}
        </Typography>

        <Box
          height="290px"
          width="100%"
          bgcolor="lightgrey"
          borderRadius="15px"
          className="player-wrapper"
        >
          {videoId ? (
            <ReactPlayer
              src={props?.videos?.[0]?.url}
              light={`https://img.youtube.com/vi/${videoId}/0.jpg`}
              width="100%"
              height="100%"
              // playsInline
              // playing
              // onPlay={() => props.setPlayingVideoId(videoId)}
              // onPause={() => props.setPlayingVideoId(null)}
              // controls
              // controls={true}
              style={{ borderRadius: "12px", overflow: "hidden" }}
              className="iframe-player"
            />
          ) : (
            <div
              style={{
                position: "relative",
                width: "100%",
                paddingTop: "78%", // 16:9 ratio (9/16 = 0.5625)
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <MuxPlayer
                playbackId={props?.videos?.[0]?.url}
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

        {/* Comment Footer */}
        <Box display="flex" gap="5px" mt="5px">
          {/* UPVOTE */}
          <Box display="flex" alignItems="center" gap="2px" marginRight="5px">
            <motion.div
              whileTap={{ scale: 1.3 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              style={{ border: "none", background: "none", padding: 0 }}
            >
              <IconButton size="small" disabled={isVoting} onClick={() => {}}>
                {props?.upvote?.includes(userId) ? (
                  <ThumbUpIcon size={{ width: "18px", height: "18px" }} />
                ) : (
                  <ThumbUpOutlineIcon
                    size={{ width: "18px", height: "18px" }}
                  />
                )}
              </IconButton>
            </motion.div>

            <>
              {isVoting ? (
                <CircularProgress size="12px" color="inherit" />
              ) : (
                <Typography fontSize="12px">{props?.upvote?.length}</Typography>
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
              <IconButton size="small" disabled={isVoting} onClick={() => {}}>
                {props?.downvote?.includes(userId) ? (
                  <ThumbDownIcon size={{ width: "18px", height: "18px" }} />
                ) : (
                  <ThumbDownOutlineIcon
                    size={{ width: "18px", height: "18px" }}
                  />
                )}
              </IconButton>
            </motion.div>

            <>
              {isVoting ? (
                <CircularProgress size="12px" color="inherit" />
              ) : (
                <Typography fontSize="12px">
                  {props?.downvote?.length}
                </Typography>
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
              <IconButton size="small">
                <ChatBubleIcon size={{ width: "18px", height: "18px" }} />
              </IconButton>
            </motion.div>

            <>
              {loadingReply ? (
                <CircularProgress size="12px" color="inherit" />
              ) : (
                <Typography fontSize="12px">
                  {props?.comments?.length}
                </Typography>
              )}
            </>
          </Box>

          <motion.div
            whileTap={{ scale: 1.3 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            style={{ border: "none", background: "none", padding: 0 }}
          >
            <IconButton size="small">
              <ShareUpIcon size={{ width: "18px", height: "18px" }} />
            </IconButton>
          </motion.div>

          <motion.div
            whileTap={{ scale: 1.3 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            style={{ border: "none", background: "none", padding: 0 }}
          >
            <IconButton size="small" onClick={handleSave}>
              {hasBookmark ? (
                <BookmarkIcon size={{ width: "18px", height: "18px" }} />
              ) : (
                <BookmarkOutlineIcon size={{ width: "18px", height: "18px" }} />
              )}
            </IconButton>
          </motion.div>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Post_Card;
