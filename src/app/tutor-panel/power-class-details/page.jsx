"use client";
import axios from "axios";
import "./power-class-details.css";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { base_url } from "@/bootapi";
import { useSelector } from "react-redux";
import moment from "moment";

const MyComponent = () => {
  const searchParams = useSearchParams();
  const [detail, setdetails] = useState({});
  const [isloading, setloading] = useState(false);
  const { apiToken } = useSelector((state) => state.storeAuth);
  useEffect(() => {
    if (searchParams.get("id")) {
      setloading(true);
      axios
        .get(
          `${base_url}/tutor/power-classes/classes/${searchParams.get("id")}`,
          {
            headers: {
              Authorization: `Bearer ${apiToken}`,
            },
          }
        )
        .then((res) => {
          setloading(false);
          console.log("46", res.data);
          if (res.data.success) {
            setdetails(res.data.data);
          } else {
            setdetails({});
          }
        })
        .catch((err) => {
          setloading(false);
          setdetails({});
        });
    }
  }, []);
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
    <div className="online_class_div tablet_padding">
      <div>
        <h3 className="medium_font font_size_24 mb-3">
          {" "}
          {detail["class_name"]}{" "}
        </h3>
        <div className="d-flex flex-wrap justify-content-between align-items-center mt-4">
          <h1 className="medium_font font_size_32 mb-3">
            {detail.subject?.name}
          </h1>
          {/* <button type="submit" className="medium_font font_size_14 time_btn">
            Starts in 10 minutes
          </button> */}
        </div>
        <p className="font_size_14 text_muted">
          with {detail?.tutor?.profile?.full_name}
        </p>
      </div>
      <div className="card_div">
        <h3 className="medium_font font_size_18 mt-4">Overview</h3>
        <div className="d-flex flex-wrap justify-content-between align-items-center mt-4">
          <div className="power-class-details-card">
            <div className="power-class-details-card-content">
              <Image
                src={"/assets/images/tutor-panel/1.png"}
                width={24}
                height={24}
                alt="image"
              />
              <h5>Duration</h5>
              <h6>{detail["duration"]} minutes</h6>
            </div>
          </div>

          <div className="power-class-details-card">
            <div className="power-class-details-card-content">
              <Image
                src={"/assets/images/tutor-panel/2.png"}
                width={24}
                height={24}
                alt="image"
              />
              <h5>Students</h5>
              <h6>{detail.students?.length}</h6>
            </div>

            {/* <Link href="/tutor-panel/power-class-students">
              <button>View details</button>
            </Link> */}
          </div>

          <div className="power-class-details-card">
            <div className="power-class-details-card-content">
              <Image
                src={"/assets/images/tutor-panel/3.png"}
                width={24}
                height={24}
                alt="image"
              />
              <h5>Schedule</h5>
              <h6>
                Everyday at{" "}
                {detail.start_time &&
                  moment(detail.start_time, "HH:mm:ss").format("hh:mm A")}
              </h6>
            </div>
          </div>
        </div>
        <h3 className="medium_font font_size_18 mt-4 mb-3">Live Class</h3>
        <Link
          className="text-decoration-none text-dark"
          href={detail.google_calendar_event?.google_meet_link ?? ""}
          target="_blank"
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
