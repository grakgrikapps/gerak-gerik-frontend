"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import http from "@/lib/axios/http";
import Post_profile from "@/components/shared/profile/post.profile";

import {
  initiationPost,
  setCurrentPost,
} from "@/lib/rtk/features/posts/postSlice";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player";

export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  const [muted, setMuted] = React.useState(true);
  const playerRef = React.useRef(null);

  React.useEffect(() => {
    if (posts?.initiation?.length === 0)
      http.get("/posts").then((res) => {
        dispatch(initiationPost(res?.data ?? []));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);

  React.useEffect(() => {
    if (posts?.initiation?.length !== 0 && !posts?.current)
      http.get(`/posts/${posts?.initiation?.[0]?.id}`).then((res) => {
        dispatch(setCurrentPost(res.data));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);

  return (
    <>
      <Box height="100%" width="100%" padding="15px">
        {/* Content Video */}
        <Box
          height="calc(100% - 80px)"
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
            ref={playerRef}
            playsInline
            playing
            controls
            muted={muted}
            onPlay={(e) => {
              setMuted(false);
            }}
            config={{
              file: {
                attributes: {
                  // autoPlay: true,
                  muted: muted,
                },
              },
            }}
            // controls={true}
            style={{ borderRadius: "15px", overflow: "hidden" }}
            className="iframe-player"
          />
        </Box>

        {/* Profile */}
        <Post_profile
          profile={posts?.current?.profile}
          description={posts?.current?.description}
          createdAt={posts?.current?.createdAt}
        />
      </Box>
    </>
  );
}
