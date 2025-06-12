import React from "react";
import { IoMdCube } from "react-icons/io";
import { CgMenuGridO } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";
import { HiMiniBellAlert } from "react-icons/hi2";
import Graphs from "./Graphs";
import AdminHeader from "./AdminHeader";

const AdminSection = () => {
  return (
    <main className="flex flex-col flex-1 m-4 w-10/12 lato text-slate-900 px-4 gap-8">
      <AdminHeader />

      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-4 w-full">

        <card className=" border shadow-lg rounded-2xl w-full h-auto p-4 hover:scale-105 hover:translate-y-1 cursor-pointer transition-all  duration-300 ease-in-out">
          <div className="flex justify-evenly gap-x-3 items-center p-2">
            
              <IoMdCube className=" min-w-10 min-h-10" />
            <div>
              <h2 className="text-xl font-semibold">3456</h2>
              <h3 className="text-base">Total Products</h3>
            </div>
          </div>
        </card>

        <card className=" shadow-lg rounded-2xl w-full h-auto p-4 border hover:scale-105 hover:translate-y-1 cursor-pointer transition-all  duration-300 ease-in-out">
          <div className="flex justify-evenly gap-x-3 items-center p-2">
              <CgMenuGridO className=" w-10 h-10" />
            
            <div>
              <h2 className="text-xl font-semibold">48</h2>
              <h3 className="text-base ">Total Categories</h3>
            </div>
          </div>
        </card>

        <card className=" shadow-lg rounded-2xl w-full h-auto p-4 border hover:scale-105 hover:translate-y-1 cursor-pointer transition-all  duration-300 ease-in-out">
          <div className="flex justify-evenly gap-x-3 items-center p-2">
            
              <FaUsers className=" w-10 h-10" />
            <div>
              <h2 className="text-xl font-semibold">438</h2>
              <h3 className="text-base ">Total Customers</h3>
            </div>
          </div>
        </card>

        <card className=" shadow-lg rounded-2xl  w-full border h-auto p-4 hover:scale-105 hover:translate-y-1 cursor-pointer transition-all  duration-300 ease-in-out">
          <div className="flex justify-evenly gap-x-3 items-center p-2">
              <HiMiniBellAlert className=" w-10 h-10" />
            
            <div>
              <h2 className="text-xl font-semibold">36</h2>
              <h3 className="text-base ">Notifications</h3>
            </div>
          </div>
        </card>

      </div>
      <Graphs />                          
    </main>
  );
};

export default AdminSection;
