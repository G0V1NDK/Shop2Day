import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
        
<footer className="bg-dark dark:bg-gray-900" style={{background:"#101929"}}>
    <div className="mx-auto w-full max-w-screen-xl">
      <div className="grid grid-cols-3 gap-2 px-4 py-6 lg:py-8 md:grid-cols-5">
        <div>
            <h1 className="mb-4 text-zinc-500 text-sm font-semibold">About</h1>
            <ul className="text-gray-500 dark:text-gray-400 ">
                <li className="mb-3">
                    <a href="#" className="hover:underline text-white text-sm font-normal">About us</a>
                </li>
                <li className="mb-3">
                    <a href="#" className="hover:underline text-white text-sm font-normal">Contact us</a>
                </li>
            </ul>
        </div>
        <div>
            <h1 className="mb-4 text-zinc-500 text-sm font-semibold">Help</h1>
            <ul className="text-gray-500 dark:text-gray-400 ">
                <li className="mb-3">
                    <a href="#" className="hover:underline text-white text-sm font-normal">Payment</a>
                </li>
                <li className="mb-3">
                    <a href="#" className="hover:underline text-white text-sm font-normal">Shiping</a>
                </li>
                <li className="mb-3">
                    <a href="#" className="hover:underline text-white text-sm font-normal">Cancellation & Returns</a>
                </li>
                <li className="mb-3">
                    <a href="#" className="hover:underline text-white text-sm font-normal">FAQ</a>
                </li>
            </ul>
        </div>
        <div>
            <h1 className="mb-4 text-zinc-500 text-sm font-semibold">Policies</h1>
            <ul className="text-gray-500 dark:text-gray-400 ">
                <li className="mb-3">
                    <a href="#" className="hover:underline text-white text-sm font-normal">Return Policy</a>
                </li>
                <li className="mb-3">
                    <a href="#" className="hover:underline text-white text-sm font-normal">Terms of us</a>
                </li>
                <li className="mb-3">
                    <a href="#" className="hover:underline text-white text-sm font-normal">Privacy Policy</a>
                </li>
            </ul>
        </div>
        <div>
            <h1 className="mb-4 text-zinc-500 text-sm font-semibold">Social</h1>
            <ul className="text-gray-500 dark:text-gray-400 ">
                <li className="mb-3">
                    <a href="#" className="hover:underline text-white text-sm font-normal">Facebook</a>
                </li>
                <li className="mb-3">
                    <a href="#" className="hover:underline text-white text-sm font-normal">Instagram</a>
                </li>
                <li className="mb-3">
                    <a href="#" className="hover:underline text-white text-sm font-normal">Twitter</a>
                </li>
                <li className="mb-3">
                    <a href="#" className="hover:underline text-white text-sm font-normal">Youtube</a>
                </li>
            </ul>
        </div>
        <div>
            <h1 className="mb-4 text-zinc-500 text-sm font-semibold">Registered Address</h1>
            <ul className="text-gray-500 dark:text-gray-400 ">
                <li className="mb-3">
                    <a href="#" className=" text-white text-sm font-normal">78, Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta, explicabo, Mumbai, Maharashtra, 400002</a>
                </li>
                <li className="mb-3">
                    <a href="#" className="hover:underline text-white text-sm font-normal">Email: info@shop2day.com</a>
                </li>
                <li className="mb-3">
                    <a href="#" className=" text-white text-sm font-normal">Phone: +91 1234567890</a>
                </li>
               
            </ul>
        </div>
    </div>
    <div className="px-4 py-6 dark:bg-gray-700 flex items-center justify-center">
        <span className="text-sm text-gray-500 dark:text-gray-300 text-center">© 2007-2023<a href="https://flowbite.com/"> Shop2Day.com</a>. All Rights Reserved.
        </span>
      </div>
    </div>
</footer>

       
        
        </>
    )
}

export default Footer;