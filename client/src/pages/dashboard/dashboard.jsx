import React, { useEffect, useState } from "react";
import SearchRounded from "@mui/icons-material/SearchRounded";
import Chat from "../chat/chat";
import PowerSettingsNew from "@mui/icons-material/PowerSettingsNew";
import { useSelector } from "react-redux";
import un from "../../av/un.png";
import axios from "axios";

const Dashboard = () => {
  const [room, setRoom] = useState();
  const UsersList = useSelector((state) => state.user.users);
  const CurrentUser = useSelector((state) => state.user.CurrentUser);

  const HandleUserRoom = (data) => {
    axios
      .post(`${process.env.REACT_APP_LOCALHOST}room/create/${CurrentUser.id}`, {
        user_2_id: data.id,
        name: `${CurrentUser.id + data.id}`,
      })
      .then((res) => setRoom(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="h-screen w-full flex">
      <div className="w-[400px] bg-gray-800 bg-opacity-90 h-full relative">
        <div className=" h-[100px] p-5 gap-2  mb-5 flex items-center justify-center">
          <div className="p-3 bg-gray-600 rounded-full shadow-md text-white ">
            <SearchRounded />
          </div>
          <input
            placeholder="Search..."
            className="p-3 w-full rounded-full shadow-md bg-gray-600"
          />
        </div>
        {UsersList.map((item) => (
          <section
            onClick={() => HandleUserRoom(item)}
            className="hover:bg-gray-600 duration-300 cursor-pointer"
          >
            <div className="p-7 flex justify-between items-center gap-2 ">
              <div className="flex gap-2 ">
                <img
                  src={item?.image ? item.image : un}
                  className="w-[60px] h-[60px] rounded-full bg-slate-500 object-cover"
                />
                <div className="p-1">
                  <div className=" text-white">
                    {item.username.charAt(0).toUpperCase() +
                      item.username.slice(1)}
                  </div>
                  <div className=" text-gray-400 text-sm">Hello world!</div>
                </div>
              </div>
              <div className="text-gray-400">11:56</div>
            </div>
            <div className="flex justify-center">
              <hr className="border-1 border-gray-600 w-[90%]" />
            </div>
          </section>
        ))}

        <div className="w-full border-t-[0.5px] border-gray-600 p-3 h-[65px] absolute bottom-0  h-50px flex items-center justify-between">
          <div className="flex gap-2">
            <img
              src={CurrentUser?.image ? CurrentUser.image : un}
              className="w-[40px] h-[40px] rounded-full bg-slate-500 object-cover"
            />
            <section className="">
              <div className="text-sm text-white">
                {CurrentUser.username.charAt(0).toUpperCase() +
                  CurrentUser.username.slice(1)}
              </div>
              <div className="flex items-center gap-2">
                <div className="text-[12px] text-green-500">Active</div>
                <span className="w-[7px] h-[7px] rounded-full bg-green-500"></span>
              </div>
            </section>
          </div>

          <button className="text-rose-500 flex rounded-full bg-white items-center gap-1 hover:text-black hover:bg-rose-600 duration-300">
            <div className="p-1  ">
              <PowerSettingsNew />
            </div>
          </button>
        </div>
      </div>
      <Chat CurrentUser={CurrentUser} room={room} />
    </div>
  );
};

export default Dashboard;
