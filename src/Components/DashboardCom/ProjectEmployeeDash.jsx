import React, { useContext, useEffect, useState } from "react";
import "./dashcom.css";
import { makeAuthenticatedGETRequest } from "../../services/serverHelper";
import { endpoints } from "../../services/api";
import { useSelector } from "react-redux";
import { AppContext } from "../../Context/AppContext";


const allStatus = ["All", "Ongoing", "Fininsh", "Onhold"];


function ProjectEmployeeDash() {

     const {accessToken} = useSelector((state)=>state.auth);
     const {openInviPop , setCurrPage , setCurrProjectOpen} = useContext(AppContext);
    const [currentStatus, setCurrentStatus] = useState("All");
       const [allProjects , setAllProjects] = useState([]);

       const getEmployeeProject = async()=>{
        const resp = await makeAuthenticatedGETRequest(endpoints.GET_MY_PROJECTS_API , accessToken);
         if(resp.success){
          setAllProjects(resp?.data);
         }
       }

       useEffect(()=>{
        getEmployeeProject();
      
// eslint-disable-next-line react-hooks/exhaustive-deps
},[openInviPop])
       
  return (
    <div className="dashwrap">


      <nav>
        <div className="navleft">
          <h2>Projects</h2>
        </div>
      </nav>


      <div className="prostatusfill">
          {allStatus?.map((status, index) => (
            <span
              onClick={() => setCurrentStatus(status)}
              key={index}
              className={`${currentStatus === status && "bleubg"}`}
            >
              {status}
            </span>
          ))}
        </div>

        {allProjects?.map((project, index) => (
            <div key={index} className="singleProj">

              <nav>
                <div onClick={()=>{
                   setCurrPage("Employee Project Detail");
                   setCurrProjectOpen(project);
                }} className="roboxleft">
                  <span>{project?.Name}</span>
                </div>
               
              </nav>

              <div className="statusdue">
                <div className="status">
                  <p>{project.status}</p>
                </div>
                <div className="duedate">
                  Due Date:{" "}
                  {new Date(project?.dueDate).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>

              <p className="prodec">{project?.Description}</p>

              <p className="prtotaltask">{project?.totalTasks} Tasks</p>

            </div>
          ))}

    </div>
  );
}

export default ProjectEmployeeDash;
