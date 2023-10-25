import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Call from "@mui/icons-material/Call";
import CallEnd from "@mui/icons-material/CallEnd";
import Modal from "@mui/material/Modal";
import un from "../../av/un.png";
import "../model/model.css";
import Peer from "simple-peer";
import { useDispatch, useSelector } from "react-redux";
import { handleAudioCall, handleAudioCallEnd } from "../../redux/userSlice";

const AudioCall = ({ CurrentUser, receiver, socket, callData }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnd, setCallEnd] = useState(false);
  const [calling, setCalling] = useState(false);
  const [stream, setStream] = useState();
  const open = useSelector((state) => state.user.audioCalling);
  const MyAudioCall = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("callReceiver", (data) => {
      if (data === null) {
        dispatch(handleAudioCallEnd());
      } else {
        dispatch(handleAudioCall());
      }
    });
  }, [socket]);

  useEffect(() => {
    socket.on("callAccepted", (data) => {
      if (data.userCallAccept) {
        setCallAccepted(true);
      } else {
        setCallAccepted(false);
      }
    });
  }, [socket]);

  const handleAnswerCall = () => {
    setCallAccepted(true);
    socket.emit("callAcceptedReq", {
      caller: callData.receiver,
      receiver: callData.caller,
    });
  };

  const handleClose = () => {
    dispatch(handleAudioCallEnd());
    socket.emit("EndAudioCall", { caller: CurrentUser, receiver: receiver });
  };

  const audioCallCancel = () => {
    dispatch(handleAudioCallEnd());
    socket.emit("EndAudioCall", {
      caller: callData.receiver,
      receiver: callData.caller,
    });
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="audioCallingCard">
          {callAccepted ? (
            <div>record</div>
          ) : (
            <div className="w-full h-full">
              <section className="flex justify-center mt-14 mb-5">
                <div className="w-36 h-36 rounded-full overflow-hidden flex justify-center items-center border-2 border-white">
                  {callData === null ? (
                    <img
                      className="object-cover"
                      src={
                        receiver?.image
                          ? `${process.env.REACT_APP_LOCALHOST}users/upload/${receiver.image}`
                          : un
                      }
                    />
                  ) : (
                    <img
                      className="object-cover"
                      src={
                        callData?.caller.image
                          ? `${process.env.REACT_APP_LOCALHOST}users/upload/${callData.caller.image}`
                          : un
                      }
                    />
                  )}
                </div>
              </section>
              {callData === null ? (
                <div className="text-2xl flex justify-center text-white gap-2">
                  <span>
                    {receiver?.firstname.charAt(0).toUpperCase() +
                      receiver?.firstname.slice(1)}
                  </span>
                  <span>
                    {receiver?.lastname.charAt(0).toUpperCase() +
                      receiver?.lastname.slice(1)}
                  </span>
                </div>
              ) : (
                <div className="text-2xl flex justify-center text-white gap-2">
                  <span>
                    {callData.caller?.firstname.charAt(0).toUpperCase() +
                      callData.caller?.firstname.slice(1)}
                  </span>
                  <span>
                    {callData.caller?.lastname.charAt(0).toUpperCase() +
                      callData.caller?.lastname.slice(1)}
                  </span>
                </div>
              )}

              <section className="flex justify-center mb-10">
                {" "}
                <div className="text-sm flex justify-center text-orange-500">
                  {callData === null ? (
                    <span>
                      #
                      {receiver?.username.charAt(0).toUpperCase() +
                        receiver?.username.slice(1)}
                    </span>
                  ) : (
                    <span>
                      #
                      {callData.caller?.username.charAt(0).toUpperCase() +
                        callData.caller?.username.slice(1)}
                    </span>
                  )}
                </div>
              </section>

              <section className="mb-14 flex justify-center text-md text-blue-400">
                <audio autoPlay ref={MyAudioCall} />
              </section>

              {callData === null ? (
                <section className="flex justify-center">
                  <div className="w-[40%]">
                    <section className="flex justify-center">
                      <button
                        onClick={handleClose}
                        className="bg-red-500 text-white hover:opacity-70 duration-200 rounded-full w-14 h-14  flex justify-center items-center"
                      >
                        <CallEnd />
                      </button>
                    </section>
                  </div>
                </section>
              ) : (
                <section className="flex justify-center">
                  <div className="w-[40%]">
                    <section className="flex justify-center items-center gap-10">
                      <button
                        onClick={handleAnswerCall}
                        className="hover:opacity-70 text-white bg-green-500 duration-200 rounded-full w-14 h-14  flex justify-center items-center"
                      >
                        <Call />
                      </button>
                      <button
                        onClick={audioCallCancel}
                        className="hover:opacity-70 text-white bg-red-500 duration-200 rounded-full w-14 h-14  flex justify-center items-center"
                      >
                        <CallEnd />
                      </button>
                    </section>
                  </div>
                </section>
              )}
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AudioCall;
