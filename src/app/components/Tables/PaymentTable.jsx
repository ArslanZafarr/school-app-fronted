import Link from "next/link";
import "./payment-table.css";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { useState } from "react";
const PaymentTable = ({
  payments,
  currentPage,
  totalpages,
  handlepagechange,
  updateStatus,
}) => {
  const [data, setdata] = useState({});
  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="webadminpaymentmodal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title" id="staticBackdropLabel">
                Update Data
              </h5>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label medium_font font_size_16"
                >
                  Status
                </label>
                <input
                  type="text"
                  placeholder="Status"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={data?.["status"]}
                />
              </div>
            </div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn"
                data-bs-dismiss="modal"
                style={{ backgroundColor: "#FA7800", color: "white" }}
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  updateStatus(
                    data?.["status"] === "paid" ? "notpaid" : "paid",
                    data["id"]
                  )
                }
                data-bs-dismiss="modal"
                type="button"
                className="btn"
                style={{ backgroundColor: "#FA7800", color: "white" }}
              >
                Update Status to{" "}
                {data?.["status"] === "paid" ? "Pending" : "Paid"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}

      <table className="table my-5 table_1 medium_font font_size_14 table-responsive">
        <thead className="table-light border-1 rounded-top-3">
          <tr>
            <th>Principal Name</th>
            <th>School Name</th>
            <th>Email</th>
            <th>Payment</th>
            <th>Date</th>
            <th className="payment-header">status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((curData, index) => (
            <tr key={index} className="border-1">
              <td>
                {/* <Image className='payments_image_div' src={curData.image} alt='image' width={50} height={50} /> */}
                {curData.principal_name}
              </td>
              <td>{curData.school_name}</td>
              <td>{curData.principal_email}</td>
              <td>{curData.amount}</td>
              <td>{curData.month}</td>
              <td>
                <span
                  className={`payment-cell ${
                    curData.status === "paid" ? "completed" : "pending"
                  }`}
                >
                  {curData.status === "paid" ? "Completed" : "Pending"}
                </span>
              </td>
              <td className="icon_main_div">
                <div className="rounded-3 icon_div d-flex align-items-center justify-content-around">
                  <Link
                    href="#"
                    onClick={() => setdata(curData)}
                    data-bs-toggle="modal"
                    data-bs-target="#webadminpaymentmodal"
                  >
                    <FaRegEdit className="table_icon text-dark" />
                  </Link>
                  <Link href="#">
                    <RiDeleteBin6Line
                      className="table_icon"
                      style={{ color: "#ef3826" }}
                    />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="payment_pagination_div">
        <ResponsivePagination
          current={currentPage}
          total={totalpages}
          onPageChange={handlepagechange}
        />
      </div>
    </>
  );
};

export default PaymentTable;
