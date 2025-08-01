"use client";

import React from "react";
import Arena_list from "@/components/shared/list/arena.list";
import { Container } from "@mui/material";
import http from "@/lib/axios/http";
import { useDispatch, useSelector } from "react-redux";
import { setArena } from "@/lib/rtk/features/arena/arenaSlice";

function Arena_pages() {
  const arena = useSelector((state) => state.arena);
  const dispatch = useDispatch();

  const handleRefresh = () => {
    http.get("/arena").then((res) => {
      dispatch(setArena(res.data));
    });
  };

  React.useEffect(() => {
    handleRefresh();
  }, []);

  console.log("arena?.list", arena?.list);

  return (
    <Container>
      {arena?.list?.map((item, index) => (
        <Arena_list
          {...item}
          key={`${index}_${item?.user_arenas?.length}`}
          handleRefresh={handleRefresh}
        />
      ))}
    </Container>
  );
}

export default Arena_pages;
