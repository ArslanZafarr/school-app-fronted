"use client";
import "./zoom-class.css";
import { IoTimeOutline } from "react-icons/io5";
import { GrSchedule } from "react-icons/gr";
import Image from "next/image";
import Button from "@/app/components/Button";
import { CiCirclePlus } from "react-icons/ci";
import Link from "next/link";
import { fetchTeacherTimetableDetail } from "@/services/teacher/teacherApiService";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import moment from "moment";

const MyComponent = () => {
  const searchParams = useSearchParams();
  const [details, setdetails] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const { apiToken, teacherProfile } = useSelector((state) => state.storeAuth);

  useEffect(() => {
    console.log("22", teacherProfile);
    if (searchParams.get("id")) {
      getDetail();
    }
  }, []);
  const getDetail = async () => {
    setisLoading(true);
    try {
      let res = await fetchTeacherTimetableDetail(
        searchParams.get("id"),
        apiToken
      );
      setisLoading(false);
      console.log("28", res.data);
      setdetails(res.data.timetable);
    } catch (e) {
      setisLoading(false);
      setdetails({});
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
  const cardData = [
    {
      icon: <IoTimeOutline className="fs-3 mb-3" color="#00FF00" />,
      heading: "Duration",
      hours: `${details?.duration} minutes`,
    },
    {
      icon: <IoTimeOutline className="fs-3 mb-3" color="#0000FF" />,
      heading: "Participants",
      hours: details.googleCalendarEvent?.student_participants?.length,
    },
    {
      icon: <GrSchedule className="fs-3 mb-3" color="#FF0000" />,
      heading: "Schedule",
      hours: `Starts at ${
        details?.start_time &&
        moment(details?.start_time, "HH:mm").format("hh:mm A")
      }`,
    },
  ];

  const savelink = (link) => {
    localStorage.setItem("meet_link", link);
  };

  return (
    <div className="online_class_div tablet_padding">
      <div>
        <h3 className="medium_font font_size_24 mb-3"> Online Class </h3>
        <div className="d-flex flex-wrap justify-content-between align-items-center mt-4">
          <h1 className="medium_font font_size_32 mb-3">
            {details?.subject?.name} - {details?.class?.name}
          </h1>
          {/* <button type="submit" className="medium_font font_size_14 time_btn">
            Starts in 10 minutes
          </button> */}
        </div>
        <p className="font_size_14 text_muted">
          with {teacherProfile.profile?.full_name}
        </p>
      </div>
      <div className="card_div">
        <h3 className="medium_font font_size_18 mt-4">Overview</h3>
        <div className="d-flex flex-wrap justify-content-between align-items-center mt-4">
          {cardData.map((curData, index) => (
            <div
              key={index}
              className="card mb-md-3 p-4"
              style={{ width: "400px" }}
            >
              {curData.icon}
              <h3 className="medium_font font_size_16"> {curData.heading} </h3>
              <p className="font_size_14 text_muted m-0"> {curData.hours} </p>
            </div>
          ))}
        </div>
        <h3 className="medium_font font_size_18 mt-4 mb-3">Online Class</h3>
        <Link
          className="text-decoration-none text-dark"
          onClick={() =>
            savelink(details.googleCalendarEvent?.google_meet_link)
          }
          href={"online-class/live-class"}
        >
          <div className="d-flex align-items-center">
            <Image
              src={"/assets/images/teacher-panel/chain.png"}
              width={50}
              height={50}
              alt="image"
            />
            <p className="font_size_16 ms-2 mb-0">Connect to live class</p>
          </div>
        </Link>
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
