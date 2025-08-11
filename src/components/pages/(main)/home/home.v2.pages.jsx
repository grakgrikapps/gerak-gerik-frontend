"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PickCard from "@/components/shared/card/swipe/pick-card";

import ReactFullpage from "@fullpage/react-fullpage";
import http from "@/lib/axios/http";
import {
  initiationPost,
  setCurrentPost,
} from "@/lib/rtk/features/posts/postSlice";
import { useSearchParams } from "next/navigation";

function Home_v2_pages() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  const handleDisableScroll = () => {
    window.fullpage_api.setAllowScrolling(false, "down");
    window.fullpage_api.setAllowScrolling(false, "up");
  };

  const handleActiveScroll = () => {
    window.fullpage_api.setAllowScrolling(true, "down");
    window.fullpage_api.setAllowScrolling(true, "up");
  };

  React.useEffect(() => {
    // panggil rebuild setelah data siap
    if (typeof window !== "undefined" && window.fullpage_api) {
      window.fullpage_api.reBuild();
    }
  }, []);

  React.useEffect(() => {
    http.get(`/posts?sort=viral`).then((res) => {
      dispatch(initiationPost(res.data));

      http.get(`/posts/${res?.data?.[0]?.id}`).then((result) => {
        dispatch(setCurrentPost(result?.data));
      });
    });
  }, []);

  return (
    <Container disableGutters maxWidth={false} sx={{ p: 0, m: 0 }}>
      {posts?.initiation?.length > 0 && (
        <ReactFullpage
          // debug
          licenseKey="xxxxxxxxxxxxxxxxxxxxxxxxx"
          controlArrows={false}
          fitToSection
          scrollOverflow={false}
          onLeave={(origin, destination, direction) => {
            if (destination.index >= 0)
              http
                .get(`/posts/${posts?.initiation?.[destination.index].id}`)
                .then((result) => dispatch(setCurrentPost(result?.data)));
          }}
          render={({ state, ...props }) => (
            <>
              {posts?.initiation?.map((section, index) => {
                return (
                  <Box
                    key={section.id}
                    className="section fp-height-responsive"
                    sx={{
                      height: "100dvh !important",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      // justifyContent: "center",
                      overflow: "hidden !important",
                      pt: "10px",
                    }}
                  >
                    <PickCard
                      cardList={[posts?.initiation?.[index]]}
                      active={section?.id === posts?.current?.id}
                      disableScroll={handleDisableScroll}
                      activeScroll={handleActiveScroll}
                      index={index}
                      onEvaluate={() => {
                        handleActiveScroll();
                        http
                          .get(
                            `/posts?sort=viral&not_contain=${JSON.stringify(
                              posts?.initiation?.map((item) => item?.id)
                            )}`
                          )
                          .then((res) => {
                            dispatch(
                              initiationPost([
                                ...posts?.initiation,
                                ...res.data,
                              ])
                            );
                          });
                      }}
                    />
                  </Box>
                );
              })}
            </>
          )}
        />
      )}
    </Container>
  );
}

export default Home_v2_pages;
