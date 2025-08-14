import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./pick-card.module.scss";
import { clamp, getYouTubeIdFromEmbedUrl } from "@/utils/helper";
import {
  setPauseContent,
  setPlayContent,
  setDragingContent,
} from "@/lib/rtk/features/posts/postSlice";
import ProgressMask from "../progress-mask";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player";
import PlayCircle from "@/components/shared/icons/play-circle";
import { Loading_Card } from "@/components/pages/(main)/home/home.v2.pages";
import http from "@/lib/axios/http";

// Fungsi untuk mendapatkan posisi dari mouse/touch
const getPosition = (event) => {
  if ("touches" in event) {
    return { x: event.touches[0].clientX, y: event.touches[0].clientY };
  } else {
    return { x: event.clientX, y: event.clientY };
  }
};

function PickCard({ cardList = [], onEvaluate, active, current }) {
  const interactionRef = useRef();
  const playerRef = React.useRef(null);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const auth = useSelector((state) => state.auth);

  const [currentCard, setCurrentCard] = useState(current);
  const [isInteracting, setIsInteracting] = useState(false);
  const [activeIndex, setActiveIndex] = useState(cardList.length - 1);
  const [progress, setProgress] = useState(0); // animation progress (-1 ~ 1)
  const [playedSeconds, setPlayedSeconds] = useState(0);

  const handleProgress = (state) => {
    setPlayedSeconds(state.timeStamp);
  };

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

    $card.style.transform = `translate(${dx}px, ${dy}px) rotate(${deg}deg)`;

    dispatch(setDragingContent());

    const newProgress = clamp(dx / 100, -1, 1);
    setProgress(newProgress);
  }, []);

  const handleEnd = useCallback(() => {
    const $card = interactionRef.current?.$card;
    if (!$card) return;

    const isSelect = Math.abs(progress) === 1;
    const isGood = progress === 1;
    const [, currentXString] =
      $card.style.transform.match(/translate\(([^,]+), [^)]+\)/) || [];
    const [, currentYString] =
      $card.style.transform.match(/translate\([^,]+, ([^)]+)\)/) || [];
    const [, currentRotateString] =
      $card.style.transform.match(/rotate\(([^)]+)\)/) || [];

    const currentX = parseInt(currentXString, 10);
    const currentY = parseInt(currentYString, 10);
    const currentRotate = parseInt(currentRotateString, 10);
    const dx = isGood
      ? window.innerWidth
      : (window.innerWidth + $card.getBoundingClientRect().width) * -1;

    $card.style.transition = "transform 0.3s ease-in-out";
    $card.style.transform = isSelect
      ? `translate(${currentX + dx}px, ${currentY}px) rotate(${
          currentRotate * 2
        }deg)`
      : "translate(0, 0) rotate(0deg)";

    interactionRef.current = undefined;

    setIsInteracting(false);
    setProgress(0);

    if (isSelect) {
      setActiveIndex((prev) => prev - 1);
    }

    setTimeout(async () => {
      if (isSelect) {
        const selectedCard = cardList[cardList.length - 1];
        onEvaluate?.(selectedCard, isGood ? "good" : "bad");

        // === OPTIMISTIC UPDATE START ===
        const prevUpvote = currentCard?.upvote || [];
        const prevDownvote = currentCard?.downvote || [];

        // Update lokal langsung
        setCurrentCard((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            upvote: isGood ? [...prev.upvote, auth?.profile?.id] : prev.upvote,
            downvote: !isGood
              ? [...prev.downvote, auth?.profile?.id]
              : prev.downvote,
          };
        });

        dispatch(setPauseContent());

        try {
          if (isGood) {
            await http.get(`/posts/upvote/${currentCard?.id}`);
          } else {
            await http.get(`/posts/downvote/${currentCard?.id}`);
          }
        } catch (err) {
          console.error("Vote gagal, rollback...", err);
          // Rollback ke nilai lama
          setCurrentCard((prev) => ({
            ...prev,
            upvote: prevUpvote,
            downvote: prevDownvote,
          }));
        }
        // === OPTIMISTIC UPDATE END ===
      }

      // activeScroll();
    }, 300);

    if (isSelect || posts?.content?.status === "draging")
      dispatch(setPauseContent());
  }, [onEvaluate, progress]);

  const isMediaPlaying = () => {
    return ["playing", "loading"].includes(posts?.content?.status);
  };

  const handleOnClick = () => {
    if (isMediaPlaying()) {
      dispatch(setPauseContent());
    } else {
      dispatch(setPlayContent());
    }
  };

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
  }, [handleMove, handleEnd, isInteracting]);

  const upvoteCount = currentCard?.upvote?.length || 0;
  const downvoteCount = currentCard?.downvote?.length || 0;
  const totalVotes = upvoteCount + downvoteCount;

  // Hindari pembagian 0
  const leftPercent = totalVotes > 0 ? (downvoteCount / totalVotes) * 100 : 0;
  const rightPercent = totalVotes > 0 ? (upvoteCount / totalVotes) * 100 : 0;

  return (
    <>
      <div className={styles.container}>
        {(activeIndex < 0 || posts?.current?.has_voted) && (
          <ReactPlayer
            height="100%"
            width="100%"
            loop
            src={cardList?.[0]}
            playIcon={<PlayCircle />}
            config={{
              youtube: {
                start: playedSeconds,
              },
            }}
            muted
            onPlay={({ type }) => {
              if (type === "play") dispatch(setPlayContent());
            }}
            onPause={({ type }) => {
              if (type === "pause") dispatch(setPauseContent());
            }}
          />
        )}

        {(activeIndex < 0 || posts?.current?.has_voted) && (
          <>
            {/* LEFT PROGRESS */}
            <div className="vertical_bar left_bar">
              <div
                className="progress_left"
                style={{ height: `${leftPercent * 0.8}%` }}
              ></div>
              <div
                className="progress_label"
                style={{ bottom: `${leftPercent * 0.8 - 2}%` }}
              >
                {Math.round(leftPercent)}%
              </div>
            </div>

            {/* RIGHT PROGRESS */}
            <div className="vertical_bar right_bar">
              <div
                className="progress_right"
                style={{ height: `${rightPercent * 0.8}%` }}
              ></div>
              <div
                className="progress_label"
                style={{ bottom: `${rightPercent * 0.8 - 2}%` }}
              >
                {Math.round(rightPercent)}%
              </div>
            </div>
          </>
        )}

        {!posts?.current?.has_voted &&
          cardList.map((card, index) => {
            const isActiveCard = index >= activeIndex;
            const isLastCard = index === cardList.length - 1;

            return (
              <div
                key={index}
                className={[styles.card, isActiveCard && styles.active]
                  .filter(Boolean)
                  .join(" ")}
                {...{
                  onTouchStart: handleStart,
                  onMouseDown: handleStart,
                }}
                onClick={() => {
                  if (isLastCard) handleOnClick();
                }}
              >
                <div className={styles.card_inner}>
                  <div className={styles.image_wrap}>
                    {activeIndex >= 0 && (
                      <ReactPlayer
                        height="100%"
                        width="100%"
                        loop
                        playsInline
                        ref={playerRef}
                        playing={isMediaPlaying() && active}
                        src={card}
                        playIcon={<PlayCircle />}
                        onProgress={handleProgress}
                        muted
                      />
                    )}

                    {!active && <Loading_Card />}
                  </div>

                  {posts?.content?.status === "draging" && (
                    <ProgressMask
                      progress={progress}
                      isInteracting={isInteracting}
                    />
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default PickCard;
