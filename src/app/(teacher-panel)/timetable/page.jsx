"use client";
import Link from "next/link";
import "./timetable.css";
import PowerClassesCard from "@/app/components/Cards/powerClassesCard";
import MobileScreenTimeTableTable from "@/app/components/Tables/MobileScreensTables/TimeTableTable";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTeacherTimetable } from "@/services/teacher/teacherApiService";

const Page = () => {
  const { apiToken, teacherProfile } = useSelector((state) => state.storeAuth);
  const [timetable, settimetable] = useState([]);
  const [isloading, setisloading] = useState(false);
  useEffect(() => {
    if (teacherProfile?.["teacher_profile"]) {
      getTimetable();
    }
  }, [teacherProfile]);
  const getTimetable = async () => {
    setisloading(true);
    try {
      let res = await fetchTeacherTimetable(
        teacherProfile?.["teacher_profile"]["id"],
        apiToken
      );
      setisloading(false);
      console.log("24", res.data.assignedTimetables || []);
      settimetable(res.data.assignedTimetables || []);
    } catch (e) {
      setisloading(false);
      settimetable([]);
      console.log("32", e);
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
  const tableData = [
    {
      class: "class 3",
      start_time: "9:00 AM",
      end_time: "9:00 AM",
      duration: "2 hour",
      subject: "Maths",
      details: "View",
    },
    {
      class: "class 3",
      start_time: "9:00 AM",
      end_time: "9:00 AM",
      duration: "2 hour",
      subject: "Maths",
      details: "View",
    },
    {
      class: "class 3",
      start_time: "9:00 AM",
      end_time: "9:00 AM",
      duration: "2 hour",
      subject: "Maths",
      details: "View",
    },
    {
      class: "class 3",
      start_time: "9:00 AM",
      end_time: "9:00 AM",
      duration: "2 hour",
      subject: "Maths",
      details: "View",
    },
    {
      class: "class 3",
      start_time: "9:00 AM",
      end_time: "9:00 AM",
      duration: "2 hour",
      subject: "Maths",
      details: "View",
    },
  ];

  return (
    <>
      <div className="padding tablet_padding">
        <h3 className="medium_font font_size_24 mb-1 mb-md-5">Time Table</h3>
        <div className="d-block d-xxl-none d-xl-none d-lg-none d-md-none">
          <MobileScreenTimeTableTable timetable={timetable} />
        </div>
        <div className="d-none d-xxl-block d-xl-block d-lg-block d-md-block">
          <table className="table table_1 medium_font font_size_14 table-responsive">
            <thead className="table-light border-1 rounded-top-3">
              <tr>
                <th>Class</th>
                <th>Subject</th>
                <th className="payment-header">Start Time</th>
                <th>End Time</th>
                <th>Duration</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {timetable.map((curData, index) => (
                <tr key={index} className="border-1">
                  <td>Class {curData.timetable?.class?.grade}</td>
                  <td>{curData.subject?.name}</td>
                  <td>{curData.timetable?.start_time}</td>
                  <td>{curData.timetable?.end_time}</td>
                  <td>{curData.timetable?.duration} Minutes</td>
                  <td>
                    <Link
                      href={`timetable/online-class?id=${curData.timetable?.id}`}
                      className="medium_font"
                      style={{ color: "#5088ff", textDecoration: "none" }}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Page;
