import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeAuthenticatedGETRequest } from "../services/serverHelper";
import { endpoints } from "../services/api";
import { useNavigate } from "react-router-dom";
import { setAccessToken, setUser } from "../reducer/slices/authSlice";



export const AppContext = createContext();


export default function AppContextProvider({ children }) {

  const elements = ["Dashboard", "Project","Create Team"];

  
  const [currentPage, setCurrPage] = useState("");
  const [dashAllowPage , setDashAllowPage] = useState([]);
  const {user , accessToken}  = useSelector((state)=>state.auth);
  const [openInviPop , setOpenInviPop] = useState(false);
  const [openNotification , setOpenNotification] = useState(false);
  const [notSeenNotification , setNotSeenNotification] = useState(0);

   const [allInvitation , setAllInvitation] = useState([]);
   const [allNotification , setAllNotification] = useState([]);

   const [currentProjectOpen , setCurrProjectOpen] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUserDetails = async()=>{
     try{
 
        const resp = await makeAuthenticatedGETRequest(endpoints.GET_USER_DETAIL_API , accessToken );
      
         if(resp?.status){
           localStorage.setItem("user" , JSON.stringify(resp?.data));
           dispatch(setUser(resp?.data));
          
         }

     } catch(error){
       console.log("fetchuser ",error);
        
     }
  }

  const changeHandler = (e  , setFormdata)=>{
    const {name , value} = e.target;

     setFormdata((prev)=>({
      ...prev , 
      [name]:value
     }))
  }

  const logoutHandler =()=>{
     localStorage.removeItem("user");
     sessionStorage.removeItem("user");
     localStorage.removeItem("accessToken");
      dispatch(setUser(null));
      dispatch(setAccessToken(null));
   navigate("/login");
  }

  const fetchNotification = async()=>{
     const resp = await  makeAuthenticatedGETRequest(endpoints.GET_MY_NOTIFICATION_API ,accessToken);
     if(resp?.success){
      setAllNotification(resp?.notifications);
      setNotSeenNotification(resp?.unseenCount);
     }
  }

  const [myTeam, setMyTeam] = useState({});


  const fetchTeamDetails = async () => {
    const resp = await makeAuthenticatedGETRequest(
      endpoints.GET_MY_TEAMDETAILS_API,
      accessToken
    );
    if (resp?.success) {
      setMyTeam(resp?.team);
    } else {
      setMyTeam("");
    }
  };

  const getInvitation = async()=>{
    const resp = await makeAuthenticatedGETRequest(endpoints.GET_MY_INVITATION_API , accessToken);
    if(resp.success){
      setAllInvitation(resp?.data);
    }
  }

  useEffect(()=>{
     if(accessToken){
       fetchUserDetails();
       fetchTeamDetails();
       fetchNotification();
       setTimeout(()=>{
         getInvitation();

       },3000)
      }
      else{
        setAllInvitation([]);
      }
  },[accessToken])  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(()=>{
       if(allInvitation.length > 0 ){
        setOpenInviPop(true);
       }else{
        setOpenInviPop(false);
       }
  },[allInvitation])  // eslint-disable-next-line react-hooks/exhaustive-deps
  
  useEffect(()=>{
    const currentPage =  sessionStorage.getItem("currentPage");

    if(user?.accountType === 'Employee'){

      setDashAllowPage(user?.dashboardAllow);
       if(currentPage && user.dashboardAllow.includes(currentPage)){
         setCurrPage(currentPage);
       }
       else {
         setCurrPage(user?.dashboardAllow[0]);
         sessionStorage.setItem("currentPage" , user?.dashboardAllow[0]);
       }
    } else{
      setDashAllowPage(elements);

       if(currentPage && elements.includes(currentPage)){
         
         setCurrPage(currentPage);
       }
       else {

         setCurrPage(elements[0]);
         sessionStorage.setItem("currentPage" , elements[0]);
       }
    }
  },[user])  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(()=>{
     if(openNotification){
       fetchNotification();
      }
  },[openNotification])  // eslint-disable-next-line react-hooks/exhaustive-deps


  const value = {
    changeHandler   ,setCurrPage , currentPage , currentProjectOpen , setCurrProjectOpen  ,fetchUserDetails ,logoutHandler ,user  ,dashAllowPage , fetchTeamDetails , myTeam , setMyTeam ,setOpenInviPop , openInviPop , allInvitation , setAllInvitation , allNotification , setAllNotification , openNotification , setOpenNotification , notSeenNotification , fetchNotification
  };


  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
