import React from "react";
import { IoMdCube } from "react-icons/io";
import { CgMenuGridO } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";
import { HiMiniBellAlert } from "react-icons/hi2";
import { MdAdminPanelSettings } from "react-icons/md";
import Graphs from "./Graphs";

const Cards = () => {
  return (
    <div className="flex flex-col flex-1 ">
    
      <header className="flex justify-between bg-slate-300/60 items-center pr-3 ">
        <h1 className="font-bold  text-2xl p-3">Dashboard </h1>
        <MdAdminPanelSettings className="h-6 w-6 " />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-4 p-4">
        <div className="bg-gray-300 shadow-md rounded-lg w-full h-auto p-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-bold"> Products</h3>{" "}
            <IoMdCube className=" w-6 h-6" />
          </div>
          <p className="text-gray-700">This is a card component.</p>
        </div>
        <div className="bg-gray-300 shadow-md rounded-lg w-full h-auto p-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-bold"> Costumers</h3>{" "}
            <FaUsers className=" w-6 h-6" />
          </div>
          <p className="text-gray-700">This is a card component.</p>
        </div>
        <div className="bg-gray-300 shadow-md rounded-lg w-full h-auto p-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-bold"> Categories</h3>{" "}
            <CgMenuGridO className=" w-6 h-6" />
          </div>
          <p className="text-gray-700">This is a card component.</p>
        </div>
        <div className="bg-gray-300 shadow-md rounded-lg  h-auto p-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-bold"> Alerts</h3>{" "}
            <HiMiniBellAlert className=" w-6 h-6" />
          </div>
          <p className="text-gray-700">This is a card component.</p>
        </div>
      </div>

      <Graphs />
    </div>
  );
};

export default Cards;
