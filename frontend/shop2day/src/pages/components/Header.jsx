import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "..//../Images/logo s2y.svg";
import user from "..//../Images/user.svg";
import cart from "..//../Images/Frame (1).svg";
import Wishlist from "..//../Images/Frame (2).svg";
import search from "..//../Images/Frame.svg";
import { ToastContainer, toast } from "react-toastify";

const Header = () => {
  const [searchTxt, setSearchTxt] = useState("");
  
  const handleChange = (e) => {
    setSearchTxt(e.target.value);
    console.log(searchTxt);
  };
  const token = localStorage.getItem("accessToken");
  const [isLogin, setIsLogin] = useState(token);

  const Logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    toast.success("Logged Out Succesfully");
    setIsLogin(!token);
  };

  return (
    <>
      <div>
        <div>
          {/* upper */}
          {/* Main Nav bar*/}
          <div className=" flex flex-row justify-between text-center items-center px-[100px] py-[20px]">
            {/* left */}
            <div className="">
              {/* logo */}
              <Link to={"/"} className="flex w-[191px] justify-around">
                <div className="">
                  <img src={logo} />
                </div>
                <div
                  className="text-[28px] font-semibold tracking-wide"
                  style={{
                    background:
                      "linear-gradient(151deg, #7B61FF 0%, #2196F3 53.74%, #77CFFD 95.98%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Shop2Day
                </div>
              </Link>
            </div>
            {/* center */}
            <div className="px-[28px]">
              <form>
                {/* <label
                  for="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white "
                >
                  Search
                </label> */}
                <div className="relative">
                  <input
                    type="search"
                    id="default-search"
                    className="block w-[632px] h-11 px-5 py-3 opacity-60 bg-blue-200 bg-opacity-50 rounded justify-start items-center gap-[7px] text-neutral-800 text-base font-normal"
                    placeholder="Search anything you want..."
                    onChange={handleChange}
                  />
                  <button
                    type="submit"
                    className="text-white absolute right-0 bottom-0 font-medium rounded-lg text-sm px-4 py-3 solid-blue-600"
                  >
                    <img src={search} alt="" />
                  </button>
                </div>
              </form>
            </div>
            {/* right */}
            <div className="">
              <ul className=" flex justify-center items-start gap-8 text-center">
                <button>
                  <li className="justify-start items-center gap-2 flex">
                    <img src={user} alt="" className="w-7 h-7 relative" />
                    {isLogin ? (
                      <div
                        className="text-neutral-800 text-base font-normal"
                        onClick={Logout}
                      >
                        Logout
                      </div>
                    ) : (
                      <Link to="/login">
                        <div className="text-neutral-800 text-base font-normal">
                          Login
                        </div>
                      </Link>
                    )}
                  </li>
                </button>
                <li className="justify-start items-center gap-2 flex">
                  <img src={cart} alt="" className="w-7 h-7 relative" />
                  <div className="text-neutral-800 text-base font-normal">
                    Cart
                  </div>
                </li>
                <li className="justify-start items-center gap-2 flex">
                  <img src={Wishlist} alt="" className="w-7 h-7 relative" />
                  <div className="text-neutral-800 text-base font-normal">
                    Wishlist
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* lower */}
          <div className=" bg-slate-100 drop-shadow-lg">
            <ul className=" flex flex-row justify-between px-[100px]">
              <li className="px-5 py-4 justify-center items-start gap-1 flex">
                <div className="text-neutral-800 text-base font-medium">
                  Men’s
                </div>
              </li>
              <li className="px-5 py-4 justify-center items-start gap-1 flex">
                <div className="text-neutral-800 text-base font-medium">
                  Women's
                </div>
              </li>
              <li className="px-5 py-4 justify-center items-start gap-1 flex">
                <div className="text-neutral-800 text-base font-medium">
                  Electronics
                </div>
              </li>
              <li className="px-5 py-4 justify-center items-start gap-1 flex">
                <div className="text-neutral-800 text-base font-medium">
                  Home and Furniture
                </div>
              </li>
              <li className="px-5 py-4 justify-center items-start gap-1 flex">
                <div className="text-neutral-800 text-base font-medium">
                  TVs and Appliances
                </div>
              </li>
              <li className="px-5 py-4 justify-center items-start gap-1 flex">
                <div className="text-neutral-800 text-base font-medium">
                  Baby and Kids
                </div>
              </li>
              <li className="px-5 py-4 justify-center items-start gap-1 flex">
                <div className="text-neutral-800 text-base font-medium">
                  Books, Sports and More
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Header;
