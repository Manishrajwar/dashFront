import React, { useContext } from "react";
import "./common.css";
import { AppContext } from "../../Context/AppContext";
import { LuLayoutDashboard } from "react-icons/lu";
import { AiOutlineTeam } from "react-icons/ai";
import { MdOutlineLibraryBooks } from "react-icons/md";



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

       <div className="sidebarCont2">

       {dashAllowPage?.map((ele, index) => (
         <div key={index}>
             {
              ele ===  "Dashboard" && 
              <LuLayoutDashboard  color={currentPage === "Dashboard" ? 'Blue' : 'black'} onClick={()=>{
                setCurrPage(ele);
                sessionStorage.setItem("currentPage" , ele);
              }}  />
             }
             {
              ele === "Project" && 
              <MdOutlineLibraryBooks  color={currentPage === "Project" ? 'Blue' : 'black'} onClick={()=>{
                setCurrPage(ele);
                sessionStorage.setItem("currentPage" , ele);
              }}  />

             }
             {
              ele === "Create Team" && 
              <AiOutlineTeam  color={currentPage === "Create Team" ? 'Blue' : 'black'} onClick={()=>{
                setCurrPage(ele);
                sessionStorage.setItem("currentPage" , ele);
              }}  />
             }
         </div>
        ))}
        
           </div>
    </div>
  );
}

export default Sidebar;
