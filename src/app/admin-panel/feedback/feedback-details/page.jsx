"use client";
import { Suspense, useEffect, useState } from "react";
import "./feedback.css";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { fetchFeedbackDetails } from "@/services/admin/faqs";

const MyComponent = () => {
  const searchParams = useSearchParams();
  const [feedback, setfeedback] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const { apiToken } = useSelector((state) => state.storeAuth);
  useEffect(() => {
    getFeedback(searchParams.get("id"));
  }, []);
  const getFeedback = async (currentPage) => {
    setisLoading(true);
    try {
      let res = await fetchFeedbackDetails(searchParams.get("id"), apiToken);
      setfeedback(res.data.feedback);
      setisLoading(false);
      console.log("18", res.data);
    } catch (e) {
      setisLoading(false);
      setfeedback({});
      console.log("25", e);
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
  return (
    <div>
      <div className="feedback_div">
        <div className="feedback_heading d-flex justify-content-between align-items-center">
          <h2 className="medium_font font_size_24">Feedback details</h2>
        </div>

        <div className="feedback-content-wrapper">
          <div className="feedback-content">
            <div className="feedback-title">
              <h5>Title : </h5>
              <p>{feedback?.title}</p>
            </div>

            <div className="feedback-message">
              <h5>Message : </h5>
              <p>{feedback?.message}</p>
            </div>

            <div className="feedback-media-content">
              <h5>Uploaded media : </h5>

              <div className="feedback-media-gallery">
                <Image
                  src="/assets/images/dashboard/content-material/card.png"
                  width={240}
                  height={240}
                  alt="feedback"
                />
              </div>
            </div>
          </div>
          <div className="feedback-sender-content">
            <h4>Feedback sent by : </h4>

            <div
              className="feedback-sender-content-inner
                            "
            >
              <div className="feedback-message">
                <h5>Role : </h5>
                <p>{feedback?.user?.role}</p>
              </div>

              <div className="feedback-message">
                <h5>Email : </h5>
                <p>{feedback?.user?.email}</p>
              </div>

              {/* <div className="feedback-message">
                <h5>Class : </h5>
                <p>{feedback?.user.role}</p>
              </div> */}
            </div>
          </div>
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
