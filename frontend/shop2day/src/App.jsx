import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "../src/pages/SignUp";
import Home from "./pages/Home";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
