import React from "react";
import "./common.css";
import { useSelector } from "react-redux";

function ButtonCom({ text, onclick }) {
  const { loading } = useSelector((state) => state.auth);
  return (
    <button disabled={loading} onClick={() => onclick()} className="buttonsam">
      {loading ? <span class="loader"></span> : <span>{text}</span>}
    </button>
  );
}

export default ButtonCom;
