import React from "react";
import { TbLayoutDashboardFilled, TbReportAnalytics } from "react-icons/tb";
import { IoSettings } from "react-icons/io5";
import { IoMdCube } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { CgMenuGridO } from "react-icons/cg";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <>
      <main className="lg:block hidden  h-full  flex-col m-3  rounded-2xl bg-slate-300/60 w-1/5">
        <h1 className="font-extrabold grid h-full w-full p-5 shadow-lg mb-2 items-center justify-center text-3xl">
          aladin
        </h1>

        <ul className="flex pl-10 flex-col justify-evenly">
          
          <Link to="/all-product">
            <li className="flex   items-center space-x-3  h-16 text-xl      cursor-pointer">
              <IoMdCube className=" w-6 h-6" /> <h3> Products</h3>
            </li>
          </Link>

          <li className="flex   items-center space-x-3  h-16 text-xl      cursor-pointer">
            <CgMenuGridO className=" w-6 h-6" /> <h3> Categories</h3>
          </li>
          <li className="flex   items-center space-x-3  h-16 text-xl     cursor-pointer">
            <FaUsers className=" w-6 h-6" /> <h3> Costumers</h3>
          </li>
          <li className="flex   items-center space-x-3  h-16 text-xl       cursor-pointer">
            <TbReportAnalytics className=" w-6 h-6" /> <h3> Report</h3>
          </li>
          <li className="flex   items-center space-x-3  h-16 text-xl     cursor-pointer">
            <IoSettings className=" w-6 h-6" /> <h3> Settings</h3>
          </li>
          <li className="flex   items-center space-x-3  h-16 text-xl     cursor-pointer">
            <IoSettings className=" w-6 h-6" /> <h3> Charts</h3>
          </li>
          <li className="flex   items-center space-x-3  h-16 text-xl     cursor-pointer">
            <IoSettings className=" w-6 h-6" /> <h3> Plugins</h3>
          </li>
          <li className="flex   items-center space-x-3  h-16 text-xl     cursor-pointer">
            <IoSettings className=" w-6 h-6" /> <h3> Widgit</h3>
          </li>
        </ul>
      </main>
    </>
  );
};

export default AdminSidebar;


