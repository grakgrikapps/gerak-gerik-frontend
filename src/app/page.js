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

export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

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
        >
          <Box
            component="iframe"
            borderRadius="15px"
            width="100%"
            height="100%"
            src={`${posts?.current?.videos?.[0]?.url}?autoplay=1&mute=1`}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></Box>
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
