import React from "react";
import Box from "@mui/material/Box";
import Call from "@mui/icons-material/Call";
import ClearRounded from "@mui/icons-material/ClearRounded";
import Modal from "@mui/material/Modal";
import un from "../../av/un.png";
import "../model/model.css";

const AudioCall = ({ CurrentUser, receiver, socket }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log(receiver);

  return (
    <div>
      <button
        onClick={handleOpen}
        className="bg-blue-500 text-white rounded-full w-10 h-10 flex justify-center items-center overflow-hidden hover:opacity-70 duration-300"
      >
        <Call />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="audioCallingCard">
          <div className="w-full h-full">
            <section className="flex justify-center mt-14 mb-5">
              <div className="w-36 h-36 rounded-full overflow-hidden flex justify-center items-center border-2 border-white">
                <img
                  className="object-cover"
                  src={
                    receiver?.image
                      ? `${process.env.REACT_APP_LOCALHOST}users/upload/${receiver.image}`
                      : un
                  }
                />
              </div>
            </section>
            <div className="text-2xl flex justify-center text-white gap-2">
              <span>
                {receiver.firstname.charAt(0).toUpperCase() +
                  receiver.firstname.slice(1)}
              </span>
              <span>
                {receiver.lastname.charAt(0).toUpperCase() +
                  receiver.lastname.slice(1)}
              </span>
            </div>
            <section className="flex justify-center mb-10">
              {" "}
              <div className="text-sm flex justify-center text-orange-500">
                <span>
                  #
                  {receiver.username.charAt(0).toUpperCase() +
                    receiver.username.slice(1)}
                </span>
              </div>
            </section>
            <section className="mb-14 flex justify-center text-md text-blue-400">
              Calling…
            </section>
            <section className="flex justify-center">
              <div className="w-[40%]">
                <section className="flex justify-center">
                  <button
                    onClick={handleClose}
                    className="hover:text-red-500 duration-200 rounded-full w-14 h-14 bg-white flex justify-center items-center"
                  >
                    <ClearRounded />
                  </button>
                </section>
              </div>
            </section>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AudioCall;

/*  <button className="rounded-full w-14 h-14 bg-white flex justify-center items-center">
                    <Call />
                  </button> */
