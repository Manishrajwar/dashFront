import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import Frame96 from "../../Assets/Frame 9688.png";
import Frame98 from "../../Assets/frame98.png";
import frame97 from "../../Assets/frame97.png";
import frame99 from "../../Assets/frame99.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import cross from "../../Assets/cross.png";
import "./dashcom.css";
import Timer from "./Timer";
import { useSelector } from "react-redux";
import Calender from "../Common/Calender";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { makeAuthenticatedPOSTRequest } from "../../services/serverHelper";
import { endpoints } from "../../services/api";
import toast from "react-hot-toast";
import Avatar from "react-avatar";

function Dash() {
  const { user, accessToken } = useSelector((state) => state.auth);
  const { currentTimer, calendervalue, changeHandler   , fetchCalenderEvents  ,selectedEvent ,activeUser } = useContext(AppContext);

  const [openActive , setOpenActive] = useState(false);
  const [createEvent, setCreateEvent] = useState(false);

  const [eventDetail, setEventDetails] = useState({
    title: "",
    meetLink: "",
    date: "",
    email: "",
  });

  const createEventHandler = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    const { date, title, meetLink, email } = eventDetail;

    const dateObj = new Date(date);

    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const date2 = dateObj.getDate();

    const resp = await makeAuthenticatedPOSTRequest(
      endpoints.CREATE_MEETLINK_API,
      { year, month, date: date2, title, meetLink, email },
      accessToken
    );
     if(resp?.success){
      toast.success("Successfuly Created");
      fetchCalenderEvents();
     }
     else {
      toast.error(resp?.message);
     }

     toast.dismiss(toastId);
  };


  return (
    <>
      <div className="dashwrap">

        <nav>
          {/* left side */}
          <div className="navleft">
            <p>
              {user?.email === "trailemail@gmail.com"
                ? "This is for trail You Will Not able to Edit the database"
                : `Welcome ${user?.email}`}
            </p>
          </div>
        </nav>

        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          freeMode={true}
          modules={[FreeMode, Pagination, Autoplay]}
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
              spaceBetween: 10,
              slidesOffsetBefore: 0,
              slidesOffsetAfter: 0,
              centeredSlides: false,
            },
            300: {
              slidesPerView: 1,
              spaceBetween: 10,
              slidesOffsetBefore: 0,
              slidesOffsetAfter: 0,
              centeredSlides: false,
            },
          }}
        >
          <SwiperSlide>
            <div onClick={()=>{setOpenActive(true)}} className="singleKnow knowGreen">

              <div className="right">
                <img src={Frame96} alt="" />
                <p className="samepara">Active Employee</p>
              </div>

              <div className="kowSol">
                <p className="samepara">{activeUser?.length}</p>
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
          <div className="latestAnnouceCont"></div>

          <Timer />
        </div>

        {/* calenderrs  */}
        <div className="timenewCont2">
          <Calender />

          <div className="showCalenderDetails">

            <nav>
              <p>
                {calendervalue
                  ? new Date(calendervalue).toLocaleDateString([], {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "NONE"}
              </p>

              <button onClick={() => setCreateEvent(true)}>
                <span>Create Event</span>
              </button>
            </nav>

            <hr />

            <div className="times">
              <label>
                <p>Clock In</p>
                <p>
                  {currentTimer?.clockInTime
                    ? new Date(currentTimer.clockInTime).toLocaleTimeString(
                        [],
                        { hour: "2-digit", minute: "2-digit", hour12: true }
                      )
                    : "NONE"}
                </p>
              </label>

              <label>
                <p>Clock Out</p>
                <p>
                  {currentTimer?.clockOut
                    ? new Date(currentTimer.clockOut).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                    : "NONE"}
                </p>
              </label>

       
            </div>

            <hr />

               {
                 selectedEvent && 
                   <div className="timerNotes">
                      <h3>Title : <span>{selectedEvent?.title}</span></h3>

                       {
                        selectedEvent?.meetLink && 
                        <div className="metlinkdiv">
                        <p>{selectedEvent?.meetLink}</p>
                        <span>Join</span>
                       </div>
                       }
                       
                 </div>
               }
            
          </div>
          
        </div>

      </div>

      {createEvent && (
        <div className="ShowDetailWrap popup-overlay">
          <div className="createpopcont incheigh popup-content">
            <nav>
              <p>Create Event</p>
              <img
                onClick={() => {
                  setCreateEvent(false);
                }}
                src={cross}
                alt="cross"
              />
            </nav>

            <hr />

            <form onSubmit={createEventHandler}>
              <label className="createEventLable">
                <p>Title</p>
                <input
                  required
                  type="text"
                  name="title"
                  value={eventDetail.title}
                  onChange={(e) => changeHandler(e, setEventDetails)}
                />
              </label>

              <label className="createEventLable">
                <p>Meet Link</p>
                <input
                  type="text"
                  name="meetLink"
                  value={eventDetail.meetLink}
                  onChange={(e) => changeHandler(e, setEventDetails)}
                />
              </label>

              <label className="createEventLable">
                <p>Date</p>
                <input
                  required
                  type="date"
                  name="date"
                  value={eventDetail.date}
                  onChange={(e) => changeHandler(e, setEventDetails)}
                />
              </label>

              <label className="createEventLable">
                <p>User Mail</p>
                <input
                  required
                  type="email"
                  name="email"
                  value={eventDetail.email}
                  onChange={(e) => changeHandler(e, setEventDetails)}
                />
              </label>

              <button className="createeventbtn" type="submit">
                <span>Create</span>
              </button>
            </form>
          </div>
        </div>
      )}

{openActive && (
        <div className="ShowDetailWrap popup-overlay">
          <div className="createpopcont increwithheight popup-content">

            <nav>
              <p>Create Event</p>
              <img
                onClick={() => {
                  setOpenActive(false);
                }}
                src={cross}
                alt="cross" className="cursor-pointer"
              />
            </nav>

            <hr />

            <div className="openActiveCont">

              {
                activeUser?.map((act , index)=>(
                  <div key={index} className="singleactUser">
                         <Avatar name="Foo Bar" className="empavatar" />
                          <p className="actemail">{act?.fullName}</p>
                          <p className="actemail addcolor">{act?.timerDetail?.status === "resume" ? 'Break':"Active"}</p>
                  </div>
                ))
              }
             
            </div>

          </div>
        </div>
      )}
   

    </>
  );
}

export default Dash;
