import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import "./App.css"
import Dashboard from "./Pages/Dashboard";
import { AppContext } from "./Context/AppContext";
import { useContext } from "react";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Pages/Auth/ProtectedRoute";

function App() {

   const {accessToken}  =useSelector((state)=>state.auth);
   
  return (
    <div className="relative overflow-x-hidden">
<Routes>
   
    {
      !accessToken &&  
      <>
  <Route path="/login" element={<Login />}  />
  <Route path="*" element={<ProtectedRoute  />}  />
      </>
  
    }
    {
      accessToken && 
      <>
  <Route path="/dashboard" element={<Dashboard />}  />
  <Route path="*" element={<ProtectedRoute />}  />
      </>

    }
</Routes>
    </div>
  );
}

export default App;
