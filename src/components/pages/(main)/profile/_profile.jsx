"use client";
import React from "react";
import {
  Avatar,
  Box,
  Chip,
  Container,
  IconButton,
  Typography,
  Tab,
  Tabs,
} from "@mui/material";
import ChevronLeftIcon from "@/components/shared/icons/chevron-left";
import Card_Post from "@/components/shared/card/post/post.card";
import http from "@/lib/axios/http";
import { useRouter } from "next/navigation";
import { setProfile } from "@/lib/rtk/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Profile_Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);

  const [value, setValue] = React.useState(0);
  const [postLists, setPostLists] = React.useState([]);
  const [playingVideoId, setPlayingVideoId] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleRefresh = () => {
    setLoading(true);
    const url =
      value === 0 ? "/auth/profile/posts" : "/auth/profile/posts/bookmarks";

    http
      .get(url)
      .then((res) => setPostLists(res.data))
      .finally(() => setLoading(false));
  };

  const getEmptyTitle = () => {
    if (value === 0) {
      return "No posts yet";
    } else if (value === 1) {
      return "No bookmarks yet";
    }
  };

  React.useEffect(() => {
    http
      .get("/auth/profile")
      .then((res) => dispatch(setProfile(res.data?.profile)));
  }, []);

  React.useEffect(() => {
    handleRefresh();
  }, [value]);

  return (
    <>
      {/* Header */}
      <Box height="350px">
        {/* Header Background */}
        <Box
          height="120px"
          display="flex"
          alignItems="center"
          sx={{ backgroundColor: "#1F1F1F" }}
        >
          <Container>
            <IconButton
              size="small"
              sx={{ backgroundColor: "#00000055", marginTop: "-20px" }}
              onClick={() => router.push("/home")}
            >
              <ChevronLeftIcon color="#fff" />
            </IconButton>
          </Container>
        </Box>

        {/* Header Content */}
        <Box>
          <Container>
            {/* Profile Picture */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom="10px"
            >
              <Avatar
                sizes="large"
                sx={{
                  width: "79px",
                  height: "79px",
                  border: "5px solid #fff",
                  marginTop: "-30px",
                  marginLeft: "-10px",
                }}
                src={profile?.photo}
              />

              <Chip
                label="Add Post"
                variant="outlined"
                size="small"
                sx={{ borderRadius: "4px", border: "1px solid #000000" }}
                onClick={() => router.push("/post/create")}
              />
            </Box>

            {/* Content */}
            <Box>
              <Typography variant="h5">{profile?.fullname}</Typography>
              <Typography
                variant="body1"
                color="#687684"
                fontSize="14px"
                sx={{ mt: "1px", mb: "5px" }}
              >
                @{profile?.username}
              </Typography>
              <Typography variant="body2" color="#141619" fontSize="12px">
                {profile?.bio ?? "No bio yet"}
              </Typography>
            </Box>

            {/* Following & Followers */}
            <Box display="flex" mt="10px" gap="20px">
              <Box display="flex" gap="5px" alignItems="center">
                <Typography variant="h6" lineHeight="0px">
                  {profile?.following?.length ?? 0}
                </Typography>
                <Typography>Following</Typography>
              </Box>

              <Box display="flex" gap="5px" alignItems="center">
                <Typography variant="h6" lineHeight="0px">
                  {profile?.followers?.length ?? 0}
                </Typography>
                <Typography>Followers</Typography>
              </Box>
            </Box>
          </Container>

          <Box sx={{ borderBottom: 1, borderColor: "divider", mt: "10px" }}>
            <Container>
              <Box>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  sx={{
                    minHeight: "35px",
                    "& .MuiButtonBase-root": {
                      minWidth: "0px",
                      padding: "0px",
                      paddingLeft: "10px",
                      paddingRight: "35px",
                      minHeight: "35px",
                    },
                    "& .Mui-selected": {
                      fontWeight: 600,
                    },
                  }}
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: "#141619",
                    },
                  }}
                >
                  <Tab
                    label="Posts"
                    sx={{
                      padding: "0px !important",
                      paddingRight: "35px !important",
                    }}
                    {...a11yProps(0)}
                  />
                  {/* <Tab label="Replies" {...a11yProps(1)} /> */}
                  <Tab label="Bookmarks" {...a11yProps(2)} />
                </Tabs>
              </Box>
            </Container>
          </Box>
        </Box>
      </Box>

      {/* Content */}
      <Container>
        <Box mb="20px" display="flex" flexDirection="column" gap="30px">
          {postLists.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                py={6}
                sx={{ opacity: 0.6 }}
              >
                <Typography variant="h4" fontWeight={500}>
                  {getEmptyTitle()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Be the first to start the conversation!
                </Typography>
              </Box>
            </motion.div>
          )}

          {postLists.map((item, key) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: key * 0.05 }}
            >
              <Card_Post
                {...item}
                playingVideoId={playingVideoId}
                setPlayingVideoId={setPlayingVideoId}
                handleRefresh={handleRefresh}
              />
            </motion.div>
          ))}
        </Box>
      </Container>
    </>
  );
}

export default Profile_Page;
