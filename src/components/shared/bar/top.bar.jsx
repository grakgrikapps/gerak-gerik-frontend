"use client";

import React from "react";
import SearchIcon from "../icons/search";
import { Avatar, Box, Container, Button, IconButton } from "@mui/material";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setMyArena } from "@/lib/rtk/features/auth/authSlice";
import { setCurrentArena } from "@/lib/rtk/features/arena/arenaSlice";
import http from "@/lib/axios/http";

function Top_bar() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);
  const myArena = useSelector((state) => state.auth.myArena);
  const arena = useSelector((state) => state.arena);

  React.useEffect(() => {
    http
      .get("/auth/profile/arena")
      .then((res) => dispatch(setMyArena(res.data)));
  }, []);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      py="10px"
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <Link href="/profile">
            <IconButton size="small">
              <Avatar sizes="small" src={profile?.photo ?? null} />
            </IconButton>
          </Link>

          <Box
            mt={0.5}
            gap={2}
            display="flex"
            overflow="auto"
            justifyContent="space-between"
            sx={{ "&::-webkit-scrollbar": { display: "none" } }}
          >
            {React.Children.toArray(
              [
                "For You",
                ...(myArena ?? []).map((item) => item?.arena?.name),
              ].map((item) => (
                <Button
                  key={item}
                  size="small"
                  color="inherit"
                  onClick={() => dispatch(setCurrentArena(item))}
                  sx={{
                    fontWeight: item === arena.current ? 700 : 400,
                    borderBottom:
                      item === arena.current ? "2px solid #000000" : "none",
                    borderRadius: 0,
                    minHeight: "0px",
                    minWidth: "fit-content",
                    fontSize: "14px",
                    textTransform: "capitalize",
                  }}
                >
                  {item}
                </Button>
              ))
            )}
          </Box>
        </Box>

        <IconButton size="small">
          <SearchIcon color="#999DA3" />
        </IconButton>
      </Container>
    </Box>
  );
}

export default Top_bar;
