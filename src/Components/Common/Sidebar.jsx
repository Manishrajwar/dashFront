import React from "react";
import "./common.css";
import { NavLink } from "react-router-dom";
import gridView from "../../Assets/grid_view.png";

const elements = [
  {
    img: gridView,
    title: "Dashboard",
  },
];

function Sidebar() {
  return (
    <div className="sidebarWrap">
      <div className="sidebarCont">
        <NavLink to={"/"}>Logo</NavLink>

        {elements?.map((ele, index) => (
          <label key={index}>
            <img src={ele?.img} alt="" />
            <span>{ele?.title}</span>
          </label>
        ))}
        
      </div>
    </div>
  );
}

export default Sidebar;
