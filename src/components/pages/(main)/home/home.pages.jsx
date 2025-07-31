"use client";
import React, { use } from "react";
import styles from "@/styles/App.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPost,
  initiationPost,
} from "@/lib/rtk/features/posts/postSlice";
import Layout from "@/components/shared/card/swipe/layout";
import PickCard from "@/components/shared/card/swipe/pick-card";
import http from "@/lib/axios/http";
import { Box } from "@mui/system";
import { CircularProgress, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";

function Home_pages() {
  const search = useSearchParams();
  const dispatch = useDispatch();
  const arena = useSelector((state) => state.arena);
  const posts = useSelector((state) => state.posts);

  const currentArena = arena?.list?.find(
    (item) => item?.name === arena?.current
  );

  React.useEffect(() => {
    if (posts?.initiation.length === 0)
      http
        .get(`/posts`, {
          params: { arena_id: currentArena?.id, slug: search.get("slug") },
        })
        .then((res) => {
          dispatch(initiationPost(res.data));

          http
            .get(`/posts/${res?.data?.[0]?.id}`)
            .then((result) => dispatch(setCurrentPost(result?.data)));
        });
  }, [arena?.current, posts?.initiation]);


  return (
    <Layout className={styles.container}>
      {/* <ProgressBar progress={progress} className={styles.progress} /> */}

      {posts?.initiation.length > 0 && (
        <PickCard
          cardList={posts?.initiation}
          onEvaluate={(card) => {
            dispatch(
              initiationPost(
                posts?.initiation.filter((c) => c.slug !== card.slug)
              )
            );
          }}
        />
      )}

      {posts?.initiation.length === 0 && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="60dvh"
          sx={{ opacity: 0.6 }}
        >
          <Box>
            <CircularProgress />
          </Box>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
            Loading...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Loading posts, please wait...
          </Typography>
        </Box>
      )}
    </Layout>
  );
}

export default Home_pages;
