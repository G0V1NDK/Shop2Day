import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Carousel from "./components/Carousel";
import CardSection from "./components/CardSection";
import Verify from "./components/Verify";

const Home = () => {
  return (
    <>
      <Verify />

      <Carousel />

      <div className="flex justify-center">
        <CardSection />
      </div>

    </>
  );
};

export default Home;
