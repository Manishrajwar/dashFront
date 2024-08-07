import { useContext, useEffect, useState } from "react";
import "./task.css";
import cross from "../../Assets/cross.png";
import profile from "../../Assets/frame99.png"

import { AppContext } from "../../Context/AppContext";
import CircularProgress from "../../Hooks/CircularProgress";

function ProjectOverview() {
  const {openOverview , setOpenOverview} = useContext(AppContext);

  const [taskDetail , setTaskDetail] = useState({
    Done:"" , 
    NotStarted:"" , 
    Pending:""  , 
    started:""  , 
    percentage:""
  })

  useEffect(()=>{
 if(openOverview){
     const task = openOverview?.task;
     let totalTasks = task.length;
      if(task.length > 0){
          const Done = task.filter((t)=>t.status === "Done").length;
          const NotStarted = task.filter((t)=>t.status === "Not Started").length;
          const Pending = task.filter((t)=>t.status === "Pending").length;
          const started = task.filter((t)=>t.status === "Started").length;
           // Calculate the percentage of done tasks
  const donePercentage = (Done / totalTasks) * 100;

           setTaskDetail((prev)=>({
            ...prev ,
            Done: Done , 
            NotStarted: NotStarted , 
            Pending: Pending , 
            started:started , 
            percentage:donePercentage
           }))      

      }
 }
// eslint-disable-next-line react-hooks/exhaustive-deps 
},[openOverview]);

  return (
    <>
      <div className="proTaskCont">

        <nav>
          <h2>{openOverview?.Name} Overview</h2>

          <img onClick={()=>setOpenOverview(false)} src={cross} alt="" />
        </nav>

        <div className="OvervieCont">

            {/* first section  */}
            <div className="proDetails proComDetail">

                {/* left section  */}
                <div className="proDetaLeft">
                    <label >
                        <p>Project</p>
                         <span>{openOverview?.Name}</span>
                    </label>

                    <label >
                        <p>Status</p>
                         <span>{openOverview?.status}</span>
                    </label>
                    <label >
                        <p>Created At</p>
                         <span>{openOverview?.createdAt}</span>
                    </label>
                    <label >
                        <p>Due Date</p>
                         <span>{openOverview?.dueDate}</span>
                    </label>
                    <label >
                        <p>Total Task</p>
                         <span>{openOverview?.task?.length}</span>
                    </label>
                    <label >
                        <p>Created By</p>
                         <span>{openOverview?.CreatedBy?.email}</span>
                    </label>

                </div>

                {/* right section */}
                <div className="proDetRight">
        <CircularProgress percentage={taskDetail?.percentage} color={'#4caf50'} />

                </div>

            </div>
          
            {/* second section */}
            <div className="proComDetail prsecSec">
                <label >
                    <p>Decription</p>
                <span>{openOverview?.Description}</span>
                </label>
            </div>

            {/* third section */}
            <div className="proComDetail memberDetail">

                <h2>Members</h2>

                <div className="allMemb">
                {
                    openOverview?.Members?.map((mem ,index)=>(
                        <label key={index} className="singMem" >
                        <img src={profile} alt="" />
                        <span>{mem?.email}</span>
                     </label>
                    ))
                }
                </div>
            </div>


        </div>
         
      </div>
    </>
  );
}

export default ProjectOverview;
