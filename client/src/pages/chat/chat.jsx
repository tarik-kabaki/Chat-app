import React, { useEffect, useState } from "react";
import Telegram from "@mui/icons-material/Telegram";
import AttachFile from "@mui/icons-material/AttachFile";
import image5 from "../../images/image5.png";
import un from "../../av/un.png";
import axios from "axios";

const Chat = ({ CurrentUser, room }) => {
  const [message, setMessage] = useState("");

  const HandleMessage = () => {
    axios
      .post(
        `${process.env.REACT_APP_LOCALHOST}messages/create/${CurrentUser.id}`,
        {
          roomId: room.id,
          messages: message,
        }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-[80%] h-full bg-gray-100 relative">
      {room ? (
        <div className="w-full h-full">
          <div className="w-full">
            <div className="h-[100px] bg-opacity-30 border-b-[0.5px]  border-gray-300">
              <div className="gap-5 p-10 flex items-center h-full w-full">
                <div className="w-[60px] h-[60px] rounded-full bg-white"></div>
                <section>
                  <span className="text-2xl text-slate-600">
                    {room.user2.username.charAt(0).toUpperCase() +
                      room.user2.username.slice(1)}
                  </span>
                  <div className="flex gap-2 items-center ">
                    <div className="w-[10px] h-[10px] rounded-full bg-green-500"></div>
                    <span className="text-gray-500 text-sm">Online</span>
                  </div>
                </section>
              </div>
            </div>
          </div>

          <div className="h-[80%] bg-gray-200 p-10 overflow-y-scroll overflow-hidden">
            {room.messages.map((item) => (
              <div
                className={
                  item.users.id === CurrentUser.id
                    ? "flex justify-start gap-3 mb-10"
                    : "flex justify-end gap-3 mb-10"
                }
              >
                <section
                  className={
                    item.users.id === CurrentUser.id
                      ? "bg-white p-5 rounded-xl shadow-xl"
                      : "bg-gray-700 p-5 rounded-xl shadow-xl"
                  }
                >
                  <div className="mb-5 flex items-center gap-3">
                    <span
                      className={
                        item.users.id === CurrentUser.id
                          ? " text-rose-600"
                          : " text-cyan-400"
                      }
                    >
                      {item.users.username.charAt(0).toUpperCase() +
                        item.users.username.slice(1)}
                    </span>
                    <img
                      src={item?.users?.image ? item.users.image : un}
                      className="w-[30px] h-[30px] rounded-full object-contain bg-gray-100"
                    />
                  </div>
                  <p
                    className={
                      item.users.id === CurrentUser.id
                        ? "mb-3 text-gray-700"
                        : "mb-3 text-slate-100"
                    }
                  >
                    {item.message}
                  </p>
                  <div
                    className={
                      item.users.id === CurrentUser.id
                        ? "flex justify-end text-gray-500"
                        : "flex justify-end text-gray-300"
                    }
                  >{`${new Date(item.createdAt).getHours()}:${new Date(
                    item.createdAt
                  ).getMinutes()}`}</div>
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
                <div className="p-2 rounded-full bg-slate-400 text-white">
                  <AttachFile />
                </div>
                <div
                  onClick={HandleMessage}
                  className="p-2 rounded-full bg-green-500 text-white"
                >
                  <Telegram />
                </div>
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
