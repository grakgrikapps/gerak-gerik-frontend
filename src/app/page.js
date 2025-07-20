"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import http from "@/lib/axios/http";

import Post_profile from "@/components/shared/profile/post.profile";

export default function Home() {
  const [details, setDetails] = React.useState({});

  React.useEffect(() => {
    // Example of using a Redux action or any other side effect
    (async () => {
      http.get("/posts").then((res) => {
        // setData(res?.data);
        http.get(`/posts/${res?.data[0]?.id}`).then((_res) => {
          setDetails(_res?.data);
        });
      });
    })();
  }, []);

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
            src={`${details?.videos?.[0]?.url}?autoplay=1&mute=1`}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></Box>
        </Box>

        {/* Profile */}
        <Post_profile
          profile={details?.profile}
          description={details?.description}
          createdAt={details?.createdAt}
        />
      </Box>
    </>
  );
}
