
import { IoSearch } from "react-icons/io5";
import { AppstoreOutlined, LogoutOutlined, NotificationOutlined, WechatOutlined } from "@ant-design/icons";
import { authFetch } from "../../utils/Helpers";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {

  const navigate = useNavigate();

  const handleLogout =  async () =>{
      const res = await authFetch.post("/logout");
      
      if (res.data.success) {
         message.success("Loged out successfully");
         navigate("/login");
      }else{
          message.error("oops! Something went wrong");
      }
  }


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

            <button onClick={() => handleLogout()}>
              <LogoutOutlined />
            </button>
       
      
          </div>
        </menuitems>
      </header>
    </>
  );
};

export default AdminHeader;
