import refresh from "../../Assets/bx-refresh.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination , Autoplay } from "swiper/modules";
import Frame96 from "../../Assets/Frame 9688.png";
import Frame98 from "../../Assets/frame98.png";
import frame97 from "../../Assets/frame97.png"
import frame99 from "../../Assets/frame99.png"
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./dashcom.css";
import Timer from "./Timer";
import { useSelector } from "react-redux";



function Dash() {

  const {user} = useSelector((state)=>state.auth);

  return (
    <div className="dashwrap">

      <nav>
        {/* left side */}
        <div className="navleft">
          <h2>{user?.name}</h2>
          <p>{user?.email === "trailemail@gmail.com" ? "This is for trail You Will Not able to Edit the database":`Welcome ${user?.email}`}</p>
        </div>

        {/* right side */}
        <button>
          <span>Refresh</span> <img src={refresh} alt="" />
        </button>
      </nav>

      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        freeMode={true}
        modules={[FreeMode, Pagination ,Autoplay]}
        className="mySwiper"
        breakpoints={{
          1400: {
            slidesPerView: 4,
            spaceBetween: 20,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            centeredSlides: false,
          },
          870: {
            slidesPerView: 3,
            spaceBetween: 20,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            centeredSlides: false,
          },
          580: {
            slidesPerView: 2,
            spaceBetween: 20,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            centeredSlides: false,
          },
          300: {
            slidesPerView: 1,
            spaceBetween: 20,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            centeredSlides: false,
          },
          
          
         
        }}
      >

        <SwiperSlide>
          <div className="singleKnow knowGreen">
            <div className="right">
              <img src={Frame96} alt="" />
              <p className="samepara">Active Employee</p>
            </div>
             <div className="kowSol">

            <p className="samepara">12</p>
             </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="singleKnow knowRed">
            <div className="right">
              <img src={frame97} alt="" />
              <p className="samepara">Leave Request</p>
            </div>
             <div className="kowSol">

            <p className="samepara">12</p>
             </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="singleKnow knowYellow">
            <div className="right">
              <img src={frame99} alt="" />
              <p className="samepara">Employee on Leave</p>
            </div>
             <div className="kowSol">

            <p className="samepara">12</p>
             </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="singleKnow knowBlue">
            <div className="right">
              <img src={Frame98} alt="" />
              <p className="samepara">Total Employee</p>
            </div>
             <div className="kowSol">

            <p className="samepara">12</p>
             </div>
          </div>
        </SwiperSlide>

      </Swiper>


    <div className="timenewCont">

       <div className="latestAnnouceCont">

       </div>

<Timer />

    </div>

    </div>
  );
}

export default Dash;
