"use client";
import AttendenceClassCardTabs from "@/app/components/Tabs/Attendence/AttendenceClassCardTabs";
import { fetchTeacherClasses } from "@/services/teacher/teacherApiService";
import { useEffect, useState } from "react";
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
    <div className="padding tablet_padding">
      <h2 className="medium_font font_size_24"> Attendance Tracking </h2>
      <AttendenceClassCardTabs classes={classes} />
    </div>
  );
};

export default Page;
