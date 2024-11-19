"use client";
import React, { useEffect, useState } from "react";
import DashboardCalender from "../components/Calender/DashboardCalender";
import EducationTasksCard from "../components/Cards/EducationTasksCard";
import UploadEducationContentCard from "../components/Cards/UploadEducationContentCard";
import ZoomLinksCard from "../components/Cards/ZoomLinksCard";
import ManageSubjectCard from "../components/Cards/ManageSubjectCard";
import ManagePowerClassesCard from "../components/Cards/ManagePowerClassesCard";
import { useSelector } from "react-redux";
import {
  fetchRecentClass,
  fetchRecentContent,
} from "@/services/admin/powerclass";

const Page = () => {
  const [content, setcontent] = useState([]);
  const [classes, setclasses] = useState([]);
  const { apiToken } = useSelector((state) => state.storeAuth);
  useEffect(() => {
    if (apiToken) {
      getRecentContent();
      getRecentClass();
    }
  }, [apiToken]);
  const getRecentContent = async () => {
    try {
      let res = await fetchRecentContent(apiToken);
      setcontent(res.data.content);
    } catch (e) {
      setcontent([]);
    }
  };
  const getRecentClass = async () => {
    try {
      let res = await fetchRecentClass(apiToken);
      setclasses(res.data.data);
    } catch (e) {
      setclasses([]);
    }
  };
  return (
    <div>
      <div className="calender_card_div">
        <div className="card_components_center_ d-flex flex-wrap justify-content-between">
          {/* <DashboardCalender />
          <EducationTasksCard /> */}
        </div>
        <div className="card_components_center d-flex flex-wrap">
          <UploadEducationContentCard content={content} />
          {/* <div className="progress_card_width">
            <ZoomLinksCard />
            <ManageSubjectCard />
          </div> */}
          <ManagePowerClassesCard classes={classes} />
        </div>
      </div>
    </div>
  );
};

export default Page;
