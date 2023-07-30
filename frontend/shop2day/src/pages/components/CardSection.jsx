import React, { useEffect, useState } from "react";
import axios from "axios";
import Arrow from "../../Images/Arrow.svg";
import { path_url } from "../../config/config";

import CardHome from "./CardHome";
import { Link } from "react-router-dom";

const CardSection = () => {
  const [products, setProducts] = useState([]);

 
  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const myData = await axios.get(`${path_url}/products`,{withCredentials: true});
      setProducts(myData?.data?.products);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <section className="Electronics bg-white w-11/12">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="content-header mt-8 mb-8 mr-6 ml-6 flex justify-between">
          <div className="heading text-neutral-800 text-2xl font-semibold tracking-tight">
            <h1>Best of Electronics</h1>
          </div>
          <div className="left justify-center items-center gap-2 inline-flex">
            <h1 className="text-neutral-800 text-base font-normal">See more</h1>
            <div className="image">
              <img src={Arrow} alt="" />
            </div>
          </div>
        </div>
        <div className="content-body flex gap-3 mb-12 ml-6">
          {products.map((res) => (
            <Link to={"/product/" + res.id} key={res.id}>
              <CardHome  {...res} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardSection;
