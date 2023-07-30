import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CardSection from "./components/CardSection";
import Laptop from "../Images/Rectangle 3069.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { path_url } from "../config/config";

const Cart = () => {
 
  const [cart, setCart] = useState({});

  // Function to fetch the cart data from the server
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`http://localhost:3000/cart`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      });
      setCart(response.data.cart);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };
console.log(cart);


  

  useEffect(() => {
    // Fetch the cart data when the component mounts
    fetchCart();
  }, []);

  return (
    <>
    <div className="mb-5"></div>
      <div className="cart-page flex flex-col justify-center items-center gap-8 w-screen overflow-x-hidden overflow-y-hidden">
        <div className="Frame_3405 flex items-start justify-center gap-5 w-screen">
          <div
            className="Frame_3396 flex flex-col items-start gap-8 p-8"
            style={{ "borderRadius": "0.25rem", background: "#FFF" }}
          >
            <div
              className="Frame_3395 flex items-end gap-x-96"
              style={{ width: "49.125rem" }}
            >
              <h1
                className="text-2xl font-semibold leading-normal tracking-tight font-montserrat"
                style={{ color: "#262626" }}
              >
                Shopping Cart
              </h1>
            </div>
            <div className="Frame_3394 flex flex-col items-start gap-5">

              <div className="Frame_3390 flex items-start gap-6 p-3"
                style={{
                  "borderRadius": "0.25rem",
                  background: "#FFF",
                  "boxShadow": " 0px 7px 20px 0px rgba(40, 41, 61, 0.08)",
                }}
              >
                <div className="Frame_3389 flex items-start gap-3">
                  <div className="3069 w-12.375 h-12.375 rounded-md bg-lightgray bg-center bg-cover">
                    <img src={Laptop} alt="" />
                  </div>
                  <div className="Frame_3388 flex flex-col items-start gap-3">
                    <div className="Frame_3387 flex flex-col items-start gap-1">
                      <div
                        className=" text-black font-montserrat text-base font-normal leading-6"
                        style={{ width: "31.5rem" }}
                      >
                        Apple 2023 MacBook Air (15-inch, M2 chip with 8‑core CPU
                        and 10‑core GPU, 8GB Unified Memory, 256GB) - Midnight
                      </div>
                      <div className="Frame_3377 flex items-center gap-1">
                        <div className="text-[#82868C] font-montserrat text-[0.875rem] font-medium leading-normal">
                          {" "}
                          Seller:
                        </div>
                        <div className="text-[#82868C] font-montserrat text-[0.875rem] font-medium leading-normal">
                          {" "}
                          Yashoda Enterprises
                        </div>
                      </div>
                      <div className="Frame_3386 flex items-start gap-6">
                        <div className="Frame_3378 flex items-center gap-1">
                          <div className="text-[#262626] font-montserrat text-[0.875rem] font-medium leading-normal">
                            {" "}
                            Color:
                          </div>
                          <div className="text-[#262626] font-montserrat text-base font-normal leading-[1.3125rem]">
                            {" "}
                            Midnight
                          </div>
                        </div>
                        <div className="Frame_3379 flex items-center gap-1">
                          <div className="text-[#262626] font-montserrat text-[0.875rem] font-medium leading-normal">
                            {" "}
                            SSD:
                          </div>
                          <div className="text-[#262626] font-montserrat text-base font-normal leading-[1.3125rem]">
                            {" "}
                            256 GB
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="Frame_3369 flex items-center gap-2">
                      <div className="text-[#FF7A22] font-montserrat text-base font-medium leading-normal">
                        -12%
                      </div>
                      <div className="text-[#262626] font-montserrat text-xl font-semibold leading-normal">
                        ₹1,18,712
                      </div>
                      <div className="text-[#82868C] font-montserrat text-base font-medium line-through">
                        ₹1,34,900
                      </div>
                    </div>
                    <div className="Frame_3384 flex items-center gap-2 p-1">
                      <div className="text-[#262626] font-montserrat text-base font-medium leading-normal">
                        Qty:
                      </div>
                      <div className="Frame_3383 w-[58px] h-5 rounded-sm border border-zinc-500 justify-start items-start inline-flex">
                        <div
                          className="Frame_3380 flex flex-col items-center gap-2 p-0.375 self-stretch"
                          style={{
                            "borderRadius": "0.125rem 0rem 0rem 0.125rem",
                            opacity: "0.5",
                            background: "rgba(130, 134, 140, 0.40)",
                          }}
                        >
                          <div
                            className=" flex flex-col w-3 h-3 justify-center"
                            style={{
                              color: "var(--black, #262626)",
                              "textAlign": "center",
                              /* Body 1 - 16px (semi.) */
                              "fontFamily": "Montserrat",
                              "fontSize": " 1rem",
                              "fontStyle": "normal",
                              "fontWeight": "600",
                              "lineHeight": "normal",
                            }}
                          >
                            -
                          </div>
                        </div>
                        <div className="Frame3381 w-8 self-stretch px-1 justify-center items-center gap-2.5 flex">
                          <div className=" w-6 h-[17px] text-center text-neutral-800 text-sm font-medium">
                            1
                          </div>
                        </div>
                        <div
                          className="Frame_3382 flex flex-col justify-center items-center gap-2 p-0.375 self-stretch"
                          style={{
                            "borderRadius": "0.125rem 0rem 0rem 0.125rem",
                            opacity: "0.5",
                            background: "rgba(130, 134, 140, 0.40)",
                          }}
                        >
                          <div
                            className="flex flex-col w-3 h-3 justify-center"
                            style={{
                              color: "var(--black, #262626)",
                              "textAlign": "center",

                              /* Body 1 - 16px (semi.) */
                              "fontFamily": " Montserrat",
                              "fontSize": "1rem",
                              "fontStyle": "normal",
                              "fontWeight": " 600",
                              "lineHeight": "normal",
                            }}
                          >
                            +
                          </div>
                        </div>
                      </div>
                      <div className="text-[#6C3] font-montserrat text-xs font-medium leading-normal">
                        In stocks
                      </div>
                    </div>
                    <div className="Frame_3385 flex items-center gap-2">
                      <div className="text-[#262626] font-montserrat text-[0.875rem] font-medium leading-normal">
                        Save for later
                      </div>
                      <div className="text-[#82868C] font-montserrat text-xl font-medium leading-normal">
                        |
                      </div>
                      <div className="text-[#262626] font-montserrat  text-[0.875rem] font-medium leading-normal">
                        Remove
                      </div>
                    </div>
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="23"
                    height="23"
                    rx="3.5"
                    fill="#007BFF"
                    stroke="#007BFF"
                  />
                  <path
                    d="M8 12.4615L11.6923 15.0769L17.3846 8"
                    stroke="white"
                    strokeWidth="1.2043"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="Frame_3390 flex items-start gap-6 p-3"
                style={{
                  "borderRadius": "0.25rem",
                  background: "#FFF",
                  "boxShadow": " 0px 7px 20px 0px rgba(40, 41, 61, 0.08)",
                }}
              >
                <div className="Frame_3389 flex items-start gap-3">
                  <div className="3069 w-12.375 h-12.375 rounded-md bg-lightgray bg-center bg-cover">
                    <img src={Laptop} alt="" />
                  </div>
                  <div className="Frame_3388 flex flex-col items-start gap-3">
                    <div className="Frame_3387 flex flex-col items-start gap-1">
                      <div
                        className=" text-black font-montserrat text-base font-normal leading-6"
                        style={{ width: "31.5rem" }}
                      >
                        Apple 2023 MacBook Air (15-inch, M2 chip with 8‑core CPU
                        and 10‑core GPU, 8GB Unified Memory, 256GB) - Midnight
                      </div>
                      <div className="Frame_3377 flex items-center gap-1">
                        <div className="text-[#82868C] font-montserrat text-[0.875rem] font-medium leading-normal">
                          {" "}
                          Seller:
                        </div>
                        <div className="text-[#82868C] font-montserrat text-[0.875rem] font-medium leading-normal">
                          {" "}
                          Yashoda Enterprises
                        </div>
                      </div>
                      <div className="Frame_3386 flex items-start gap-6">
                        <div className="Frame_3378 flex items-center gap-1">
                          <div className="text-[#262626] font-montserrat text-[0.875rem] font-medium leading-normal">
                            {" "}
                            Color:
                          </div>
                          <div className="text-[#262626] font-montserrat text-base font-normal leading-[1.3125rem]">
                            {" "}
                            Midnight
                          </div>
                        </div>
                        <div className="Frame_3379 flex items-center gap-1">
                          <div className="text-[#262626] font-montserrat text-[0.875rem] font-medium leading-normal">
                            {" "}
                            SSD:
                          </div>
                          <div className="text-[#262626] font-montserrat text-base font-normal leading-[1.3125rem]">
                            {" "}
                            256 GB
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="Frame_3369 flex items-center gap-2">
                      <div className="text-[#FF7A22] font-montserrat text-base font-medium leading-normal">
                        -12%
                      </div>
                      <div className="text-[#262626] font-montserrat text-xl font-semibold leading-normal">
                        ₹1,18,712
                      </div>
                      <div className="text-[#82868C] font-montserrat text-base font-medium line-through">
                        ₹1,34,900
                      </div>
                    </div>
                    <div className="Frame_3384 flex items-center gap-2 p-1">
                      <div className="text-[#262626] font-montserrat text-base font-medium leading-normal">
                        Qty:
                      </div>
                      <div className="Frame_3383 w-[58px] h-5 rounded-sm border border-zinc-500 justify-start items-start inline-flex">
                        <div
                          className="Frame_3380 flex flex-col items-center gap-2 p-0.375 self-stretch"
                          style={{
                            "borderRadius": "0.125rem 0rem 0rem 0.125rem",
                            opacity: "0.5",
                            background: "rgba(130, 134, 140, 0.40)",
                          }}
                        >
                          <div
                            className=" flex flex-col w-3 h-3 justify-center"
                            style={{
                              color: "var(--black, #262626)",
                              "textAlign": "center",
                              /* Body 1 - 16px (semi.) */
                              "fontFamily": "Montserrat",
                              "fontSize": " 1rem",
                              "fontStyle": "normal",
                              "fontWeight": "600",
                              "lineHeight": "normal",
                            }}
                          >
                            -
                          </div>
                        </div>
                        <div className="Frame3381 w-8 self-stretch px-1 justify-center items-center gap-2.5 flex">
                          <div className=" w-6 h-[17px] text-center text-neutral-800 text-sm font-medium">
                            1
                          </div>
                        </div>
                        <div
                          className="Frame_3382 flex flex-col justify-center items-center gap-2 p-0.375 self-stretch"
                          style={{
                            "borderRadius": "0.125rem 0rem 0rem 0.125rem",
                            opacity: "0.5",
                            background: "rgba(130, 134, 140, 0.40)",
                          }}
                        >
                          <div
                            className="flex flex-col w-3 h-3 justify-center"
                            style={{
                              color: "var(--black, #262626)",
                              "textAlign": "center",

                              /* Body 1 - 16px (semi.) */
                              "fontFamily": " Montserrat",
                              "fontSize": "1rem",
                              "fontStyle": "normal",
                              "fontWeight": " 600",
                              "lineHeight": "normal",
                            }}
                          >
                            +
                          </div>
                        </div>
                      </div>
                      <div className="text-[#6C3] font-montserrat text-xs font-medium leading-normal">
                        In stocks
                      </div>
                    </div>
                    <div className="Frame_3385 flex items-center gap-2">
                      <div className="text-[#262626] font-montserrat text-[0.875rem] font-medium leading-normal">
                        Save for later
                      </div>
                      <div className="text-[#82868C] font-montserrat text-xl font-medium leading-normal">
                        |
                      </div>
                      <div className="text-[#262626] font-montserrat  text-[0.875rem] font-medium leading-normal">
                        Remove
                      </div>
                    </div>
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="23"
                    height="23"
                    rx="3.5"
                    stroke="#007BFF"
                  />
                </svg>
              </div>
              <div className="Frame_3390 flex items-start gap-6 p-3"
                style={{
                  "borderRadius": "0.25rem",
                  background: "#FFF",
                  "boxShadow": " 0px 7px 20px 0px rgba(40, 41, 61, 0.08)",
                }}
              >
                <div className="Frame_3389 flex items-start gap-3">
                  <div className="3069 w-12.375 h-12.375 rounded-md bg-lightgray bg-center bg-cover">
                    <img src={Laptop} alt="" />
                  </div>
                  <div className="Frame_3388 flex flex-col items-start gap-3">
                    <div className="Frame_3387 flex flex-col items-start gap-1">
                      <div
                        className=" text-black font-montserrat text-base font-normal leading-6"
                        style={{ width: "31.5rem" }}
                      >
                        Apple 2023 MacBook Air (15-inch, M2 chip with 8‑core CPU
                        and 10‑core GPU, 8GB Unified Memory, 256GB) - Midnight
                      </div>
                      <div className="Frame_3377 flex items-center gap-1">
                        <div className="text-[#82868C] font-montserrat text-[0.875rem] font-medium leading-normal">
                          {" "}
                          Seller:
                        </div>
                        <div className="text-[#82868C] font-montserrat text-[0.875rem] font-medium leading-normal">
                          {" "}
                          Yashoda Enterprises
                        </div>
                      </div>
                      <div className="Frame_3386 flex items-start gap-6">
                        <div className="Frame_3378 flex items-center gap-1">
                          <div className="text-[#262626] font-montserrat text-[0.875rem] font-medium leading-normal">
                            {" "}
                            Color:
                          </div>
                          <div className="text-[#262626] font-montserrat text-base font-normal leading-[1.3125rem]">
                            {" "}
                            Midnight
                          </div>
                        </div>
                        <div className="Frame_3379 flex items-center gap-1">
                          <div className="text-[#262626] font-montserrat text-[0.875rem] font-medium leading-normal">
                            {" "}
                            SSD:
                          </div>
                          <div className="text-[#262626] font-montserrat text-base font-normal leading-[1.3125rem]">
                            {" "}
                            256 GB
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="Frame_3369 flex items-center gap-2">
                      <div className="text-[#FF7A22] font-montserrat text-base font-medium leading-normal">
                        -12%
                      </div>
                      <div className="text-[#262626] font-montserrat text-xl font-semibold leading-normal">
                        ₹1,18,712
                      </div>
                      <div className="text-[#82868C] font-montserrat text-base font-medium line-through">
                        ₹1,34,900
                      </div>
                    </div>
                    <div className="Frame_3384 flex items-center gap-2 p-1">
                      <div className="text-[#262626] font-montserrat text-base font-medium leading-normal">
                        Qty:
                      </div>
                      <div className="Frame_3383 w-[58px] h-5 rounded-sm border border-zinc-500 justify-start items-start inline-flex">
                        <div
                          className="Frame_3380 flex flex-col items-center gap-2 p-0.375 self-stretch"
                          style={{
                            "borderRadius": "0.125rem 0rem 0rem 0.125rem",
                            opacity: "0.5",
                            background: "rgba(130, 134, 140, 0.40)",
                          }}
                        >
                          <div
                            className=" flex flex-col w-3 h-3 justify-center"
                            style={{
                              color: "var(--black, #262626)",
                              "textAlign": "center",
                              /* Body 1 - 16px (semi.) */
                              "fontFamily": "Montserrat",
                              "fontSize": " 1rem",
                              "fontStyle": "normal",
                              "fontWeight": "600",
                              "lineHeight": "normal",
                            }}
                          >
                            -
                          </div>
                        </div>
                        <div className="Frame3381 w-8 self-stretch px-1 justify-center items-center gap-2.5 flex">
                          <div className=" w-6 h-[17px] text-center text-neutral-800 text-sm font-medium">
                            1
                          </div>
                        </div>
                        <div
                          className="Frame_3382 flex flex-col justify-center items-center gap-2 p-0.375 self-stretch"
                          style={{
                            "borderRadius": "0.125rem 0rem 0rem 0.125rem",
                            opacity: "0.5",
                            background: "rgba(130, 134, 140, 0.40)",
                          }}
                        >
                          <div
                            className="flex flex-col w-3 h-3 justify-center"
                            style={{
                              color: "var(--black, #262626)",
                              "textAlign": "center",

                              /* Body 1 - 16px (semi.) */
                              "fontFamily": " Montserrat",
                              "fontSize": "1rem",
                              "fontStyle": "normal",
                              "fontWeight": " 600",
                              "lineHeight": "normal",
                            }}
                          >
                            +
                          </div>
                        </div>
                      </div>
                      <div className="text-[#6C3] font-montserrat text-xs font-medium leading-normal">
                        In stocks
                      </div>
                    </div>
                    <div className="Frame_3385 flex items-center gap-2">
                      <div className="text-[#262626] font-montserrat text-[0.875rem] font-medium leading-normal">
                        Save for later
                      </div>
                      <div className="text-[#82868C] font-montserrat text-xl font-medium leading-normal">
                        |
                      </div>
                      <div className="text-[#262626] font-montserrat  text-[0.875rem] font-medium leading-normal">
                        Remove
                      </div>
                    </div>
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="23"
                    height="23"
                    rx="3.5"
                    stroke="#007BFF"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div
            className="3403 flex flex-col items-start gap-5 w-[23.125rem] p-8"
            style={{ "borderRadius": "0.25rem", background: "#FFF" }}
          >
            <div className="text-[#262626] font-montserrat text-xl font-semibold leading-normal tracking-[0.0125rem]">
              Price Details
            </div>

            {/* <div className="Frame_3402">
              <div className="Frame_3398">
                <div className="Frame_3397"></div>
              </div>
              <div className="Frame_3399">
                <div className="Frame_3404"></div>
              </div>
              <div className="Frame_3400"></div>
            </div> */}
            <div
              className="Frame_3402 flex flex-col items-start gap-5 p-2  pb-4"
              style={{ "borderBottom": "1px solid var(--grey, #82868C)" }}
            >
              <div className="Frame_3398 flex items-start gap-28 w-19">
                <div className="Frame3397 flex items-center gap-1">
                  <div className=" text-neutral-800 text-base font-medium">
                    Total MRP
                  </div>
                  <div className=" text-neutral-800 text-base font-medium">
                    (1)
                  </div>
                </div>
                <div className="text-right text-neutral-800 text-base font-medium ">
                  ₹1,34,900
                </div>
              </div>
              <div className="Frame_3399 flex items-start gap-28 w-19">
                <div className=" text-neutral-800 text-base font-medium">
                  Total Discount
                </div>
                <div className="Frame_3404 flex justify-end items-center gap-1">
                  <div className=" text-right text-lime-500 text-base font-medium">
                    -
                  </div>
                  <div className="16188 text-right text-lime-500 text-base font-medium">
                    ₹16,188
                  </div>
                </div>
              </div>
              <div className="Frame_3400 flex items-start gap-28 w-19">
                <div className="DeliveryCharges text-neutral-800 text-base font-medium">
                  Delivery Charges
                </div>
                <div className="Free text-right text-lime-500 text-base font-medium">
                  Free
                </div>
              </div>
            </div>
            <div className="Frame_3401 flex items-start gap-28 w-19">
              <div className="text-[#262626] font-montserrat text-lg font-semibold leading-normal">
                Total Amount
              </div>
              <div className="text-[#262626] text-right font-montserrat text-lg font-semibold leading-normal">
                ₹1,18,712
              </div>
            </div>
            <button
              className="flex items-center justify-center gap-2 p-3 w-80"
              style={{ "borderRadius": "0.25rem", background: "#FF7A22" }}
            >
              <div className="text-[#FFF] text-center font-montserrat text-base font-medium leading-normal">
                Proceed to checkout
              </div>
            </button>
          </div>
        </div>

        <CardSection Name="Products from your wishlist" />

        <CardSection Name="Related to products you viewed" />
      </div>
      <div className="mt-5"></div>
    </>
  );
};

export default Cart;
