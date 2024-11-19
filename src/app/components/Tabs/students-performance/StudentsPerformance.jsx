"use client";
import React, { useState } from "react";
import AssignmentsTab from "./AssignmentsTab";
import OverviewTab from "./OverviewTab";
import QuizzesTab from "./QuizzesTab";
import "./students-performance.css";

const ApplicationTabs = ({
  id,
  assignments,
  quizzes,
  averagedata,
  attendancedata,
  class_id,
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <OverviewTab
            averagedata={averagedata}
            attendancedata={attendancedata}
          />
        );
      case "assignments":
        return (
          <AssignmentsTab
            id={id}
            assignments={assignments}
            class_id={class_id}
          />
        );
      case "quizzes":
        return <QuizzesTab id={id} quizzes={quizzes} class_id={class_id} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="tab_div mt-3">
        <ul className="nav nav-underline">
          <li className="nav-item">
            <button
              className={`nav-link medium_font font_size_14 ${
                activeTab === "overview" && "active"
              }`}
              onClick={() => handleTabChange("overview")}
            >
              Overview
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link medium_font font_size_14 ${
                activeTab === "assignments" && "active"
              }`}
              onClick={() => handleTabChange("assignments")}
            >
              Assignments
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link medium_font font_size_14 ${
                activeTab === "quizzes" && "active"
              }`}
              onClick={() => handleTabChange("quizzes")}
            >
              Quizzes
            </button>
          </li>
        </ul>
        {renderContent()}
      </div>
    </>
  );
};

export default ApplicationTabs;
