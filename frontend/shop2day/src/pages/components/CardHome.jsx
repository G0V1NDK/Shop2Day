import React from "react";
import { path_url } from "../../config/config";

export const CardHome = ({ price, title, imageUrl }) => {
  const maxWords = 3; // Set the maximum number of words

  // Function to limit the number of words
  const limitWords = (text, limit) => {
    const words = text.split(' ');
    return words.slice(0, limit).join(' ');
  };

  const limitedTitle = limitWords(title, maxWords);
  return (
    <div className=" w-60 h-64">
      <div className="max-w-sm bg-white border border-zinc-500 rounded-lg shadow p-2 flex flex-col item-center ">
          <img
            className="rounded-t-lg h-48 object-contain pb-2 hover:scale-105 transition ease-in-out"
            src={path_url + imageUrl}
            alt=""
          />
        <div className="flex-col justify-start items-center gap-0.5 inline-flex">
          <h5 className="self-stretch text-center text-neutral-800 text-base font-normal">
          {limitedTitle}
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
