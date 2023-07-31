import React, { useState, useEffect } from "react";
import shareIcon from "../Images/share.svg";
import heartIcon from "../Images/heart.svg";
import deliveryIcon from "../Images/Delivery.svg";
import lockIcon from "../Images/lock.svg";
import policyIcon from "../Images/policy_FILL0_wght400_GRAD0_opsz48 1.svg";
import changeIcon from "../Images/published_with_changes_FILL0_wght400_GRAD0_opsz48 1.svg";
import { useParams } from "react-router-dom";
import axios from "axios";
import { path_url } from "../config/config";
import Verifiy from "./components/Verify";

const Product = () => {
  const productId = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const myData = await axios.get(`${path_url}/products/${productId.id}`,{withCredentials: true});
      setProducts(myData?.data?.product);
    } catch (err) {
      console.log(err.message);
    }
  }

  const maxPrice = products.price * 2;
  const handleCart =async () =>{
    const data = {productId:productId.id};
    const token = localStorage.getItem("accessToken");
    console.log(token);
    try {
      
      const response = await axios.post(`${path_url}/cart/items`,data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":"application/json",
        },
        withCredentials: true,
      });
      console.log(response);
    } catch (error) {
      console.log('Error adding product to cart:', error);
    }
  }

  return (
    <>
    <Verifiy/>
      <div className=" my-8 flex flex-col justify-center align-middle items-center">
        <div className=" w-10/12">
          {/* upper */}
          <div className="flex ">
            {/* left */}
            <div className=" w-2/5 mr-3">
              <img
                className=" rounded p-5 bg-white"
                src={path_url + products.imageUrl}
              />
              {/* shopping btns */}
              <div className="flex justify-around my-4">
                <button className=" px-12 py-3 bg-amber-400 rounded justify-center items-centerinline-flex text-center text-white text-2xl font-semibold tracking-tight" onClick={handleCart}>
                  Add to cart
                </button>
                <button className=" px-12 py-3 bg-orange-500 rounded justify-center items-center flex text-center text-white text-2xl font-semibold tracking-tight">
                  Buy Now
                </button>
              </div>
            </div>
            {/* right */}
            <div className=" w-3/5">
              {/* product Info */}
              <div className=" p-3 bg-white rounded flex-col justify-start items-start flex">
                <div className=" w-full flex-col justify-start items-start gap-5 flex">
                  <div className=" w-full flex-col justify-start items-start gap-1.5 flex">
                    <div className=" w-full flex justify-between">
                      {/* product title */}
                      <div className=" text-black text-xl font-normal">
                        {products.title}
                      </div>
                      <div className="justify-start items-start flex">
                        {/* share icons */}
                        <img src={shareIcon} />
                        <img src={heartIcon} />
                      </div>
                    </div>
                    <ul className="justify-start items-center flex">
                      {/* stars */}
                      <li className="justify-start items-start flex pr-4 ">
                        <div className="text-neutral-800 text-md font-normal pr-1">
                          4.0
                        </div>
                        <div className="justify-center items-start">
                          ⭐︎⭐︎⭐︎⭐︎⭐︎
                        </div>
                      </li>
                      <li className="text-neutral-800 text-sm font-normal pr-4 ">
                        12k Ratings
                      </li>
                      <li className="text-neutral-800 text-xs font-normal pr-4">
                        |
                      </li>
                      <li className="text-neutral-800 text-sm font-normal pr-4 ">
                        4k Reviews
                      </li>
                    </ul>
                  </div>
                  {/* price */}
                  <div className="justify-start items-center gap-3 flex">
                    <div className="text-orange-500 text-2xl font-medium tracking-wide">
                      -20%
                    </div>
                    <div className="text-neutral-800 text-3xl font-semibold tracking-widest">
                      ₹{products.price}
                    </div>
                    <div className="text-zinc-500 text-base font-normal line-through tracking-wider">
                      ₹
                      {maxPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </div>
                  </div>
                  <div className="flex-col justify-start items-start gap-2 flex">
                    <div className="text-black text-base font-medium">
                      Offers
                    </div>
                    <div className="flex-col justify-start items-start gap-1.5 flex">
                      <div className="justify-start items-start gap-1.5 flex">
                        <div className="text-black text-sm font-medium">
                          Bank Offers:
                        </div>
                        <div className="text-black text-sm font-normal ">
                          Extra ₹5,000 Off on HDFC Credit Card
                        </div>
                        <div className="text-blue-600 text-sm font-medium">
                          T&C
                        </div>
                      </div>
                      <div className="justify-start items-start gap-1.5 flex">
                        <div className="text-black text-sm font-medium">
                          Cashback Offers:
                        </div>
                        <div className="text-black text-sm font-normal ">
                          Upto ₹1000 cashback on Purchase of ₹10000 or above{" "}
                        </div>
                        <div className="text-blue-600 text-sm font-medium">
                          T&C
                        </div>
                      </div>
                      <div className="justify-start items-start gap-1.5 flex">
                        <div className="text-black text-sm font-medium">
                          No Cost EMI:
                        </div>
                        <div className="text-black text-sm font-normal ">
                          Starting from ₹4,588/month
                        </div>
                        <div className="text-blue-600 text-sm font-medium">
                          View Plans
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* delivery icons */}
                  <div className="justify-start items-start gap-5 flex pb-5">
                    <div className="p-0.5 rounded-sm justify-start items-center gap-1 flex">
                      <img src={deliveryIcon} alt="delivery" />
                      <div className="text-black text-xs font-normal">
                        Free
                        <br />
                        Delivery
                      </div>
                    </div>
                    <div className="p-0.5 rounded-sm justify-start items-center gap-0.5 flex">
                      <img src={policyIcon} alt="delivery" />
                      <div className="text-black text-xs font-normal">
                        Warranty
                        <br />
                        Policy
                      </div>
                    </div>
                    <div className="p-0.5 rounded-sm justify-start items-center gap-1 flex">
                      <img src={changeIcon} alt="delivery" />
                      <div className="text-black text-xs font-normal">
                        Return
                        <br />
                        Policy
                      </div>
                    </div>
                    <div className="p-0.5 rounded-sm justify-start items-center gap-0.5 flex">
                      <img src={lockIcon} alt="delivery" />
                      <div className="text-black text-xs font-normal">
                        Secure
                        <br />
                        Payments
                      </div>
                    </div>
                  </div>
                </div>
                <div className="justify-start items-start gap-5 flex">
                  <div className="text-neutral-800 text-base font-medium">
                    Delivery
                  </div>
                  {/* pincode */}
                  <div className="flex-col justify-center  gap-0.5 flex">
                    <div className="justify-start items-center gap-3 flex">
                      <div className="justify-start items-center gap-0.5 flex">
                        <input
                          className="text-zinc-500 text-sm font-normal border-x-white border-t-white border-2 border-b-blue-600 "
                          placeholder="Enter Pincode"
                          style={{
                            outline: "none",
                          }}
                        />
                      </div>
                      <button className="text-blue-600 text-sm font-medium">
                        Check
                      </button>
                    </div>
                    <div className="flex-col justify-start items-start flex">
                      <div className="text-neutral-800 text-xs font-normal">
                        Deliver by 31 July, Monday
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-col justify-start items-start gap-5 flex">
                  <div className="justify-start items-start gap-10 flex">
                    <div className="flex-col justify-start items-start gap-2 flex">
                      <div className="text-zinc-500 text-base font-medium">
                        Colors
                      </div>
                      <div className="justify-start items-start gap-2 flex">
                        <div className="w-12 h-12 bg-blue-600 bg-opacity-20 rounded-sm border border-blue-600" />
                        <img
                          className="w-12 h-12 rounded-sm border border-zinc-500"
                          src="https://via.placeholder.com/48x48"
                        />
                        <img
                          className="w-12 h-12 rounded-sm border border-zinc-500"
                          src="https://via.placeholder.com/48x48"
                        />
                        <img
                          className="w-12 h-12 rounded-sm border border-zinc-500"
                          src="https://via.placeholder.com/48x48"
                        />
                      </div>
                    </div>
                    <div className="flex-col justify-start items-start gap-2 flex">
                      <div className="text-zinc-500 text-base font-medium">
                        SSD Capacity
                      </div>
                      <div className="justify-start items-start gap-2 flex">
                        <div className="p-2.5 bg-blue-600 bg-opacity-20 rounded-sm border border-blue-600 justify-center items-center gap-2.5 flex">
                          <div className="text-neutral-800 text-xs font-medium">
                            256 GB
                          </div>
                        </div>
                        <div className="p-2.5 rounded-sm border border-zinc-500 justify-center items-center gap-2.5 flex">
                          <div className="text-neutral-800 text-xs font-medium">
                            512 GB
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" flex-col justify-start items-start gap-2 flex">
                    <div className="self-stretch text-zinc-500 text-base font-medium">
                      Seller{" "}
                    </div>
                    <div className="self-stretch justify-start items-center gap-1 flex">
                      <div className="grow shrink basis-0 text-blue-600 text-sm font-medium">
                        Yashoda Enterprises
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* details info */}
              <div className=" mt-3 w-full p-3 bg-white rounded flex-col justify-start items-start gap-6 ">
                <div className=" bg-white rounded-sm flex-col justify-start items-start gap-2 flex">
                  <div className="text-neutral-800 text-lg font-semibold">
                    Product Information
                  </div>
                  <div className=" text-sm">{products.description}</div>
                  <div className="flex-col justify-start items-start gap-2 flex">
                    <div className="text-neutral-800 text-base font-medium">
                      General Information
                    </div>
                    <div className=" text-sm">{products.summary}</div>
                    <table>
                      <tbody>
                        <tr className="">
                          <td className="text-zinc-500 text-sm font-medium pr-4">
                            Model Number
                          </td>
                          <td className="text-neutral-800 text-sm font-normal">
                            MQPO6HN/A
                          </td>
                        </tr>
                        <tr className="">
                          <td className="text-zinc-500 text-sm font-medium pr-4">
                            Series
                          </td>
                          <td className="text-neutral-800 text-sm font-normal">
                            Macbook Air (2023)
                          </td>
                        </tr>
                        <tr className="">
                          <td className="text-zinc-500 text-sm font-medium pr-4">
                            Color
                          </td>
                          <td className="text-neutral-800 text-sm font-normal">
                            Midnight
                          </td>
                        </tr>
                        <tr className="">
                          <td className="text-zinc-500 text-sm font-medium pr-4">
                            Type
                          </td>
                          <td className="text-neutral-800 text-sm font-normal">
                            Thin and Light Laptop
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="justify-start items-center gap-1 flex">
                  <div className="text-blue-600 text-sm font-medium">
                    Show More
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* lower*/}
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Product;
