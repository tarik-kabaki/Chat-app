import React, { useEffect, useState } from "react";
import SearchRounded from "@mui/icons-material/SearchRounded";
import Chat from "../chat/chat";
import { useDispatch, useSelector } from "react-redux";
import un from "../../av/un.png";
import axios from "axios";
import Model from "../model/model";
import { handleRoom, handleRoomArry, logOut } from "../../redux/roomSlice";
import { handleUsersRoom, logout } from "../../redux/userSlice";

const Dashboard = ({ socket }) => {
  const [receiver, setReceiver] = useState();
  const UsersList = useSelector((state) => state.user.users);
  const CurrentUser = useSelector((state) => state.user.CurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.emit("newUser", { userId: CurrentUser.id });
  }, []);

  useEffect(() => {
    socket.on("ReshandlingUsersRooms", (data) => {
      dispatch(handleUsersRoom({ receiver: data.receiver, roomData: data }));
    });
  }, [socket]);

  const HandleUserRoom = (data) => {
    setReceiver(data);

    axios
      .post(`${process.env.REACT_APP_LOCALHOST}room/create/${CurrentUser.id}`, {
        user_2_id: data.id,
        name: `${CurrentUser.username}/${data.username}`,
      })
      .then((res) => {
        socket.emit("joinRoom", res.data.name);
        dispatch(handleRoom(res.data));
        dispatch(handleUsersRoom({ receiver: data.id, roomData: res.data }));
        socket.emit("handlingUsersRooms", {
          ...res.data,
          receiver: CurrentUser.id,
        });
      })
      .catch((err) => console.log(err));
  };

  const cleanCode = (curr, item) =>
    item.rooms?.find((i) =>
      i?.name?.includes(`${curr?.username}/${item?.username}`)
    )?.messages[
      item.rooms?.find((i) =>
        i?.name?.includes(`${curr?.username}/${item?.username}`)
      )?.messages?.length - 1
    ] ||
    item?.room?.find((i) =>
      i?.name?.includes(`${item?.username}/${curr?.username}`)
    )?.messages[
      item.room?.find((x) =>
        x?.name?.includes(`${item?.username}/${curr?.username}`)
      )?.messages?.length - 1
    ];

  const UserLastMessagesDate = (item, curr) =>
    item.rooms?.find((i) =>
      i?.name?.includes(`${curr?.username}/${item?.username}`)
    )?.messages[
      item.rooms?.find((i) =>
        i?.name?.includes(`${curr?.username}/${item?.username}`)
      )?.messages?.length - 1
    ]?.createdAt ||
    item?.room?.find((i) =>
      i?.name?.includes(`${item?.username}/${curr?.username}`)
    )?.messages[
      item.room?.find((x) =>
        x?.name?.includes(`${item?.username}/${curr?.username}`)
      )?.messages?.length - 1
    ]?.createdAt;

  return (
    <div className="h-screen w-full flex">
      <div className="w-[400px] bg-gray-800 bg-opacity-90 h-full relative">
        <Model CurrentUser={CurrentUser} un={un} socket={socket} />
        <div className=" h-[100px] p-5 gap-2  flex items-center justify-center">
          <div className="p-3 bg-gray-600 rounded-full shadow-md text-white ">
            <SearchRounded />
          </div>
          <input
            placeholder="Search..."
            className="p-3 w-full rounded-full shadow-md bg-gray-600"
          />
        </div>
        {UsersList.map((item, index) => (
          <section
            key={index}
            onClick={() => HandleUserRoom(item)}
            className="hover:bg-gray-600 duration-300 cursor-pointer"
          >
            <div className="p-4 flex justify-between items-center gap-1">
              <div className="flex gap-2">
                <div className="w-[70px] h-[70px] border-2 border-slate-200 rounded-full overflow-hidden">
                  <img
                    src={
                      item?.image
                        ? `${process.env.REACT_APP_LOCALHOST}users/upload/${item.image}`
                        : un
                    }
                    className="object-cover w-[70px] h-[70px]"
                  />
                </div>

                <div className="p-2">
                  <div className=" text-white flex items-center gap-1">
                    <span>
                      {item.firstname.charAt(0).toUpperCase() +
                        item.firstname.slice(1)}
                    </span>
                    <span>
                      {item.lastname.charAt(0).toUpperCase() +
                        item.lastname.slice(1)}
                    </span>
                  </div>

                  <div className=" text-gray-400 text-sm">
                    {cleanCode(CurrentUser, item)?.message ? (
                      <div className="flex items-center text-ellipsis overflow-hidden whitespace-nowrap w-[200px] gap-2">
                        <div className="w-[5px] h-[5px] p-1 rounded-full bg-orange-400"></div>
                        {CurrentUser.id ===
                        cleanCode(CurrentUser, item)?.users.id ? (
                          <div className="text-white">You : </div>
                        ) : null}

                        <span>{`${
                          cleanCode(CurrentUser, item)?.message
                        }`}</span>
                      </div>
                    ) : (
                      <span className="text-orange-400">
                        #.
                        {item.username.charAt(0).toUpperCase() +
                          item.username.slice(1)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {!UserLastMessagesDate(item, CurrentUser) ? null : (
                <div className="text-gray-400 text-sm">
                  {`${
                    new Date(
                      UserLastMessagesDate(item, CurrentUser)
                    ).getHours() === 0
                      ? "00"
                      : new Date(
                          UserLastMessagesDate(item, CurrentUser)
                        ).getHours()
                  }:${
                    (new Date(
                      UserLastMessagesDate(item, CurrentUser)
                    ).getMinutes() < 10
                      ? "0"
                      : "") +
                    new Date(
                      UserLastMessagesDate(item, CurrentUser)
                    ).getMinutes()
                  }  
                  `}
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
      <Chat CurrentUser={CurrentUser} receiver={receiver} socket={socket} />
    </div>
  );
};

export default Dashboard;
