import React, { useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import HomeIcon from "../icons/home";
import ArenaIcon from "../icons/arena";
import ChatIcon from "../icons/chat";
import ShareIcon from "../icons/share";
import BookmarkOutlineIcon from "../icons/bookmark-outline";
import BookmarkIcon from "../icons/bookmark";
import Comment_drawer from "../drawer/comment.drawer";
import Replies_drawer from "../drawer/replies.drawer";
import Bookmark_drawer from "../drawer/bookmark.drawer";
import Share_drawer from "../drawer/share.drawer";
import http from "@/lib/axios/http";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentAddToBookmark,
  setCurrentPost,
  setCurrentRemoveToBookmark,
  setOpenComment,
  setShouldNext,
} from "@/lib/rtk/features/posts/postSlice";

function Bottom_bar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const auth = useSelector((state) => state.auth);

  const [selected, setSelected] = React.useState("Home");
  const [showBookmarkDrawer, setShowBookmarkDrawer] = React.useState(false);

  const hasBookmark = posts?.current?.bookmarks?.find(
    (item) => item.profile_id === auth?.profile?.id
  );

  const handleSave = async () => {
    try {
      if (hasBookmark) {
        await http.delete(`/bookmarks/${posts?.current?.id}`);
        dispatch(setCurrentRemoveToBookmark());
      } else {
        await http.get(`/bookmarks/${posts?.current?.id}`);
        setShowBookmarkDrawer(true);
        dispatch(setCurrentAddToBookmark(auth?.profile?.id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(setOpenComment(false));
  }, []);

  return (
    <Box
      height="65px"
      borderTop="1px solid #95959599"
      display="flex"
      alignItems="flex-end"
      justifyContent="space-around"
      pb="5px"
      position="relative"
    >
      {[
        {
          label: "Home",
          icon: <HomeIcon color="#1C1C1C" />,
        },
        { label: "Arena", icon: <ArenaIcon /> },
        { label: "Comment", icon: <ChatIcon /> },
        { label: "Share", icon: <ShareIcon /> },
        {
          label: "Save",
          icon:
            hasBookmark || showBookmarkDrawer ? (
              <BookmarkIcon />
            ) : (
              <BookmarkOutlineIcon />
            ),
        },
      ].map((item, index) => (
        <IconButton
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "0 10px",
            borderRadius: "5px",
            width: "50px",
          }}
          disableFocusRipple
          key={index}
          onClick={() => {
            setSelected(item.label);

            if (item.label === "Arena") {
              router.push(`/arena`);
            }

            if (item.label === "Home") {
              router.push(`/home`);
            }

            if (item.label === "Save") {
              handleSave();
            }

            if (item.label === "Comment") {
              dispatch(setOpenComment(true));
            }
          }}
        >
          {item.icon}
          <Typography variant="body2" fontSize="10px">
            {item.label}
          </Typography>
        </IconButton>
      ))}

      <Comment_drawer
        open={posts?.openComment}
        handleClose={() => {
          setSelected("Home");
          dispatch(setOpenComment(false));

          if (posts.shouldNext) {
            http
              .get(
                `/posts/${
                  posts?.initiation?.[posts?.initiation?.length - 1].id
                }`
              )
              .then((result) => {
                dispatch(setCurrentPost(result?.data));
                dispatch(setShouldNext(false));

                window.fullpage_api.moveSectionDown();
              });
          }
        }}
      />

      <Replies_drawer />

      <Share_drawer
        open={Boolean(selected === "Share")}
        handleClose={() => {
          setSelected("Home");
        }}
      />

      <Bookmark_drawer
        open={showBookmarkDrawer}
        handleClose={() => {
          setSelected("Home");
          setShowBookmarkDrawer(false);
        }}
      />
    </Box>
  );
}

export default Bottom_bar;
