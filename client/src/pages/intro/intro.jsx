import React from "react";
import image1 from "../../images/image1.png";
import { useNavigate } from "react-router-dom";
import "../../pages/intro/intro.css";
import ArrowCircleRightOutlined from "@mui/icons-material/ArrowCircleRightOutlined";

const Intro = () => {
  const navigate = useNavigate();
  return (
    <div className=" bgs w-full h-screen p-10 flex items-center ">
      <div className="flex-1">
        <div className="pl-32 drop-shadow-xl">
          <div className="text-4xl mb-5 text-blue-500 drop-shadow-lg font-bold">
            Welcome there !
          </div>
          <h1 className="text-6xl mb-10 font-bold leading-[80px] drop-shadow-md  bg-gradient-to-br from-yellow-500 via-rose-500 to-blue-400 bg-clip-text text-transparent">
            Start your journey with our Chat app
          </h1>
          <button
            onClick={() => navigate("/login")}
            className="btn p-5 w-52 drop-shadow-md text-white font-bold rounded-lg bg-gray-700 flex justify-center items-center gap-2 hover:bg-gray-500 duration-300"
          >
            <span>GET STARTED</span>
            <ArrowCircleRightOutlined className="btn-icon" />
          </button>
        </div>
      </div>
      <div className="flex-1">
        <img
          src={image1}
          className=" lg:w-[800px] lg:h-[800px] lg:object-contain"
        />
      </div>
    </div>
  );
};

export default Intro;

/**bg-gradient-to-br from-gray-600 via-gray-800 to-gray-600 */
