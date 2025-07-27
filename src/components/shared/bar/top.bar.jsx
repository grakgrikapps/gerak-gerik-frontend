import React from "react";
import SearchIcon from "../icons/search";
import { Avatar, Box, Container, Button, IconButton } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";

function Top_bar() {
  const profile = useSelector((state) => state.auth.profile);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      py="10px"
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        <Link href="/profile">
          <IconButton size="small">
            <Avatar sizes="small" src={profile?.photo} />
          </IconButton>
        </Link>

        <Box
          mt={0.5}
          gap={2}
          display="flex"
          overflow="auto"
          justifyContent="space-between"
          sx={{ "&::-webkit-scrollbar": { display: "none" } }}
        >
          {React.Children.toArray(
            ["For You", "Following", "Trending", "Education"].map((item) => (
              <Button
                key={item}
                size="small"
                color="inherit"
                sx={{
                  fontWeight: item === "For You" ? 700 : 400,
                  borderBottom:
                    item === "For You" ? "2px solid #000000" : "none",
                  borderRadius: 0,
                  minHeight: "0px",
                  minWidth: "fit-content",
                  fontSize: "14px",
                  textTransform: "capitalize",
                }}
              >
                {item}
              </Button>
            ))
          )}
        </Box>

        <IconButton size="small">
          <SearchIcon color="#999DA3" />
        </IconButton>
      </Container>
    </Box>
  );
}

export default Top_bar;
