import React from "react";
import Sidebar from "../components/dashboardCompos/Sidebar";
import Cards from "../components/dashboardCompos/Cards";

const Dashboard = () => {
  return (
    <main>
      <div className="flex bg-slate-200">
        <Sidebar />
        <Cards />
       
      </div>
    </main>
  );
};

export default Dashboard;
