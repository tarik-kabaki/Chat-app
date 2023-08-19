import React, { useState } from "react";
import image4 from "../../images/image4.png";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import ArrowBackIosRounded from "@mui/icons-material/ArrowBackIosRounded";
import UploadRounded from "@mui/icons-material/UploadRounded";
import regImage from "../../images/reg.jpg";
import Button from "@mui/material/Button";
import CloudDoneRounded from "@mui/icons-material/CloudDoneRounded";
import DownloadDoneRounded from "@mui/icons-material/DownloadDoneRounded";
import "./reg.css";
import PhotoLibrary from "@mui/icons-material/PhotoLibrary";
import IconButton from "@mui/material/IconButton";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [secc, setSecc] = useState(null);
  const navigate = useNavigate();
  const formatData = new FormData();
  formatData.append("file", file);

  const Register = () => {
    axios
      .post(`${process.env.REACT_APP_LOCALHOST}users/create`, {
        firstname,
        lastname,
        username,
        email,
        password,
      })
      .then((res) => {
        navigate(`/login`);
        axios
          .patch(
            `${process.env.REACT_APP_LOCALHOST}users/create/image/${res.data.id}`,
            formatData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" bg w-full h-screen flex justify-center items-center">
      <div className="lg:w-[1000px] lg:h-[700px] rounded-lg flex shadow-gray-700 shadow-2xl overflow-hidden">
        <div className="flex-1 relative overflow-hidden">
          <button
            className=" absolute top-0 left-0 p-3 text-black"
            onClick={() => navigate("/login")}
          >
            <div className="p-2 bg-white rounded-full shadow-gray-500 shadow-md hover:bg-gray-300 duration-300">
              <ArrowBackIosRounded />
            </div>
          </button>

          <img src={regImage} className=" object-cover w-full h-full" />
        </div>
        <div className="flex-1 bg-gray-900 ">
          <div className="w-full h-full text-white p-16">
            <h1 className="text-3xl mb-10">REGESTRATION</h1>

            <div>
              <section className="mb-5 w-full">
                <input
                  onChange={(e) => setFirstname(e.target.value)}
                  className="w-full p-3 bg-inherit border-b-2 border-gray-400 focus:outline-none"
                  placeholder="Firstname"
                />
              </section>
              <section className="mb-5 w-full">
                <input
                  onChange={(e) => setLastname(e.target.value)}
                  className="w-full p-3 bg-inherit border-b-2 border-gray-400 focus:outline-none"
                  placeholder="Lastname"
                />
              </section>
              <section className="mb-5 w-full flex items-center">
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 bg-inherit border-b-2 border-gray-400 focus:outline-none"
                  placeholder="Username"
                />
              </section>
              <section className="mb-5 w-full">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-inherit border-b-2 border-gray-400 focus:outline-none"
                  placeholder="Email"
                />
              </section>
              <section className="mb-10 w-full">
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 bg-inherit border-b-2 border-gray-400 focus:outline-none"
                  placeholder="Password"
                />
              </section>
            </div>
            <section className="mb-10 flex items-center gap-5">
              <Button
                component="label"
                className=" flex items-center gap-2 hover:text-blue-400 duration-300"
              >
                <div className="p-1 rounded-full bg-white text-black">
                  <UploadRounded />
                </div>

                <span>Upload Image</span>
                <input
                  hidden
                  multiple
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </Button>
              <span className="text-sm">
                {file ? (
                  <div className="flex items-center text-emerald-500 gap-1">
                    <DownloadDoneRounded />
                    <span>Done</span>
                  </div>
                ) : null}
              </span>
            </section>

            <button
              onClick={Register}
              className="w-full p-3 rounded-sm bg-white text-black hover:bg-gray-400 duration-300"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

/*
<div className="bg-gray-200 w-full h-screen p-10 flex items-center ">
      <div className="flex-1 flex justify-center p-16">
        <img
          src={image4}
          className=" lg:w-[700px] lg:h-[700px] lg:object-contain "
        />
      </div>
      <div className="flex-1 ">
        <div className="flex justify-center">
          <div className="w-[500px] h-[auto]">
            <h1 className="text-7xl text-black flex justify-center p-16">
              Register
            </h1>

            <div className="flex justify-center mb-8">
              <input
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="Firstname"
                className="p-4 w-[80%] border-b-4 border-gray-800 bg-inherit focus:outline-none"
              />
            </div>

            <div className="flex justify-center mb-8">
              <input
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Lastname"
                className="p-4 w-[80%] border-b-4 border-gray-800 bg-inherit focus:outline-none"
              />
            </div>

            <div className="flex justify-center mb-8">
              <input
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="p-4 w-[80%] border-b-4 border-gray-800 bg-inherit focus:outline-none"
              />
            </div>
            <div className="flex justify-center mb-8">
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="p-4 w-[80%] border-b-4 border-gray-800 bg-inherit focus:outline-none"
              />
            </div>
            <div className="flex justify-center mb-5">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="p-4 w-[80%] border-b-4 border-gray-800 bg-inherit focus:outline-none"
              />
            </div>
            <div className="flex justify-center items-center mb-5">
              <button className="w-[80%] border-2 border-blue-500 p-4 flex rounded-md hover:bg-gray-800 duration-300">
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </button>
            </div>
            <div className="flex justify-center mb-14">
              <button
                className="w-[80%] p-4 bg-gray-900 rounded-md text-white hover:bg-gray-500 duration-300"
                onClick={Register}
              >
                CREATE ACCOUNT
              </button>
            </div>
            <div className="flex justify-center text-black gap-2">
              Have already an account ?{" "}
              <button
                onClick={() => navigate("/login")}
                className=" font-bold text-rose-500"
              >
                Login Here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div> */
