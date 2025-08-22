"use client";
import React, { use } from "react";
import styles from "@/styles/App.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Layout from "@/components/shared/card/swipe/layout";
import PickCard from "@/components/shared/card/swipe/pick-card";
import { Box } from "@mui/system";
import { CircularProgress, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";



export const CARD_LIST = [
  {
    image:
      "https://images.blur.io/_blur-prod/0xbd3531da5cf5857e7cfaa92426877b022e612cf8/3694-4325b613b1784a63?w=1024",
    name: "Pudgy Penguin",
  },
  {
    image:
      "https://images.blur.io/_blur-prod/0xed5af388653567af2f388e6224dc7c4b3241c544/4612-36e069e91d56a803?w=1024",
    name: "Azuki",
  },
  {
    image:
      "https://images.blur.io/_blur-prod/0xc5990790f28aec6c5bda469cf7052b996c36ba7f/645-6eab2d1219f055ae?w=1024",
    name: "ERCC",
  },
  {
    image:
      "https://images.blur.io/_blur-prod/0x8a90cab2b38dba80c64b7734e58ee1db38b8992e/3586-d9149df187b057e6?w=1024",
    name: "Doodle",
  },
  {
    image:
      "https://images.blur.io/_blur-prod/0x1b23d0f0f6dc3547c1b6945152acbfd6eaad85b0/4565-986b2098be86b011?w=1024",
    name: "Pillheads",
  },
  {
    image:
      "https://images.blur.io/_blur-prod/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/7440-045fe14b61034b0b?w=1024",
    name: "Bored Ape Yacht Club",
  },
  {
    image:
      "https://images.blur.io/_blur-prod/0xa28d6a8eb65a41f3958f1de62cbfca20b817e66a/2219-da1fa5c5b79ba6e2?w=1024",
    name: "Nobody",
  },
  {
    image:
      "https://images.blur.io/_blur-prod/0x9a27d13a4896baa03843a0728dff6007d665f8ee/1394-2c4c8294799c2012?w=1024",
    name: "Matr1x 2061",
  },
  {
    image:
      "https://images.blur.io/_blur-prod/0x23581767a106ae21c074b2276d25e5c3e136a68b/2992-1a877efc7c000629?w=1024",
    name: "Moonbirds",
  },
];

function Home_pages() {
  const search = useSearchParams();
  const dispatch = useDispatch();
  const arena = useSelector((state) => state.arena);
  const posts = useSelector((state) => state.posts);


  const [cardList, setCardList] = React.useState(CARD_LIST);

  const currentArena = arena?.list?.find(
    (item) => item?.name === arena?.current
  );

  return (
    <Layout className={styles.container}>
      {/* <ProgressBar progress={progress} className={styles.progress} /> */}

      <PickCard
        cardList={cardList}
        onEvaluate={(card) => {
          setCardList((prev) => prev.filter((c) => c.name !== card.name));
        }}
      />

      {posts?.list.length === 0 && (
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
