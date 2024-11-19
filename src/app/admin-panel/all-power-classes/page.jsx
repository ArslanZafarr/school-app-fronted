"use client";
import Button from "@/app/components/Button";
import AllPowerClassesTable from "@/app/components/Tables/AllPowerClassesTable";
import MobileScreenAllPowerClassesTable from "@/app/components/Tables/MobileScreensTables/AllPowerClassesTable";
import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";
import React, { useEffect, useState } from "react";
import {
  deletePowerClass,
  fetchAllPowerClass,
} from "@/services/admin/powerclass";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
const Page = () => {
  const [isLoading, setisLoading] = useState(false);
  const [classes, setclasses] = useState([]);
  const [totalpages, settotalpages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { apiToken } = useSelector((state) => state.storeAuth);
  useEffect(() => {
    getClasses(currentPage);
  }, []);
  const getClasses = async (currentPage) => {
    setisLoading(true);
    try {
      let res = await fetchAllPowerClass(currentPage, apiToken);
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
  const handledeletePowerClass = async (id) => {
    setisLoading(true);
    try {
      let res = await deletePowerClass(id, apiToken);
      if (res.data.success) {
        toast.success(res.data.message);
        getClasses(currentPage);
      } else {
        toast.error(res.data.message);
        setisLoading(false);
      }
    } catch (e) {
      setisLoading(false);
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
    <div>
      <div className="heading d-flex justify-content-between align-items-center">
        <h2 className="medium_font font_size_24"> All Power Classes </h2>
        <Link href="/admin-panel/add-new-power-class">
          <Button
            icon={
              <CiCirclePlus
                className="me-2 text_color"
                style={{ fontSize: "25px" }}
              />
            }
            text="Add New Class"
            className=""
          />
        </Link>
      </div>
      <div className="table_div">
        <div className="d-block d-xxl-none d-xl-none d-lg-none d-md-none">
          <MobileScreenAllPowerClassesTable
            classes={classes}
            handledeletePowerClass={(id) => handledeletePowerClass(id)}
          />
        </div>
        <div className="d-none d-xxl-block d-xl-block d-lg-block d-md-block">
          <AllPowerClassesTable
            classes={classes}
            handledeletePowerClass={(id) => handledeletePowerClass(id)}
          />
        </div>
        <div className="application_pagination_div mt-5">
          <ResponsivePagination
            current={currentPage}
            total={totalpages}
            onPageChange={handlepagechange}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
