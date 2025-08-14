import { useLayoutEffect, useState } from "react";
import styles from "./progress-mask.module.scss";
import { clamp } from "@/utils/helper"; // ubah ke .js jika kamu pakai versi JS murni

function ProgressMask({ progress, isInteracting }) {
  const [status, setStatus] = useState(null);
  const isGood = status === "good";
  const isBad = status === "bad";

  useLayoutEffect(() => {
    if (progress > 0) {
      setStatus("good");
    } else if (progress < 0) {
      setStatus("bad");
    } else {
      setStatus(null);
    }
  }, [progress]);

  const dasharray = Math.PI * 2 * 27;
  const dashoffset = dasharray - Math.PI * 2 * 27 * clamp(progress, -1, 1);
  const isActive = Math.abs(progress) === 1;

  return (
    <div
      className={[
        styles.container,
        isActive && styles.active,
        isGood && styles.good,
        isBad && styles.bad,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        opacity: 100,
        transition: isInteracting ? "" : "opacity 0.3s linear",
      }}
    >
      <div className={styles.circle_wrap}>
        <svg
          className={styles.circle_progress}
          width="60"
          height="60"
          viewBox="0 0 60 60"
        >
          <circle
            className={styles.bar}
            cx="30"
            cy="30"
            r="27"
            strokeDasharray={dasharray}
            strokeDashoffset={dashoffset}
            style={{
              transition: isInteracting ? "" : "stroke-dashoffset 0.3s linear",
            }}
          />
        </svg>

        <div className={styles.icon_wrap}>
          {isGood && (
            <>
              <img
                src={"/thumb-up.svg"}
                className={styles.icon_good}
                alt="good"
              />
              <span className={styles.label_right}>Grak</span>
            </>
          )}
          {isBad && (
            <>
              <span className={styles.label_left}>Grik</span>
              <img
                src={"/thumb-down.svg"}
                className={styles.icon_bad}
                alt="bad"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProgressMask;
