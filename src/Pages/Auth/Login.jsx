import frame from "../../Assets/Frame.png";
import "./auth.css";
import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { makeTrailUnauthenticatedPOSTRequest, makeUnauthenticatedPOSTRequest } from "../../services/serverHelper";
import { endpoints } from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAccessToken, setUser } from "../../reducer/slices/authSlice";
 

const Login = () => {
  const { changeHandler } = useContext(AppContext);
  const dispatch = useDispatch();

  const navigate =useNavigate();

  const [currentLogin , setCurrentLogin] = useState("Admin");


  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    type: "Login",
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
         if(currentLogin === "Admin"){

           resp = await makeUnauthenticatedPOSTRequest(endpoints.ADMIN_LOGIN_API , {email:formdata.email , password:formdata.password});
           if(resp.success){
             toast.success("Successfuly login");
             dispatch(setUser(resp?.user));
             dispatch(setAccessToken(resp?.token));
             localStorage.setItem("accessToken" , JSON.stringify(resp?.token));
             localStorage.setItem("user" ,JSON.stringify(resp?.user));
             navigate("/dashboard");
            }
          }
          else {
            // for employe code login 
            resp = await makeUnauthenticatedPOSTRequest(endpoints.EMPLOYEE_CODE_LOGIN_API , {employeeCode:formdata.email , password:formdata.password});

            if(resp.success){
              toast.success("Successfuly login");
              dispatch(setUser(resp?.user));
              dispatch(setAccessToken(resp?.token));
              localStorage.setItem("accessToken" , JSON.stringify(resp?.token));
              localStorage.setItem("user" ,JSON.stringify(resp?.user));
              navigate("/dashboard");
             }
             else {
              toast.error(resp?.message);
             }
          }
       }
       else {
        resp = await makeUnauthenticatedPOSTRequest(endpoints.ADMIN_SIGNUP_API , {email:formdata.email , password:formdata.password});
         if(resp?.success){
          toast.success("Successfuly registered");
setFormdata((prev)=>({
  ...prev ,
  type:"Login"
}))

          }
          else{
            toast.error(resp.message);
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

            <label >
              {
                formdata?.type==="Login" ? 
                <div className="currentLogin">
                   <p onClick={()=>setCurrentLogin("Admin")} className={`${currentLogin === "Admin" && "crlin"}`}>Admin Email</p> <span>/</span>
                   <p onClick={()=>setCurrentLogin("Code")} className={`${currentLogin === "Code" && "crlin"}`}>Employee Code</p>
                </div>
                :
                <p>Email</p>

              }

              {
                formdata?.type === "Login" ? 
                <input
                type={currentLogin === "Admin"?"email":"text"}
                name="email"
                onChange={(e) => changeHandler(e, setFormdata)}
                value={formdata.email}
              />
              :
              <input
              type="email"
              name="email"
              onChange={(e) => changeHandler(e, setFormdata)}
              value={formdata.email}
              />
            }
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
          
              <img src={frame} alt="" />

        </div>

      </div>
    </div>
  );
};

export default Login;
