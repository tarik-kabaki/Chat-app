import React, { useEffect, useState } from "react";
import image3 from "../../images/image3.webp";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login, fetchUsers } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import ErrorOutlineRounded from "@mui/icons-material/ErrorOutlineRounded";
import { TokenDecode } from "../../redux/userSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    axios
      .post(`${process.env.REACT_APP_LOCALHOST}auth/login`, {
        username,
        password,
      })
      .then((res) => {
        dispatch(login(res.data));
        navigate("/dashboard");
        dispatch(TokenDecode(jwt_decode(res.data.Token)));
        handleFetchingUsers();
      })
      .catch((err) => setErr(err.response.data.message));
  };

  const handleFetchingUsers = () => {
    axios
      .post(`${process.env.REACT_APP_LOCALHOST}users/find`, {
        username: username,
      })
      .then((res) => dispatch(fetchUsers(res.data)));
  };

  return (
    <div className="bg-gray-200 w-full h-screen p-10 flex items-center ">
      <div className="flex-1 flex justify-center p-16">
        <img
          src={image3}
          className=" lg:w-[700px] lg:h-[700px] lg:object-contain"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-center">
          <div className="w-[500px] h-[600px]">
            <h1 className="text-7xl text-black flex justify-center p-16">
              Log in
            </h1>

            <div className="flex justify-center mb-8">
              <input
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="p-4 w-[80%] border-b-4 border-gray-800 bg-inherit focus:outline-none"
              />
            </div>
            <div className="flex justify-center mb-16">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="p-4 w-[80%] border-b-4 border-gray-800 bg-inherit focus:outline-none"
              />
            </div>
            <div className="flex justify-center mb-14">
              <button
                className="w-[80%] p-4 bg-gray-900 rounded-md text-white hover:bg-gray-500 duration-300"
                onClick={handleLogin}
              >
                LOG IN
              </button>
            </div>
            {err ? (
              <div className="flex justify-center items-center text-rose-500 text-xl mb-10 gap-2">
                <ErrorOutlineRounded />
                <span>{err}</span>
              </div>
            ) : null}

            <div className="flex justify-center text-black gap-2">
              You don't have an account ?{" "}
              <button
                onClick={() => navigate("/register")}
                className=" font-bold text-rose-500 "
              >
                {" "}
                Register Here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
