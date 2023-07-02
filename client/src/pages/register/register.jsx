import React from "react";
import image4 from "../../images/image4.png";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
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
                placeholder="Username"
                className="p-4 w-[80%] border-b-4 border-gray-800 bg-inherit"
              />
            </div>
            <div className="flex justify-center mb-8">
              <input
                placeholder="Email"
                className="p-4 w-[80%] border-b-4 border-gray-800 bg-inherit"
              />
            </div>
            <div className="flex justify-center mb-16">
              <input
                placeholder="Password"
                className="p-4 w-[80%] border-b-4 border-gray-800 bg-inherit"
              />
            </div>
            <div className="flex justify-center mb-14">
              <button className="w-[80%] p-4 bg-gray-900 rounded-md text-white">
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
