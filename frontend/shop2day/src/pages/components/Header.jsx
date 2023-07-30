import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "..//../Images/logo s2y.svg";
import user from "..//../Images/user.svg";
import cart from "..//../Images/Frame (1).svg";
import Wishlist from "..//../Images/Frame (2).svg";
import search from "..//../Images/Frame.svg";
import { ToastContainer, toast } from "react-toastify";

const Header = ({ onSubmitSearch }) => {
  const [searchTxt, setSearchTxt] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSearchChange = async () => {
    const autoSearch = await fetch(
      "http://suggestqueries.google.com/complete/search?client=firefox&q=" +
        searchTxt
    );
    const json = await autoSearch.json();
    setSearchResult(json[1]);
    // console.log(json[1]);
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmitSearch(searchTxt);
                }}
              >
                <div className=" flex">
                  <div className="">
                    <input
                      type="search"
                      id="default-search"
                      className="block w-[632px] h-11 px-5 py-3 opacity-60 bg-blue-200 bg-opacity-50 rounded-l justify-start items-center gap-[7px] text-neutral-800 text-base font-normal"
                      placeholder="Search anything you want..."
                      onChange={(e) => setSearchTxt(e.target.value)}
                      value={searchTxt}
                    />
                  </div>
                  <div className="opacity-60 bg-blue-200 bg-opacity-50 rounded-r">
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
                  <Link to="/cart" className="flex">
                    <img src={cart} alt="" className="w-7 h-7 relative" />
                    <div className="text-neutral-800 text-base font-normal">
                      Cart
                    </div>
                  </Link>
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
