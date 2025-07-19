import AdminSidebar from "../components/dashboardCompos/AdminSidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {

  return (
<main className="">
  <div className="flex min-h-screen lato justify-center relative">
    <div className="w-2/12 flex flex-col sticky top-0 h-screen">
      <AdminSidebar />
    </div>

    <div className="w-10/12 flex flex-col">
      <Outlet />
    </div>
  </div>
</main>

  );
};

export default Dashboard;
