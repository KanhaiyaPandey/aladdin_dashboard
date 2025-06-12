import React from "react";
import AdminSection from "../components/dashboardCompos/AdminSection";
import AdminSidebar from "../components/dashboardCompos/AdminSidebar";

const Dashboard = () => {
  return (
    <main>
      <div className="flex min-h-screen lato h-full justify-center">
        <AdminSidebar />
        <AdminSection />       
      </div>
    </main>
  );
};

export default Dashboard;
