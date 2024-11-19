"use client";
import React, { useEffect, useState } from "react";
import Widgets from "../components/Widgets/Widgets";
import ZoomClasses from "../components/Cards/ZoomClasses";
import { useSelector } from "react-redux";
import {
  fetchClasses,
  fetchOnlineClasses,
  fetchStatistics,
} from "@/services/principal/dashboard";

const Page = () => {
  const [stats, setstats] = useState({});
  const [classes, setclassess] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const { apiToken, userData } = useSelector((state) => state.storeAuth);

  useEffect(() => {
    getStatistics();
    getClasses();
  }, []);

  const getStatistics = async () => {
    setisLoading(true);
    try {
      let res = await fetchStatistics(
        userData?.["profile"]?.["role_profile"]?.["id"],
        apiToken
      );
      console.log("Statistics API Response:", res.data.data); // Logging API response

      if (res.data.success) {
        setstats(res.data.data);
      } else {
        setstats({});
      }
      setisLoading(false);
    } catch (e) {
      setisLoading(false);
      setstats({});
      console.log("Error fetching statistics:", e); // Logging error
    }
  };

  const getClasses = async () => {
    try {
      let res = await fetchOnlineClasses(
        userData?.["profile"]?.["role_profile"]?.["id"],
        apiToken
      );
      console.log("Online Classes API Response:", res); // Logging API response

      if (res.data.success) {
        setclassess(res.data.classes);
      } else {
        setclassess([]);
      }
    } catch (e) {
      setclassess([]);
      console.log("Error fetching classes:", e); // Logging error
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
    <div className="padding tablet_padding">
      <div className="widgets_div">
        <Widgets stats={stats} />
      </div>
      <div className="zoom_classes_main_div mt-3">
        <h3 className="medium_font font_size_20 ms-2 my-3">Online Classes</h3>
        <ZoomClasses classes={classes} />
      </div>
    </div>
  );
};

export default Page;
