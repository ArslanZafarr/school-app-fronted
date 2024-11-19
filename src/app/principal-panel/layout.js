"use client";
import PrincipalPanelSidebar from "../Navigation/PrincipalPanel/PrincipalPanelSidebar.jsx";
import ResposivePrincipalPanelSidebar from "@/app/Navigation/PrincipalPanel/ResposivePrincipalPanelSidebar";
import "./layout.css";
import "../globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import { ReduxProvider } from "@/redux/provider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from "../components/common/principal-panel/Searchbar.jsx";

export default function PrincipalPanelLayout({ children }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <html lang="en">
      <body>
      <ReduxProvider>
        <div className="d-flex">
          <div className="vertical_bar_container">
            <PrincipalPanelSidebar />
          </div>
          <div className="content_container">
            <div className="searchbar_div d-flex justify-content-lg-around justify-content-md-around align-items-lg-center align-items-md-center p-4 ps-5">
              <ResposivePrincipalPanelSidebar />
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
