"use client";
import Link from "next/link";
import "./school-timetable.css";
import { LiaEditSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchClasses } from "@/services/principal/dashboard";

const Page = () => {
  const [isLoading, setisLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalpages, settotalpages] = useState(2);
  const { apiToken, userData } = useSelector((state) => state.storeAuth);
  const [classes, setclasses] = useState([]);
  useEffect(() => {
    console.log("22", userData);
    getStudents(currentPage);
  }, []);
  const getStudents = async (page) => {
    if (apiToken) {
      setisLoading(true);
      try {
        let res = await fetchClasses(
          userData?.["profile"]?.["role_profile"]?.["id"],
          apiToken
        );
        if (res.data.success) {
          setclasses(res.data.classes);
        } else {
          setclasses([]);
        }
        setisLoading(false);
      } catch (e) {
        setisLoading(false);
        setclasses([]);
      }
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
    <div className="padding tablet_padding">
      <h3 className="medium_font font_size_24">School Timetable</h3>

      <div className="time_table_card_div mt-3 d-flex flex-wrap align-items-center">
        {classes.map((curData, index) => (
          <div
            key={index}
            className="time_table_card border p-3 my-3 rounded d-flex justify-content-between align-items-start me-3"
          >
            <div className="">
              <p className="medium_font font_size_22">Class {curData.grade}</p>
              <p className="text_muted font_size_22">
                {" "}
                {curData.student_count} Students
              </p>
            </div>
            <div className="">
              <Link href={`timetable?id=${curData["id"]}`}>
                <LiaEditSolid
                  className="border rounded-2 p-1 fs-2"
                  style={{ color: "#798df8" }}
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
