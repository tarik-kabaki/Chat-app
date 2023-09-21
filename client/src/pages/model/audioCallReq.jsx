import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Call from "@mui/icons-material/Call";
import ClearRounded from "@mui/icons-material/ClearRounded";
import Modal from "@mui/material/Modal";
import un from "../../av/un.png";
import "../model/model.css";

const AudioCallReq = ({ callData, socket }) => {
  const [open, setOpen] = React.useState(false);
  //const handleOpen = () => setOpen(true);

  useEffect(() => {
    if (callData === null) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [callData]);

  const handleClose = () => {
    setOpen(false);
    callData(null);
  };

  return (
    <div>
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
                <img className="object-cover" />
              </div>
            </section>
            <div className="text-2xl flex justify-center text-white gap-2">
              <span>l</span>
              <span>l</span>
            </div>
            <section className="flex justify-center mb-10">
              {" "}
              <div className="text-sm flex justify-center text-orange-500">
                <span>#</span>
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

export default AudioCallReq;
