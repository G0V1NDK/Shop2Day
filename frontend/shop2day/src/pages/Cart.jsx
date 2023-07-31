import React from "react";
import CardSection from "./components/CardSection";
import Laptop from "../Images/Rectangle 3069.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { path_url } from "../config/config";
import Verifiy from "./components/Verify";

const Cart = () => {
 
  const [cart, setCart] = useState({});
  const [items,setItems] = useState([])
  // Function to fetch the cart data from the server
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`${path_url}/cart`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      });
      setCart(response?.data?.cart);
     
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };
console.log(cart);


 const handleCart = async (id,quantity)=>{
  try {
    const body = { "productId": id,
    "quantity": quantity}
    const token = localStorage.getItem("accessToken");
    const response = await axios.patch(`${path_url}/cart/items`,body,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true
    });
   console.log(response?.data);
   
  } catch (error) {
    console.error('Error fetching cart:', error);
  }
 }

  useEffect(() => {
    // Fetch the cart data when the component mounts
    fetchCart();
      
  }, []);
  useEffect(() => {
    setItems(cart?.items || []); 
   // Use an empty array as fallback if cart.items is undefined
  }, [cart]);

  return (
    <>
    <Verifiy/>
    <div className="mb-5"></div>
      <div className="cart-page flex flex-col justify-center items-center gap-8 overflow-x-hidden overflow-y-hidden">
        <div className="Frame_3405 flex items-start justify-center gap-5 w-11/12">
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
            {items.length > 0 ? (
              
          items.map((item) => (
            <div  key={item.product.id} className="Frame_3390 flex items-start gap-6 p-3 w-full"
                style={{
                  "borderRadius": "0.25rem",
                  "background": "#FFF",
                  "boxShadow": " 0px 7px 20px 0px rgba(40, 41, 61, 0.08)",
                }}
              >
                <div className="Frame_3389 flex items-center  gap-3">
                  <div className="3069  rounded-md bg-lightgray bg-center bg-cover">
                    <img src={path_url + item?.product?.imageUrl} alt="" />
                  </div>
                  <div className="Frame_3388 flex flex-col items-start gap-3">
                    <div className="Frame_3387 flex flex-col items-start gap-1">
                      <div
                        className=" text-black font-montserrat text-base font-normal leading-6"
                        style={{ width: "31.5rem" }}
                      >
                        {item?.product?.title}
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
                            Description:
                          </div>
                          <div className="text-[#262626] font-montserrat text-base font-normal leading-[1.3125rem]">
                            {" "}
                            {item.product.description.slice(0, 25)}...
                          </div>
                        </div>
                        
                      </div>
                    </div>
                    <div className="Frame_3369 flex items-center gap-2">
                      <div className="text-[#FF7A22] font-montserrat text-base font-medium leading-normal">
                        -20%
                      </div>
                      <div className="text-[#262626] font-montserrat text-xl font-semibold leading-normal">
                        ₹{item.product.price}
                      </div>
                      <div className="text-[#82868C] font-montserrat text-base font-medium line-through">
                        ₹ {item.product.price*1.2}
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
                          <button
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
                            onClick={()=>{handleCart(item.product.id,item.quantity-1)}}
                          >
                            -
                          </button>
                        </div>
                        <div className="Frame3381 w-8 self-stretch px-1 justify-center items-center gap-2.5 flex">
                          <div className=" w-6 h-[17px] text-center text-neutral-800 text-sm font-medium">
                            {item.quantity}
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
                          <button
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
                            onClick={()=>{handleCart(item.product.id,item.quantity+1)}}
                          >
                            +
                          </button>
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
                      <button className="text-[#262626] font-montserrat  text-[0.875rem] font-medium leading-normal" onClick={() => handleCart(item.product.id, 0)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-9rem">
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
                
              </div>
          ))
        ) : (
          <p>No Items in cart</p>
        )}
             
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
                    ({cart.totalQuantity
})
                  </div>
                </div>
                <div className="text-right text-neutral-800 text-base font-medium ">
                  {cart.totalPrice*1.2}
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
                   {cart.totalPrice*0.2}
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
                {cart.totalPrice}
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
