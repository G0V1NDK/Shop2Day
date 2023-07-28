import React from "react";
import { path_url } from "../../config/config";

export const CardHome = ({ price, title, imageUrl }) => {
  return (
    <div className="">
      <div className="max-w-sm bg-white border border-zinc-500 rounded-lg shadow p-2 flex flex-col item-center ">
          <img
            className="rounded-t-lg w-60 pb-2 hover:scale-105 transition ease-in-out"
            src={path_url + imageUrl}
            alt=""
          />
        <div className="flex-col justify-start items-center gap-0.5 inline-flex">
          <h5 className="self-stretch text-center text-neutral-800 text-base font-normal">
            {title}
          </h5>
          <p className="text-center text-neutral-800 text-base font-medium">
            Starting from ₹{price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardHome;
