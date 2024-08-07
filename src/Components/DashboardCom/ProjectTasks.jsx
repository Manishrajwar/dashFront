import { useContext, useEffect, useState } from "react";
import "./task.css";
import cross from "../../Assets/cross.png";
import trash from "../../Assets/bx-trash-alt.png";
import edit from "../../Assets/edit.png";
import { AppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";
import { makeAuthenticatedDELETERequest, makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest, makeAuthenticatedPUTRequest } from "../../services/serverHelper";
import { endpoints } from "../../services/api";
import { useSelector } from "react-redux";

function ProjectTasks() {
  const { changeHandler, currentProjectOpen , setCurrProjectOpen } = useContext(AppContext);
  const [openCreateTask, setOpenCreateTask] = useState(false);
  const {accessToken} = useSelector((state)=>state.auth);

  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
    member: "",
    priority: "Low",
    dueDate: "",
  });

  const [allTask, setAllTask]  = useState([]);
 const [isEdit , setIsEdit] = useState(false);
    
 
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
  
  const getAllProTask = async()=>{
    try{

      const resp = await makeAuthenticatedGETRequest(endpoints.GET_ALL_PROJECT_TASK + `/${currentProjectOpen?._id}` , accessToken);
      if(resp?.success){
        setAllTask(resp?.allTask );
      }
      else {
        toast.error(resp?.message);
      }
 
    } catch(error){
       toast.error("Something went wrong , please try again");
    }
   }

   const createTaskHandler = async()=>{
    const toastId = toast.loading("Loading...");
    try{

      const resp = await makeAuthenticatedPOSTRequest(endpoints.CREATE_TASK_API , {...formdata ,project:currentProjectOpen?._id} , accessToken);
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

      const resp = await makeAuthenticatedPUTRequest(endpoints.UPDATE_TASK_API , {...formdata ,project:currentProjectOpen?._id , taskId:isEdit} , accessToken);
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

   const deletetask = async(taskId)=>{
    const toastId = toast.loading("Loading...");
    try{

      const resp = await makeAuthenticatedDELETERequest(endpoints.DELETE_TASK_API + `/${taskId}/${currentProjectOpen?._id}`, accessToken);
      if(resp?.success){
        toast.success("successfuly Deleted");
        getAllProTask();
      }
      else {
        toast.error(resp?.message);
      }
 
    } catch(error){
       toast.error("Something went wrong , please try again");
    }
    toast.dismiss(toastId);
   }


  //  go back to the project page protector
  useEffect(() => {
    if (!currentProjectOpen) {
    }

    getAllProTask();
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
      <div className="proTaskCont">

        <nav>
          <h2>Project Task</h2>
           <div className="flex items-center gap-4">
          <button onClick={() => setOpenCreateTask(true)}> <span>Assign Task</span></button>
          <img onClick={()=>{setCurrProjectOpen(false)}} src={cross} alt="" />
           </div>
        </nav>

        <div className="allTasksCont">

          

<div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Title
                </th>
                <th scope="col" class="px-6 py-3">
                    Assign To
                </th>
                <th scope="col" class="px-6 py-3">
                    Due Date
                </th>
                <th scope="col" class="px-6 py-3">
                    Priority
                </th>
                <th scope="col" class="px-6 py-3">
                    Description
                </th>
                <th scope="col" class="px-6 py-3">
                    Status
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>

        {
          allTask?.map((task ,index)=>(
            <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          
            <td class="px-6 py-4">
                {task?.title}
            </td>
            <td class="px-6 py-4">
              {task?.member?.fullName}
            </td>
            <td className="px-6 py-4">{new Date(task?.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>

            <td class="px-6 py-4">
                {task?.priority}
            </td>
            <td class="px-6 py-4">
                {task?.description}
            </td>
            <td class="px-6 py-4">
                {task?.status}
            </td>
            <td class="px-6 py-4">
                <div className="flex gap-3">
                  <img onClick={()=>{
                  setIsEdit(task?._id);
                  const { member, dueDate, ...restTask } = task;
                  setOpenCreateTask(true);
                  setFormdata({
                    ...formdata,  
                    ...restTask,
                    member: member?._id,  
                    dueDate: dueDate ? new Date(dueDate).toISOString().split('T')[0] : "",  
                  });

                  }} src={edit} alt="edit" className="cursor-pointer" />
                  <img onClick={()=>deletetask(task?._id)} src={trash} alt="trash" className="cursor-pointer" />
                </div>
            </td>
        </tr>
          ))
        }
          
          
        </tbody>
    </table>
</div>


        </div>

      </div>

      {openCreateTask && (
        <div className="porjepopupWrap">

          <div className="createpopcont incheigh">

            <nav>
              <p>Assign New Task</p>
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
                    changeHandler(e, setFormdata);
                  }}
                  value={formdata?.title}
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
                  required
                  value={formdata?.dueDate}
                  name="dueDate"
                  type="date"
                />
              </label>

              <label>
                <p>Priority</p>
                <select
                required
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

export default ProjectTasks;
