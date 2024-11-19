"use client";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import '@/app/globals.css'
import { ReduxProvider } from "@/redux/provider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginLayout({ children }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <html lang="en">
      <ReduxProvider>
      <body>{children}</body>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </ReduxProvider>
    </html>

  )
  }
