import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import moment from "moment";

function Post_profile(props) {
  const descriptionRef = React.useRef(null);
  const [expanded, setExpanded] = React.useState(false);

  const maxLength = 130;
  const commentText =
    `${props?.description}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
            impedit quisquam in atque consectetur labore dolores unde voluptate,
            iusto qui suscipit vero quibusdam aperiam deleniti facere minus
            consequatur, ducimus quas.` || "";
  const isLongComment = commentText?.length > maxLength;

  const shownText = expanded ? commentText : commentText.slice(0, maxLength);

  React.useEffect(() => {
    if (expanded && descriptionRef.current) {
      descriptionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [expanded]);

  return (
    <Grid
      container
      height="95px"
      paddingY="10px"
      justifyContent="space-between"
    >
      <Grid size={1}>
        <Avatar src={props?.profile?.photo} />
      </Grid>

      <Grid size={10.6}>
        <Box display="flex" width="100%" justifyContent="space-between">
          <Box mb={0} display="flex" alignItems="center" gap={0.4}>
            <Typography variant="h5">{props?.profile?.fullname}</Typography>
            <Typography color="textDisabled">
              @{props?.profile?.username}
            </Typography>
          </Box>

          <Typography color="textDisabled">
            {moment(props?.createdAt).fromNow()}
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ whiteSpace: "pre-line" }} ref={descriptionRef}>
            {shownText}
            {!expanded && isLongComment && "..."}
          </Typography>

          {isLongComment && (
            <Button
              onClick={() => setExpanded(!expanded)}
              size="small"
              color="inherit"
              sx={{
                minWidth: "fit-content",
                height: "0px",
                padding: "0px",
                textTransform: "lowercase",
                color: "#959595",
                mt: 0.5,
              }}
            >
              {expanded ? "Lebih sedikit" : "Selengkapnya"}
            </Button>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

export default Post_profile;
