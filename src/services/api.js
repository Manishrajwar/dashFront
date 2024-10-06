// const BASE_URL = process.env.REACT_APP_BASE_URL


const baseurl = "http://localhost:4000/api/v1"
// const baseurl = "https://dashback-4.onrender.com/api/v1"


// AUTH ENDPOINTS
export const endpoints = {
  TRAIL_LOGIN_API: baseurl + "/auth/TrailLogin",
  GET_USER_DETAIL_API: baseurl + "/auth/getUserDetails" , 
  ADMIN_LOGIN_API: baseurl + "/auth/adminLogin" , 
  ADMIN_SIGNUP_API: baseurl + "/auth/adminSignup" , 
  CREATE_TEAM_ID_API: baseurl + "/auth/createTeamId" ,
  GET_MY_TEAMDETAILS_API: baseurl + "/auth/getTeamDetails" , 
  CREATE_TEAM_MEMBER_API: baseurl + "/auth/createTeamMember" , 
  EMPLOYEE_CODE_LOGIN_API: baseurl + "/auth/employeeLogin", 
  EDIT_MEMBER_API: baseurl+"/auth/editMember" , 
  EDIT_TEAM_API : baseurl + "/auth/EditAdminTeam" , 
  CREATE_PROJECT_API : baseurl + "/auth/createProject" , 
  GET_ADMIN_PROJECT_API: baseurl + "/auth/getAllProjects" , 
  GET_MEMBER_PROJECT_API : baseurl + "/auth/getMyProject" , 
  DELETE_PROJECT_API : baseurl +"/auth/deleteProject" , 
  EDIT_PROJECT_API : baseurl + "/auth/editProject" , 
  SEND_INVITE_API: baseurl + "/auth/sendProjectInvite" , 
  GET_MY_PROJECTS_API: baseurl + "/auth/getMyProject" , 
  GET_MY_INVITATION_API: baseurl + "/auth/getMyInvitation" , 
  INVITATION_RESPONSE_API: baseurl + "/auth/inviResponse", 
  GET_MY_NOTIFICATION_API: baseurl + "/auth/getNotification" , 
  DELETE_NOTIFICATION_API : baseurl + "/auth/deleteNotification" , 
  MARK_ALL_READ_NOTIFY_API: baseurl + "/auth/markAllReadNotify" , 
  CREATE_TASK_API: baseurl + "/auth/createTask",
  GET_ALL_PROJECT_TASK: baseurl + "/auth/getAllProjectTask" , 
  GET_PROJECT_MEMBER_TASK: baseurl + "/auth/getProjectMemberTask" , 
  UPDATE_TASK_STATUS_API: baseurl + "/auth/updateTaskStatus" , 
  UPDATE_TASK_API: baseurl + "/auth/updateTask" , 
  DELETE_TASK_API: baseurl + "/auth/deleteTask" , 
  CHANGE_USER_CLOCIN_API: baseurl + "/auth/clockIn" , 
  UPDATE_TIMER_STATUS_API : baseurl + "/auth/clockInStatus" , 
  TIMER_CLOCKOUT_API: baseurl + "/auth/clockOutHandler" , 
  FETCH_CLOCKIN_DETAILS_API : baseurl + "/auth/clockInDetails" , 
  CREATE_MEETLINK_API: baseurl + "/auth/createEvent" , 
  GET_MY_EVENTS_API : baseurl + "/auth/myEvents" , 
  REMOVE_USER_FROMTEAM_API : baseurl + "/auth/RemoveTeamUser" , 
  GET_TEAM_ACTIVEUSERS_API : baseurl + "/auth/TeamClockInUser" , 
  GET_APP_PAGES_API : baseurl + "/auth/getAllPage"

  
};
