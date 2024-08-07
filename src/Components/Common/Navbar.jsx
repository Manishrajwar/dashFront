import React, { useContext } from "react";
import "./common.css";
import bell from "../../Assets/bell-badge 1.png";
import byewind from "../../Assets/ByeWind.png";
import { useSelector } from "react-redux";
import { AppContext } from "../../Context/AppContext";
import logo from "../../Assets/logo.png";
import { useNavigate } from "react-router-dom";

function Navbar() {
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

        {accessToken ? (
          <div className="navRightSide">
            <div className="bellWRAP">
              <img
                src={bell}
                onClick={() => setOpenNotification(true)}
                className="cursor-pointer"
                alt=""
              />
              <p>{notSeenNotification}</p>
            </div>

            <div className="userprofile">
              <img src={byewind} alt="" />
              <span>{user?.name}</span>
            </div>

            <div className="loginBtns">
              <button onClick={() => logoutHandler()}>
                <span>Logout</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="loginBtns">
            <button onClick={() => navigate("/login")}>
              <span>TRY FOR FREE</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
