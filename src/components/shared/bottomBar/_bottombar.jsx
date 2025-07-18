"use client";
import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Typography from "@mui/material/Typography";
import { Avatar, Button } from "@mui/material";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SentimentSatisfiedAltRoundedIcon from "@mui/icons-material/SentimentSatisfiedAltRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Badge from "@mui/material/Badge";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

// Import icons
import HomeFilledIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import Groups2RoundedIcon from "@mui/icons-material/Groups2Rounded";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import SmsRoundedIcon from "@mui/icons-material/SmsRounded";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ShareIcon from "@mui/icons-material/Share";
import { color } from "@/lib/mui/theme";

function Bottombar() {
  const [value, setValue] = React.useState(0);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [state2, setState2] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const toggleDrawer2 = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState2({ ...state, [anchor]: open });
  };

  return (
    <Box
      sx={{
        borderTop: "0.5px solid",
        borderColor: color.light_grey,
        height: "57px",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);

          if (newValue === 2) {
            toggleDrawer("bottom", true)();
          }
        }}
        sx={{
          width: "100%",
          "& .Mui-selected": {
            color: "#000 !important",
          },
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={
            value === 0 ? (
              <HomeFilledIcon sx={{ fontSize: "30px", height: "30px" }} />
            ) : (
              <HomeOutlinedIcon sx={{ fontSize: "30px", height: "30px" }} />
            )
          }
        />
        <BottomNavigationAction
          label="Arena"
          icon={
            value === 1 ? (
              <Groups2RoundedIcon sx={{ fontSize: "30px", height: "30px" }} />
            ) : (
              <Groups2OutlinedIcon sx={{ fontSize: "30px", height: "30px" }} />
            )
          }
        />
        <BottomNavigationAction
          label="Comment"
          icon={
            value === 2 ? (
              <SmsRoundedIcon sx={{ fontSize: "30px", height: "30px" }} />
            ) : (
              <SmsOutlinedIcon sx={{ fontSize: "30px", height: "30px" }} />
            )
          }
        />
        <BottomNavigationAction
          label="Bookmark"
          icon={
            value === 3 ? (
              <BookmarkIcon sx={{ fontSize: "30px", height: "30px" }} />
            ) : (
              <BookmarkBorderOutlinedIcon
                sx={{ fontSize: "30px", height: "30px" }}
              />
            )
          }
        />
        <BottomNavigationAction
          label="Share"
          icon={
            value === 4 ? (
              <ShareIcon sx={{ fontSize: "30px", height: "30px" }} />
            ) : (
              <ShareOutlinedIcon sx={{ fontSize: "30px", height: "30px" }} />
            )
          }
        />
      </BottomNavigation>

      {/*  Comment */}
      {["bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={() => {
              toggleDrawer(anchor, false)();
              setValue(0);
            }}
            onOpen={toggleDrawer(anchor, true)}
            sx={{
              "& .MuiPaper-root": {
                margin: "auto",
                backgroundColor: "#fff",
                borderRadius: "20px 20px 0px 0px",
                maxWidth: "500px",
              },
            }}
          >
            <Box p="10px">
              <Box display="flex" justifyContent="center" mb="5px">
                <Box
                  width="40px"
                  height="4px"
                  borderRadius="20px"
                  bgcolor={color.dark_grey}
                />
              </Box>
              <Typography variant="h6" textAlign="center">
                Komentar
              </Typography>
            </Box>

            <Box display="flex" width="100%" gap={1} padding="10px">
              <Box>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <VerifiedRoundedIcon
                      htmlColor="#1673EE"
                      sx={{
                        fontSize: "12px",
                        backgroundColor: "#fff",
                        borderRadius: "100%",
                      }}
                    />
                  }
                >
                  <Avatar
                    alt="Travis Howard"
                    src="/static/images/avatar/2.jpg"
                  />
                </Badge>
              </Box>

              <Box width="100%">
                <Box display="flex" width="100%" justifyContent="space-between">
                  <Box mb={0.2} display="flex" alignItems="center" gap={0.4}>
                    <Typography color="textDisabled">@namanama</Typography>
                  </Box>

                  <Typography color="textDisabled">1h ago</Typography>
                </Box>
                <Typography sx={{ color: color.dark_grey }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  vitae felis ligula. Sed venenatis nisl enim, nec suscipit
                  augue convallis vitae. Nunc quis efficitur dui. Donec ultrices
                  ultricies magna, ut posuere metus malesuada sit amet. Sed
                  dictum eros vitae est fringilla, sit amet cursus ligula
                  imperdiet. In efficitur sed libero vitae hendrerit. Ut eget
                  tincidunt mauris, vitae vehicula libero. Pellentesque id elit
                  tempor tortor cursus porttitor sit amet at justo.
                </Typography>

                <Button
                  size="small"
                  color="inherit"
                  sx={{
                    minWidth: "fit-content",
                    height: "0px",
                    padding: "0px",
                    textTransform: "lowercase",
                    color: "#959595",
                  }}
                >
                  lebih sedikit
                </Button>

                <Box display="flex" gap="10px" mt="5px">
                  <Box display="flex" alignItems="center" gap="2px">
                    <IconButton size="small">
                      <ThumbUpIcon sx={{ fontSize: "17px" }} />
                    </IconButton>
                    <Typography fontSize="12px">20</Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap="2px">
                    <IconButton size="small">
                      <ThumbDownIcon sx={{ fontSize: "17px" }} />
                    </IconButton>
                    <Typography fontSize="12px">20</Typography>
                  </Box>

                  <IconButton size="small">
                    <CommentIcon sx={{ fontSize: "17px" }} />
                  </IconButton>
                </Box>

                <Button
                  size="small"
                  color="inherit"
                  sx={{
                    marginTop: "10px",
                    minWidth: "fit-content",
                    padding: "0px",
                    textTransform: "lowercase",
                    color: color.dark_grey,
                    "& span": {
                      marginLeft: "0px",
                    },
                  }}
                  endIcon={<ChevronRightRoundedIcon />}
                  onClick={() => {
                    toggleDrawer2("bottom", true)();
                  }}
                >
                  9 Balasan
                </Button>
              </Box>
            </Box>

            <Box
              p="10px"
              display="flex"
              alignItems="center"
              gap="10px"
              sx={{
                borderTop: "0.5px solid",
                borderColor: color.light_grey,
              }}
            >
              <TextField
                id="outlined-basic"
                placeholder="Tambahkan komentar..."
                variant="outlined"
                size="small"
                multiline
                fullWidth
                sx={{ "& fieldset": { borderRadius: "10px !important" } }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small">
                          <SentimentSatisfiedAltRoundedIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <IconButton size="small">
                <SendRoundedIcon sx={{ fontSize: "30px", height: "30px" }} />
              </IconButton>
            </Box>
          </SwipeableDrawer>
        </React.Fragment>
      ))}

      {/* Reply Comment */}
      {["bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          <SwipeableDrawer
            anchor={anchor}
            open={state2[anchor]}
            onClose={() => {
              toggleDrawer2(anchor, false)();
              setValue(0);
            }}
            onOpen={toggleDrawer2(anchor, true)}
            sx={{
              "& .MuiPaper-root": {
                margin: "auto",
                backgroundColor: "#fff",
                borderRadius: "20px 20px 0px 0px",
                maxWidth: "500px",
              },
            }}
          >
            <Box
              p="10px"
              display="flex"
              alignItems="center"
              gap="12px"
              sx={{
                borderBottom: "0.5px solid",
                borderColor: color.light_grey,
              }}
            >
              <IconButton
                size="small"
                onClick={() => toggleDrawer2(anchor, false)()}
              >
                <ArrowBackRoundedIcon />
              </IconButton>
              <Typography variant="h5" textAlign="center">
                Balasan
              </Typography>
            </Box>

            <Box display="flex" width="100%" gap={1} padding="10px">
              <Box>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <VerifiedRoundedIcon
                      htmlColor="#1673EE"
                      sx={{
                        fontSize: "14px",
                        backgroundColor: "#fff",
                        borderRadius: "100%",
                      }}
                    />
                  }
                >
                  <Avatar
                    alt="Travis Howard"
                    src="/static/images/avatar/2.jpg"
                  />
                </Badge>
              </Box>

              <Box width="100%">
                <Box display="flex" width="100%" justifyContent="space-between">
                  <Box mb={0.2} display="flex" alignItems="center" gap={0.4}>
                    <Typography color="textDisabled">@namanama</Typography>
                  </Box>

                  <Typography color="textDisabled">1h ago</Typography>
                </Box>
                <Typography sx={{ color: color.dark_grey }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  vitae felis ligula. Sed venenatis nisl enim, nec suscipit
                  augue convallis vitae. Nunc quis efficitur dui. Donec ultrices
                  ultricies magna, ut posuere metus malesuada sit amet. Sed
                  dictum eros vitae est fringilla, sit amet cursus ligula
                  imperdiet. In efficitur sed libero vitae hendrerit. Ut eget
                  tincidunt mauris, vitae vehicula libero. Pellentesque id elit
                  tempor tortor cursus porttitor sit amet at justo.
                </Typography>

                <Button
                  size="small"
                  color="inherit"
                  sx={{
                    minWidth: "fit-content",
                    height: "0px",
                    padding: "0px",
                    textTransform: "lowercase",
                    color: "#959595",
                  }}
                >
                  lebih sedikit
                </Button>

                <Box display="flex" gap="10px" mt="5px" ml="-5px">
                  <Box display="flex" alignItems="center" gap="2px">
                    <IconButton size="small">
                      <ThumbUpIcon sx={{ fontSize: "17px" }} />
                    </IconButton>
                    <Typography fontSize="12px">20</Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap="2px">
                    <IconButton size="small">
                      <ThumbDownIcon sx={{ fontSize: "17px" }} />
                    </IconButton>
                    <Typography fontSize="12px">20</Typography>
                  </Box>

                  <IconButton size="small">
                    <CommentIcon sx={{ fontSize: "17px" }} />
                  </IconButton>
                </Box>

                {/* CHILD COMMENT */}

                <Box mt="10px" display="flex" gap="10px">
                  <Box>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      badgeContent={
                        <VerifiedRoundedIcon
                          htmlColor="#1673EE"
                          sx={{
                            fontSize: "12px",
                            backgroundColor: "#fff",
                            borderRadius: "100%",
                          }}
                        />
                      }
                    >
                      <Avatar
                        alt="Travis Howard"
                        sx={{ width: 28, height: 28 }}
                      />
                    </Badge>
                  </Box>

                  <Box width="100%">
                    <Box
                      display="flex"
                      width="100%"
                      justifyContent="space-between"
                    >
                      <Box
                        mb={0.2}
                        display="flex"
                        alignItems="center"
                        gap={0.4}
                      >
                        <Typography color="textDisabled">@namanama</Typography>
                      </Box>

                      <Typography color="textDisabled">1h ago</Typography>
                    </Box>
                    <Typography sx={{ color: color.dark_grey }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras vitae felis ligula. Sed venenatis nisl enim, nec
                      suscipit augue convallis vitae.
                    </Typography>

                    <Box display="flex" gap="10px" mt="5px" ml="-5px">
                      <Box display="flex" alignItems="center" gap="2px">
                        <IconButton size="small">
                          <ThumbUpIcon sx={{ fontSize: "17px" }} />
                        </IconButton>
                        <Typography fontSize="12px">20</Typography>
                      </Box>

                      <Box display="flex" alignItems="center" gap="2px">
                        <IconButton size="small">
                          <ThumbDownIcon sx={{ fontSize: "17px" }} />
                        </IconButton>
                        <Typography fontSize="12px">20</Typography>
                      </Box>

                      <IconButton size="small">
                        <CommentIcon sx={{ fontSize: "17px" }} />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box
              p="10px"
              display="flex"
              alignItems="center"
              gap="10px"
              sx={{
                borderTop: "0.5px solid",
                borderColor: color.light_grey,
              }}
            >
              <TextField
                id="outlined-basic"
                placeholder="Tambahkan komentar..."
                variant="outlined"
                size="small"
                multiline
                fullWidth
                sx={{ "& fieldset": { borderRadius: "10px !important" } }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small">
                          <SentimentSatisfiedAltRoundedIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <IconButton size="small">
                <SendRoundedIcon sx={{ fontSize: "30px", height: "30px" }} />
              </IconButton>
            </Box>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </Box>
  );
}

export default Bottombar;
