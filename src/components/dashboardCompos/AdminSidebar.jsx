import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppstoreAddOutlined, AppstoreOutlined, HomeOutlined, ProductOutlined } from "@ant-design/icons";
// import CategoryIcon from '@mui/icons-material/Category';

const menu = [
  {
    path:"overview",
    name:"Overview",
    icon:  <HomeOutlined /> ,
    submenu:[]
    
  },
    {
    path:"all-product",
    name:"Products",
    icon:  <ProductOutlined />,
    submenu:[
        {
          path:"all-product",
          name:"All Products",
          icon:<AppstoreOutlined />
        },
        {
          path: "add-product",
          name:"Add Product",
          icon:<AppstoreAddOutlined />
        }
    ]
  },
    {
    path:"categories",
    name:"Categories",
    icon:  <HomeOutlined /> ,
    submenu:[]
    
  },
]

const AdminSidebar = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("overview");

  useEffect(() => {
    // Extract path without leading slash, or fallback to 'overview'
    const path = location.pathname.split("/").filter(Boolean).pop() || "overview";
    setCurrentPath(path);
    
  }, [location]);


  const isParentActive = (item) => {
    if (currentPath === item.path) return true;
    return item.submenu?.some((sub) => currentPath === sub.path);
  };

  return (
    <>
      <main className="lg:block hidden shadow-xl sticky top-0 translate-y-4 border translate-x-3 flex-col  rounded-2xl p-4 w-full h-auto">
        <Link to="/overview" className="flex  text-3xl  font-bold  border-b items-center justify-center pb-3 ">
          ALADDIN
        </Link>

        <ul className="flex flex-col justify-center mt-10 gap-4 transition-all duration-300 ease-in-out">
          
         {menu.map((item, index) => (

          <li key={index}>
            <Link
              to={`/${item.path}`}
              className={`flex items-center space-x-3 p-2 rounded-lg ${
                isParentActive(item) ? "bg-base-300  transition-all duration-300 ease-in-out font-semibold" : ""
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>

          {item.submenu.length > 0 && (
            <ul className={`ml-6 mt-1 space-y-1 overflow-hidden transition-all duration-300 ease-in-out`}>
              {item.submenu.map((sub, subIndex) => (
                <li key={subIndex}>
                  <Link
                    to={`/${sub.path}`}
                    className={`block p-2 flex items-center gap-x-2  rounded-md text-sm  ${
                      currentPath === sub.path ? "bg-base-300 transition-all duration-300 ease-in-out font-medium" : ""
                    }`}
                  >
                   
                    <span> {sub.icon}</span>
                      <span>{sub.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}



        </ul>
      </main>
    </>
  );
};

export default AdminSidebar;


