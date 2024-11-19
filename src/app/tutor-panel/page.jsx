"use client";
import Button from "@/app/components/Button";
import "./power-classes.css";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import moment from "moment";
import { fetchTutorPowerClass } from "@/services/tutor-panel/tutorService";

const Page = () => {
  const [classes, setclasses] = useState([]);
  const [totalpages, settotalpages] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { apiToken, userData } = useSelector((state) => state.storeAuth);
  useEffect(() => {
    if (userData?.profile?.role_profile?.id) {
      getClasses(currentPage);
    }
  }, []);
  const getClasses = async (page) => {
    setCurrentPage(page);
    setisLoading(true);
    try {
      let res = await fetchTutorPowerClass(
        userData?.profile?.role_profile?.id,
        apiToken
      );
      console.log("34", res.data);
      if (res.data.success) {
        setclasses(res.data.data.items);
        settotalpages(res.data.data.meta?.total_pages ?? 1);
      } else {
        setclasses([]);
      }
      setisLoading(false);
    } catch (e) {
      setisLoading(false);
      setclasses([]);
    }
  };
  const handlepagechange = (val) => {
    if (currentPage === val) return;
    setCurrentPage(val);
    getClasses(val);
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
    <>
      <h3 className="medium_font font_size_24 mb-3">Power Classes</h3>
      <div className="card_border rounded p-xxl-3 p-xl-3 p-lg-3 p-md-3">
        {classes.map((curData, index) => (
          <div
            key={index}
            className="active_classes_card border p-3 p-xxl-0 p-xl-0 p-lg-0 p-md-0 rounded-4 my-3 d-xxl-flex d-xl-flex d-lg-flex justify-content-between align-items-end"
          >
            <div className="d-xxl-flex d-xl-flex d-lg-flex">
              <div className="acitve_class_image_div">
                <Image
                  className="rounded-3"
                  src={
                    "/assets/images/dashboard/power-classes/card-image-3.png"
                  }
                  width={436}
                  height={169}
                  alt="image"
                />
              </div>
              <div className="ps-xxl-3 ps-xl-3 ps-lg-3 ps-md-3 p-3">
                <p className="font_size-14 text_muted mb-0">
                  Teacher {curData.tutor.name}{" "}
                </p>
                <h3 className="font_size-18 medium_font">
                  {curData.subject.name}
                </h3>
                <p className="font_size-16 text_muted mb-0">
                  {curData.start_date &&
                    moment(curData.start_date).format("dddd, MMMM DD")}
                  ,{curData.start_time} - {curData.end_time}
                </p>
              </div>
            </div>
            <div className="button_div btn_div_2 p-3">
              <Link
                href={"/tutor-panel/power-class-details?id=" + curData["id"]}
              >
                <Button text="View details" className={"active_class_btn"} />
              </Link>
            </div>
          </div>
        ))}
        <div className="application_pagination_div mt-5">
          <ResponsivePagination
            current={currentPage}
            total={totalpages}
            onPageChange={handlepagechange}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
