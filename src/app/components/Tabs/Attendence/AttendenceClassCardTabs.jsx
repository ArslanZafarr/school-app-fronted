"use client";
import React, { useState } from "react";
import Jun_Tab from "./Jun_Tab";
import July_Tab from "./July_Tab";

const AttendenceClassCardTabs = ({ classes }) => {
  const [activeTab, setActiveTab] = useState("02_Jun_2024");

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "02_Jun_2024":
        return <Jun_Tab classes={classes} />;
      case "02_July_2024":
        return <July_Tab classes={classes} />;
      default:
        return null;
    }
  };
  return (
    <div className="tab_div mt-3">
      <ul className="nav nav-underline">
        <li className="nav-item">
          <button
            className={`nav-link medium_font font_size_14 ${
              activeTab === "02_Jun_2024" && "active"
            }`}
            onClick={() => handleTabChange("02_Jun_2024")}
          >
            02 Jun 2024
          </button>
        </li>
        {/* <li className="nav-item">
          <button
            className={`nav-link medium_font font_size_14 ${
              activeTab === "02_July_2024" && "active"
            }`}
            onClick={() => handleTabChange("02_July_2024")}
          >
            02 july 2024
          </button>
        </li> */}
      </ul>
      {renderContent()}
    </div>
  );
};

export default AttendenceClassCardTabs;
