"use client";
import React, { use } from "react";
import styles from "@/styles/App.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPost } from "@/lib/rtk/features/posts/postSlice";

import Layout from "@/components/shared/card/swipe/layout";
import PickCard from "@/components/shared/card/swipe/pick-card";
import http from "@/lib/axios/http";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";

function Home_pages() {
  const search = useSearchParams();
  const dispatch = useDispatch();
  const arena = useSelector((state) => state.arena);
  const [cardList, setCardList] = React.useState([]);

  const currentArena = arena?.list?.find(
    (item) => item?.name === arena?.current
  );

  React.useEffect(() => {
    http
      .get(`/posts`, {
        params: { arena_id: currentArena?.id, slug: search.get("slug") },
      })
      .then((res) => {
        setCardList(res.data);

        http
          .get(`/posts/${res?.data?.[0]?.id}`)
          .then((result) => dispatch(setCurrentPost(result?.data)));
      });
  }, [arena?.current]);

  return (
    <Layout className={styles.container}>
      {/* <ProgressBar progress={progress} className={styles.progress} /> */}

      {cardList.length > 0 && (
        <PickCard
          cardList={cardList}
          onEvaluate={(card) => {
            setCardList((prev) => prev.filter((c) => c.slug !== card.slug));
          }}
        />
      )}

      {cardList.length === 0 && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="60dvh"
          sx={{ opacity: 0.6 }}
        >
          <Typography variant="h4" fontWeight={500}>
            No posts in this arena yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Start the first conversation and spark the discussion!
          </Typography>
        </Box>
      )}
    </Layout>
  );
}

export default Home_pages;
