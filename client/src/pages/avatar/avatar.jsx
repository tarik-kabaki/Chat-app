import React, { useEffect, useState } from "react";
import Upload from "@mui/icons-material/Upload";
import axios from "axios";
import { useParams } from "react-router-dom";
const Avatar = () => {
  const userId = useParams();
  /*
  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_LOCALHOST}users/${userId.}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);*/

  return (
    <div className="w-full h-screen bg-gray-200 flex justify-center items-center">
      <div>
        <h1 className="text-gray-800 text-6xl font-bold">
          Chose one of these images!
        </h1>
        <div className="p-10">
          <ul className=" flex gap-10 justify-center">
            <li className="w-32 h-32 rounded-full bg-gray-700" />
            <li className="w-32 h-32 rounded-full bg-gray-700" />
            <li className="w-32 h-32 rounded-full bg-gray-700" />
            <li className="w-32 h-32 rounded-full bg-gray-700" />
          </ul>
        </div>
        <div className="text-gray-700 text-5xl flex justify-center mb-10 font-bold">
          OR
        </div>
        <div className="flex justify-center text-3xl text-gray-700 mb-10">
          Upload your image
        </div>
        <div className="flex justify-center">
          <div className="w-32 h-32 rounded-full border-2 border-gray-700 flex justify-center items-center">
            <Upload />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
