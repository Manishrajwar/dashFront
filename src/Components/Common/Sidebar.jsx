import React, { useContext, useEffect, useState } from "react";
import "./common.css";
import { AppContext } from "../../Context/AppContext";

function Sidebar() {
  const { currentPage, setCurrPage, dashAllowPage } = useContext(AppContext);

  const [sortAllow, setSortAllow] = useState();

  useEffect(() => {
    const sortedData = [...dashAllowPage].sort((a, b) => {
      return a?.name?.localeCompare(b.name);
    });

    setSortAllow(sortedData);
  }, [dashAllowPage]);

  return (
    <div className="sidebarWrap">
      <div className="sidebarCont">
        {sortAllow?.map((ele, index) => (
          <label
            className={`cursor-pointer  ${
              currentPage === ele?.name && "selected"
            }`}
            onClick={() => {
              setCurrPage(ele?.name);
              sessionStorage.setItem("currentPage", ele?.name);
            }}
            key={index}
          >
            <span>{ele?.name}</span>
          </label>
        ))}
      </div>

      <div className="sidebarCont2"></div>
    </div>
  );
}

export default Sidebar;
