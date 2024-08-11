import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from "../services/serverHelper";
import { endpoints } from "../services/api";
import { useNavigate } from "react-router-dom";
import { setAccessToken, setUser } from "../reducer/slices/authSlice";


export const AppContext = createContext();


export default function AppContextProvider({ children }) {

  const elements = ["Dashboard", "Project","Create Team"];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentPage, setCurrPage] = useState("");
  const [dashAllowPage , setDashAllowPage] = useState([]);
  const {user , accessToken}  = useSelector((state)=>state.auth);
  const [openInviPop , setOpenInviPop] = useState(false);
  const [openNotification , setOpenNotification] = useState(false);
  const [notSeenNotification , setNotSeenNotification] = useState(0);

   const [allInvitation , setAllInvitation] = useState([]);
   const [allNotification , setAllNotification] = useState([]);

   const [currentProjectOpen , setCurrProjectOpen] = useState(null);

   const [openOverview , setOpenOverview] = useState(false);
   const [currentTimer , setCurrentTimer] = useState({});

   const [selectedEvent , setSelectedEvent] = useState({});

   const [calendervalue, onChange] = useState(new Date());

   const [myTeam, setMyTeam] = useState({});

   const [calenderEvents , setCalenderEvents] = useState();

  const fetchCalenderEvents = async()=>{
     const resp = await makeAuthenticatedGETRequest(endpoints.GET_MY_EVENTS_API , accessToken);
     setCalenderEvents(resp?.myevents);
  }

  const fetchUserDetails = async()=>{
     try{
 
        const resp = await makeAuthenticatedGETRequest(endpoints.GET_USER_DETAIL_API , accessToken );
      
         if(resp?.status){
           localStorage.setItem("user" , JSON.stringify(resp?.data));
           dispatch(setUser(resp?.data));
          
         }

     } catch(error){
        
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

  const formatDateToDayMonthYear = (dateString) => {
    const date = new Date(dateString);
  
    // Extract the day, month, and year in local time
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const year = date.getFullYear();
  
    // Format them as a string "day-month-year"
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };
  
  const fetchClockInDetails = async (value) => {
    const respdate = formatDateToDayMonthYear(value);
    const resp = await makeAuthenticatedPOSTRequest(endpoints.FETCH_CLOCKIN_DETAILS_API,{ date: respdate },accessToken);
     setCurrentTimer(resp?.data[0]);
  };

  useEffect(()=>{
     if(accessToken){
       fetchUserDetails();
       fetchTeamDetails();
       fetchNotification();
       fetchCalenderEvents();
       setTimeout(()=>{
         getInvitation();

       },3000)
      }
      else{
        setAllInvitation([]);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[accessToken])  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(()=>{
       if(allInvitation.length > 0 ){
        setOpenInviPop(true);
       }else{
        setOpenInviPop(false);
       }
       // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(()=>{
     if(openNotification){
       fetchNotification();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[openNotification])  // eslint-disable-next-line react-hooks/exhaustive-deps




  const value = {
    changeHandler   ,setCurrPage , currentPage , currentProjectOpen , setCurrProjectOpen  ,fetchUserDetails ,logoutHandler ,user  ,dashAllowPage , fetchTeamDetails , myTeam , setMyTeam ,setOpenInviPop , openInviPop , allInvitation , setAllInvitation , allNotification , setAllNotification , openNotification , setOpenNotification , notSeenNotification , fetchNotification , openOverview , setOpenOverview , fetchClockInDetails , currentTimer , setCurrentTimer  ,calendervalue, onChange , calenderEvents , setCalenderEvents , fetchCalenderEvents , selectedEvent , setSelectedEvent
  };


  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
