import React, { useState } from "react";
import image4 from "../../images/image4.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secc, setSecc] = useState(null);
  const navigate = useNavigate();

  const Register = () => {
    axios
      .post(`${process.env.REACT_APP_LOCALHOST}users/create`, {
        username,
        email,
        password,
      })
      .then((res) => navigate(`/avatar/${res.data.id}`))
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
