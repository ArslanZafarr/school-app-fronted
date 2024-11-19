"use client";
import Button from "@/app/components/Button";
import "./class-materials.css";
import Link from "next/link";
import ClassCard from "@/app/components/Cards/ClassCard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTeacherClasses } from "@/services/teacher/teacherApiService";

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
  return (
    <div className="class_content_main_div tablet_padding">
      <h3 className="medium_font font_size_24">Class Content</h3>
      <div className="class_materials_card_div mt-3 d-flex flex-wrap align-items-center">
        {classes?.map((curData, index) => (
          <ClassCard link="classes-content" key={index} {...curData} />
        ))}
      </div>
      {/* <div className="btn_div mt-5">
        <Link href={"/content-upload"}>
          <Button text="Upload content" className={"btn_bg_color"} />
        </Link>
      </div> */}
    </div>
  );
};

export default Page;
