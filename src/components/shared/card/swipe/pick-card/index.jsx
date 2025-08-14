import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./pick-card.module.scss";
import { clamp, getYouTubeIdFromEmbedUrl } from "@/utils/helper";
import {
  setPauseContent,
  setPlayContent,
} from "@/lib/rtk/features/posts/postSlice";
import ProgressMask from "../progress-mask";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player";
import PlayCircle from "@/components/shared/icons/play-circle";
import { Loading_Card } from "@/components/pages/(main)/home/home.v2.pages";

// Fungsi untuk mendapatkan posisi dari mouse/touch
const getPosition = (event) => {
  if ("touches" in event) {
    return { x: event.touches[0].clientX, y: event.touches[0].clientY };
  } else {
    return { x: event.clientX, y: event.clientY };
  }
};

function PickCard({ cardList = [], onEvaluate, active }) {
  const interactionRef = useRef();
  const playerRef = React.useRef(null);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

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

    if (isMediaPlaying()) {
      // dispatch(setDragingContent());
    }

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
      // dispatch(setPauseVideo(false));
    }

    setTimeout(async () => {
      if (isSelect) {
        const selectedCard = cardList[cardList.length - 1];
        onEvaluate?.(selectedCard, isGood ? "good" : "bad");
      }

      // activeScroll();
    }, 300);
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


  return (
    <>
      <div className={styles.container} onClick={handleOnClick}>
        {activeIndex < 0 && (
          <ReactPlayer
            height="100%"
            width="100%"
            loop
            playsInline
            playing={isMediaPlaying() && active}
            src={cardList?.[0]}
            light={`https://i.ytimg.com/vi/${getYouTubeIdFromEmbedUrl(
              cardList?.[0]
            )}/maxresdefault.jpg`}
            playIcon={<PlayCircle />}
            config={{
              youtube: {
                start: playedSeconds,
              },
            }}
          />
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
              {...{
                onTouchStart: handleStart,
                onMouseDown: handleStart,
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
                      playing={isMediaPlaying() && active && isActiveCard}
                      src={card}
                      playIcon={<PlayCircle />}
                      onProgress={handleProgress}
                    />
                  )}

                  {!active && <Loading_Card />}
                </div>

                {isLastCard && (
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
