"use client";
import PaymentTable from "@/app/components/Tables/PaymentTable";
import MobileScreenPaymentTable from "@/app/components/Tables/MobileScreensTables/PaymentTable";
import "./payment.css";
import { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  fetchPayments,
  updatepaymentstatus,
} from "@/services/admin/powerclass";
import { toast } from "react-toastify";

const Page = () => {
  const [payments, setpayments] = useState([]);
  const [totalpages, settotalpages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setisLoading] = useState(false);
  const { apiToken } = useSelector((state) => state.storeAuth);
  const [datevalue, setdatevalue] = useState(moment().format("YYYY-MM-DD"));
  useEffect(() => {
    getpayments(datevalue, currentPage);
  }, []);
  const getpayments = async (date, page) => {
    setCurrentPage(page);
    setisLoading(true);
    let dateval = moment(date).format("YYYY-MM-DD");
    try {
      let res = await fetchPayments(dateval, page, apiToken);
      let arr = [];
      res.data.school_payments.forEach((item) => {
        item["payment_histories"].forEach((ele) => {
          arr.push({
            ...ele,
            principal_name: item.principal_name,
            school_name: item.school_name,
            principal_email: item.principal_email,
          });
        });
      });
      setpayments(arr);
      setisLoading(false);
      settotalpages(res.data.meta?.total_pages ?? 1);
      console.log("18", res.data);
    } catch (e) {
      setisLoading(false);
      setpayments([]);
      console.log("25", e);
    }
  };
  const handledate = (e) => {
    setdatevalue(e.target.value);
    getpayments(e.target.value, 1);
  };
  const handlepagechange = (val) => {
    if (currentPage === val) return;
    setCurrentPage(val);
    getpayments(datevalue, val);
  };
  const updateStatus = async (status, id) => {
    setisLoading(true);
    try {
      let res = await updatepaymentstatus(status, id, apiToken);

      setisLoading(true);
      toast.success(res.data.message);
      getpayments(datevalue, 1);
    } catch (e) {
      setisLoading(true);
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
    <>
      <div className="payment_div">
        <div className="school_management_heading d-flex justify-content-between align-items-center">
          <h2 className="medium_font font_size_24"> Payments </h2>
          <div>
            <input
              onChange={handledate}
              value={datevalue}
              type="date"
              className="form-control"
            />
          </div>
        </div>
        <div className="payment_table_div">
          <div className="mobile_screen_div d-block d-xxl-none d-xl-none d-lg-none d-md-none">
            <MobileScreenPaymentTable
              payments={payments}
              currentPage={currentPage}
              totalpages={totalpages}
              handlepagechange={handlepagechange}
              updateStatus={updateStatus}
            />
          </div>
          <div className="d-none d-xxl-block d-xl-block d-lg-block d-md-block">
            <PaymentTable
              payments={payments}
              currentPage={currentPage}
              totalpages={totalpages}
              handlepagechange={handlepagechange}
              updateStatus={updateStatus}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
