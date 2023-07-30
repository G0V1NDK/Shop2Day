import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "../src/pages/SignUp";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Seller from "./pages/Seller";
import Product from "./pages/Product";
import Header from "./pages/components/Header";
import Footer from "./pages/components/Footer";
import Cart from "./pages/Cart";

export const Layout = ({children}) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /> </Layout>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/seller" element={ <Seller />} />
          <Route path="/product/:id" element={<Layout><Product /></Layout>} />
          <Route path="/cart" element={<Layout><Cart /> </Layout>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
