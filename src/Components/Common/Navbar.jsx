import React from "react";
import "./common.css";
import bell from "../../Assets/bell-badge 1.png";
import byewind from "../../Assets/ByeWind.png";
import { useSelector } from "react-redux";

function Navbar() {
  const { user } = useSelector((state)=>state.auth);

  return (
    <div className="navwrap">
      <div className="navcont">
        <img src={bell} className="cursor-pointer" alt="" />

        <div className="userprofile">
          <img src={byewind} alt="" />
          <span>{user?.name}</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
