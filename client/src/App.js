import { useState } from "react";
import { io } from "socket.io-client";
import Avatar from "./pages/avatar/avatar";
import Dashboard from "./pages/dashboard/dashboard";
import Intro from "./pages/intro/intro";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import { Navigate, Routes, useNavigate } from "react-router-dom";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const socket = io.connect("http://localhost:3001/");
  const Auth = useSelector((state) => state.user.CurrentUser);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route
          path="/login"
          element={Auth ? <Navigate to={"/dashboard"} /> : <Login />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/avatar/:id" element={<Avatar />} />
        <Route
          path="/dashboard"
          element={Auth ? <Dashboard socket={socket} /> : <Login />}
        />
      </Routes>
    </div>
  );
}

export default App;
