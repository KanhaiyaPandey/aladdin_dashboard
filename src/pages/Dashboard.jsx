import AdminSidebar from "../components/dashboardCompos/AdminSidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {

  return (
    <main>
      <div className="flex min-h-screen lato h-full justify-center">
        <div className=" w-2/12">
             <AdminSidebar />
        </div>

        <div className=" w-10/12">
                 <Outlet/>
        </div>

     
  
       
   
      </div>
    </main>
  );
};

export default Dashboard;
