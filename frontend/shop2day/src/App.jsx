import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "../src/pages/SignUp/SignUp.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Seller from "./pages/Seller";
import Product from "./pages/product/Product.jsx";
import Header from "./pages/components/Header/Header.jsx";
import Footer from "./pages/components/Footer";
import Cart from "./pages/cart/Cart.jsx";

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
  const [queryResult, setQueryResult] = useState("");

  const handleSearchSubmit = (query) => {
    setQueryResult(query);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header onSubmitSearch={handleSearchSubmit} />
                <Home queryResult={queryResult} /> {" "}
              </>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/seller" element={<Seller />} />
          <Route
            path="/product/:id"
            element={
              <Layout>
                <Product queryResult={queryResult}/>
              </Layout>
            }
          />
          <Route
            path="/cart"
            element={
              <Layout>
                <Cart />{" "}
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
