"use client";
import { Inter } from "next/font/google";
import "../globals.css";
import './layout.css';
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import TeacherPanelSidebar from '../Navigation/TeacherPanel/TeacherPanelSidebar';
import {  teacherPanelSidebarLinks } from "../Navigation/TeacherPanel/Links";
import ResponsiveTeacherPanelSidebar from "../Navigation/TeacherPanel/ResponsiveTeacherPanelSidebar";
import { ReduxProvider } from "@/redux/provider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from "../components/common/teacher-panel/Searchbar";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <html lang="en">
      <body className={inter.className}>
      <ReduxProvider>
      <div className="d-flex">
          <div className="teacher_panel_vertical_bar_container vertical_bar_container">
            <TeacherPanelSidebar sidebarLink={teacherPanelSidebarLinks}/>
          </div>
          <div className="content_container">
            <div className="teacher_panel_search_bar_div d-flex justify-content-around align-items-lg-center align-items-md-center border-bottom p-4 ps-5">
              <ResponsiveTeacherPanelSidebar />
              <Searchbar />
            </div>
            <div className="p-xxl-5 p-xl-5 p-lg-5 pt-3">{children}</div>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </ReduxProvider>
        </body>
    </html>
  );
}
