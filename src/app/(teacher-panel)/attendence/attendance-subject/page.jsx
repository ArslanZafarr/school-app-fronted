"use client";
import AttendenceTabs from "@/app/components/Tabs/Attendence/AttendenceTabs";
import { fetchTeacherSubjectClasses } from "@/services/teacher/teacherApiService";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { LiaEditSolid } from "react-icons/lia";
const MyComponent = () => {
  const searchParams = useSearchParams();
  const [subjects, setsubjects] = useState([]);
  const { apiToken, teacherProfile } = useSelector((state) => state.storeAuth);
  const [isloading, setisloading] = useState(false);
  useEffect(() => {
    if (searchParams.get("id")) {
      getSubjects();
    }
  }, []);
  const getSubjects = async () => {
    setisloading(true);
    try {
      let res = await fetchTeacherSubjectClasses(
        teacherProfile?.["teacher_profile"]["id"],
        searchParams.get("id"),
        apiToken
      );
      if (res.data.subjects) {
        setsubjects(res.data.subjects);
      } else {
        setsubjects([]);
      }
      setisloading(false);
    } catch (e) {
      setisloading(false);
      setsubjects([]);
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
  return (
    <div className="padding tablet_padding">
      <h3 className="medium_font font_size_24 "> Subjects</h3>
      <div className="class_materials_card_div mt-3 d-flex flex-wrap align-items-center">
        {subjects.map((curData, index) => (
          <div
            key={index}
            className="class_materials_card border p-3 my-3 rounded d-flex justify-content-between align-items-start me-3"
          >
            <div className="">
              <p className="medium_font font_size_22 me-2"> {curData.name}</p>
              {/* <p className="text_muted font_size_22">
            {" "}
            {curData.student_count} Students
          </p> */}
            </div>
            <div className="">
              <Link
                href={`attendence-table?id=${searchParams.get(
                  "id"
                )}&subjectid=${curData["id"]}`}
              >
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

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
}
