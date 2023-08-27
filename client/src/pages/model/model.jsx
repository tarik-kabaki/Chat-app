import React from "react";
import Box from "@mui/material/Box";
import EmailRounded from "@mui/icons-material/EmailRounded";
import AccountCircleRounded from "@mui/icons-material/AccountCircleRounded";
import BadgeRounded from "@mui/icons-material/BadgeRounded";
import BorderColorRounded from "@mui/icons-material/BorderColorRounded";
import Modal from "@mui/material/Modal";
import "./model.css";
import PowerSettingsNewRounded from "@mui/icons-material/PowerSettingsNewRounded";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/roomSlice";
import { logout } from "../../redux/userSlice";

const Model = ({ CurrentUser, un, socket }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    socket.on("disconnect", () => {
      console.log(socket.connected);
    });
    dispatch(logOut());
    dispatch(logout());
  };

  return (
    <div>
      <div className="p-5 flex items-center gap-3 relative">
        <div
          className="w-[130px] h-[130px] rounded-full border-2 border-green-500 overflow-hidden"
          onClick={handleOpen}
        >
          <img
            src={
              CurrentUser?.image
                ? `${process.env.REACT_APP_LOCALHOST}users/upload/${CurrentUser.image}`
                : un
            }
            className="object-cover w-full h-full hover:opacity-60 duration-300 cursor-pointer"
          />
        </div>

        <section>
          <span className="text-white text-2xl">
            {" "}
            {CurrentUser.firstname.charAt(0).toUpperCase() +
              CurrentUser.firstname.slice(1)}
          </span>
          <span className="text-white text-2xl">
            {" "}
            {CurrentUser.lastname.charAt(0).toUpperCase() +
              CurrentUser.lastname.slice(1)}
          </span>
          <div className="text-gray-400 text-sm">
            #
            {CurrentUser.username.charAt(0).toUpperCase() +
              CurrentUser.username.slice(1)}
          </div>
        </section>
        <div className="absolute right-3 top-3 w-[34px] h-[34px] rounded-full bg-white text-rose-500 flex justify-center items-center">
          <PowerSettingsNewRounded />
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="cardContainer">
          <div className="w-full h-full relative">
            <div className="bg-gradient-to-r from-rose-500 to-blue-500 w-full h-[25%]"></div>
            <div className="w-full flex justify-center mb-20">
              <div className="overflow-hidden absolute top-12 w-[140px] h-[140px] shadow-gray-400 shadow-lg rounded-full border-4 border-gray-100">
                <img
                  src={
                    CurrentUser?.image
                      ? `${process.env.REACT_APP_LOCALHOST}users/upload/${CurrentUser.image}`
                      : un
                  }
                  className=" bg-slate-500 object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="w-full  mb-5">
              <div className="flex justify-center items-center gap-2  text-2xl">
                <section>
                  {CurrentUser.firstname.charAt(0).toUpperCase() +
                    CurrentUser.firstname.slice(1)}
                </section>
                <section>
                  {CurrentUser.lastname.charAt(0).toUpperCase() +
                    CurrentUser.lastname.slice(1)}
                </section>
              </div>
              <div className="flex justify-center text-md text-gray-500">
                #
                {CurrentUser.username.charAt(0).toUpperCase() +
                  CurrentUser.username.slice(1)}
              </div>
            </div>

            <section className="flex justify-center">
              <div className="">
                <div className="gap-3 flex items-center mb-5">
                  <div className="bg-gray-800 text-white rounded-full p-2">
                    <BadgeRounded />
                  </div>
                  <div className="flex items-center gap-1">
                    <section>
                      {CurrentUser.firstname.charAt(0).toUpperCase() +
                        CurrentUser.firstname.slice(1)}
                    </section>
                    <section>
                      {CurrentUser.lastname.charAt(0).toUpperCase() +
                        CurrentUser.lastname.slice(1)}
                    </section>
                  </div>
                </div>
                <div className="gap-3 flex items-center mb-5">
                  <div className="bg-gray-800 text-white rounded-full p-2">
                    <AccountCircleRounded />
                  </div>

                  <span>
                    #
                    {CurrentUser.username.charAt(0).toUpperCase() +
                      CurrentUser.username.slice(1)}
                  </span>
                </div>

                <div className="gap-3 flex items-center">
                  <div className="bg-gray-800 text-white rounded-full p-2">
                    <EmailRounded />
                  </div>

                  <span>{CurrentUser.email}</span>
                </div>
              </div>
            </section>

            <section className=" absolute top-0 p-4 flex justify-start items-center w-full gap-3">
              <button className="p-2 rounded-full bg-blue-500 text-white border-2 border-white cursor-pointer">
                <BorderColorRounded />
              </button>
            </section>

            <section className=" absolute top-0 p-4 flex justify-end items-center w-full gap-3">
              <button
                className="p-2 rounded-full bg-rose-500 text-white border-2 border-white hover:opacity-70 duration-300"
                onClick={handleLogOut}
              >
                <PowerSettingsNewRounded />
              </button>
            </section>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Model;

/*  <div className="p-3 rounded-full bg-rose-500 text-white border-2 border-white">
                <DeleteRounded />
              </div>  */
