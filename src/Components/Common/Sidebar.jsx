import React, { useContext } from "react";
import "./common.css";
import { NavLink } from "react-router-dom";
import gridView from "../../Assets/grid_view.png";
import { AppContext } from "../../Context/AppContext";

const elements = [
  {
    img: gridView,
    title: "Dashboard",
  },
  {
    img: gridView,
    title: "Project",
  },
];

function Sidebar() {
  const { currentPage ,  setCurrPage} = useContext(AppContext);

  return (
    <div className="sidebarWrap">
      <div className="sidebarCont">
        <NavLink to={"/"}>Logo</NavLink>

        {elements?.map((ele, index) => (
          <label  className={`cursor-pointer  ${currentPage === ele.title && "selected"}`} onClick={()=>setCurrPage(ele.title)} key={index}>
            <img src={ele?.img} alt="" />
            <span>{ele?.title}</span>
          </label>
        ))}
        
      </div>
    </div>
  );
}

export default Sidebar;
