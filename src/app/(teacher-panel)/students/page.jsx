"use client";
import Button from "@/app/components/Button";
import ClassCard from "@/app/components/Cards/ClassCard";
import { fetchTeacherClasses } from "@/services/teacher/teacherApiService";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useSelector } from "react-redux";

const Page = () => {
  const { apiToken, teacherProfile } = useSelector((state) => state.storeAuth);
  const [classes, setclasses] = useState([]);
  const [isloading, setisloading] = useState(false);
  useEffect(() => {
    if (teacherProfile?.["teacher_profile"]) {
      getClasses();
    }
  }, [teacherProfile]);
  const getClasses = async () => {
    setisloading(true);
    try {
      let res = await fetchTeacherClasses(
        teacherProfile?.["teacher_profile"]["id"],
        apiToken
      );
      console.log("22", res.data);
      setisloading(false);
      setclasses(res.data.classes || []);
    } catch (e) {
      setisloading(false);
      setclasses([]);
      console.log("24", e);
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
    <div className="class_content_main_div tablet_padding">
      <div className="heading d-flex justify-content-between align-items-center">
        <h2 className="medium_font font_size_24"> Student Performance </h2>
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
      <div className="class_materials_card_div mt-3 d-flex flex-wrap align-items-center">
        {classes.map((curData, index) => (
          <ClassCard
            link={"students/students"}
            // link={"students/students-performance"}
            key={index}
            {...curData}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
