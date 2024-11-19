"use client";
import React, { useEffect, useState } from "react";
import Time_1_Tab from "./Time_1_Tab";
import Time_2_Tab from "./Time_2_Tab ";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  fetchAttendanceTracking,
  updateAttendanceTracking,
} from "@/services/teacher/teacherApiService";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { toast } from "react-toastify";
const AttendenceTabs = ({ classid, subjectid }) => {
  const [activeTab, setActiveTab] = useState("time_1");
  const [students, setstudents] = useState([]);
  const [totalpages, settotalpages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [datevalue, setdatevalue] = useState(moment().format("YYYY-MM-DD"));
  const { apiToken, teacherProfile } = useSelector((state) => state.storeAuth);
  const [isloading, setisloading] = useState(false);
  useEffect(() => {
    if (teacherProfile?.["teacher_profile"]) {
      getAttendanceTracking(datevalue, currentPage);
    }
  }, []);
  const getAttendanceTracking = async (date, page) => {
    setCurrentPage(page);
    setisloading(true);
    try {
      let res = await fetchAttendanceTracking(
        classid,
        subjectid,
        date,
        page,
        apiToken
      );
      setisloading(false);
      settotalpages(res.data.data?.pagination?.totalPages ?? 1);
      setstudents(res.data.data?.students);
    } catch (e) {
      setisloading(false);
      setstudents([]);
      console.log("29", e);
    }
  };
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };
  const handledate = (e) => {
    setdatevalue(e.target.value);
    getAttendanceTracking(e.target.value, 1);
  };
  const handlepagechange = (val) => {
    if (currentPage === val) return;
    setCurrentPage(val);
    getAttendanceTracking(datevalue, val);
  };
  const renderContent = () => {
    switch (activeTab) {
      case "time_1":
        return <Time_1_Tab />;
      case "time_2":
        return <Time_2_Tab />;
      default:
        return null;
    }
  };
  if (isloading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <p>Loading...</p>
      </div>
    );
  const updateStatus = async (data) => {
    setisloading(true);
    let formdata = new FormData();
    formdata.append("date", datevalue);
    formdata.append("attendance_status", data.attendance_status);
    formdata.append("class_id", data.class_id);
    formdata.append("subject_id", data.subject_id);
    formdata.append("student_id", data.student_id);
    try {
      let res = await updateAttendanceTracking(formdata, apiToken);
      if (res.data.success) {
        toast.success("Status Updated Succesfully");
        getAttendanceTracking(datevalue, 1);
      } else {
        setisloading(false);
        toast.error(res.data.message);
      }
    } catch (e) {
      setisloading(false);
      toast.error(e.message);
    }
  };
  return (
    <>
      <div className="tab_div mt-3">
        {/* <ul className="nav nav-underline">
                    <li className="nav-item">
                        <button
                            className={`nav-link medium_font font_size_14 ${activeTab === 'time_1' && 'active'}`}
                            onClick={() => handleTabChange('time_1')}
                        >
                            02 Jun 2024
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link medium_font font_size_14 ${activeTab === 'time_2' && 'active'}`}
                            onClick={() => handleTabChange('time_2')}
                        >
                            02 Jun 2024
                        </button>
                    </li>
                </ul> */}
        <div style={{ maxWidth: "150px" }}>
          <input
            onChange={handledate}
            value={datevalue}
            type="date"
            className="form-control"
          />
        </div>
        <Time_1_Tab students={students} updateStatus={updateStatus} />
        <div className="payment_pagination_div">
          <ResponsivePagination
            current={currentPage}
            total={totalpages}
            onPageChange={handlepagechange}
          />
        </div>
      </div>
    </>
  );
};

export default AttendenceTabs;
