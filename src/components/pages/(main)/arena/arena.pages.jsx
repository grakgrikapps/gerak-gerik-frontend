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

  React.useEffect(() => {
    http.get("/arena").then((res) => dispatch(setArena(res.data)));
  }, []);

  return (
    <Container>
      {arena?.list?.map((item, index) => (
        <Arena_list
          name={item?.name}
          slug={item?.slug}
          photo={item?.photo}
          key={index}
        />
      ))}
    </Container>
  );
}

export default Arena_pages;
