import Image from "next/image";
import React from "react";
import {
  MdFireHydrantAlt,
  MdFireplace,
  MdMore,
  MdPlayCircleFilled,
} from "react-icons/md";

function Rightbar() {
  return (
    <div>
      <div className="relative bg-slate-800 rounded-md p-4 mb-5 ">
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2">
          <Image
            alt=""
            src={"/astronaut.png"}
            className=" object-contain opacity-20"
            fill
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row align-middle gap-1">
            <MdFireplace size={24} color="yellow" />
            <span className=" font-bold capitalize">Available now</span>
          </div>

          <h3 className="font-semibold capitalize text-opacity-5">
            how to use new dashoard
          </h3>
          <span className=" font-thin">takes 4 min</span>
          <p className=" font-light">
            learn how to use the new layout in demo mode and become the new
            master of customer care with help of AI
          </p>
          <button className="flex flex-row  items-center bg-purple-600 rounded-md gap-2 hover:bg-purple-300 p-2 border-none">
            <MdPlayCircleFilled size={20} />
            watch
          </button>
        </div>
      </div>
      <div className="relative bg-slate-800 rounded-md p-4 mb-5 ">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row align-middle gap-1">
            <MdFireplace size={24} color="yellow" />
            <span className=" font-bold capitalize">Available now</span>
          </div>

          <h3 className="font-semibold capitalize text-opacity-5">
            join the new challenge
          </h3>
          <p className=" font-light">
            learn how to use the new layout in demo mode and become the new
            master of customer care with help of AI
          </p>
          <button className="flex flex-row  items-center bg-purple-600 rounded-md gap-2 hover:bg-purple-300 p-2 border-none">
            <MdMore size={20} />
            learn more
          </button>
        </div>
      </div>
    </div>
  );
}

export default Rightbar;
