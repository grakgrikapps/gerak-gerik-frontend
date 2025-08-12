"use client";

import React from "react";
import SearchIcon from "../icons/search";
import {
  Avatar,
  Box,
  Container,
  Button,
  IconButton,
  Grid,
} from "@mui/material";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setMyArena } from "@/lib/rtk/features/auth/authSlice";
import { setCurrentArena } from "@/lib/rtk/features/arena/arenaSlice";
import http from "@/lib/axios/http";
import { initiationPost } from "@/lib/rtk/features/posts/postSlice";

function Top_bar() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);
  const myArena = useSelector((state) => state.auth.myArena);
  const arena = useSelector((state) => state.arena);

  React.useEffect(() => {
    // http
    //   .get("/auth/profile/arena")
    //   .then((res) => dispatch(setMyArena(res.data)));
  }, []);

  return (
    <Box position="relative">
      <Container>
        <Grid
          container
          width="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid>
            <Link href="/profile">
              <IconButton size="small">
                <Avatar
                  sizes="small"
                  src={
                    profile?.photo ?? "https://api.dicebear.com/9.x/dylan/svg"
                  }
                />
              </IconButton>
            </Link>
          </Grid>

          <Grid size={{ xs: 9 }}>
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
                    onClick={() => {
                      dispatch(setCurrentArena(item));
                      dispatch(initiationPost([]));
                    }}
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
          </Grid>

          <Grid size={{ xs: 1 }}>
            <IconButton size="small">
              <SearchIcon color="#999DA3" />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Top_bar;
