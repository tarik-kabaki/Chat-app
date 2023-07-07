import React, { useEffect, useState } from "react";
import Telegram from "@mui/icons-material/Telegram";
import AttachFile from "@mui/icons-material/AttachFile";
import axios from "axios";

const Chat = ({ CurrentUser, room }) => {
  return (
    <div className="w-[80%] h-full bg-gray-200 relative">
      <div className="w-full">
        <div className="h-[100px] bg-opacity-30 border-b-[0.5px] border-gray-300">
          <div className="gap-5 p-10 flex items-center h-full w-full">
            <div className="w-[60px] h-[60px] rounded-full bg-white"></div>
            <section>
              <span className="text-2xl text-slate-600">Anass sindab</span>
              <div className="flex gap-2 items-center ">
                <div className="w-[10px] h-[10px] rounded-full bg-green-500"></div>
                <span className="text-gray-500 text-sm">Online</span>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="h-[80%] bg-gray-200 p-10 ">
        <div className="flex gap-3 mb-10">
          <section className="bg-white p-5 rounded-xl shadow-xl">
            <div className="mb-5 flex items-center gap-3">
              <span className=" text-rose-600">Tarik kabaki</span>
              <div className="w-[30px] h-[30px] rounded-full bg-gray-300"></div>
            </div>
            <p className="mb-3">Hello world !</p>
            <div className="flex justify-end text-gray-500">13:46</div>
          </section>
        </div>

        <div className="flex gap-3 ">
          <section className="bg-gray-700 p-5 rounded-xl shadow-xl">
            <div className="mb-5 flex items-center gap-3">
              <span className=" text-cyan-400">Anass sindab</span>
              <div className="w-[30px] h-[30px] rounded-full bg-gray-300"></div>
            </div>
            <p className="mb-3 text-white">Hello world !</p>
            <div className="flex justify-end text-gray-300">13:46</div>
          </section>
        </div>
      </div>

      <div className="absolute bottom-0 h-[90px] w-full bg-white p-5">
        <div className="h-full w-full flex items-center">
          <input
            className="w-[80%] p-4 text-lg focus:outline-none"
            placeholder="Write something to send ..."
          />
          <div className="w-[20%] flex items-center justify-end gap-3 p-5">
            <div className="p-2 rounded-full bg-slate-400 text-white">
              <AttachFile />
            </div>
            <div className="p-2 rounded-full bg-green-500 text-white">
              <Telegram />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
