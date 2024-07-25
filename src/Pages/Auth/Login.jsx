import frame from "../../Assets/Frame.png";
import "./auth.css";
import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { makeAuthenticatedPOSTRequest, makeTrailUnauthenticatedPOSTRequest, makeUnauthenticatedPOSTRequest } from "../../services/serverHelper";
import { endpoints } from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../reducer/slices/authSlice";
 

const Login = () => {
  const { changeHandler } = useContext(AppContext);
  const dispatch = useDispatch();

  const navigate =useNavigate();


  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    type: "Login",
    // userType:""
  });

  const trailLogin = async(e)=>{
       const resp = await makeTrailUnauthenticatedPOSTRequest(endpoints.TRAIL_LOGIN_API);
           if(resp.success){
            sessionStorage.setItem("user" , JSON.stringify(resp?.user));
             toast.success("Successfuly login");
               navigate("/dashboard");
               dispatch(setUser(resp?.user));
           }
      }

  const submitHandler = async(e)=>{
    e.preventDefault();
    try{

      let resp;

       if(formdata.type === "Login"){
         resp = await makeUnauthenticatedPOSTRequest(endpoints.LOGIN_API , {email:formdata.email , password:formdata.password});
           console.log("login",resp);
       }
       else {
        resp = await makeUnauthenticatedPOSTRequest(endpoints.ADMIN_SIGNUP_API , {email:formdata.email , password:formdata.password});
        console.log("login",resp);
         if(resp?.success){

           localStorage.setItem("user" , JSON.stringify(resp?.user));
           dispatch(setUser(resp.user));
           navigate("/dashboard");
          }
          else{
            toast.error(resp.messsage);
          }
       }

    } catch(error){
       console.log(error);

    }
  }

  return (
    <div className="commonWrap">

      <div className="loginwrap">


        <div className="loginCont">

          <form onSubmit={submitHandler}>
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
{/* 
{
  formdata.type === "Signup"  && 

            <label >
              <p>As a</p>
              <select
                name="userType"
                onChange={(e) => changeHandler(e, setFormdata)}
                value={formdata.userType}
              >
                <option value="Employee">Employee</option>
                <option value="Admin">Admin</option>
              </select>
            </label>

} */}


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

            <button type="submit">
              <span>{formdata.type === "Login" ? "Login": "Signup"}</span>
            </button>

            {
              formdata.type === "Login" && 
            <button type="button" onClick={()=>trailLogin()}>
              <span>Trail Login</span>
            </button>
            }


          </form>

          {/* left side */}
          <img src={frame} alt="" />

        </div>

      </div>
    </div>
  );
};

export default Login;
