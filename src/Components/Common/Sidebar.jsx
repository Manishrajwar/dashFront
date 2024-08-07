import React, { useContext } from "react";
import "./common.css";
import { AppContext } from "../../Context/AppContext";



function Sidebar() {
  const { currentPage ,  setCurrPage , dashAllowPage} = useContext(AppContext);

  return (
    <div className="sidebarWrap">
      <div className="sidebarCont">

        {dashAllowPage?.map((ele, index) => (
          <label  className={`cursor-pointer  ${currentPage === ele && "selected"}`} onClick={()=>{
            setCurrPage(ele);
            sessionStorage.setItem("currentPage" , ele);
          }} key={index}>
            <span>{ele}</span>
          </label>
        ))}
        
      </div>
    </div>
  );
}

export default Sidebar;
