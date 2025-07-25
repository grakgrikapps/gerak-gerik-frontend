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
import { useRouter } from "next/navigation";
import Link from "next/link";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Profile_Page() {
  const [value, setValue] = React.useState(0);

  const router = useRouter();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {/* Header */}
      <Box height="350px">
        {/* Header Background */}
        <Box
          height="120px"
          display="flex"
          alignItems="center"
          sx={{ backgroundColor: "lightgray" }}
        >
          <Container>
            <IconButton
              size="small"
              sx={{ backgroundColor: "#00000055", marginTop: "-20px" }}
              onClick={() => router.push('/home')}
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
              />

              <Chip
                label="Edit Profile"
                variant="outlined"
                size="small"
                sx={{ borderRadius: "4px", border: "1px solid #000000" }}
                onClick={() => router.push('/profile/edit')}
              />
            </Box>

            {/* Content */}
            <Box>
              <Typography variant="h5">Pixsellz</Typography>
              <Typography
                variant="body1"
                color="#687684"
                fontSize="14px"
                sx={{ mt: "1px", mb: "5px" }}
              >
                @pixsellz
              </Typography>
              <Typography variant="body2" color="#141619" fontSize="12px">
                Digital Goodies Team is a digital community built for learners,
                thinkers, and builders in the crypto space, this is where we
                grow and move forward
              </Typography>
            </Box>

            {/* Following & Followers */}
            <Box display="flex" mt="10px" gap="20px">
              <Box display="flex" gap="5px" alignItems="center">
                <Typography variant="h6">217</Typography>
                <Typography>Following</Typography>
              </Box>

              <Box display="flex" gap="5px" alignItems="center">
                <Typography variant="h6">217</Typography>
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
                  <Tab label="Replies" {...a11yProps(1)} />
                  <Tab label="Bookmarks" {...a11yProps(2)} />
                </Tabs>
              </Box>
            </Container>
          </Box>
        </Box>
      </Box>

      {/* Content */}
      <Container>
        <Box my="20px" display="flex" flexDirection="column" gap="30px">
          {[...new Array(10)].map((item) => (
            <Card_Post />
          ))}
        </Box>
      </Container>
    </>
  );
}

export default Profile_Page;
