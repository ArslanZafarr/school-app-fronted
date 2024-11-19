"use client";
import PaymentsAndBillingTable from "@/app/components/Tables/PaymentsAndBillingTable";
import MobileScreenPaymentsAndBillingTable from "@/app/components/Tables/MobileScreensTables/PaymentsAndBillingTable";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchPayment,
  updatepaymentstatus,
} from "@/services/principal/dashboard";
import { toast } from "react-toastify";

const Page = () => {
  const [isLoading, setisLoading] = useState(false);
  const [payment, setpayment] = useState([]);
  const [totalpages, settotalpages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { apiToken, userData } = useSelector((state) => state.storeAuth);
  useEffect(() => {
    getPayment(currentPage);
  }, []);
  const getPayment = async (currentpage) => {
    setCurrentPage(currentpage);
    setisLoading(true);
    try {
      // userData?.["profile"]?.["role_profile"]?.["id"],
      let res = await fetchPayment(
        userData?.["profile"]?.["role_profile"]?.["id"],
        currentpage,
        apiToken
      );
      setisLoading(false);
      if (res.data.success) {
        setpayment(res.data.payment_histories);
        settotalpages(res.data.meta.totalPages ?? 1);
      } else {
        setpayment([]);
      }
    } catch (e) {
      setpayment([]);
      setisLoading(false);
    }
  };
  const handlepagechange = (val) => {
    if (currentPage === val) return;
    setCurrentPage(val);
    getPayment(val);
  };
  const updateStatus = async (status, id) => {
    setisLoading(true);
    try {
      let formdata = new FormData();
      formdata.append("status", status);
      let res = await updatepaymentstatus(id, formdata, apiToken);
      if (res.data.success) {
        toast.success(res.data.message);
        getPayment(1);
      } else {
        toast.error(res.data.message);
        setisLoading(false);
      }
    } catch (e) {
      toast.error(e.response?.data?.message ?? "Something Went Wrong");
      setisLoading(false);
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
      <h3 className="medium_font font_size_24">Payments & Billing</h3>
      <div className="payment_table_div">
        <div className="mobile_screen_div d-block d-xxl-none d-xl-none d-lg-none d-md-none">
          <MobileScreenPaymentsAndBillingTable
            payment={payment}
            currentPage={currentPage}
            totalpages={totalpages}
            handlepagechange={handlepagechange}
            updateStatus={updateStatus}
          />
        </div>
        <div className="d-none d-xxl-block d-xl-block d-lg-block d-md-block">
          <PaymentsAndBillingTable
            payment={payment}
            currentPage={currentPage}
            totalpages={totalpages}
            handlepagechange={handlepagechange}
            updateStatus={updateStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
