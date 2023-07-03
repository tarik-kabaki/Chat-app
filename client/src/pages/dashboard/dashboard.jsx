import React, { useEffect, useState } from "react";
import Telegram from "@mui/icons-material/Telegram";
import AttachFile from "@mui/icons-material/AttachFile";
import CameraAltOutlined from "@mui/icons-material/CameraAltOutlined";
import Logout from "@mui/icons-material/Logout";
import axios from "axios";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const CurrentUser = useSelector((state) => state.user.CurrentUser);
  const FilteredUsers = users.filter((item) => item.id !== CurrentUser.id);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_LOCALHOST}users`)
      .then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="w-full h-screen bg-gray-200 flex">
      <div className="lg:w-[400px] h-full bg-gray-200 bg-opacity-30">
        <div className="w-full h-full">
          <div className="flex p-5">
            <div className="w-[90px] h-[90px] rounded-full bg-black"></div>
            <div className="p-4">
              <span className="text-bold text-violet-600 text-2xl font-bold">
                {CurrentUser.username.charAt(0).toUpperCase() +
                  CurrentUser.username.slice(1)}
              </span>
              <div className="flex items-center gap-2">
                <div className="w-[14px] h-[14px] bg-green-500 rounded-full"></div>
                <div className="text-gray-500">Online</div>
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
            <div className="flex p-5">
              <div className="w-[70px] h-[70px] rounded-full bg-black"></div>
              <div className="p-1 pl-4">
                <span className="text-bold text-violet-600 font-bold">
                  {item.username.charAt(0).toUpperCase() +
                    item.username.slice(1)}
                </span>
                <div className="flex items-center gap-2">
                  <div className="text-gray-500">Hellow</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className=" absolute bottom-0 left-0">
          <div className="p-4 bg-black rounded-tr-2xl gap-3 flex items-center">
            <div>
              <Logout className="text-white" />
            </div>

            <span className="text-white ">Log out</span>
          </div>
        </div>
      </div>

      <div className="lg:w-[75%] h-full bg-gray-100 p-10 relative">
        <div className="flex mb-5">
          <div className="w-[90px] h-[90px] rounded-full bg-black"></div>
          <div className="p-4 flex items-center gap-5">
            <span className="text-bold text-violet-600 text-2xl font-bold">
              Tarik Kabaki
            </span>

            <div className="w-[14px] h-[14px] bg-green-500 rounded-full"></div>
          </div>
        </div>
        <hr className="border-gray-300 mb-10" />

        <div className="h-[70%] overflow-y-scroll p-5">
          <div className="flex justify-start mb-10">
            <section className="p-5 bg-blue-500 bg-opacity-10 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-blue-600 font-bold">Anass</span>
                <div className="w-[12px] h-[12px] bg-orange-500 rounded-full"></div>
              </div>
              <p>Message from user 1</p>
            </section>
          </div>

          <div className="flex justify-end mb-10">
            <section className="p-5 bg-blue-500 bg-opacity-10 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-blue-600 font-bold">Spakiti </span>
                <div className="w-[12px] h-[12px] bg-violet-500 rounded-full"></div>
              </div>

              <p>Message from user 2</p>
            </section>
          </div>

          <div className="flex justify-start mb-10">
            <section className="p-5 bg-blue-500 bg-opacity-10 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-blue-600 font-bold">Anass</span>
                <div className="w-[12px] h-[12px] bg-orange-500 rounded-full"></div>
              </div>
              <p>Message from user 1</p>
            </section>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 p-10 w-full flex items-center gap-5">
          <input
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
            <button className="p-2 rounded-full bg-green-500 bg-opacity-60">
              <Telegram className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
