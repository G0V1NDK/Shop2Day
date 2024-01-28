import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel/Carousel";
import CardSection from "../components/CardSection";
import Verify from "../components/Verify";
import "./Home.scss";
const Home = ({queryResult}) => {

  return (
    <>
      <Verify />

      <div className="content ">
        <div className="upper px-4 md:px-16 static">
          <Carousel />
        </div>

        <div className=" lower flex justify-center px-4 md:px-16">
          <CardSection queryResult={queryResult} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
