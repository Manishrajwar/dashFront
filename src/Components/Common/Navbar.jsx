import React, { useContext } from "react";
import "./common.css";
import bell from "../../Assets/bell-badge 1.png";
import byewind from "../../Assets/ByeWind.png";
import { useSelector } from "react-redux";
import { AppContext } from "../../Context/AppContext";

function Navbar() {
  const { user  , } = useSelector((state)=>state.auth);
  const {logoutHandler , setOpenNotification , notSeenNotification} = useContext(AppContext);

  return (

    <div className="navwrap">
      <div className="navcont">

         <div className="bellWRAP">

        <img src={bell} onClick={()=>setOpenNotification(true)} className="cursor-pointer" alt="" />
        <p>{notSeenNotification}</p>

         </div>

        <div className="userprofile">
          <img src={byewind} alt="" />
          <span>{user?.name}</span>
        </div>

        <button onClick={()=>logoutHandler()}>Logout</button>
      </div>
    </div>

  );
}

export default Navbar;
