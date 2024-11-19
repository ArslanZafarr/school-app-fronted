"use client";
import Button from "@/app/components/Button";
import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";
import StudentsPerformance from "@/app/components/Tabs/students-performance/StudentsPerformance";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  fetchAverageAttendance,
  fetchAverageGrade,
  getAssignments,
  getQuizzes,
} from "@/services/teacher/teacherApiService";
import { useSelector } from "react-redux";

const MyComponent = () => {
  const searchParams = useSearchParams();
  const [averagedata, setaveragedata] = useState({});
  const [attendancedata, setattendancedata] = useState({});
  const [assignments, setassignments] = useState([]);
  const [quizzes, setquizzes] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const { apiToken } = useSelector((state) => state.storeAuth);
  useEffect(() => {
    if (searchParams.get("id")) {
      getassignments();
      getquiz();
      getaveragegrade();
      getattendance();
    }
  }, []);
  const getaveragegrade = async () => {
    setisLoading(true);
    try {
      let res = await fetchAverageGrade(searchParams.get("id"), apiToken);
      setaveragedata(res.data.data);
      setisLoading(false);
    } catch (e) {
      setaveragedata({});
      setisLoading(false);
    }
  };
  const getattendance = async () => {
    try {
      let res = await fetchAverageAttendance(searchParams.get("id"), apiToken);
      console.log("46", res.data);
      setattendancedata(res.data);
    } catch (e) {
      setattendancedata({});
    }
  };
  const getassignments = async () => {
    try {
      let res = await getAssignments(searchParams.get("class_id"), apiToken);
      setassignments(res.data.assignments);
    } catch (e) {
      setassignments([]);
    }
  };
  const getquiz = async () => {
    try {
      let res = await getQuizzes(searchParams.get("class_id"), apiToken);
      setquizzes(res.data.quizzes);
    } catch (e) {
      setquizzes([]);
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
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="medium_font font_size_24 mb-3"> Student Performance </h3>
        <div
          style={{ width: "180px" }}
          className="d-none d-xxl-block d-xl-block d-lg-block d-md-block"
        >
          <Link href="/students/students-performance/add-new-student">
            <Button
              icon={
                <CiCirclePlus
                  className="me-2 text_color"
                  style={{ fontSize: "25px" }}
                />
              }
              text="Add Student"
              className=""
            />
          </Link>
        </div>
      </div>
      <div className="tab_main_div">
        <StudentsPerformance
          id={searchParams.get("id")}
          assignments={assignments}
          quizzes={quizzes}
          averagedata={averagedata}
          attendancedata={attendancedata}
          class_id={searchParams.get("class_id")}
        />
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
}
