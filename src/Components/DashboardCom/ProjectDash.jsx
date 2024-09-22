// Import Swiper styles
import { useState, useRef, useEffect, useContext } from "react";
import "./dashcom.css";
import projectdot from "../../Assets/projectnav.png";
import cross from "../../Assets/cross.png";
import userplus from "../../Assets/bx-user-plus.png";
import edit from "../../Assets/edit.png";
import deleteuser from "../../Assets/bx-trash-alt.png";
import useOnClickOutside from "../../Hooks/useOnClickOutside";
import { FaLocationArrow } from "react-icons/fa";
import ProjectTasks from "../DashboardCom/ProjectTasks"
import { SlOptionsVertical } from "react-icons/sl";


import toast from "react-hot-toast";
import {
  makeAuthenticatedDATADELETERequest,
  makeAuthenticatedGETRequest,
  makeAuthenticatedPOSTRequest,
  makeAuthenticatedPUTRequest,
} from "../../services/serverHelper";
import { endpoints } from "../../services/api";
import { useSelector } from "react-redux";
import { AppContext } from "../../Context/AppContext";
import ProjectOverview from "./ProjectOverview";

const allStatus = ["All", "Ongoing", "Fininsh", "Onhold"];

function ProjectDash() {
  const [currentStatus, setCurrentStatus] = useState("All");
  const { accessToken } = useSelector((state) => state.auth);
  const { myTeam, changeHandler , currentProjectOpen , taskformdata, settaskFormdata , setOpenCreateTask ,openCreateTask , setIsEdit , isEdit , setCurrProjectOpen , openOverview , setOpenOverview , getAllProTask} = useContext(AppContext);
 

  const [showCretePop, setShowCreatePop] = useState(false);
  const [inviteForm, setInviteForm] = useState(false);

  const projectFormConfig = (value) => {
    if (value) {
      setShowCreatePop(true);
    } else {
      setShowCreatePop(false);
    }
  };
  const [openProNav, setOpenNav] = useState(false);
  const [allProjects, setAllProject] = useState([]);

  const proNavRef = useRef(null);
  useOnClickOutside(proNavRef, () => setOpenNav(null));

  const [isProjectEdit, setIsProjectEdit] = useState(null);

  const [formdata, setFormdata] = useState({
    Name: "",
    // Members: [],
    Description: "",
    dueDate: "",
  });

  const [inviteEmail, setInviteEmail] = useState({
    email:"" , title:""
  });

  
    
 
 const cutSet = ()=>{
  setFormdata({
    title: "",
    description: "",
    member: "",
    priority: "Low",
    dueDate: "",
  });
  setIsEdit(false);
 }
  
  const getProjects = async () => {
    const resp = await makeAuthenticatedGETRequest(
      endpoints.GET_ADMIN_PROJECT_API,
      accessToken
    );

    if (resp.success) {
      setAllProject(resp?.allProj);
    } else {
      toast.error(resp?.message);
    }
  };

  const createProjectHandler = async () => {
    const toastId = toast.loading("Loading...");
    const resp = await makeAuthenticatedPOSTRequest(
      endpoints?.CREATE_PROJECT_API,
      {
        teamId: myTeam?._id,
        Name: formdata?.Name,
        // Members: formdata?.Members,
        Description: formdata?.Description,
        dueDate: formdata?.dueDate,
      },
      accessToken
    );
    if (resp?.success) {
      toast.success("Successfuly Created");
      setShowCreatePop(false);
      setFormdata({ Name: "", dueDate: "", Description: "" });
      getProjects();
    } else {
      toast.error(resp?.message);
    }
    toast.dismiss(toastId);
  };

  const editProjectHandler = async () => {
    const toastId = toast.loading("Loading...");
    const resp = await makeAuthenticatedPUTRequest(
      endpoints?.EDIT_PROJECT_API,
      {
        projectId: isProjectEdit,
        Name: formdata?.Name,
        Members: formdata?.Members,
        Description: formdata?.Description,
        dueDate: formdata?.dueDate,
      },
      accessToken
    );
    if (resp?.success) {
      toast.success("Successfuly Updated");
      setShowCreatePop(false);
      setFormdata({ Name: "", Members: [], Description: "" });
      getProjects();
    } else {
      toast.error(resp?.message);
    }
    toast.dismiss(toastId);
  };

  const deleteProject = async (projectId) => {
    const toastId = toast.loading("Loading...");
    const resp = await makeAuthenticatedDATADELETERequest(
      endpoints?.DELETE_PROJECT_API,
      {
        projectId,
        teamId: myTeam?._id,
      },
      accessToken
    );
    if (resp?.success) {
      toast.success("Successfuly Deleted");
      getProjects();
      setOpenNav(null);
    } else {
      toast.error(resp?.message);
    }
    toast.dismiss(toastId);
  };
  
  const sendInviteHandler = async(e)=>{
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    const resp = await makeAuthenticatedPOSTRequest(
      endpoints?.SEND_INVITE_API ,
      {
        email: inviteEmail.email , title:inviteEmail.title , projectId : inviteForm
      },
      accessToken
    );
    if (resp?.success) {
      toast.success("Successfuly Send");
      setInviteForm(false);
      setInviteEmail("");
    } else {
      toast.error(resp?.message);
    }
    toast.dismiss(toastId);

  }

  const createTaskHandler = async()=>{
    const toastId = toast.loading("Loading...");
    try{

      const resp = await makeAuthenticatedPOSTRequest(endpoints.CREATE_TASK_API , {...taskformdata ,project:currentProjectOpen?._id} , accessToken);
      if(resp?.success){
        toast.success("successfuly created");
        getAllProTask();
        cutSet();
      }
      else {
        toast.error(resp?.message);
      }
 
    } catch(error){
       toast.error("Something went wrong , please try again");
    }
    toast.dismiss(toastId);
   }

   const editTaskHandler = async()=>{
    const toastId = toast.loading("Loading...");
    try{

      const resp = await makeAuthenticatedPUTRequest(endpoints.UPDATE_TASK_API , {...taskformdata ,project:currentProjectOpen?._id , taskId:isEdit} , accessToken);
      if(resp?.success){
        toast.success("successfuly Updated");
        getAllProTask();
        cutSet();
      }
      else {
        toast.error(resp?.message);
      }
 
    } catch(error){
       toast.error("Something went wrong , please try again");
    }
    toast.dismiss(toastId);
   }

  useEffect(() => {
    getProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <>
      <div className="dashwrap">

        <nav className="prodashnav">

          {/* left side */}
          <div className="navleft">
            <h2>Projects</h2>
          </div>

          {/* right side */}
          <div className="prodashbtn">
            <button onClick={() => projectFormConfig(true)} className="addbtn">
              <span>Add Project</span>
            </button>
            <button className="iportpro">
              <span>Import Project</span>
            </button>
            <button className="expobtn">
              <span>Export Project</span>
            </button>

          </div>

          <SlOptionsVertical  className="prodashoptions"/>


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

        <div className="allProjectccont">
          {allProjects?.map((project, index) => (
            <div key={index} className="singleProj">

              <nav>
                {/* Left part */}
                <div onClick={()=>{ 
                  setCurrProjectOpen(project);
                  }} className="roboxleft">
                  <span>{project?.Name}</span>
                </div>
                {/* Right part */}
                <div>
                  <img
                    onClick={() => setOpenNav(index)}
                    src={projectdot}
                    className="cursor-pointer"
                    alt=""
                  />
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

              <p className="prodec">{project?.Description ? `${project.Description.substring(0, 20)}...` : ''}</p>

              {openProNav === index && (
                <div className="opennav" ref={proNavRef}>

                  <div 
                    onClick={() => setInviteForm(project?._id)}
                    className="cursor-pointer"
                  >
                    <img src={userplus} alt="userplus" />{" "}
                    <p> Invite Employee</p>
                  </div>

                  <div 
                 onClick={() => {
                  setOpenCreateTask(true)
                  setIsEdit(false);
                 }}
                    className="cursor-pointer"
                  >
                    <img src={userplus} alt="userplus" />{" "}
                    <p> Assign Task</p>
                  </div>

                  <div className="cursor-pointer"
                    onClick={() => {
                      setIsProjectEdit(project?._id);
                      const { Name, dueDate, Description } = project;
                      const formattedDueDate = new Date(dueDate)
                        .toISOString()
                        .split("T")[0];
                      setFormdata({
                        Name,
                        dueDate: formattedDueDate,
                        Description,
                      });
                      setShowCreatePop(true);
                    }}
                  >
                    <img src={edit} alt="" /> <p> Edit</p>
                  </div>

              
                  <div className="cursor-pointer" onClick={() => deleteProject(project?._id)}>
                    <img src={deleteuser} alt="" /> <p> Delete</p>
                  </div>

                  <div onClick={()=>setOpenOverview(project)} className="cursor-pointer" >
                  <FaLocationArrow /> <p> Overview</p>
                  </div>

                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* this is cretae project popup  */}

      {showCretePop && (
        <div className="ShowDetailWrap popup-overlay">
          <div className="createpopcont incheigh  popup-content">

            <nav>
               {
                isProjectEdit ? 
                <p>Edit Project</p>:  <p>Create New Project</p>
               }
              <img
                onClick={() => {
                  setIsProjectEdit(null);
                  projectFormConfig(false);
                }}
                src={cross}
                alt=""
              />
            </nav>

            <hr />

            <form>
              <label htmlFor="">
                <p>Name </p>
                <input
                  onChange={(e) => {
                    changeHandler(e, setFormdata);
                  }}
                  value={formdata?.Name}
                  name="Name"
                  type="text"
                  placeholder="Project Name"
                />
              </label>

              <label htmlFor="">
                <p>Due Date </p>
                <input
                  onChange={(e) => {
                    changeHandler(e, setFormdata);
                  }}
                  required
                  value={formdata?.dueDate}
                  name="dueDate"
                  type="date"
                  placeholder="Due Date"
                />
              </label>

              <label htmlFor="">
                <p>Description </p>
                <input
                  onChange={(e) => {
                    changeHandler(e, setFormdata);
                  }}
                  value={formdata?.Description}
                  name="Description"
                  type="text"
                  placeholder="Project Name"
                />
              </label>

              <div className="createbtns  invitation-buttons">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (isProjectEdit) {
                      editProjectHandler();
                    } else {
                      createProjectHandler();
                    }
                  }}
                >
                  {isProjectEdit ? "Save" : "Add New Project"}
                </button>
                <button
                  onClick={() => {
                    projectFormConfig(false);
                    setIsProjectEdit(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {inviteForm && (
        <div className="ShowDetailWrap popup-overlay">
          <div className="createpopcont incheigh   popup-content">

            <nav>
              <p>Invite Employee</p>
              <img
                onClick={() => {
                  setInviteForm(false);
                }}
                src={cross}
                alt=""
              />
            </nav>

            <hr />

            <form onSubmit={sendInviteHandler}>

              <label htmlFor="">
                <p>Title </p>
                <input
                  onChange={(e) => {
                    changeHandler(e , setInviteEmail)
                  }}
                  value={inviteEmail.title}
                  name="title"
                  type="text"
                  required
                  placeholder="Request Title "
                />
              </label>

              <label htmlFor="">
                <p>Email </p>
                <input
                  onChange={(e) => {
                changeHandler(e , setInviteEmail)
                  }}
                  value={inviteEmail.email}
                  name="email"
                  type="email"
                  required
                  placeholder="Employee email"
                />
              </label>

            <div className="createbtns invitation-buttons">
             <button  type="submit">Send</button>
            </div>
            </form>
          </div>
        </div>
      )}

      {openOverview && (
      <div className="ShowDetailWrap popup-overlay">
      <div className="createpopcont incheighWidth  popup-content">

      <ProjectOverview  />
       
      </div>
    </div>
      )}


      {currentProjectOpen && (
        <div className="ShowDetailWrap popup-overlay">
          <div className="createpopcont incheighWidth  popup-content">
 
          <ProjectTasks  />
           
          </div>
        </div>
      )}

{openCreateTask && (
        <div className="ShowDetailWrap popup-overlay">

          <div className="createpopcont incheigh">

            <nav>
              {
                isEdit ?  <p>Update Task</p> :
                <p>Assign New Task</p>
              }
              <img
                onClick={() => {
                  setOpenCreateTask(false);
               
                  cutSet();
                }}
                src={cross}
                alt="cross"
              />
            </nav>

            <hr />

            <form >

              <label>
                <p>Title </p>
                <input
                  onChange={(e) => {
                    changeHandler(e, settaskFormdata);
                  }}
                  value={taskformdata?.title}
                  name="title"
                  type="text"
                  required
                  placeholder="Task Title"
                />
              </label>

              <label>
                <p>Assign To </p>
                <select
                  name="member"
                  required
                  onChange={(e) => changeHandler(e, settaskFormdata)}
                  value={taskformdata.member}
                  id=""
                >
                  <option value="Select">Select</option>
                  {currentProjectOpen?.Members?.map((mem, index) => (
                    <option value={mem?._id} key={index}>
                      {mem?.fullName}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <p>due Date </p>
                <input
                  onChange={(e) => {
                    changeHandler(e, settaskFormdata);
                  }}
                  required
                  value={taskformdata?.dueDate}
                  name="dueDate"
                  type="date"
                />
              </label>

              <label>
                <p>Priority</p>
                <select
                required
                  name="priority"
                  onChange={(e) => changeHandler(e,settaskFormdata)}
                  value={settaskFormdata.priority}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </label>

              <label>
                <p>Description </p>
            <textarea name="description" onChange={(e)=>changeHandler(e , settaskFormdata)} value={taskformdata.description} ></textarea>
              </label>

              <div className="createbtns">

              <button onClick={(e)=>{
                e.preventDefault();
               if(isEdit){
                editTaskHandler();
               }
               else{
                 createTaskHandler();
                }
              }}>{isEdit?"Save":"Assign"}</button>

              </div>

            </form>

          </div>

        </div>
      )}

    </>
  );
}

export default ProjectDash;
