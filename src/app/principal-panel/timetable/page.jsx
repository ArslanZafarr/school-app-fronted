"use client";
import Button from "@/app/components/Button";
import "./time-table.css";
import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import {
  fetchAssignedTimeTable,
  fetchTimeTable,
} from "@/services/principal/dashboard";
import moment from "moment";

const MyComponent = () => {
  const searchParams = useSearchParams();
  const [timetables, settimetables] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { apiToken } = useSelector((state) => state.storeAuth);

  useEffect(() => {
    if (searchParams.get("id")) {
      getTimetable();
    }
  }, []);
  const getTimetable = async () => {
    try {
      let res = await fetchTimeTable(searchParams.get("id"), apiToken);
      if (res.data.success) {
        settimetables(res.data?.timetables);
      } else {
        settimetables([]);
      }
    } catch (e) {
      settimetables([]);
    }
  };
  const handleChange = (date) => {
    setSelectedDate(date);
  };

  const rightBarData = [
    {
      image: "/assets/images/principal-panel/teachers/image.png",
      subject: "Mathematics",
      date_and_time: "16 Octuber 2019 at 5.00 PM",
      lesson: "5 Lesson, 2 quiz",
      hours: "1 hour period",
    },
    {
      image: "/assets/images/principal-panel/teachers/image.png",
      subject: "Mathematics",
      date_and_time: "16 Octuber 2019 at 5.00 PM",
      lesson: "5 Lesson, 2 quiz",
      hours: "1 hour period",
    },
    {
      image: "/assets/images/principal-panel/teachers/image.png",
      subject: "Mathematics",
      date_and_time: "16 Octuber 2019 at 5.00 PM",
      lesson: "5 Lesson, 2 quiz",
      hours: "1 hour period",
    },
    {
      image: "/assets/images/principal-panel/teachers/image.png",
      subject: "Mathematics",
      date_and_time: "16 Octuber 2019 at 5.00 PM",
      lesson: "5 Lesson, 2 quiz",
      hours: "1 hour period",
    },
  ];
  return (
    <div className="padding tablet_padding">
      <div className="timetable_heading d-flex justify-content-between align-items-center">
        <h2 className="medium_font font_size_24"> Manage Schools </h2>
        <Link
          href={`/principal-panel/timetable/assign-teacher?id=${searchParams.get(
            "id"
          )}`}
        >
          <Button
            icon={
              <CiCirclePlus
                className="me-2 text_color"
                style={{ fontSize: "25px" }}
              />
            }
            text="Assign Teacher "
            className=""
          />
        </Link>
      </div>
      <div className="timetable_content_div d-flex flex-wrap justify-content-between align-items-center">
        <div className="timetable_calendar_div">
          <div className="calendar_div border rounded p-3 m-3">
            <div className="calendar_heading">
              <h3 className="medium_font font_size_20">Manage Timetables</h3>
            </div>
            <div className="calendar_body_div d-flex justify-content-center align-items-center">
              <Calendar onChange={handleChange} value={selectedDate} />
            </div>
          </div>
        </div>
        <div className="timetable_right_bar_div border rounded p-3 ms-3 mt-4 d-flex flex-column justify-content-center align-items-center">
          <div className="btn_div mb-5" style={{ width: "170px" }}>
            <Link
              href={`/principal-panel/timetable/create-school-timetable?id=${searchParams.get(
                "id"
              )}`}
            >
              <Button
                icon={
                  <CiCirclePlus
                    className="me-2 text_color"
                    style={{ fontSize: "25px" }}
                  />
                }
                text="Add New"
                className=""
              />
            </Link>
          </div>
          {timetables.map((curData, index) => (
            <div
              key={index}
              className="card_div d-flex mb-3 border-bottom pb-3"
            >
              <div>
                {curData.subject?.image && (
                  <Image
                    className="rounded-circle"
                    src={"/assets/images/dashboard/profile-image.png"}
                    alt="image"
                    width={50}
                    height={50}
                  />
                )}
              </div>
              <div className="ms-2 mt-2">
                <p className="medium_font font_size_12 mb-1">
                  {curData.subject?.name}
                </p>
                <p className="text_muted font_size_10 mb-1">
                  {moment().format("ll")} at {curData.start_time}
                </p>
                {/* <p className="text_muted font_size_10 mb-1">{curData.lesson}</p> */}
                <p className="text_muted font_size_10 mb-1">
                  {curData.duration} minutes
                </p>
                {/* <div className="d-flex">
                  <Image
                    className="rounded-circle me-2"
                    src={curData.image}
                    alt="image"
                    width={25}
                    height={25}
                  />
                  <Image
                    className="rounded-circle me-2"
                    src={curData.image}
                    alt="image"
                    width={25}
                    height={25}
                  />
                  <Image
                    className="rounded-circle me-2"
                    src={curData.image}
                    alt="image"
                    width={25}
                    height={25}
                  />
                  <Image
                    className="rounded-circle me-2"
                    src={curData.image}
                    alt="image"
                    width={25}
                    height={25}
                  />
                </div> */}
              </div>
            </div>
          ))}
        </div>
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
