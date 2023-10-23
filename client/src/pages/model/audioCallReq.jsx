import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Call from "@mui/icons-material/Call";
import ClearRounded from "@mui/icons-material/ClearRounded";
import Modal from "@mui/material/Modal";
import un from "../../av/un.png";
import CallEnd from "@mui/icons-material/CallEnd";
import "../model/model.css";
import Peer from "simple-peer";
import { useSelector } from "react-redux";

const AudioCallReq = ({ callData, socket }) => {
  const [open, setOpen] = React.useState(false);
  const [stream, setStream] = useState();
  const [signal, setSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  useEffect(() => {
    if (callData === null) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [callData]);

  const handleClose = () => {
    setOpen(false);
    socket.emit("EndAudioCall", {
      caller: callData.receiver,
      receiver: callData.caller,
    });
  };

  const CallAnswer = () => {
    socket.emit("callAcceptedReq", {
      caller: callData.receiver,
      receiver: callData.caller,
    });
    setCallAccepted(true);
  };

  const UserAudioCall = useRef();

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="audioCallingCard">
          <div className="w-full h-full">
            <section className="flex justify-center mt-14 mb-5">
              <div className="w-36 h-36 rounded-full overflow-hidden flex justify-center items-center border-2 border-white">
                <img
                  className="object-cover"
                  src={`${process.env.REACT_APP_LOCALHOST}users/upload/${callData?.caller?.image}`}
                />
              </div>
            </section>
            <div className="text-2xl flex justify-center text-white gap-2">
              <span>
                {callData?.caller?.firstname.charAt(0).toUpperCase() +
                  callData?.caller?.firstname.slice(1)}
              </span>
              <span>
                {callData?.caller?.lastname.charAt(0).toUpperCase() +
                  callData?.caller?.lastname.slice(1)}
              </span>
            </div>
            <section className="flex justify-center mb-10">
              {" "}
              <div className="text-sm flex justify-center text-orange-500">
                <span>
                  #
                  {callData?.caller?.username.charAt(0).toUpperCase() +
                    callData?.caller?.username.slice(1)}
                </span>
              </div>
            </section>

            <section className="mb-14 gap-1 flex justify-center text-md text-blue-400">
              <audio autoPlay ref={UserAudioCall} />
            </section>

            <section className="flex justify-center">
              <div className="w-[40%]">
                <section className="flex justify-center items-center gap-10">
                  <button
                    onClick={CallAnswer}
                    className="hover:opacity-70 text-white bg-green-500 duration-200 rounded-full w-14 h-14  flex justify-center items-center"
                  >
                    <Call />
                  </button>
                  <button
                    onClick={handleClose}
                    className="hover:opacity-70 text-white bg-red-500 duration-200 rounded-full w-14 h-14  flex justify-center items-center"
                  >
                    <CallEnd />
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
