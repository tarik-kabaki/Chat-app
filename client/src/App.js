import { useState } from "react";
import { io } from "socket.io-client";
import Avatar from "./pages/avatar/avatar";
import Dashboard from "./pages/dashboard/dashboard";
import Intro from "./pages/intro/intro";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

function App() {
  const [socket, setSocket] = useState(io.connect("http://localhost:3001/"));

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/avatar/:id" element={<Avatar />} />
        <Route path="/dashboard" element={<Dashboard socket={socket} />} />
      </Routes>
    </div>
  );
}

export default App;
