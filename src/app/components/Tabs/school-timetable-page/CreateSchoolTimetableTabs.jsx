"use client";
import React, { useState } from "react";
import SundayTab from "./SundayTab";
import MondayTab from "./MondayTab";
import TuesdayTab from "./TuesdayTab";
import WednesdayTab from "./WednesdayTab";
import ThusdayTab from "./ThusdayTab";
import FridayTab from "./FridayTab";
import SaturdayTab from "./SaturdayTab";
import "./create-school-timetabletabs.css";

const CreateSchoolTimetableTabs = ({
  formData,
  handleChange,
  classes,
  errors,
  handleSubmit,
  subjects,
  handleFiles,
  createsubject,
}) => {
  const [activeTab, setActiveTab] = useState("monday"); // Initial active tab

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "monday":
        return (
          <MondayTab
            classes={classes}
            handleChange={handleChange}
            formData={formData}
            errors={errors}
            handleSubmit={handleSubmit}
            subjects={subjects}
            handleFiles={handleFiles}
            createsubject={createsubject}
          />
        );
      case "tuesday":
        return (
          <MondayTab
            classes={classes}
            handleChange={handleChange}
            formData={formData}
            errors={errors}
            handleSubmit={handleSubmit}
            subjects={subjects}
            createsubject={createsubject}
            handleFiles={handleFiles}
          />
        );
      case "wednesday":
        return (
          <MondayTab
            createsubject={createsubject}
            classes={classes}
            handleChange={handleChange}
            formData={formData}
            errors={errors}
            handleSubmit={handleSubmit}
            subjects={subjects}
            handleFiles={handleFiles}
          />
        );
      case "thusday":
        return (
          <MondayTab
            classes={classes}
            createsubject={createsubject}
            handleChange={handleChange}
            formData={formData}
            errors={errors}
            handleSubmit={handleSubmit}
            subjects={subjects}
            handleFiles={handleFiles}
          />
        );
      case "friday":
        return (
          <MondayTab
            createsubject={createsubject}
            classes={classes}
            handleChange={handleChange}
            formData={formData}
            errors={errors}
            handleSubmit={handleSubmit}
            subjects={subjects}
            handleFiles={handleFiles}
          />
        );
      case "saturday":
        return (
          <MondayTab
            createsubject={createsubject}
            classes={classes}
            handleChange={handleChange}
            formData={formData}
            errors={errors}
            handleSubmit={handleSubmit}
            subjects={subjects}
            handleFiles={handleFiles}
          />
        );
      case "sunday":
        return (
          <MondayTab
            createsubject={createsubject}
            classes={classes}
            handleChange={handleChange}
            formData={formData}
            errors={errors}
            handleSubmit={handleSubmit}
            subjects={subjects}
            handleFiles={handleFiles}
          />
        );

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
                activeTab === "monday" && "active"
              }`}
              onClick={() => handleTabChange("monday")}
            >
              Monday
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link medium_font font_size_14 ${
                activeTab === "tuesday" && "active"
              }`}
              onClick={() => handleTabChange("tuesday")}
            >
              Tuesday
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link medium_font font_size_14 ${
                activeTab === "wednesday" && "active"
              }`}
              onClick={() => handleTabChange("wednesday")}
            >
              Wednesday
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link medium_font font_size_14 ${
                activeTab === "thusday" && "active"
              }`}
              onClick={() => handleTabChange("thusday")}
            >
              Thusday
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link medium_font font_size_14 ${
                activeTab === "friday" && "active"
              }`}
              onClick={() => handleTabChange("friday")}
            >
              Friday
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link medium_font font_size_14 ${
                activeTab === "saturday" && "active"
              }`}
              onClick={() => handleTabChange("saturday")}
            >
              Saturday
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link medium_font font_size_14 ${
                activeTab === "sunday" && "active"
              }`}
              onClick={() => handleTabChange("sunday")}
            >
              Sunday
            </button>
          </li>
        </ul>
        {renderContent()}
      </div>
    </>
  );
};

export default CreateSchoolTimetableTabs;
