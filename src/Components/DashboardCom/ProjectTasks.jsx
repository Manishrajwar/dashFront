import { useContext, useEffect, useState } from "react";
import "./task.css";
import cross from "../../Assets/cross.png";
import { AppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";
import { makeAuthenticatedPOSTRequest } from "../../services/serverHelper";
import { endpoints } from "../../services/api";

function ProjectTasks() {
  const { changeHandler, currentProjectOpen } = useContext(AppContext);
  const [openCreateTask, setOpenCreateTask] = useState(false);

  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
    member: "",
    priority: "Low",
    dueDate: "",
  });


   const createTaskHandler = async()=>{
    const toastId = toast.loading("Loading...");
    try{

      const resp = await makeAuthenticatedPOSTRequest(endpoints)
 
    } catch(error){
       toast.error("Something went wrong , please try again");
    }
    toast.dismiss(toastId);
   }

  //  go back to the project page protector
  useEffect(() => {
    if (!currentProjectOpen) {
    }
  }, []);



  return (
    <>
      <div className="proTaskCont">
        <nav>
          <h2>Project Task</h2>
          <button onClick={() => setOpenCreateTask(true)}>
            {" "}
            <span>Assign Task</span>
          </button>
        </nav>

        <div className="allTasksCont"></div>
      </div>

      {openCreateTask && (
        <div className="porjepopupWrap">
          <div className="createpopcont incheigh">
            <nav>
              <p>Assign New Task</p>
              <img
                onClick={() => {
                  setOpenCreateTask(false);
                }}
                src={cross}
                alt=""
              />
            </nav>

            <hr />

            <form>

              <label>
                <p>Title </p>
                <input
                  onChange={(e) => {
                    changeHandler(e, setFormdata);
                  }}
                  value={formdata?.title}
                  name="title"
                  type="text"
                  placeholder="Task Title"
                />
              </label>

              <label>
                <p>Assign To </p>
                <select
                  name="member"
                  onChange={(e) => changeHandler(e, setFormdata)}
                  value={formdata.member}
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
                    changeHandler(e, setFormdata);
                  }}
                  value={formdata?.dueDate}
                  name="dueDate"
                  type="date"
                />
              </label>

              <label>
                <p>Priority</p>
                <select
                  name="priority"
                  onChange={(e) => changeHandler(e, setFormdata)}
                  value={formdata.priority}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </label>

              <label>
                <p>Description </p>
            <textarea name="description" onChange={(e)=>changeHandler(e , setFormdata)} value={formdata.description} ></textarea>
              </label>

              <div className="createbtns">
              <button>Assign</button>
              </div>

            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectTasks;
