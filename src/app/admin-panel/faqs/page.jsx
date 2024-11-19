"use client";
import Button from "@/app/components/Button";
import FaqsAlertCard from "@/app/components/Cards/FaqsAlertCard";
import FaqsCard from "@/app/components/Cards/FaqsCard";
import PowerClassesPagePagination from "@/app/components/Pagination/PowerClassesPagePagination";
import { deleteFaq, fetchAllFaqs } from "@/services/admin/faqs";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useSelector } from "react-redux";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { toast } from "react-toastify";

const Page = () => {
  const [faqs, setfaqs] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalpages, settotalpages] = useState(2);
  const { apiToken } = useSelector((state) => state.storeAuth);
  useEffect(() => {
    console.log("22");
    getFaqs(currentPage);
  }, []);
  const getFaqs = async (currentpage) => {
    setCurrentPage(currentpage);
    if (apiToken) {
      setisLoading(true);
      try {
        let res = await fetchAllFaqs(apiToken, currentpage);
        if (res.data.success) {
          setfaqs(res.data.faqs);
          settotalpages(res.data.meta?.total_pages ?? 1);
        } else {
          setfaqs([]);
        }
        setisLoading(false);
      } catch (e) {
        setisLoading(false);
        setfaqs([]);
      }
    }
  };
  const handledeletefaq = async (id) => {
    setisLoading(true);
    try {
      let response = await deleteFaq(apiToken, id);
      if (response.data.success) {
        getFaqs(1);
      } else {
        toast.error(response.data.message);
        setisLoading(false);
      }
    } catch (error) {
      setisLoading(false);
      const message = error.data?.message || "Invalid data";
      toast.error(message);
      console.log(error);
    }
  };
  const handlepagechange = (val) => {
    if (currentPage === val) return;
    setCurrentPage(val);
    fetchAllFaqs(val);
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
      <div className="faqs_div">
        <div className="faqs_heading d-flex justify-content-between align-items-center">
          <h2 className="medium_font font_size_24"> FAQS </h2>
          <Link href="/admin-panel/add-new-faqs">
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
        <div className="faqs_card_div card_border rounded p-xxl-4 p-xl-4 p-lg-4 p-md-4 mt-4">
          <div className="faqs_alert_card_div">
            <FaqsAlertCard
              faqs={faqs}
              handledeletefaq={(val) => handledeletefaq(val)}
            />
          </div>
          {/* <FaqsCard faqs={faqs} /> */}

          <div className="faqs_pagination_div mt-5">
            <ResponsivePagination
              current={currentPage}
              total={totalpages}
              onPageChange={handlepagechange}
            />
            {/* <PowerClassesPagePagination /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
