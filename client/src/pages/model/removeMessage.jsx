import React from "react";
import Box from "@mui/material/Box";
import ".././chat/chat.css";
import Delete from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const RemoveMessage = ({ item, CurrentUser }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="model-card ">
          <div className="p-10">
            <h1 className=" text-xl mb-5">
              Are you sure you want to delete this message?
            </h1>
            <p className="mb-10 text-sm text-rose-500">
              Note : The message will Deleted permanently
            </p>
            <div className="flex items-center justify-end gap-5 ">
              <button
                onClick={handleClose}
                className="rounded-sm w-[25%] h-[50px] bg-inherit font-bold text-blue-600 hover:text-blue-400 duration-300"
              >
                Cancel
              </button>
              <button className="rounded-sm w-[25%] h-[50px] bg-blue-600 text-white hover:bg-blue-500 duration-300">
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
