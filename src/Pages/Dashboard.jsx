import React, { useContext, useState } from "react";
import Sidebar from "../Components/Common/Sidebar";
import "./page.css";
import Dash from "../Components/DashboardCom/Dash";
import Navbar from "../Components/Common/Navbar";
import ProjectDash from "../Components/DashboardCom/ProjectDash";
import { AppContext } from "../Context/AppContext";

function Dashboard() {

  const { currentPage } = useContext(AppContext);
  return (
    <div className="withnavbarcom">
      <Navbar />

      <div className="withsidebarComonwrap">
        <Sidebar />

        <div className="Maindashwrap">
          {currentPage === "Dashboard" && <Dash />}
          {currentPage === "Project" && <ProjectDash />}
        </div>
      </div>




    </div>
  );
}

export default Dashboard;
