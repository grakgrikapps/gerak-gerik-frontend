import React, { use, useCallback, useEffect, useRef, useState } from "react";
import styles from "./pick-card.module.scss";
import { clamp, getYouTubeIdFromEmbedUrl } from "@/utils/helper";
import http from "@/lib/axios/http";
import ProgressMask from "../progress-mask";
import { Avatar, Typography } from "@mui/material";
import { Box, Grid } from "@mui/system";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import {
  setCurrentPost,
  setOpenComment,
  setPauseVideo,
} from "@/lib/rtk/features/posts/postSlice";
import { useSelector } from "react-redux";
import moment from "moment";
import Link from "next/link";

// Fungsi untuk mendapatkan posisi dari mouse/touch
const getPosition = (event) => {
  if ("touches" in event) {
    return { x: event.touches[0].clientX, y: event.touches[0].clientY };
  } else {
    return { x: event.clientX, y: event.clientY };
  }
};

function PickCard({ cardList = [], onEvaluate }) {
  const interactionRef = useRef();
  const dispatch = useDispatch();
  const [isInteracting, setIsInteracting] = useState(false);
  const [activeIndex, setActiveIndex] = useState(cardList.length - 1);
  const [progress, setProgress] = useState(0); // animation progress (-1 ~ 1)
  const [calcWidth, setCalcWidth] = useState(0);
  const [detail, setDetail] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [alreadyVote, setAlreadyVote] = useState(false); // 'horizontal' | 'vertical' | null

  const handleStart = useCallback((e) => {
    document.body.classList.add(styles.fix_container);
    e.currentTarget.style.transition = "";

    const { x, y } = getPosition(e);
    interactionRef.current = {
      x,
      y,
      $card: e.currentTarget,
    };

    setIsInteracting(true);
  }, []);

  const handleMove = useCallback((e) => {
    if (!interactionRef.current) return;

    const $card = interactionRef.current.$card;
    if (!$card) return;

    const { x, y } = getPosition(e);
    const dx = (x - interactionRef.current.x) * 0.8;
    const dy = (y - interactionRef.current.y) * 0.5;
    const deg = (dx / 600) * -30;

    $card.style.transform = `translate(${dx}px) rotate(${deg}deg)`;

    const newProgress = clamp(dx / 100, -1, 1);
    setProgress(newProgress);
  }, []);

  const handleEnd = useCallback(() => {
    const $card = interactionRef.current?.$card;
    if (!$card) return;

    const isSelect = Math.abs(progress) === 1;
    const isGood = progress === 1;

    $card.style.transition = "transform 0.3s ease-in-out";
    $card.style.transform = isSelect ? `` : "translate(0, 0) rotate(0deg)";

    interactionRef.current = undefined;
    setIsInteracting(false);
    setProgress(0);

    if (isSelect) {
      setActiveIndex((prev) => prev - 1);
      dispatch(setPauseVideo(false));
    }

    setTimeout(async () => {
      // document.body.classList.remove(styles.fix_container);

      if (isSelect) {
        const selectedCard = cardList[cardList.length - 1];
        onEvaluate?.(selectedCard, isGood ? "good" : "bad");

        if (isGood) {
          await http.get(`/posts/upvote/${selectedCard?.id}`);
        } else {
          await http.get(`/posts/downvote/${selectedCard?.id}`);
        }

        http.get(`/posts/${cardList[activeIndex]?.id}`).then((res) => {
          setDetail(res?.data);
          dispatch(setCurrentPost(res?.data));
        });

        dispatch(setOpenComment(true));
        setAlreadyVote(true);
      }
    }, 300);
  }, [cardList, onEvaluate, progress]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [handleMove, handleEnd]);

  useEffect(() => {
    const handleResize = () => {
      const newWindowDimensions = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      const viewportHeight = newWindowDimensions.height;
      const aspectRatio = 16 / 9;

      if (newWindowDimensions.width < viewportHeight * aspectRatio) {
        setCalcWidth(viewportHeight * aspectRatio);
      } else {
        setCalcWidth(newWindowDimensions.width);
      }
    };

    // Initial setup
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (cardList?.[0]?.id) {
      setActiveIndex(cardList?.length - 1);
    }
  }, [cardList]);

  useEffect(() => {
    if (activeIndex >= 0) {
      http.get(`/posts/${cardList[activeIndex]?.id}`).then((res) => {
        setDetail(res?.data);
        dispatch(setCurrentPost(res?.data));
      });
    }
  }, [activeIndex]);

  const upvotes = detail?.upvote?.length ?? 0;
  const downvotes = detail?.downvote?.length ?? 0;
  const totalVotes = upvotes + downvotes;

  const upvotePercentage = totalVotes > 0 ? (upvotes / totalVotes) * 100 : 0;
  const downvotePercentage = 100 - upvotePercentage;

  return (
    <>
      <div className={styles.container}>
        {/* <PickCardResult /> */}

        {totalVotes > 0 && alreadyVote && (
          <>
            {/* Left vertical progress */}
            <Box
              sx={{
                position: "absolute",
                left: "0px",
                top: "30px",
                height: "calc(100dvh - 350px)",
                display: isInteracting ? "none" : "flex",
                alignItems: "flex-start",
                zIndex: 110,
              }}
            >
              <Box sx={{ position: "relative", width: "8px" }}>
                {/* Background bar */}
                <Box
                  sx={{
                    width: "8px",
                    height: "calc(100dvh - 350px)",
                    // backgroundColor: "#e0e0e0",
                    borderRadius: "8px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Progress fill */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      height: `${downvotePercentage}%`,
                      backgroundImage:
                        "linear-gradient(to top, #D00D3F, #94001B)",
                      borderRadius: "8px",
                      transition: "height 0.3s ease-in-out",
                    }}
                  />
                </Box>

                {/* Label */}
                <Typography
                  sx={{
                    position: "absolute",
                    top: `${100 - downvotePercentage}%`,
                    left: "12px",
                    color: "#fff",
                    fontSize: "10px",
                  }}
                >
                  {Math.round(downvotePercentage)}%
                </Typography>
              </Box>
            </Box>

            {/* Right vertical progress */}
            <Box
              sx={{
                position: "absolute",
                right: "0px",
                top: "30px",
                height: "calc(100dvh - 350px)",
                display: isInteracting ? "none" : "flex",
                alignItems: "flex-end",
                zIndex: 110,
              }}
            >
              <Box sx={{ position: "relative", width: "8px" }}>
                {/* Background bar */}
                <Box
                  sx={{
                    width: "8px",
                    height: "calc(100dvh - 350px)",
                    borderRadius: "8px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Progress fill */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      height: `${upvotePercentage}%`,
                      backgroundImage:
                        "linear-gradient(to top, #4177FC, #2D67F6)",
                      borderRadius: "8px",
                      transition: "height 0.3s ease-in-out",
                    }}
                  />
                </Box>

                {/* Label */}
                <Typography
                  sx={{
                    position: "absolute",
                    top: `${100 - upvotePercentage}%`,
                    right: "12px",
                    color: "#fff",
                    fontSize: "10px",
                  }}
                >
                  {Math.round(upvotePercentage)}%
                </Typography>
              </Box>
            </Box>
          </>
        )}

        {cardList.map((card, index) => {
          const isActiveCard = index >= activeIndex;
          const isLastCard = index === cardList.length - 1;

          return (
            <div
              key={index}
              className={[styles.card, isActiveCard && styles.active]
                .filter(Boolean)
                .join(" ")}
              {...(isLastCard && {
                onTouchStart: handleStart,
                onMouseDown: handleStart,
              })}
              onClick={() => {
                if (isPlaying) {
                  dispatch(setPauseVideo(true));
                } else {
                  dispatch(setPauseVideo(false));
                }
              }}
            >
              <div className={styles.card_inner}>
                <div className={styles.image_wrap}>
                  <ReactPlayer
                    height="100%"
                    width="100%"
                    // muted
                    loop
                    // playing={isLastCard && !posts?.pause}
                    // onPlaying={() =>
                    //   setTimeout(() => {
                    //     setIsPlaying(true);
                    //   }, 100)
                    // }
                    onPause={() => setIsPlaying(false)}
                    light={`https://img.youtube.com/vi/${getYouTubeIdFromEmbedUrl(
                      card?.videos?.[0]?.url ?? ""
                    )}/0.jpg`}
                    src={card?.videos?.[0]?.url}
                  />
                </div>

                <ProgressMask
                  progress={progress}
                  isInteracting={isInteracting}
                />
              </div>
            </div>
          );
        })}
      </div>

      <Box px="5%" pt="15px">
        <Grid container justifyContent="space-between">
          <Grid size={1}>
            <Link href={`/profile/${detail?.profile?.username}`}>
              <Avatar src={detail?.profile?.photo} />
            </Link>
          </Grid>
          <Grid size={10.5}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex" alignItems="center" gap="5px">
                <Typography variant="h5">
                  {detail?.profile?.fullname}
                </Typography>
                <Typography variant="body2" color="#959595" fontSize="10px">
                  @{detail?.profile?.username}
                </Typography>
              </Box>

              <Typography color="#959595">
                {moment(detail?.createdAt).fromNow()}
              </Typography>
            </Box>

            <Typography>{detail?.description}</Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default PickCard;
