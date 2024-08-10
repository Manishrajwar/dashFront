import React, { useContext } from "react";
import "./common.css";
import bell from "../../Assets/bell-badge 1.png";
import byewind from "../../Assets/ByeWind.png";
import { useSelector } from "react-redux";
import { AppContext } from "../../Context/AppContext";
import logo from "../../Assets/logo.png";
import { useNavigate } from "react-router-dom";

function Navbar2() {
  const { user, accessToken } = useSelector((state) => state.auth);
  const { logoutHandler, setOpenNotification, notSeenNotification } =
    useContext(AppContext);

  const navigate = useNavigate();

  return (
    <div className="navwrap">
      <div className="navcont">

        <div className="navLeftSide">
          <img
            onClick={() => navigate("/")}
            src={logo}
            className="logo"
            alt=""
          />
        </div>

     
          <div className="loginBtns">
            <button onClick={() => {
                if(accessToken){
                    navigate("/dashboard")
                }
                else{
                    navigate("/login")
                }
            }}>
              <span>TRY FOR FREE</span>
            </button>
          </div>

      </div>
    </div>
  );
}

export default Navbar2;
