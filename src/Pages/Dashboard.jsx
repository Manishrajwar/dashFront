import React, { useState } from "react";
import Sidebar from "../Components/Common/Sidebar";
import "./page.css";
import Dash from "../Components/DashboardCom/Dash";
import Navbar from "../Components/Common/Navbar";

function Dashboard() {
  const [currentPage, setCurrPage] = useState("Dashboard");

  return (
    <div className="withnavbarcom">
      <Navbar />

      <div className="withsidebarComonwrap">
        <Sidebar />

        <div className="Maindashwrap">
          {currentPage === "Dashboard" && <Dash />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
