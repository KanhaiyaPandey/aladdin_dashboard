import React from "react";
import Sidebar from "../components/dashboardCompos/Sidebar";
import Cards from "../components/dashboardCompos/Cards";
import Graphs from "../components/dashboardCompos/Graphs";

const Dashboard = () => {
  return (
    <main>
      <div className="flex">
        <Sidebar />
        <Cards />
        {/* <Graphs /> */}
      </div>
    </main>
  );
};

export default Dashboard;
