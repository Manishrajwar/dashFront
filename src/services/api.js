// const BASE_URL = process.env.REACT_APP_BASE_URL


const baseurl = "http://localhost:4000/api/v1"


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
  MARK_ALL_READ_NOTIFY_API: baseurl + "/auth/markAllReadNotify"
  
};
