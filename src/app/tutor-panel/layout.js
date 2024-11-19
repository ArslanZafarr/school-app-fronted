"use client";
import Sidebar from "../Navigation/TutorPanel/TutorPanelSidebar";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import "./layout.css";
import "../globals.css";
import ResponsiveTutorPanelSidebar from "../Navigation/TutorPanel/ResponsiveTutorPanelSidebar";
import { ReduxProvider } from "@/redux/provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Searchbar from "../components/common/tutor-panel/Searchbar";

export default function AdminPanelLayout({ children }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <div className="d-flex justify-content-between">
            <div className="vertical_bar_container">
              <Sidebar />
            </div>
            <div className="content_container">
              <div className="searchbar_div d-flex d-md-flex d-sm-flex justify-content-lg-around justify-content-md-around align-items-lg-center align-items-md-center p-4 ps-5">
                <ResponsiveTutorPanelSidebar />
                <Searchbar />
              </div>
              <div className="p-3 p-xxl-5 p-xl-5 p-lg-5 p-md-5 pt-3">
                {children}
              </div>
            </div>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
