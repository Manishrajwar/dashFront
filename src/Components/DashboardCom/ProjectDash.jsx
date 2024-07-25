// Import Swiper styles
import { useState , useRef  } from "react";
import "./dashcom.css";

// import { Avatar } from "react-profile-avatar";
// import "react-profile-avatar/dist/index.css";
import projectdot from "../../Assets/projectnav.png";
import cross from "../../Assets/cross.png";
import userplus from "../../Assets/bx-user-plus.png"
import edit from "../../Assets/edit.png"
import deleteuser from '../../Assets/bx-trash-alt.png' 
import share from "../../Assets/bx-share-alt.png"
import useOnClickOutside from "../../Hooks/useOnClickOutside"

const allStatus = ["All", "Ongoing", "Fininsh", "Onhold"];

const allProjects = [
  {
    Name: "App Development",
    status: "Finished",
    dueDate: "14-09-2024",
    description:
      "Install Business Systems Manager and appropriate patches on test or QA servers",
    Members: [],
    totalTasks: 7,
  },
  {
    Name: "App Development",
    status: "Finished",
    dueDate: "14-09-2024",
    description:
      "Install Business Systems Manager and appropriate patches on test or QA servers",
    Members: [],
    totalTasks: 7,
  },
  {
    Name: "App Development",
    status: "Finished",
    dueDate: "14-09-2024",
    description:
      "Install Business Systems Manager and appropriate patches on test or QA servers",
    Members: [],
    totalTasks: 7,
  },
];

function ProjectDash() {
  const [currentStatus, setCurrentStatus] = useState("All");

  const [showCretePop, setShowCreatePop] = useState(false);

  const projectFormConfig = (value)=>{
      if(value){
         setShowCreatePop(true);
      }
      else {
        setShowCreatePop(false);
      }
  }

  const [openProNav , setOpenNav] = useState(false);
  const proNavRef = useRef(null);
  useOnClickOutside(proNavRef, () => setOpenNav(null));


  return (
    <>
      <div className="dashwrap">
        <nav>
          {/* left side */}
          <div className="navleft">
            <h2>Projects</h2>
          </div>

          {/* right side */}
          <div className="prodashbtn">
            <button onClick={()=>projectFormConfig(true)} className="addbtn">
              <span>Add Project</span>
            </button>
            <button className="iportpro">
              <span>Import Project</span>
            </button>
            <button className="expobtn">
              <span>Export Project</span>
            </button>
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

        <div className="allProjectccont">
          {allProjects?.map((project, index) => (
            <div key={index} className="singleProj">
              <nav>
                {/* left par */}
                <div className="roboxleft">
                  {/* <Avatar
                    name={"John Doe"}
                    colour={"#FF0000"}
                    size={40}
                    className="avatara"
                  /> */}
                  <span>{project?.Name}</span>
                </div>
                {/* roght part  */}
                <div>
                  <img onClick={()=>setOpenNav(index)} src={projectdot} className="cursor-pointer" alt="" />
                </div>
              </nav>

              <div className="statusdue">
                <div className="staus">
                  <p>{project.status}</p>
                </div>
                <div className="duedate">Due Date: {project?.dueDate}</div>
              </div>

              <p className="prodec">{project?.description}</p>

              <div className="member">
                <p className="prtotaltask">Members</p>
              </div>

              <p className="prtotaltask">{project?.totalTasks} Tasks</p>

              {
                openProNav === index && 
                <div className="opennav" ref={proNavRef}>

                     <div><img src={userplus} alt="" /> <p> Invite Employee</p></div>
                     <div><img src={edit} alt="" /> <p> Edit</p></div>
                     <div><img src={share} alt="" /> <p> Share To Clients</p></div>
                     <div><img src={deleteuser} alt="" /> <p> Delete</p></div>

                </div> 
              }
            </div>
          ))}
        </div>
      </div>

      {/* this is cretae project popup  */}

      {showCretePop && (
        <div className="porjepopupWrap">
          <div className="createpopcont">
            <nav>
              <p>Create New Project</p>
              <img onClick={()=>projectFormConfig(false)} src={cross} alt="" />
            </nav>

            <hr />

            <form>


              <label htmlFor="">
                <p>Name </p>
                <input type="text" placeholder="Project Name" />
              </label>

              <label htmlFor="">
                <p>Employee </p>
                <input type="text" placeholder="Project Name" />
              </label>
              <label htmlFor="">
                <p>Description </p>
                <input type="text" placeholder="Project Name" />
              </label>


  <div className="createbtns">
    <button >Add New Project</button>
    <button onClick={()=>projectFormConfig(false)}>Cancel</button>
  </div>
           

            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectDash;
