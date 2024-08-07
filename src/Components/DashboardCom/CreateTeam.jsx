import { useContext, useEffect, useRef, useState } from "react";
import ButtonCom from "../Common/ButtonCom";
import "./dashcom.css";
import cross from "../../Assets/cross.png";
import { AppContext } from "../../Context/AppContext";
import {
  makeAuthenticatedPOSTRequest,
  makeAuthenticatedPUTRequest,
} from "../../services/serverHelper";
import { endpoints } from "../../services/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import emnav from "../../Assets/empnav.png";
import Avatar from "react-avatar";
import alpha from "../../Assets/alpha-x-box.png"
import trash from "../../Assets/bx-trash-alt.png"
import edit from "../../Assets/edit.png"
import useOnClickOutside from "../../Hooks/useOnClickOutside";


function CreateTeam() {
  const { changeHandler, user  , fetchTeamDetails , myTeam } = useContext(AppContext);
  const { accessToken } = useSelector((state) => state.auth);

  const [teamIdFrom, setOpenTeamidfrm] = useState(false);
  const [editMemberForm , setEditMemForm] = useState(false);
  const [openAddTeam, setOpenTeam] = useState(false);
  const [isTeamEdit, setIsEdit] = useState(false);

  const [showOption , setShowOption] = useState(null);


  const [formdata, setFormdata] = useState({
    email: "",
    fullName: "",
    ContactNumber: "",
  });

  const [teamId, setTeamID] = useState({
    ThreeLetter: "",
    dashboardAllow: [],
    teamName: "",
  });

  const changeHandler2 = (e) => {
    const value = e.target.value;
    setTeamID((prevState) => {
      // Add selected value to the dashboardAllow array if it's not already there
      if (!prevState.dashboardAllow.includes(value) && value !== "Select") {
        return {
          ...prevState,
          dashboardAllow: [...prevState.dashboardAllow, value],
        };
      }
      return prevState;
    });
  };
  const changeHandler3 = (e) => {
    const value = e.target.value;
    setEditMemForm((prevState) => {
      if (!prevState.dashboardAllow.includes(value) && value !== "Select") {
        return {
          ...prevState,
          dashboardAllow: [...prevState.dashboardAllow, value],
        };
      }
      return prevState;
    });
  };

  const removeItem = (item) => {
    setTeamID((prevState) => ({
      ...prevState,
      dashboardAllow: prevState.dashboardAllow.filter((i) => i !== item),
    }));
  };

  const removeItem2 = (item) => {
    setEditMemForm((prevState) => ({
      ...prevState,
      dashboardAllow: prevState.dashboardAllow.filter((i) => i !== item),
    }));
  };

  const createTeamHandler = async () => {
    const toastId = toast.loading("Loading...");
    const resp = await makeAuthenticatedPOSTRequest(
      endpoints.CREATE_TEAM_ID_API,
      {
        ThreeLetter: teamId.ThreeLetter,
        dashboardAllow: teamId.dashboardAllow,
        teamName: teamId.teamName,
      },
      accessToken
    );
    if (resp.status) {
      toast.success("Successfuly Created");
      setOpenTeamidfrm(false);
    } else {
      toast.error(resp.message);
    }

    toast.dismiss(toastId);
  };

  const setEditTeamHandler = () => {
    setIsEdit(true);
    setOpenTeamidfrm(true);
    setTeamID(myTeam);
  };

  const memberEditHandler = async()=>{
    const toastId = toast.loading("Loading...");
    const resp = await makeAuthenticatedPOSTRequest(endpoints.EDIT_MEMBER_API ,{...editMemberForm } , accessToken );
    if(resp?.success){
      toast.success("Successfuly Updated");
      fetchTeamDetails();
    }
    else {
      toast.error(resp?.message);
    }
    toast.dismiss(toastId);
  } 

  const SaveTeamHandler = async()=>{
    const toastId = toast.loading("Loading...");
    const resp = await makeAuthenticatedPUTRequest(endpoints.EDIT_TEAM_API , {dashboardAllow:teamId.dashboardAllow , teamName:teamId.teamName , teamId:myTeam?._id} , accessToken);
     if(resp?.success){
      toast.success("Successfully updated");
       fetchTeamDetails();
       setIsEdit(false);
       setOpenTeamidfrm(false);
      }
      else {
        toast.error(resp?.message);
      }
    toast.dismiss(toastId);
  }

  const createTeamMember = async (e) => {
    const toastId = toast.loading("Loading...");
    const resp = await makeAuthenticatedPOSTRequest(
      endpoints.CREATE_TEAM_MEMBER_API,
      {
        email: formdata.email,
        ContactNumber: formdata.ContactNumber,
        fullName: formdata?.fullName,
      },
      accessToken
    );
    if (resp.success) {
      toast.success("Successfuly Created");
      fetchTeamDetails();
      setOpenTeam(false);
      setFormdata({
        email: "",
        fullName: "",
        ContactNumber: "",
      });
    } else {
      toast.error(resp.message);
    }

    toast.dismiss(toastId);
  };

  useEffect(() => {
    fetchTeamDetails();
 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  
  
  const proNavRef = useRef(null);
  useOnClickOutside(proNavRef, () => setShowOption(null));

  return (
    <>
      <div className="dashwrap2">
        <nav>
          <div className="ctnav1">
            <h2 className="commonh2">Create Team </h2>
            <p className="commonpara cursor-pointer hover:text-red-500 transition-all duration-150">
              Read How To Create Your Team
            </p>
          </div>

          {user?.teamId ? (
            <div className="teamIDBtns">
              <ButtonCom
                text={"EDIT TEAM"}
                onclick={() => {
                  setEditTeamHandler();
                }}
              />
              <ButtonCom
                text={"ADD MEMBER"}
                onclick={() => setOpenTeam(true)}
              />
            </div>
          ) : (
            <ButtonCom
              text={"Create Team ID"}
              onclick={() => {
                setOpenTeamidfrm(true);
                setIsEdit(false);
              }}
            />
          )}
        </nav>

        {user?.teamId && (
          <div className="teamDetails">
            <label htmlFor="">
              <h3>TEAM ID</h3>
              <p>{myTeam?.teamId}</p>
            </label>
            <label htmlFor="">
              <h3>TEAM NAME</h3>
              <p>{myTeam?.teamName}</p>
            </label>
            <label htmlFor="">
              <h3>THREELETTER</h3>
              <p>{myTeam?.ThreeLetter}</p>
            </label>
          </div>
        )}

        {myTeam?.Members?.length > 0 && (
          <div className="allTeamMembers">
            {myTeam?.Members?.map((mem, index) => (
              <div key={index} className="singleMem">
                <nav>
                  <img onClick={()=>setShowOption(index)}
                    src={emnav}
                    alt="nav"
                    className="cursor-pointer"
                    loading="lazy"
                  />
                </nav>

                <Avatar name="Foo Bar" className="empavatar" />

                <h3>{mem?.fullName}</h3>
                <p>{mem?.email}</p>
                <p className={`${mem?.active ? "active" : "unactive"}`}>
                  {mem?.active ? "Active" : "UnActive"}
                </p>

                {
                  showOption === index && 
                   <div ref={proNavRef} className="showOption">

                     <label onClick={()=>setEditMemForm(mem)} htmlFor="edit">
                      <img src={edit} alt="" />
                      <span>Edit</span>
                     </label>

                     <hr />

                     <label htmlFor="edit">
                      <img src={trash} alt="" />
                      <span>Remove</span>
                     </label>

                     <hr />

                   </div>
                }
              </div>
            ))}
          </div>
        )}
      </div>

      {openAddTeam && (
        <div className="porjepopupWrap">
          <div className="createpopcont">
            <nav>
              <p> Add Team Member</p>
              <img onClick={() => setOpenTeam(false)} src={cross} alt="" />
            </nav>

            <hr />

            <form>
              <label htmlFor="">
                <p>Member Email*</p>
                <input
                  type="email"
                  name="email"
                  value={formdata?.email}
                  onChange={(e) => changeHandler(e, setFormdata)}
                />
              </label>

              <label htmlFor="">
                <p>Member FullName*</p>
                <input
                  type="email"
                  name="fullName"
                  value={formdata?.fullName}
                  onChange={(e) => changeHandler(e, setFormdata)}
                />
              </label>

              <label htmlFor="">
                <p>Member Contact Number*</p>
                <input
                  type="number"
                  name="ContactNumber"
                  value={formdata?.ContactNumber}
                  onChange={(e) => changeHandler(e, setFormdata)}
                />
              </label>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  createTeamMember();
                }}
                className="buttonsam"
              >
                <span>Create</span>{" "}
              </button>
            </form>
          </div>
        </div>
      )}

      {teamIdFrom && (
        <div className="porjepopupWrap">
          <div className="createpopcont">
            <nav>
              {
                isTeamEdit? <p> EDIT TEAM</p> : <p>CREATE TEAM</p>
              }
              <img onClick={() => {
                setOpenTeamidfrm(false);
                setIsEdit(false);
              }} src={cross} alt="" />
            </nav>

            <hr />

            <form>
              <label htmlFor="">
                <p>Three First Letter Of ID*</p>
                <input
                  disabled={isTeamEdit}
                  type="text"
                  required
                  name="ThreeLetter"
                  value={teamId?.ThreeLetter}
                  placeholder="KDS"
                  onChange={(e) => changeHandler(e, setTeamID)}
                />
              </label>

              <label htmlFor="">
                <p>Team Name*</p>
                <input
                  type="text"
                  required
                  name="teamName"
                  value={teamId?.teamName}
                  onChange={(e) => changeHandler(e, setTeamID)}
                />
              </label>

            
              <label htmlFor="dashboardAllow">
                <p>Pages Allowance*</p>

                <div className="allpageallow">
                  {teamId.dashboardAllow.map((item, index) => (
                    <div key={index} className="singlepageallow">
                      {item}{" "}
                      <img onClick={() => removeItem(item)} src={alpha} className="cursor-pointer" alt="" />
                    </div>
                  ))}
                </div>

                <select
                  name="dashboardAllow"
                  value="Select"
                  onChange={(e) => changeHandler2(e)}
                  id="dashboardAllow"
                >
                  <option value="Select" disabled>
                    Select Page Allow
                  </option>
                  <option value="Dashboard">Dashboard</option>
                  <option value="Project">Project</option>
                </select>
              </label>

              <button
                onClick={(e) => {
                  e.preventDefault();
                 if(isTeamEdit){
                  SaveTeamHandler();
                 }
                 else {
                  createTeamHandler();
                 }
                }}
                className="buttonsam"
              >
                <span>{isTeamEdit?"Save":"Create"}</span>{" "}
              </button>
            </form>
          </div>
        </div>
      )}


      {
        editMemberForm && 
        <div className="porjepopupWrap">
        <div className="createpopcont increheight">

          <nav>
            <p> Edit TEAM MEMBER  </p>
            <img onClick={() => setEditMemForm(false)} src={cross} alt="" />
          </nav>

          <hr />


          <form>

            <label htmlFor="">
              <p>FullName</p>
              <input
                disabled={isTeamEdit}
                type="text"
                required
                name="fullName"
                value={editMemberForm?.fullName}
                placeholder="fullName"
                onChange={(e)=>changeHandler(e , setEditMemForm)}
              />
            </label>

            <label htmlFor="">
              <p>Email</p>
              <input
                type="text"
                required
                name="email"
                value={editMemberForm?.email}
                placeholder="email"
                onChange={(e)=>changeHandler(e , setEditMemForm)}
              />
            </label>

          
            <label htmlFor="dashboardAllow">
              <p>Pages Allowance*</p>

              <div className="allpageallow">
                {editMemberForm.dashboardAllow.map((item, index) => (
                  <div key={index} className="singlepageallow">
                    {item}{" "}
                    <img onClick={() => removeItem2(item)} src={alpha} className="cursor-pointer" alt="" />
                  </div>
                ))}
              </div>

              <select
                name="dashboardAllow"
                onChange={(e) => changeHandler3(e)}
                id="dashboardAllow"
                placeholder="dashboard Allow"
              >
                <option value="Select" >
                  Select Page Allow
                </option>
               {
                myTeam?.dashboardAllow?.map((dash , index)=>(
                  <option value={dash} key={index}>{dash}</option>
                ))
               }
              </select>
            </label>

            <label htmlFor="">
              <p>Employee Code</p>
              <input
                type="text"
                required
                name="employeeCode"
                value={editMemberForm?.employeeCode}
                placeholder="employeeCode"
                onChange={(e)=>changeHandler(e , setEditMemForm)}
              />
            </label>

            <button
              onClick={(e) => {
                e.preventDefault();
                memberEditHandler();
              }}
              className="buttonsam"
            >
              <span>Edit</span>{" "}
            </button>

          </form>

        </div>
      </div>
      }
    </>
  );
}

export default CreateTeam;
