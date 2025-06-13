import React from "react";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FaMessage } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { AppstoreOutlined, NotificationOutlined, WechatOutlined } from "@ant-design/icons";

const AdminHeader = () => {
  return (
    <>
      <header className="flex justify-between items-center w-full  ">
        <searchbar className="relative flex items-center justify-center ">
              <input
                type="text"
                className=" p-2 px-4  border border-gray-300 rounded-3xl shadow-sm focus:outline-none "
                placeholder="Search here..."
              />
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-600"
                onClick={(e) => e.preventDefault()}
              >
                <IoSearch size={20} />
              </button>
            </searchbar>
        <menuitems className=" hidden lg:block md:block">
          <div className="flex  items-center gap-x-4">
            <button className=" p-2 flex items-center justify-center rounded-full ">
                   <NotificationOutlined style={{ fontSize: '20px' }} className=""/>
            </button>

            <button>
                   <WechatOutlined style={{ fontSize: '20px' }} className=""/>
            </button>

            <button>
                 <AppstoreOutlined style={{ fontSize: '20px' }} className=""/>
            </button>
       
      
          </div>
        </menuitems>
      </header>
    </>
  );
};

export default AdminHeader;
