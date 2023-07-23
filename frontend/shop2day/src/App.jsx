import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "../src/pages/SignUp";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Seller from "./pages/Seller";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/seller" element={<Seller />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
