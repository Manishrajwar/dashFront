import React, { useContext, useState } from "react";
import Sidebar from "../Components/Common/Sidebar";
import "./page.css";
import Dash from "../Components/DashboardCom/Dash";
import Navbar from "../Components/Common/Navbar";
import ProjectDash from "../Components/DashboardCom/ProjectDash";
import { AppContext } from "../Context/AppContext";
import CreateTeam from "../Components/DashboardCom/CreateTeam";
import { useSelector } from "react-redux";
import ProjectEmployeeDash from "../Components/DashboardCom/ProjectEmployeeDash";
import cross from "../Assets/cross.png";
import toast from "react-hot-toast";
import { makeAuthenticatedDELETERequest, makeAuthenticatedPOSTRequest, makeAuthenticatedPUTRequest } from "../services/serverHelper";
import { endpoints } from "../services/api";


function Dashboard() {
  const {
    currentPage,
    setOpenInviPop,
    openInviPop,
    allInvitation,
    openNotification,
    allNotification ,setOpenNotification ,
    setAllInvitation, fetchNotification
  } = useContext(AppContext);
  const { user, accessToken } = useSelector((state) => state.auth);

  const inviResHandler = async (status, invitationId) => {
    const toastId = toast.loading("Loading...");

    const resp = await makeAuthenticatedPOSTRequest(
      endpoints.INVITATION_RESPONSE_API,
      { status, invitationId },
      accessToken
    );
    if (resp?.success) {
      toast.success(`Successfuly ${status} `);
      setOpenInviPop(false);

      let restInvi = allInvitation.filter(
        (invitation) => invitation._id !== invitationId
      );
      setAllInvitation(restInvi);
    } else {
      toast.error(resp?.message);
    }

    toast.dismiss(toastId);
  };

  const deleteNotification = async(notifyId) => {
    const toastId = toast.loading("Loading...");
    const resp = await makeAuthenticatedDELETERequest(endpoints.DELETE_NOTIFICATION_API + `/${notifyId}`, accessToken);
    if(resp.success){
      toast.success("Successfuly Deleted");
      fetchNotification();
    }

    toast.dismiss(toastId);

  }

  const markAllReadNotify =async()=>{
    const toastid  = toast.loading("Loading...");
    const resp = await makeAuthenticatedPUTRequest(endpoints.MARK_ALL_READ_NOTIFY_API , {} , accessToken);
    if(resp.success){
      toast.success("Successfuly marked");
      fetchNotification();
    }
    toast.dismiss(toastid);
  }
  console.log("a",allNotification);

  return (
    <>
      <div className="withnavbarcom">
        <Navbar />

        <div className="withsidebarComonwrap">
          <Sidebar />

          <div className="Maindashwrap">
            {currentPage === "Dashboard" && <Dash />}
            {user?.accountType === "Employee"
              ? currentPage === "Project" && <ProjectEmployeeDash />
              : currentPage === "Project" && <ProjectDash />}
            {currentPage === "Create Team" && <CreateTeam />}
          </div>
        </div>
      </div>

      {openInviPop && (
        <div className="porjepopupWrap">
          <div className="createpopcont incheigh">
            <nav>
              <p>Invitation Notification</p>
              <img
                onClick={() => {
                  setOpenInviPop(false);
                }}
                src={cross}
                alt="cross"
              />
            </nav>

            <hr />

            {allInvitation?.map((invi, index) => (
              <div key={index} className="singlinv">
                <h3>{invi?.title}</h3>

                <p>Send By : {invi?.sendBy?.email}</p>
                <p>Project : {invi?.project?.Name}</p>
                <div className="createbtns">
                  <button onClick={() => inviResHandler("Accept", invi?._id)}>
                    Accept
                  </button>
                  <button onClick={() => inviResHandler("Reject", invi?._id)}>
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {openNotification && (
        <div className="opeNotifyWrap">
          <div className="notifyCont">

            <nav className="notiftnav">
              <span>All Notification </span>
              <img onClick={()=>setOpenNotification(false)} src={cross} className="cursor-pointer" alt="" />
            </nav>

<hr />
            <p onClick={()=>markAllReadNotify()} className="markRead">Mark All Read</p>


<hr />

 <div>


             {
              allNotification?.map((notify , index)=>(
                <>
                <div key={index} className={`singleNotify ${notify.status === "No Seen" && "notseenBg"}`}>
                   <nav>
                      <h3>{notify?.title}</h3>
                      <img onClick={()=>deleteNotification(notify?._id)} src={cross} alt="" />
                   </nav>
              <p className="notifyDesc"> {notify?.Description}</p>

              <p className="notifyTime">{new Date(notify?.CreatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>


                </div>

                <hr />
                </>
              ))
             }

</div>

          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;
