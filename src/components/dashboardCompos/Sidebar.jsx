import React from "react";
import { TbLayoutDashboardFilled, TbReportAnalytics } from "react-icons/tb";
import { IoSettings } from "react-icons/io5";
import { IoMdCube } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { CgMenuGridO } from "react-icons/cg";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <main className="lg:block md:hidden h-screen flex flex-col  bg-slate-300 w-1/6">
        <h1 className="font-extrabold grid h-16 m-5 items-center justify-center text-3xl">
          aladin
        </h1>

        <ul className="flex  flex-col justify-evenly">
          
          <Link to="/all-product">
            <li className="flex pl-7 items-center space-x-3  h-16 text-xl border-b-2 border-slate-400/30    hover:bg-gray-400 cursor-pointer">
              <IoMdCube className=" w-6 h-6" /> <h3> Products</h3>
            </li>
          </Link>

          <li className="flex pl-7 items-center space-x-3  h-16 text-xl border-b-2 border-slate-400/30    hover:bg-gray-400 cursor-pointer">
            <CgMenuGridO className=" w-6 h-6" /> <h3> Categories</h3>
          </li>
          <li className="flex pl-7 items-center space-x-3  h-16 text-xl border-b-2 border-slate-400/30    hover:bg-gray-400 cursor-pointer">
            <FaUsers className=" w-6 h-6" /> <h3> Costumers</h3>
          </li>
          <li className="flex pl-7 items-center space-x-3  h-16 text-xl border-b-2 border-slate-400/30    hover:bg-gray-400 cursor-pointer">
            <TbReportAnalytics className=" w-6 h-6" /> <h3> Report</h3>
          </li>
          <li className="flex pl-7 items-center space-x-3  h-16 text-xl border-b-2 border-slate-400/30    hover:bg-gray-400 cursor-pointer">
            <IoSettings className=" w-6 h-6" /> <h3> Settings</h3>
          </li>
        </ul>
      </main>
    </>
  );
};

export default Sidebar;

// Products
// Categories
// Costumers
// Settings
