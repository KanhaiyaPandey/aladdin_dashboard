import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  HomeOutlined,
  ProductOutlined,
  ClusterOutlined,
  GoldOutlined,
} from "@ant-design/icons";
import MarginIcon from "@mui/icons-material/Margin";
import LoopIcon from "@mui/icons-material/Loop";
import WalletIcon from "@mui/icons-material/Wallet";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

const menu = [
  {
    path: "overview",
    name: "Overview",
    icon: <HomeOutlined />,
    submenu: [],
  },
  {
    path: "products",
    name: "Products",
    icon: <ProductOutlined />,
    submenu: [
      {
        path: "products",
        name: "All Products",
        icon: <AppstoreOutlined />,
      },
      {
        path: "products/add-product",
        name: "Add Product",
        icon: <AppstoreAddOutlined />,
      },
      {
        path: "categories",
        name: "Categories",
        icon: <ClusterOutlined />,
      },
      {
        path: "collections",
        name: "Collections",
        icon: <GoldOutlined />,
      },
    ],
  },
  {
    path: "orders",
    name: "Orders",
    icon: <MarginIcon fontSize="small" />,
    submenu: [],
  },
  {
    path: "return-orders",
    name: "Return Management",
    icon: <LoopIcon fontSize="small" />,
    submenu: [
      {
        path: "return-orders",
        name: "Return Requests",
        icon: <KeyboardReturnIcon fontSize="small" />,
      },
      {
        path: "refund",
        name: "Refund",
        icon: <WalletIcon fontSize="small" />,
      },
    ],
  },
];

const AdminSidebar = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    const path = location.pathname.replace(/^\/+/, "");
    setCurrentPath(path);
  }, [location]);

  const isParentActive = (item) => {
    if (item.path && currentPath === item.path) return true;
    return item.submenu?.some(
      (sub) => currentPath === sub.path || currentPath.startsWith(`${sub.path}/`)
    );
  };

  return (
    <main className="lg:block hidden shadow-xl sticky top-0 translate-y-4 border translate-x-3 flex-col rounded-2xl p-4 w-full h-auto">
      <Link
        to="/overview"
        className="flex text-3xl font-bold border-b items-center justify-center pb-3"
      >
        ALADDIN
      </Link>

      <ul className="flex flex-col justify-center mt-10 gap-2 transition-all duration-300 ease-in-out">
        {menu.map((item, index) => (
          <li key={index}>
            <Link
              to={`/${item.path}`}
              className={`flex items-center space-x-3 p-2 rounded-lg ${
                isParentActive(item)
                  ? "bg-[#ffddaeb9] transition-all duration-300 ease-in-out font-semibold"
                  : ""
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>

            {item.submenu.length > 0 && (
              <ul className="ml-6 mt-1 space-y-1 overflow-hidden transition-all duration-300 ease-in-out">
                {item.submenu.map((sub, subIndex) => (
                  <li key={subIndex}>
                    <Link
                      to={`/${sub.path}`}
                      className={`p-2 flex items-center gap-x-2 rounded-md text-sm ${
                        currentPath === sub.path
                          ? "bg-[#eed0a56c] transition-all duration-300 ease-in-out font-medium"
                          : ""
                      }`}
                    >
                      <span>{sub.icon}</span>
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
  );
};

export default AdminSidebar;
