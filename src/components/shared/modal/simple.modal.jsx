import React from "react";
import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setModal } from "@/lib/rtk/features/global/globalSlice";

function SimpleModal() {
  const global = useSelector((state) => state.globals);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setModal({ enabled: false }));
  };

  const handleSubmit = () => {
    switch (global?.modal?.type) {
      case "logout":
        break;

      default:
        break;
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      open={global.modal.enabled}
      maxWidth="xs"
      fullWidth
    >
      <DialogContent>
        <Typography variant="h4" textAlign="center" gutterBottom>
          {global?.modal?.title}
        </Typography>
        <Typography textAlign="center" component="div" fontSize="14px">
          <span dangerouslySetInnerHTML={{ __html: global?.modal?.body }} />
        </Typography>

        <Box display="flex" gap="10px" mt="20px">
          <Button
            color="inherit"
            variant="outlined"
            size="large"
            onClick={handleClose}
            fullWidth
          >
            {global?.modal?.buttonCancel}
          </Button>
          <Button
            variant="contained"
            size="large"
            color="inherit"
            onClick={global?.modal?.handleSubmit}
            fullWidth
          >
            {global?.modal?.buttonAccept}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default SimpleModal;
