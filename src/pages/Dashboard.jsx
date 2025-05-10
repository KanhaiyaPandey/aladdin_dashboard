import React from "react";
import AdminSection from "../components/dashboardCompos/AdminSection";
import AdminSidebar from "../components/dashboardCompos/AdminSidebar";

const Dashboard = () => {
  return (
    <main>
      <div className="flex min-h-screen bg-indigo-100">
        <AdminSidebar />
        <AdminSection />
        
      </div>
    </main>
  );
};

export default Dashboard;
