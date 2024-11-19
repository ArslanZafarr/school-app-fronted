"use client";
import Button from "@/app/components/Button";
import "./active-power-classes.css";
import PowerClassesPagePagination from "@/app/components/Pagination/PowerClassesPagePagination";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getPowerClassAssigned } from "@/services/admin/powerclass";
import moment from "moment";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { toast } from "react-toastify";
const Page = () => {
  const [classes, setclasses] = useState([]);
  const [totalpages, settotalpages] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { apiToken } = useSelector((state) => state.storeAuth);
  useEffect(() => {
    getClasses(currentPage);
  }, []);
  const getClasses = async (currentpage) => {
    setCurrentPage(currentpage);
    setisLoading(true);
    try {
      let res = await getPowerClassAssigned(currentpage, apiToken, "assigned");
      setclasses(res.data.data);
      setisLoading(false);
      settotalpages(res.data.totalPages ?? 1);
      if (res.data.data.length === 0) {
        toast.error("No Data Available");
      }
    } catch (e) {
      toast.error("No Data Available");
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
  const activeCardData = [
    {
      image: "/assets/images/dashboard/power-classes/card-image-3.png",
      text: "Teacher: Asma Khan",
      heading: "Biology Section 2",
      text_2: "Monday, January 31, 5:00 PM - 6:30 PM",
    },
    {
      image: "/assets/images/dashboard/power-classes/card-image-3.png",
      text: "Teacher: Asma Khan",
      heading: "Biology Section 2",
      text_2: "Monday, January 31, 5:00 PM - 6:30 PM",
    },
    {
      image: "/assets/images/dashboard/power-classes/card-image-3.png",
      text: "Teacher: Asma Khan",
      heading: "Biology Section 2",
      text_2: "Monday, January 31, 5:00 PM - 6:30 PM",
    },
  ];

  return (
    <>
      <h3 className="medium_font font_size_24 mb-3">Active Power Classes</h3>
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
                {/* <p className="font_size-14 text_muted mb-0"> {curData.text} </p> */}
                <h3 className="font_size-18 medium_font">
                  {" "}
                  {curData.subject?.name}{" "}
                </h3>
                <p className="font_size-16 text_muted mb-0">
                  {" "}
                  {curData.start_date &&
                    moment(curData.start_date).format("ll")}
                  , {curData.start_time} - {curData.end_time}
                </p>
              </div>
            </div>
            <div className="button_div btn_div_2 p-3">
              <Link href={"/admin-panel/edit-power-class?id=" + curData["id"]}>
                <Button text="Manage" className={"active_class_btn"} />
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
