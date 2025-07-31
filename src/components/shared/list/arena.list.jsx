import http from "@/lib/axios/http";
import { Avatar, Chip, Grid, Typography } from "@mui/material";
import React from "react";

function Arena_list({ photo, name, slug, user_arenas, id }) {
  const [hasFollow, setHasFollow] = React.useState(
    Boolean(user_arenas?.length)
  );

  const handleFollow = async () => {
    if (hasFollow) {
      await http.get(`/auth/profile/arena/${id}/leave`);
      setHasFollow(false);
    } else {
      await http.get(`/auth/profile/arena/${id}/join`);
      setHasFollow(true);
    }
  };

  return (
    <Grid
      container
      justifyContent="space-between"
      mb="15px"
      alignItems="center"
    >
      <Grid size={1}>
        <Avatar src={photo} />
      </Grid>
      <Grid size={8.2}>
        <Typography variant="h6" fontWeight={500}>
          {name}
        </Typography>
        <Typography variant="body2" fontSize="10px" color="#687684">
          @{slug}
        </Typography>
      </Grid>
      <Grid size={2}>
        <Chip
          variant={hasFollow ? "contained" : "outlined"}
          label={hasFollow ? "Unfollow" : "Follow"}
          color={"primary"}
          size="small"
          onClick={() => handleFollow()}
          sx={{ width: "100%" }}
        />
      </Grid>
    </Grid>
  );
}

export default Arena_list;
