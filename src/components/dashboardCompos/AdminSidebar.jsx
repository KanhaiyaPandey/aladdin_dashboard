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
      <main className="lg:block hidden h-full shadow-xl sticky top-0 translate-y-4 border translate-x-3 flex-col  rounded-2xl p-4 w-2/12">
        <h1 className="flex  text-3xl  font-bold ">
          ALADDIN
        </h1>

        <ul className="flex flex-col justify-center">
          
          <Link to="/all-product">
            <li className="flex   items-center space-x-3  h-16 text-sm cursor-pointer">
              <IoMdCube className=" w-4 h-4" /> <h3> Products</h3>
            </li>
          </Link>

                    <Link to="/all-product">
            <li className="flex   items-center space-x-3  h-16 text-sm cursor-pointer">
              <IoMdCube className=" w-4 h-4" /> <h3> Products</h3>
            </li>
          </Link>

                    <Link to="/all-product">
            <li className="flex   items-center space-x-3  h-16 text-sm cursor-pointer">
              <IoMdCube className=" w-4 h-4" /> <h3> Products</h3>
            </li>
          </Link>

                    <Link to="/all-product">
            <li className="flex   items-center space-x-3  h-16 text-sm cursor-pointer">
              <IoMdCube className=" w-4 h-4" /> <h3> Products</h3>
            </li>
          </Link>

                    <Link to="/all-product">
            <li className="flex   items-center space-x-3  h-16 text-sm cursor-pointer">
              <IoMdCube className=" w-4 h-4" /> <h3> Products</h3>
            </li>
          </Link>

        </ul>
      </main>
    </>
  );
};

export default AdminSidebar;


