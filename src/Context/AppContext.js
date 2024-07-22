import { createContext, useState } from "react";


export const AppContext = createContext();

export default function AppContextProvider({ children }) {

  const [user , setUser] = useState({
    name:"manish"
  })

  const changeHandler = (e  , setFormdata)=>{
    const {name , value} = e.target;

     setFormdata((prev)=>({
      ...prev , 
      [name]:value
     }))
  }


  const value = {
    changeHandler , user 
  };


  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
