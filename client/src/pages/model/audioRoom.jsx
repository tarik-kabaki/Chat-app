import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const AudioRoom = ({ socket }) => {
  const [open, setOpen] = React.useState(false);
  const [callAcc, setCallAcc] = useState(false);
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    socket.on("callAccepted", (dataCall) => {
      if (dataCall.userCallAccept === true) {
        handleOpen();
        socket.emit("CallReq", dataCall);
      }
    });
  }, [socket]);

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="audioRoomCard"></Box>
      </Modal>
    </div>
  );
};

export default AudioRoom;
