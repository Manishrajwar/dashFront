import { useNavigate } from "react-router-dom";
import hoPaImg from "../../Assets/image 11.png";
import "./home.css";


function HeroSection() {

  const navigate = useNavigate();

  return (
    <div className="hoPaWrap">

      <div className="hoPaContain">

        {/* left part  */}
        <div className="hoPa_content ">

          <h2>
            {/* Automated <br /> Tweeting, Replying <br /> and Liking */}
            Efficient Employee Management System
          </h2>

          <div className="hoPaPara">
            <p className="para1">Streamlined Project and Employee Management</p>
            <p className="para">Stop Wasting Time on Manual Tasks—Let Automation Handle It for You. </p>
          </div>

          <div className=" btnTextWrap">
            <button onClick={()=>navigate("/login")} className="tryBtn">TRY FOR FREE</button>

            <p className="noCreditText mt-1">No credit card required</p>
          </div>

        </div>

        {/* right part  */}
        <div className="hoPa_img">
          <img src={hoPaImg} alt="" />
        </div>

      </div>
      
    </div>
  );
}

export default HeroSection;
