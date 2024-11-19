"use client";
import { fetchTeacherStudent } from "@/services/teacher/teacherApiService";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import Link from "next/link";
const MyComponent = () => {
  const searchParams = useSearchParams();
  const [isLoading, setisLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setstudents] = useState([]);
  const [totalpages, settotalpages] = useState(0);
  const { apiToken } = useSelector((state) => state.storeAuth);
  useEffect(() => {
    if (searchParams.get("id")) {
      getTeacherStudents(currentPage);
    }
  }, []);
  const getTeacherStudents = async (page) => {
    setisLoading(true);
    setCurrentPage(page);
    try {
      let res = await fetchTeacherStudent(
        searchParams.get("id"),
        page,
        apiToken
      );
      if (res.data.success) {
        settotalpages(res.data.pagination?.totalPages ?? 1);
        setstudents(res.data.students);
      } else {
        setstudents([]);
      }
      setisLoading(false);
    } catch (e) {
      setstudents([]);
      setisLoading(false);
    }
  };
  const handlepagechange = (val) => {
    if (currentPage === val) return;
    setCurrentPage(val);
    getTeacherStudents(val);
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
    <div className="padding tablet_padding">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="medium_font font_size_24 mb-3"> Students </h3>
      </div>
      <div className="table_div">
        <div>
          <table className="table my-5 table_1 medium_font font_size_14 table-responsive">
            <thead className="table-light">
              <tr className="border-1 rounded-top-3">
                <th>Name</th>
                <th>Class</th>
                <th>DOB</th>
                <th>Phone</th>
                <th>School</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((curData, index) => (
                <tr key={index} className="border-1">
                  <td>
                    <span> {curData.profile?.full_name}</span>
                  </td>
                  <td>Class {curData.class?.grade}</td>
                  <td>{curData.date_of_birth}</td>
                  <td>{curData.parent_contact_number}</td>
                  <td>{curData.school?.school_name}</td>
                  <td className="icon_main_div">
                    <div className="rounded-3 icon_div d-flex align-items-center justify-content-around">
                      <Link
                        href={`/students/students-performance?id=${
                          curData.id
                        }&class_id=${searchParams.get("id")}`}
                      >
                        Performance
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="application_pagination_div mt-5">
          <ResponsivePagination
            current={currentPage}
            total={totalpages}
            onPageChange={handlepagechange}
          />
        </div>
      </div>
    </div>
  );
};
const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
};

export default Page;
