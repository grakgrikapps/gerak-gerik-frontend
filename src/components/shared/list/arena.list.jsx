import { Avatar, Chip, Grid, Typography } from "@mui/material";
import React from "react";

function Arena_list({ photo, name, slug }) {
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
          variant="outlined"
          label="Follow"
          size="small"
          onClick={() => {}}
          sx={{ width: "100%" }}
        />
      </Grid>
    </Grid>
  );
}

export default Arena_list;
