import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import moment from "moment";

function Post_profile(props) {
  return (
    <Box display="flex" width="100%" gap={1} height="95px" paddingY="10px">
      <Avatar src={props?.profile?.photo} />

      <Box width="100%">
        <Box display="flex" width="100%" justifyContent="space-between">
          <Box mb={0} display="flex" alignItems="center" gap={0.4}>
            <Typography variant="h5">{props?.profile?.fullname}</Typography>
            {/* <VerifiedRoundedIcon
              htmlColor="#1673EE"
              sx={{ fontSize: "14px" }}
            /> */}
            <Typography color="textDisabled">
              @{props?.profile?.username}
            </Typography>
          </Box>

          <Typography color="textDisabled">
            {moment(props?.createdAt).fromNow()}
          </Typography>
        </Box>
        <Typography className="text-2-line">{props?.description}</Typography>
      </Box>
    </Box>
  );
}

export default Post_profile;
