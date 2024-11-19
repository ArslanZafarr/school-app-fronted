"use client";
import FeedbackCard from "@/app/components/Cards/FeedbackCard";
import "./feedback.css";
import Link from "next/link";
import Button from "@/app/components/Button";
import { CiCirclePlus } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchAllFeedback } from "@/services/admin/faqs";

const Page = () => {
  const [isLoading, setisLoading] = useState(false);
  const [feedback, setfeedback] = useState([]);
  const [totalitems, settotalitems] = useState(0);
  const [totalpages, settotalpages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { apiToken } = useSelector((state) => state.storeAuth);
  useEffect(() => {
    getFeedback(currentPage);
  }, []);
  const getFeedback = async (currentPage) => {
    setisLoading(true);
    try {
      let res = await fetchAllFeedback(currentPage, apiToken);
      setfeedback(res.data.feedbacks);
      setisLoading(false);
      settotalitems(res.data.meta.total_items);
      settotalpages(res.data.meta?.total_pages ?? 1);
      console.log("18", res.data);
    } catch (e) {
      setisLoading(false);
      setfeedback([]);
      console.log("25", e);
    }
  };
  const handlepagechange = (val) => {
    if (currentPage === val) return;
    setCurrentPage(val);
    getFeedback(val);
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
      <div className="feedback_div">
        <div className="feedback_heading d-flex justify-content-between align-items-center">
          <h2 className="medium_font font_size_24"> Feedback </h2>
          <Link href="/admin-panel/faqs">
            <Button
              icon={
                <CiCirclePlus
                  className="me-2 text_color"
                  style={{ fontSize: "25px" }}
                />
              }
              text="FAQS"
              className=""
            />
          </Link>
        </div>
        <div className="feedback_card_main_div">
          <FeedbackCard
            feedback={feedback}
            totalitems={totalitems}
            currentPage={currentPage}
            totalpages={totalpages}
            handlepagechange={handlepagechange}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
