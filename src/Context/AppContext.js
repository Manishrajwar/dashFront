import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeAuthenticatedGETRequest } from "../services/serverHelper";
import { endpoints } from "../services/api";


export const AppContext = createContext();

export default function AppContextProvider({ children }) {

  const [currentPage, setCurrPage] = useState("Dashboard");
  const {user}  = useSelector((state)=>state.auth);


  const fetchUserDetails = async()=>{
     try{
 
        const resp = await makeAuthenticatedGETRequest(endpoints.GET_USER_DETAIL_API , user?.token );
        console.log(resp);
         if(resp.success){
          sessionStorage.setItem("user" , JSON.stringify(resp.user));
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


  useEffect(()=>{
     if(user){
       fetchUserDetails();
      }
  },[])


  const value = {
    changeHandler   ,setCurrPage , currentPage  ,fetchUserDetails
  };


  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
