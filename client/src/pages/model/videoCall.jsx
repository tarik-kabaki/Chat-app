import React from "react";
import Videocam from "@mui/icons-material/Videocam";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "../model/model.css";

const VideoCall = ({ CurrentUser, receiver, socket }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        onClick={handleOpen}
        className="bg-blue-500 text-white rounded-full w-10 h-10 flex justify-center items-center overflow-hidden hover:opacity-70 duration-300"
      >
        <Videocam />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="videoCallingCard">
          <div>video call</div>
        </Box>
      </Modal>
    </div>
  );
};

export default VideoCall;
