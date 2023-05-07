import React from "react";
import "./SidebarOption.css";

function SidebarOption({ Icon, title, number, href }) {
  return (
    <div className="sidebarOption">
      {Icon && (
        <Icon
          className={`${number === "1" ? "sidebarOption__icon1" : ""} ${
            number === "2" ? "sidebarOption__icon2" : ""
          } ${number === "3" ? "sidebarOption__icon3" : ""} ${
            number === "4" ? "sidebarOption__icon4" : ""
          } ${number === "5" ? "sidebarOption__icon5" : ""}`}
        />
      )}
      <h2>{title}</h2>
    </div>
  );
}

export default SidebarOption;
