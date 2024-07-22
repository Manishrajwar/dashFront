import frame from "../../Assets/Frame.png";
import "./auth.css";
import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";

const Login = () => {
  const { changeHandler } = useContext(AppContext);

  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    type: "Login",
  });

  return (
    <div className="commonWrap">
      <div className="loginwrap">

        <div className="loginCont">

          <form>
            <div className="heading similarCss">
              <h2 >Sign in</h2>
              <p>to access HRMS Dashboard</p>
            </div>

            {/* tolggle  */}
            <div className="authTogle">
              <div  onClick={()=>{
                setFormdata((prev)=>({
                  ...prev , 
                  type:"Login"
                }))
              }} className={`${formdata?.type === "Login" && "currentBar"} normalbar`}>Login</div>
              <div onClick={()=>{
                setFormdata((prev)=>({
                  ...prev , 
                  type:"Signup"
                }))
              }} className={`${formdata?.type === "Signup" && "currentBar"} normalbar`}>Signup</div>
            </div>

            {/* fields  */}
            <label >
              <p>Email</p>
              <input
                type="email"
                name="email"
                onChange={(e) => changeHandler(e, setFormdata)}
                value={formdata.email}
              />
            </label>

            <label htmlFor="">
              <p>Password</p>
              <input
                type="password"
                name="password"
                onChange={(e) => changeHandler(e, setFormdata)}
                value={formdata.password}
              />
            </label>

            <p className="formgpass"> Forgot Password?</p>

            <button>
              <span>Login</span>
            </button>
          </form>

          {/* left side */}
          <img src={frame} alt="" />

        </div>

      </div>
    </div>
  );
};

export default Login;
