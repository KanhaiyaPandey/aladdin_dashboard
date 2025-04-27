import React from "react";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FaMessage } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";

const AdminHeader = () => {
  return (
    <>
      <header className="flex justify-between items-center  ">
        <h1 className="font-bold  text-2xl p-5">Dashboard </h1>
        <menuitems className=" hidden lg:block md:block">
          <div className="flex  items-center  space-x-4">
            <searchbar className="relative flex items-center justify-center ">
              <input
                type="text"
                className=" p-2 px-4  border border-gray-300 rounded-3xl shadow-lg focus:outline-none "
                placeholder="Search here..."
              />
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-600"
                onClick={(e) => e.preventDefault()}
              >
                <IoSearch size={20} />
              </button>
            </searchbar>
            <IoIosNotifications className="h-7 w-7 " />
            <FaMessage className="h-4 w-4 " />
            <MdAdminPanelSettings className="h-6 w-6 mr-5" />
          </div>
        </menuitems>
      </header>
    </>
  );
};

export default AdminHeader;
