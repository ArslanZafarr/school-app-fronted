"use client";
import ApplicationTabs from "@/app/components/Tabs/application-page/ApplicationTabs";
import "./applicatiion.css";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import StudentCard from "@/app/components/Cards/StudentCard";
import {
  fetchStudentApplication,
  updateStatus,
} from "@/services/admin/powerclass";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Page = () => {
  const [isLoading, setisLoading] = useState(false);
  const [applications, setapplications] = useState([]);
  const [totalpages, settotalpages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { apiToken } = useSelector((state) => state.storeAuth);
  useEffect(() => {
    getApplication(currentPage);
  }, []);
  const getApplication = async (currentpage) => {
    setisLoading(true);
    setCurrentPage(currentpage);
    try {
      let res = await fetchStudentApplication(currentpage, apiToken);
      setapplications(res.data.data);
      setisLoading(false);
      settotalpages(res.data.totalPages ?? 1);
      if (res.data.data.length === 0) {
        toast.error("No Data Available");
      }
    } catch (e) {
      toast.error("No Data Available");
      setisLoading(false);
      setapplications([]);
      console.log("25", e);
    }
  };
  const handlepagechange = (val) => {
    if (currentPage === val) return;
    setCurrentPage(val);
    getApplication(val);
  };
  const handlestatus = async (status, id) => {
    setisLoading(true);
    let formdata = new FormData();
    formdata.append("status", status);
    try {
      let response = await updateStatus(id, formdata, apiToken);
      if (response.data.success) {
        toast.success(response.data.message);
        getApplication(1);
      } else {
        setisLoading(false);
        toast.error(response.data.message);
      }
    } catch (e) {
      setisLoading(false);
      const message = error.data?.message || "Invalid data";
      toast.error(message);
    }
  };
  if (isLoading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <p>Loading...</p>
      </div>
    );
  return (
    <>
      <div className="application_div">
        <div className="power_classes_heading d-flex justify-content-between align-items-center">
          <h2 className="medium_font font_size_24">
            {" "}
            Power Class Applications{" "}
          </h2>
        </div>
        <div className="application_tab_div">
          <div className="teacher_heading">
            <h3 className="medium_font font_siz_20 my-4"> Student </h3>
          </div>
          <div className="student_tab_div">
            <StudentCard
              applications={applications}
              handlestatus={(status, id) => handlestatus(status, id)}
            />
          </div>
          {/* <ApplicationTabs /> */}
        </div>
        <div className="application_pagination_div mt-5">
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

export default Page;
