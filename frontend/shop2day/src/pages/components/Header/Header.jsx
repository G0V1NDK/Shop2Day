import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../Images/logo s2y.svg";
import user from "../../../Images/user.svg";
import cart from "../../../Images/Frame (1).svg";
import Wishlist from "../../../Images/Frame (2).svg";
import search from "../../../Images/Frame.svg";
import hamburger from "../../../Images/hamburger.svg";
import { ToastContainer, toast } from "react-toastify";
import "./Header.scss";

import axios from "axios";

const Header = ({ onSubmitSearch }) => {
  const [searchTxt, setSearchTxt] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const options = {
    method: "GET",
    url: "https://auto-suggest-queries.p.rapidapi.com/suggestqueries",
    params: { query: searchTxt },
    headers: {
      "X-RapidAPI-Key": "528109bd8emsh956fa1ddfd311b8p1c8333jsn7fb06e1c7eea",
      "X-RapidAPI-Host": "auto-suggest-queries.p.rapidapi.com",
    },
  };

  const handleSearchChange = async () => {
    // previous autosearch query not working -> cors blocked by google
    // // const autoSearch = await fetch(
    // //   "http://suggestqueries.google.com/complete/search?client=firefox&q=" +
    // //     searchTxt
    // // );
    // const json = await autoSearch.json();
    // setSearchResult(json[1]);
    // // console.log(json[1]);

    try {
      const response = await axios.request(options);

      if(!searchTxt){
        setSearchResult("");
      }else{
        setSearchResult(response.data);
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleSearchChange();
  }, [searchTxt]);

  const handleSearchItemClick = (query) => {
    setSearchTxt(query);
    setSearchResult([]);
  };

  // fetch("http://suggestqueries.google.com/complete/search?client=firefox&q=redmi");

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
     
        
          {/* upper */}
          {/* Main Nav bar*/}
          <div className="contents-header drop-shadow-lg ">
          <div className="  justify-between text-center items-center px-8 pt-5 custom">
            {/* left */}
            <div className="left">
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
            <div className=" center">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmitSearch(searchTxt);
                }}
              >
                <div className=" flex">
                  <div className="search-wrap">
                    <input
                      type="search"
                      id="default-search"
                      className="block h-11 px-5 py-3 opacity-60 bg-blue-200 bg-opacity-50 rounded-l justify-start items-center gap-[7px] text-neutral-800 text-base font-normal search"
                      placeholder="Search anything you want..."
                      onChange={(e) => setSearchTxt(e.target.value)}
                      value={searchTxt}
                    />
                  </div>
                  <div className="opacity-60 bg-blue-200 bg-opacity-50 rounded-r button-wrap">
                    <button
                      type="submit"
                      className="text-white right-0 bottom-0 font-medium rounded-lg text-sm px-4 py-2 solid-blue-600"
                    >
                      <img src={search} alt="" />
                    </button>
                  </div>
                </div>
                {searchResult.length !== 0 ? (
                  <div className=" absolute z-50 bg-white p-4 rounded-md text-left w-[43rem]">
                    {searchResult.map((text) => (
                      <p
                        className=" p-1 border-b-2 border-gray-100 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSearchItemClick(text)}
                        key={text}
                      >
                        {text}
                      </p>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
              </form>
            </div>
            {/* right */}
            <div className="right">
              <ul className=" flex justify-center items-start gap-8 text-center w-full">
                
                  <li className="justify-start items-center gap-2 flex">
                  <button className="logo-button">
                    <img src={user} alt="" className="w-7 h-7 relative" />
                    {isLogin ? (
                      <div
                        className="text-neutral-800 text-base font-normal logout"
                        onClick={Logout}
                      >
                        Logout
                      </div>
                    ) : (
                      <Link to="/login">
                        <div className="text-neutral-800 text-base font-normal logout">
                          Login
                        </div>
                      </Link>
                    )}
                    </button>
                  </li>
                
                <li className="justify-start items-center gap-2 flex">
                  <Link to="/cart" className="flex gap-2">
                    <img src={cart} alt="" className="w-7 h-7 relative" />
                    <div className="text-neutral-800 text-base font-normal cart">
                      Cart
                    </div>
                  </Link>
                </li>
                <li className="justify-start items-center gap-2 flex">
                  <img src={Wishlist} alt="" className="w-7 h-7 relative" />
                  <div className="text-neutral-800 text-base font-normal wishlist">
                    Wishlist
                  </div>
                </li>
                <li className="justify-start items-center gap-2  hamburger">
                  <img src={hamburger} alt="" className="w-7 h-7 relative" />
                  <div className="text-neutral-800 text-base font-normal wishlist">
                    Wishlist
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* lower */}
          <div className="px-8 lower">
            <ul className=" flex flex-row  bg-white gap-12 py-4">
              <li className="px-4 py-4  justify-center items-center gap-1 flex">
                <div className="text-neutral-800 text-base font-medium">
                  Men’s
                </div>
              </li>
              <li className="px-4 py-4 justify-center items-center gap-1 flex">
                <div className="text-neutral-800 text-base font-medium">
                  Women's
                </div>
              </li>
              <li className="px-4 py-4  justify-center items-center gap-1 flex">
                <div className="text-neutral-800 text-base font-medium">
                  Electronics
                </div>
              </li>
              <li className="px-4 py-4 justify-center items-center gap-1 flex">
                <div className="text-neutral-800 text-base font-medium">
                  Home & Furniture
                </div>
              </li>
              <li className="px-4 py-4 justify-center items-center gap-1 flex">
                <div className="text-neutral-800 text-base font-medium">
                  TVs & Appliances
                </div>
              </li>
              <li className="px-4 py-4 justify-center items-center gap-1 flex">
                <div className="text-neutral-800 text-base font-medium">
                  Baby & Kids
                </div>
              </li>
              <li className="px-4 py-4 justify-center items-center gap-1 flex">
                <div className="text-neutral-800 text-base font-medium">
                  Books, Sports & More
                </div>
              </li>
            </ul>
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
