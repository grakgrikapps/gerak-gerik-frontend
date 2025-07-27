"use client";
import React from "react";
import styles from "@/styles/App.module.scss";
import { CARD_LIST } from "@/utils/helper";

import Layout from "@/components/shared/card/swipe/layout";
import PickCard from "@/components/shared/card/swipe/pick-card";
import http from "@/lib/axios/http";

function Home_pages() {
  const [cardList, setCardList] = React.useState(CARD_LIST);
  //   const progress = 1 - cardList.length / CARD_LIST.length;

  React.useEffect(() => {
    http.get("/posts").then((res) => setCardList(res.data));
  }, [])

  return (
    <Layout className={styles.container}>
      {/* <ProgressBar progress={progress} className={styles.progress} /> */}

      <PickCard
        cardList={cardList}
        onEvaluate={(card) => {
          setCardList((prev) => prev.filter((c) => c.slug !== card.slug));
        }}
      />
      
    </Layout>
  );
}

export default Home_pages;
