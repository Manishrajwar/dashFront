import "./dashcom.css";
import { useEffect, useState } from "react";
import clockInimg from "../../Assets/clockIn.png";
var tc3;
var tc4;

const Timer = () => {
  const [loading, setLoading] = useState(false);
  const [clockoutLoading, setClockOutLoading] = useState(false);

  const [isBreakDone, setIsBreakDone] = useState(false);

  var [clock, setClock] = useState(0);
  var [breakClock, setBreakClock] = useState(0);
  const [mount, setMount] = useState(false);

  const [clockStatus, setClockStatus] = useState("Clock-in");

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleVisibilityChange = () => {
    if (!document.hidden) {
      initializeTimer();
    }
  };

  useEffect(() => {
    initializeTimer();
  }, []);

  const initializeTimer = () => {
    let t = localStorage.getItem("clock-in");
    let t1 = localStorage.getItem("clock-status");
    let t2 = localStorage.getItem("break-seconds");
    clearInterval(tc3);
    clearInterval(tc4);

    if (t1) {
      if (t2) {
        setBreakClock(t2);
      }

      if (t1 !== "out") {
        let t5 = Math.floor((new Date().getTime() - t) / 1000);
        setClock(t5);

        tc4 = setInterval(() => {
          setClock(++t5);
        }, 1000);

        if (t1 === "resume") {
          tc3 = setInterval(() => {
            setBreakClock(++t2);
          }, 1000);
        }
      } else {
        let t7 = localStorage.getItem("clock-out-time");
        let t5 = Math.floor((t7 - t) / 1000);
        setClock(t5);
      }
    }
  };

  const clockIn = async () => {
    setLoading(true);

    let t = localStorage.getItem("clock-status");

    localStorage.setItem("date1", new Date().toLocaleDateString("en-GB"));

    // not getting status from locastorage
    if (!t) {
      localStorage.setItem(
        "clockInTime",
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );

      localStorage.setItem("clock-in", new Date().getTime());
      localStorage.setItem("clock-status", "break");
      setClockStatus("Break");

      let currentDate = new Date().toLocaleDateString("en-GB");
      localStorage.setItem("clock-in-date", currentDate);

      tc4 = setInterval(() => {
        setClock(++clock);
      }, 1000);
    }
    // this is else of getting the status from locastorage
    else {
      if (t === "break") {
        localStorage.setItem(
          "breakInTime",
          new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          })
        );

        localStorage.setItem("break-time", new Date().getTime());
        localStorage.setItem("clock-status", "resume");
        setClockStatus("Resume");
        let t3 = localStorage.getItem("break-seconds");

        tc3 = setInterval(() => {
          setBreakClock(++t3);
        }, 1000);
      } else if (t === "resume") {
        localStorage.setItem(
          "breakOutTime",
          new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          })
        );

        let t1 = localStorage.getItem("break-time");
        if (t1) {
          let t2 = localStorage.getItem("break-seconds");
          if (t2) {
            localStorage.setItem(
              "break-seconds",
              Math.floor((new Date() - t1) / 1000) + Number(t2)
            );
          } else {
            localStorage.setItem(
              "break-seconds",
              Math.floor((new Date() - t1) / 1000)
            );
          }
        }
        localStorage.setItem("clock-status", "Clock-out");
        setClockStatus("Clock-out");
        localStorage.setItem("isBreakDone", true);

        clearInterval(tc3);
      } else if (t === "out") {
        // localStorage.setItem("clock-in", new Date().getTime());
        localStorage.setItem("clock-status", "break");
        localStorage.removeItem("clock-out-time");
        localStorage.removeItem("break-seconds");
        localStorage.removeItem("break-time");

        let t8 = 0;
        tc4 = setInterval(() => {
          setClock(++t8);
        }, 1000);
      }
    }
    setMount(!mount);
    setLoading(false);
  };

  const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes, seconds] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    return new Date(
      `${new Date().toDateString()} ${hours}:${minutes}:${seconds}`
    );
  };

  const clockOut = async () => {
    setClockOutLoading(true);

    // todo: put this cclock in status at corect position
    setClockStatus("Clock-in");

    localStorage.setItem("clock-status", "out");
    localStorage.setItem("clock-out-time", new Date().getTime());
    localStorage.setItem(
      "clockOutTime",
      new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
    );

    clearInterval(tc3);
    clearInterval(tc4);
    setMount(!mount);
    setClock(0);

    const breakIn = localStorage.getItem("breakInTime");
    const breakOut = localStorage.getItem("breakOutTime");

    // Convert breakIn and breakOut to Date objects
    // Convert breakIn and breakOut to Date objects
    let date1, date2;
    if (breakIn !== null) {
      date1 = parseTime(breakIn);
    }
    if (breakOut !== null) {
      date2 = parseTime(breakOut);
    }

    let differenceMs, hours, minutes, seconds, differenceText;

    if (breakIn !== null && breakOut !== null) {
      differenceMs = date2.getTime() - date1.getTime();

      // Convert the difference to a readable format
      hours = Math.floor(differenceMs / (1000 * 60 * 60));
      minutes = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((differenceMs % (1000 * 60)) / 1000);

      differenceText = `${hours}:${minutes}:${seconds}`;
    }

    // let ans = await postActivity({
    //   clockIn: localStorage.getItem("clock-in"),
    //   clockOut: localStorage.getItem("clock-out-time"),
    //   late: breakClock,
    //   date1: localStorage.getItem("date1"),
    //   overtime: clock - 32400 > 0 ? clock - 32400 : 0,
    //   total: clock,
    //   message: "",
    // });

    const userDataString = localStorage.getItem("hrms_user");

    const userData = JSON.parse(userDataString);

    const clockInDate = localStorage.getItem("clock-in-date");

    // const attendence = await postAttendence({
    //   clockInDetail: localStorage.getItem("clockInTime"),
    //   breakTime: differenceText,
    //   clockOutDetail: localStorage.getItem("clockOutTime"),
    //   id: userData?._id,
    //   clockInDate: clockInDate,
    // });

    localStorage.removeItem("clock-in");
    localStorage.removeItem("clock-status");
    localStorage.removeItem("clock-out-time");
    localStorage.removeItem("clockOutTime");
    localStorage.removeItem("clockInTime");
    localStorage.removeItem("breakInTime");
    localStorage.removeItem("breakOutTime");
    localStorage.removeItem("clock-in-date");
    localStorage.removeItem("break-time");
    localStorage.removeItem("break-seconds");
    localStorage.removeItem("date1");

    setClockOutLoading(false);
  };

  useEffect(() => {
    const isBreak = localStorage.getItem("isBreakDone");
    const statusClock = localStorage.getItem("clock-status");
    if (isBreak) {
      setIsBreakDone(isBreak);
    }
    if (statusClock) {
      setClockStatus(statusClock);
    } else {
      setClockStatus("Clock-in");
    }
  }, [clockStatus]);

  return (
    <div className="timerWrap">
      
      <nav>
        <h3>Mark Attendance</h3>
      </nav>

      <hr />

      <div className="notewrap">
        <input type="text" placeholder="Add Notes" />
        <button onClick={clockStatus === "Clock-out" ? clockOut : clockIn}>
          <img src={clockInimg} alt="" />
          {loading ? <span class="loader"></span> : <span>{clockStatus}</span>}
        </button>
      </div>

      <div className="showtimcont">
        <div className="showTime">
          <div className="hours">{Math.floor(clock / 3600)}</div>
          <span>:</span>
          <div className="minutes">{Math.floor((clock % 3600) / 60)}</div>
          <span>:</span>
          <div className="seconds">{clock % 60}</div>
          <span>Hrs</span>
        </div>

        <div className="todaydate">
          {" "}
          {new Date().toLocaleDateString("default", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}{" "}
        </div>
      </div>

    </div>
  );
};

export default Timer;
