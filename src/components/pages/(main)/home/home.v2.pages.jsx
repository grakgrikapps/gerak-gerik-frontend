"use client";

import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Box,
  Container,
  Grid,
  Skeleton,
  CircularProgress,
  Avatar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setInitiationPost,
  setIdleContent,
  setCurrentPost,
} from "@/lib/rtk/features/posts/postSlice";
import Link from "next/link";
import moment from "moment";
import PickCard from "@/components/shared/card/swipe/pick-card";
import ArrowUpCircle from "@/components/shared/icons/arrow-down-circle";
import ArrowDownCircle from "@/components/shared/icons/arrow-up-circle";

function Home_v2_pages({ request, detail }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  const [activeIndex, setActiveIndex] = React.useState(0);

  const isMediaPause = () => {
    return ["empty", "error", "pause"].includes(
      posts?.content?.status
    );
  };

  const handleChange = (props) => {
    setActiveIndex(props.activeIndex);
    dispatch(setIdleContent());

    dispatch(setCurrentPost(posts?.list?.[props.activeIndex]));
  };

  React.useEffect(() => {
    dispatch(
      setInitiationPost({ list: request, current: detail, status: "idle" })
    );
  }, []);

  return (
    <Container disableGutters maxWidth={false} sx={{ p: 0, m: 0 }}>
      {/* Loading */}
      {posts?.status === "loading" && <Loading_Card />}

      {posts?.status !== "loading" && (
        <Box sx={{ position: "relative" }}>
          <Swiper
            direction={"vertical"}
            // pagination={{
            //   enabled: false
            // }}
            // navigation={{
            //   nextEl: <ArrowUpCircle />,
            //   prevEl: <ArrowDownCircle />,
            // }}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              swiper.params.navigation.nextEl = navigationNextRef.current;
            }}
            modules={[Navigation]}
            className="swiper-container-vertical"
            loop
            onActiveIndexChange={(props) => {
              handleChange(props);
            }}
            noSwiping={true}
            noSwipingClass="pickcard-swipe"
            simulateTouch={false}
          >
            {posts?.list?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <Box mt="10px">
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "calc(100dvh - 230px)",
                        borderRadius: "10px",
                        overflow: "hidden",
                      }}
                      className="pickcard-swipe"
                    >
                      <PickCard
                        index={index}
                        cardList={[item?.videos?.[0]?.url]}
                        active={activeIndex === index}
                      />
                    </Box>

                    <Box px="5%" pt="15px">
                      <Grid container justifyContent="space-between">
                        <Grid size={1}>
                          <Link
                            href={`/profile/${item?.profile?.username}`}
                            passHref
                          >
                            <Avatar src={item?.profile?.photo} />
                          </Link>
                        </Grid>
                        <Grid size={{ xs: 10.2, sm: 10.5 }}>
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={0.5}
                          >
                            <Box display="flex" alignItems="center" gap="5px">
                              <Typography variant="h5">
                                {item?.profile?.fullname}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="#959595"
                                fontSize="10px"
                              >
                                @{item?.profile?.username}
                              </Typography>
                            </Box>

                            <Typography color="#959595">
                              {moment(item?.createdAt).locale("id").fromNow()}
                            </Typography>
                          </Box>

                          <Typography className="text-3-line">
                            {item?.description}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Navigation arrows overlay */}
          <Box
            sx={{
              position: "absolute",
              top: "calc(50% + 40px)", // 40px di bawah tombol pause
              left: "50%", // titik tengah horizontal
              transform: "translateX(-50%)", // geser ke kiri setengah lebar
              display: isMediaPause() ? "flex" : "none",
              alignItems: "center",
              gap: "8px",
              zIndex: 10,
            }}
          >
            <div
              ref={navigationPrevRef}
              style={{ pointerEvents: "auto", cursor: "pointer" }}
              onClick={() => dispatch(setIdleContent())}
            >
              <ArrowUpCircle />
            </div>
            <div
              ref={navigationNextRef}
              style={{ pointerEvents: "auto", cursor: "pointer" }}
              onClick={() => dispatch(setIdleContent())}
            >
              <ArrowDownCircle />
            </div>
          </Box>
        </Box>
      )}
    </Container>
  );
}

export const Loading_Card = () => {
  return (
    <Box mt="10px">
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "calc(100dvh - 230px)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <Skeleton
          variant="rounded"
          width="100%"
          height="100%"
          sx={{ borderRadius: "10px" }}
        />
        <CircularProgress
          size={40}
          sx={{
            position: "absolute",
            top: "45%",
            left: "47%",
            transform: "translate(-50%, -50%)",
          }}
          color="inherit"
        />
      </Box>

      <Box px="5%" pt="15px">
        <Grid container justifyContent="space-between">
          <Grid size={1}>
            <Skeleton variant="circular" width={40} height={40} />
          </Grid>
          <Grid size={{ xs: 10.2, sm: 10.5 }}>
            <Skeleton variant="text" width="50%" sx={{ fontSize: "1rem" }} />

            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home_v2_pages;
