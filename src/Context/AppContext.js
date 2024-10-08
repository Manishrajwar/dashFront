import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from "../services/serverHelper";
import { endpoints } from "../services/api";
import { useNavigate } from "react-router-dom";
import { setAccessToken, setUser } from "../reducer/slices/authSlice";
import toast from "react-hot-toast";


export const AppContext = createContext();


export default function AppContextProvider({ children }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentPage, setCurrPage] = useState("");
  const [dashAllowPage , setDashAllowPage] = useState([]);
  const {user , accessToken}  = useSelector((state)=>state.auth);
  const [openInviPop , setOpenInviPop] = useState(false);
  const [openNotification , setOpenNotification] = useState(false);
  const [notSeenNotification , setNotSeenNotification] = useState(0);
  const [openCreateTask, setOpenCreateTask] = useState(false);


   const [allInvitation , setAllInvitation] = useState([]);
   const [allNotification , setAllNotification] = useState([]);

   const [currentProjectOpen , setCurrProjectOpen] = useState(null);

   const [openOverview , setOpenOverview] = useState(false);
   const [currentTimer , setCurrentTimer] = useState({});

   const [selectedEvent , setSelectedEvent] = useState({});

   const [calendervalue, onChange] = useState(new Date());

   const [myTeam, setMyTeam] = useState({});
   const [allTask, setAllTask]  = useState([]);
   const [isEdit , setIsEdit] = useState(false);
   const [activeUser , setActiveUser] = useState([]);

   const[allPage , setAllPage] = useState([]);

   const [calenderEvents , setCalenderEvents] = useState();

   const [taskformdata, settaskFormdata] = useState({
    title: "",
    description: "",
    member: "",
    priority: "Low",
    dueDate: "",
  });

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


  const getAllProTask = async()=>{
    try{

      const resp = await makeAuthenticatedGETRequest(endpoints.GET_ALL_PROJECT_TASK + `/${currentProjectOpen?._id}` , accessToken);
      if(resp?.success){
        setAllTask(resp?.allTask );
      }
      
    } catch(error){
       toast.error("Something went wrong , please try again");
    }
   }

   const getActiveUsers = async(e)=>{
    const resp = await makeAuthenticatedGETRequest(endpoints.GET_TEAM_ACTIVEUSERS_API , accessToken);
    console.log("resp ",resp);
    setActiveUser(resp?.data);
 }

 const getAllPages = async()=>{
  const resp = await makeAuthenticatedGETRequest(endpoints.GET_APP_PAGES_API , accessToken);
  setAllPage(resp?.allPages);
 }


 useEffect(()=>{
   if(user?.teamId){
     getActiveUsers();
    }
   getAllPages();

    // eslint-disable-next-line react-hooks/exhaustive-deps
 },[])

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
       if(allInvitation?.length > 0 ){
        setOpenInviPop(true);
       }else{
        setOpenInviPop(false);
       }
       // eslint-disable-next-line react-hooks/exhaustive-deps
  },[allInvitation])  // eslint-disable-next-line react-hooks/exhaustive-deps
  
  useEffect(()=>{
    const currentPage =  sessionStorage.getItem("currentPage");
      
       setDashAllowPage(user?.dashboardAllow);
       if(currentPage){
        const isPresent = user?.dashboardAllow?.filter((e)=> e?.name === currentPage);
         if(isPresent?.length > 0){
            setCurrPage(currentPage);
         }
         else {
          // setCurrPage(user?.dashboardAllow[0]?.name);
         }
       }
       else {
        // setCurrPage(user?.dashboardAllow[0]?.name);
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
    changeHandler   ,setCurrPage , currentPage , currentProjectOpen , setCurrProjectOpen  ,fetchUserDetails ,logoutHandler ,user  ,dashAllowPage , fetchTeamDetails , myTeam , setMyTeam ,setOpenInviPop , openInviPop , allInvitation , setAllInvitation , allNotification , setAllNotification , openNotification , setOpenNotification , notSeenNotification , fetchNotification , openOverview , setOpenOverview , fetchClockInDetails , currentTimer , setCurrentTimer  ,calendervalue, onChange , calenderEvents , setCalenderEvents , fetchCalenderEvents ,allTask, setAllTask , isEdit , setIsEdit ,  selectedEvent , setSelectedEvent , openCreateTask, setOpenCreateTask ,getAllProTask , taskformdata, settaskFormdata , activeUser , allPage , setAllPage
  };


  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
