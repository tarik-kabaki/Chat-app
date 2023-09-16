import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import ".././chat/chat.css";
import Delete from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { handleRemoveRoomMessage } from "../../redux/roomSlice";
import { handleRemoveUsersMessages } from "../../redux/userSlice";
import axios from "axios";

const RemoveMessage = ({ item, CurrentUser, receiver, socket }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const CurrentRoom = useSelector((state) => state.room.Room);
  const dispatch = useDispatch();

  const handleMessagesRemove = () => {
    axios.delete(
      `${process.env.REACT_APP_LOCALHOST}messages/removeMsg/${item.id}`
    );
    socket.emit("messageRemoveRequest", {
      msgData: item,
      sender: CurrentUser,
      receiver: receiver,
      room: CurrentRoom,
    });
    dispatch(handleRemoveRoomMessage({ messageId: item.id }));
    dispatch(handleRemoveUsersMessages({ receiver: receiver, msgData: item }));
    handleClose();
  };

  return (
    <div>
      {item.users.id === CurrentUser.id ? (
        <button
          onClick={handleOpen}
          className={
            item.users.id === CurrentUser.id
              ? "more absolute top-[50%] right-[-50px] text-gray-400 hover:text-rose-500 duration-300"
              : "more absolute top-[50%] left-[-50px] text-gray-400 hover:text-rose-500 duration-300"
          }
        >
          <Delete />
        </button>
      ) : null}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="model-card ">
          <div className="p-10">
            <h1 className=" text-xl mb-3">
              Are you sure you want to Delete this message?
            </h1>
            <p className="mb-10 text-md text-rose-500">
              Note : The message will be Deleted permanently !
            </p>
            <div className="flex items-center justify-end gap-5 ">
              <button
                onClick={handleClose}
                className="rounded-sm w-[25%] h-[50px] bg-inherit font-bold text-blue-600 hover:text-blue-400 duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleMessagesRemove}
                className="rounded-sm w-[25%] h-[50px] bg-blue-600 text-white hover:bg-blue-500 duration-300"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default RemoveMessage;
