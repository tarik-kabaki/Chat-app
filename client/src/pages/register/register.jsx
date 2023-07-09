import React, { useState } from "react";
import image4 from "../../images/image4.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PhotoLibrary from "@mui/icons-material/PhotoLibrary";
import IconButton from "@mui/material/IconButton";

const Register = () => {
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
    <div className="bg-gray-200 w-full h-screen p-10 flex items-center ">
      <div className="flex-1 flex justify-center p-16">
        <img
          src={image4}
          className=" lg:w-[700px] lg:h-[700px] lg:object-contain "
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-center">
          <div className="w-[500px] h-[600px]">
            <h1 className="text-7xl text-black flex justify-center p-16">
              Register
            </h1>
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
    </div>
  );
};

export default Register;
