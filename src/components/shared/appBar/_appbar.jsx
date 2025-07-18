import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

function Appbar() {
  return (
    <Box p={2} height="105px">
      <Box gap={1} display="flex" alignItems="center">
        <TextField
          id="outlined-basic"
          placeholder="Cari..."
          variant="outlined"
          size="small"
          type="search"
          fullWidth
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small">
                    <SearchRoundedIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <IconButton size="small">
          <Avatar />
        </IconButton>
      </Box>

      <Box
        mt={0.5}
        gap={2}
        display="flex"
        overflow="auto"
        justifyContent="space-between"
        sx={{ "&::-webkit-scrollbar": { display: "none" } }}
      >
        {React.Children.toArray(
          [
            "For You",
            "Following",
            "Trending",
            "Education",
            "News",
            "Travel",
          ].map((item) => (
            <Button
              key={item}
              size="small"
              color="inherit"
              sx={{
                fontWeight: item === "For You" ? 700 : 400,
                borderBottom: item === "For You" ? "2px solid #000000" : "none",
                borderRadius: 0,
                minHeight: "10px",
                minWidth: "fit-content",
              }}
            >
              {item}
            </Button>
          ))
        )}
      </Box>
    </Box>
  );
}

export default Appbar;
