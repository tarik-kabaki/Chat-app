import React, { useEffect, useState } from "react";
import Telegram from "@mui/icons-material/Telegram";
import AttachFile from "@mui/icons-material/AttachFile";
import CameraAltOutlined from "@mui/icons-material/CameraAltOutlined";
import Logout from "@mui/icons-material/Logout";
import axios from "axios";
import { useSelector } from "react-redux";
import un from "../../av/un.png";
import io from "socket.io-client";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [msgRes, setMsgRes] = useState([]);
  const [list, setList] = useState([]);
  const [receiver, setReceiver] = useState([]);
  const CurrentUser = useSelector((state) => state.user.CurrentUser);
  const FilteredUsers = users.filter((item) => item.id !== CurrentUser.id);
  const socket = io("http://localhost:3001");
  socket.emit("connection");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_LOCALHOST}users`)
      .then((res) => setUsers(res.data));
  }, []);

  useEffect(() => {
    socket.on("resp", (data) => {
      setList([...list, data]);
    });
  }, [socket]);

  const MessageForm = {
    author: CurrentUser.username,
    room: room.toString(),
    message: message,
    date: `${new Date(Date.now()).getHours()}:${new Date(
      Date.now()
    ).getMinutes()}`,
  };

  const handle = async () => {
    await socket.emit("room", { MessageForm });
  };

  const joinRoom = (user1, user2) => {
    socket.emit("join", { room: room });
    setRoom(user1.id + user2.id);
    setReceiver(user2);
  };

  return (
    <div className="w-full h-screen bg-gray-950 opacity-90 flex">
      <div className="lg:w-[400px] h-full  bg-opacity-30">
        <div className="w-full h-full">
          <div className="flex p-5">
            <img
              className="w-[90px] h-[90px] rounded-full object-contain"
              src={CurrentUser?.image ? CurrentUser.image : un}
            />
            <div className="p-4">
              <span className="text-bold text-violet-600 text-2xl font-bold">
                {CurrentUser.username.charAt(0).toUpperCase() +
                  CurrentUser.username.slice(1)}
              </span>
              <div className="flex items-center gap-2">
                <div className="w-[14px] h-[14px] bg-green-500 rounded-full"></div>
                <div className="text-white">Online</div>
              </div>
            </div>
          </div>
          <div className="p-5">
            <input
              className="p-3 w-full rounded-full focus:outline-none"
              type="text"
              placeholder="Search..."
            />
          </div>
          {FilteredUsers.map((item) => (
            <div>
              <div className="flex p-5">
                <div
                  className="flex w-[100%] p-3 rounded-xl hover:bg-white duration-300 cursor-pointer"
                  onClick={() => joinRoom(CurrentUser, item)}
                >
                  <img
                    className="w-[50px] h-[50px] rounded-full object-cover"
                    src={CurrentUser?.image ? CurrentUser.image : un}
                  />
                  <div className="pl-4 flex items-center">
                    <span className="text-md text-violet-600 font-bold">
                      {item.username.charAt(0).toUpperCase() +
                        item.username.slice(1)}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="text-gray-500 text-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center ">
                <hr className=" border-gray-700 w-[90%]" />
              </div>
            </div>
          ))}
        </div>

        <div className=" absolute bottom-0 left-0">
          <div className="p-2 bg-black rounded-tr-2xl gap-3 flex items-center">
            <div>
              <Logout className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {receiver.length < 1 ? (
        <div className="lg:w-full h-full bg-violet-950 p-10 relative"></div>
      ) : (
        <div className="lg:w-full h-full bg-gray-900 opacity-80  relative">
          <div className="flex mb-5 bg-gray-950  p-10">
            <img
              className="w-[90px] h-[90px] rounded-full object-cover"
              src={CurrentUser?.image ? CurrentUser.image : un}
            />
            <div className="p-3">
              <div className="text-bold text-orange-500 text-2xl font-bold mb-1">
                {receiver.username.charAt(0).toUpperCase() +
                  receiver.username.slice(1)}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-[14px] h-[14px] bg-green-500 rounded-full"></div>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>

          <div className="h-[70%] overflow-hidden overflow-y-scroll">
            {list.map((chat) => (
              <div className=" p-5">
                <div
                  className={
                    chat.data.MessageForm.author === CurrentUser.username
                      ? "flex justify-start"
                      : "flex justify-end"
                  }
                >
                  <section
                    className={
                      chat.data.MessageForm.author === CurrentUser.username
                        ? "p-5 bg-gray-950 opacity-90 rounded-xl"
                        : "p-5 bg-white rounded-xl"
                    }
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <img
                        className="w-[30px] h-[30px] rounded-full object-cover"
                        src={CurrentUser?.image ? CurrentUser.image : un}
                      />
                      <span className="text-blue-600 font-bold">
                        {chat.data.MessageForm.author}
                      </span>
                      <div className="w-[12px] h-[12px] bg-violet-500 rounded-full"></div>
                    </div>
                    <p
                      className={
                        chat.data.MessageForm.author === CurrentUser.username
                          ? "text-white mb-2"
                          : "text-black mb-2"
                      }
                    >
                      {" "}
                      {chat.data.MessageForm.message}
                    </p>
                    <div
                      className={
                        chat.data.MessageForm.author === CurrentUser.username
                          ? "text-gray-400 flex justify-end"
                          : "text-black flex justify-end"
                      }
                    >
                      {chat.data.MessageForm.date}
                    </div>
                  </section>
                </div>
              </div>
            ))}
          </div>

          <div className=" absolute bottom-0 p-5 w-[100%] flex  items-center gap-5 ">
            <input
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write Somthing"
              className="p-4 w-[90%] rounded-full focus:outline-none"
            />
            <div className="flex gap-3">
              <div className="p-2 rounded-full bg-slate-300 bg-opacity-50">
                <AttachFile />
              </div>
              <div className="p-2 rounded-full bg-slate-300 bg-opacity-50">
                <CameraAltOutlined />
              </div>
              <button
                className="p-2 rounded-full bg-green-500 hover:bg-green-700 duration-300"
                onClick={handle}
              >
                <Telegram className="text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
