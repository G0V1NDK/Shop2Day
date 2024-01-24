import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel/Carousel";
import CardSection from "../components/CardSection";
import Verify from "../components/Verify";

const Home = ({queryResult}) => {

  return (
    <>
      <Verify />

<div className="content">
<Carousel />

<div className="flex justify-center">
  <CardSection queryResult={queryResult} />
</div>
<Footer/>
</div>
     
    </>
  );
};

export default Home;
