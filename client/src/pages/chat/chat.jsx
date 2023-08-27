import React, { useEffect, useState } from "react";
import Telegram from "@mui/icons-material/Telegram";
import AttachFile from "@mui/icons-material/AttachFile";
import image5 from "../../images/image5.png";
import un from "../../av/un.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { handleCustomRoom, handleRoomMessages } from "../../redux/roomSlice";
import "../dashboard/dash.css";
import "./chat.css";
import RemoveMessage from "../model/removeMessage";
import { handleRemoveRoomMessage } from "../../redux/roomSlice";
import { handleRemoveUsersMessages } from "../../redux/userSlice";
import EmojiPicker from "emoji-picker-react";
import { handleUsersMessages } from "../../redux/userSlice";

const Chat = ({ CurrentUser, receiver, socket, isOnline }) => {
  const [message, setMessage] = useState("");
  const room = useSelector((state) => state.room.Room);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("resMessageRemoveRequest", (data) => {
      dispatch(handleRemoveRoomMessage({ messageId: data.msgData.id }));
      dispatch(
        handleRemoveUsersMessages({
          receiver: data.receiver.id,
          msgData: data.msgData.id,
        })
      );
    });
  }, [socket]);

  const HandleMessage = () => {
    axios
      .post(
        `${process.env.REACT_APP_LOCALHOST}messages/create/${CurrentUser.id}`,
        {
          roomId: room.id,
          messages: message,
        }
      )
      .then((res) => {
        dispatch(handleRoomMessages(res.data));

        socket.emit("sendMessage", res.data);
        //dispatch(handleUsersMessages({ ...res.data, to: receiver.id }))
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    socket.on("responeData", (data) => {
      dispatch(handleCustomRoom(data));
      console.log(data);
    });
  }, [socket]);

  return (
    <div className="w-[80%] h-full bg-gray-100 relative">
      {room ? (
        <div className="w-full h-full">
          <div className="w-full">
            <div className="h-[120px] bg-opacity-30 shadow-gray-800 shadow-2xl">
              <div className="flex h-full w-full p-5 pl-10">
                <div className="w-[80px] h-[80px] border-2 border-white shadow-gray-500 shadow-sm rounded-full overflow-hidden">
                  <img
                    src={
                      receiver?.image
                        ? `${process.env.REACT_APP_LOCALHOST}users/upload/${receiver.image}`
                        : un
                    }
                    className="object-cover bg-white w-[80px] h-[80px] "
                  />
                </div>

                <section className="p-2">
                  <div className="text-2xl text-slate-600 flex items-center gap-1">
                    <span>
                      {receiver.firstname.charAt(0).toUpperCase() +
                        receiver.firstname.slice(1)}
                    </span>
                    <span>
                      {receiver.lastname.charAt(0).toUpperCase() +
                        receiver.lastname.slice(1)}
                    </span>
                  </div>
                  <div className=" text-orange-500 flex items-center gap-1">
                    <span>
                      #.
                      {receiver.username.charAt(0).toUpperCase() +
                        receiver.username.slice(1)}
                    </span>
                  </div>
                  {isOnline ? (
                    <div className="flex gap-2 items-center ">
                      <div className="w-[10px] h-[10px] rounded-full bg-green-500"></div>
                      <span className="text-gray-500 text-sm">Online</span>
                    </div>
                  ) : null}
                </section>
              </div>
            </div>
          </div>

          <div className="h-[80%] bg-gray-200 p-10 overflow-y-scroll overflow-hidden">
            {room.messages.map((item, key) => (
              <div
                key={key}
                className={
                  item.users.id === CurrentUser.id
                    ? " more-c flex justify-start gap-3 mb-10"
                    : " more-c flex justify-end gap-3 mb-10"
                }
              >
                <section
                  className={
                    item.users.id === CurrentUser.id
                      ? " bg-white p-5 rounded-lg shadow-xl relative max-w-[60%]"
                      : " bg-gray-700 p-5 rounded-lg shadow-xl relative max-w-[60%]"
                  }
                >
                  <div className="mb-5 flex items-center gap-2">
                    <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
                      <img
                        src={
                          item?.users?.image
                            ? `${process.env.REACT_APP_LOCALHOST}users/upload/${item.users.image}`
                            : un
                        }
                        className="object-cover w-[30px] h-[30px]"
                      />
                    </div>
                    <span
                      className={
                        item.users.id === CurrentUser.id
                          ? " text-orange-500 flex items-center gap-1"
                          : " text-purple-400 flex items-center gap-1"
                      }
                    >
                      <span>
                        {item.users.firstname.charAt(0).toUpperCase() +
                          item.users.firstname.slice(1)}
                      </span>
                      <span>
                        {item.users.lastname.charAt(0).toUpperCase() +
                          item.users.lastname.slice(1)}
                      </span>
                    </span>
                  </div>
                  <p
                    className={
                      item.users.id === CurrentUser.id
                        ? "mb-3 text-gray-700"
                        : "mb-3 text-slate-100"
                    }
                  >
                    {item?.message}
                  </p>
                  <div
                    className={
                      item.users.id === CurrentUser.id
                        ? "flex justify-end text-gray-500 text-sm"
                        : "flex justify-end text-gray-300 text-sm"
                    }
                  >{`${
                    new Date(item.createdAt).getHours() === 0
                      ? "00"
                      : new Date(item.createdAt).getHours()
                  }:${
                    (new Date(item.createdAt).getMinutes() < 10 ? "0" : "") +
                    new Date(item.createdAt).getMinutes()
                  } 
                    
                  `}</div>
                  <RemoveMessage
                    item={item}
                    CurrentUser={CurrentUser}
                    socket={socket}
                    receiver={receiver}
                  />
                </section>
              </div>
            ))}
          </div>

          <div className="absolute bottom-0 h-[90px] w-full bg-white p-5">
            <div className="h-full w-full flex items-center">
              <input
                onChange={(e) => setMessage(e.target.value)}
                className="w-[80%] p-4 text-lg focus:outline-none"
                placeholder="Write something to send ..."
              />
              <div className="w-[20%] flex items-center justify-end gap-3 p-5">
                <button className="p-2 rounded-full bg-slate-400 text-white hover:bg-gray-600 duration-300">
                  <AttachFile />
                </button>

                <button
                  onClick={HandleMessage}
                  className="p-2 rounded-full bg-emerald-500 text-white hover:bg-emerald-700 duration-300"
                >
                  <Telegram />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full bg-gray-100 flex justify-center items-center">
          <section>
            <img src={image5} className="w-[550px] h-[550px] object-contain" />
            <div className="flex justify-center text-4xl text-gray-500 font-bold">
              Select a User to start chat with !
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Chat;

/**<div className="flex gap-3 ">
              <section className="bg-gray-700 p-5 rounded-xl shadow-xl">
                <div className="mb-5 flex items-center gap-3">
                  <span className=" text-cyan-400">Anass sindab</span>
                  <div className="w-[30px] h-[30px] rounded-full bg-gray-300"></div>
                </div>
                <p className="mb-3 text-white">Hello world !</p>
                <div className="flex justify-end text-gray-300">13:46</div>
              </section>
            </div> */

/*
            {new Date(item.createdAt).toISOString().split("T")[0]} */
