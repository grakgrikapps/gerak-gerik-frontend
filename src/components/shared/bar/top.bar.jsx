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
import {
  setFollowingArena,
  setSelectedArena,
} from "@/lib/rtk/features/arena/arenaSlice";
import http from "@/lib/axios/http";
import {
  setStatusPost,
  setInitiationPost,
} from "@/lib/rtk/features/posts/postSlice";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

function Top_bar() {
  const router = useRouter();
  const search = useSearchParams();
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.auth.profile);
  const arena = useSelector((state) => state.arena);

  React.useEffect(() => {
    http.get("/auth/profile/arena").then((res) => {
      dispatch(setFollowingArena(res?.data));
    });
  }, []);

  React.useEffect(() => {
    if (search.get("arena_id")) {
      dispatch(setSelectedArena(parseInt(search.get("arena_id"))));
    } else {
      dispatch(setSelectedArena(0));
    }
  }, [search.get("arena_id")]);

  const handleChangeArena = async (selected) => {
    dispatch(setSelectedArena(selected));
    dispatch(setStatusPost("loading"));

    const request = await http.get(`/posts`, {
      params: {
        sort: "viral",
        arena_id: selected,
      },
    });

    dispatch(
      setInitiationPost({
        list: request?.data,
        current: request?.data?.[0],
        status: request?.data?.length > 0 ? "idle" : "empty",
      })
    );

    if (selected === 0) {
      router.push("/home");
      return;
    }

    router.push(`/home?arena_id=${selected}`);
  };

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

          <Grid size={{ xs: 10.5 }}>
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
                  { name: "For You", arena_id: 0 },
                  ...(arena?.following ?? []).map((item) => ({
                    name: item?.arena?.name,
                    arena_id: item?.arena_id,
                  })),
                ].map((item) => (
                  <Button
                    key={item}
                    size="small"
                    color="inherit"
                    onClick={() => handleChangeArena(item?.arena_id)}
                    sx={{
                      fontWeight:
                        item?.arena_id === arena?.filter?.id ? 700 : 400,
                      borderBottom:
                        item?.arena_id === arena?.filter?.id
                          ? "2px solid #000000"
                          : "none",
                      borderRadius: 0,
                      minHeight: "0px",
                      minWidth: "fit-content",
                      fontSize: "14px",
                      textTransform: "capitalize",
                    }}
                  >
                    {item?.name}
                  </Button>
                ))
              )}
            </Box>
          </Grid>

          {/* <Grid size={{ xs: 1 }}>
            <IconButton size="small">
              <SearchIcon color="#999DA3" />
            </IconButton>
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  );
}

export default Top_bar;
