import React from "react";
import { IoMdCube } from "react-icons/io";
import { CgMenuGridO } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";
import { HiMiniBellAlert } from "react-icons/hi2";
import Graphs from "./Graphs";
import AdminHeader from "./AdminHeader";

const AdminSection = () => {
  return (
    <main className="flex flex-col flex-1 m-4">
      <AdminHeader />

      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-4 p-4">
        <card className="bg-gradient-to-br  from-indigo-200  to-slate-200 shadow-lg rounded-2xl w-11/12 h-auto p-4">
          <div className="flex justify-evenly gap-x-3 items-center p-2">
            
              <IoMdCube className=" w-10 h-10" />
            <div>
              <h2 className="text-4xl font-bold">3456</h2>
              <h3 className="text-lg font-bold">Total Products</h3>{" "}
            </div>
          </div>
        </card>
        <card className="bg-gradient-to-br  from-indigo-200  to-slate-200 shadow-lg rounded-2xl w-11/12 h-auto p-4">
          <div className="flex justify-evenly gap-x-3 items-center p-2">
              <CgMenuGridO className=" w-10 h-10" />
            
            <div>
              <h2 className="text-4xl font-bold">48</h2>
              <h3 className="text-lg font-bold">Total Categories</h3>{" "}
            </div>
          </div>
        </card>
        <card className="bg-gradient-to-br  from-indigo-200  to-slate-200 shadow-lg rounded-2xl w-11/12 h-auto p-4">
          <div className="flex justify-evenly gap-x-3 items-center p-2">
            
              <FaUsers className=" w-10 h-10" />
            <div>
              <h2 className="text-4xl font-bold">438</h2>
              <h3 className="text-lg font-bold">Total Customers</h3>{" "}
            </div>
          </div>
        </card>
        <card className="bg-gradient-to-br  from-indigo-200  to-slate-200 shadow-lg rounded-2xl w-11/12 h-auto p-4">
          <div className="flex justify-evenly gap-x-3 items-center p-2">
              <HiMiniBellAlert className=" w-10 h-10" />
            
            <div>
              <h2 className="text-4xl font-bold">36</h2>
              <h3 className="text-lg font-bold">Notifications</h3>{" "}
            </div>
          </div>
        </card>
      </div>

      <Graphs />
    </main>
  );
};

export default AdminSection;
