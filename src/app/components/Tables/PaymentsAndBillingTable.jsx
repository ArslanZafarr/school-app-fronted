import Link from "next/link";
import Button from "../Button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./payment-table.css";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { useState } from "react";
const PaymentsAndBillingTable = ({
  payment,
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
        id="webaprincipalpaymentmodal"
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
            <th>Payment</th>
            <th>Month</th>
            <th>Year</th>
            <th className="payment-header">status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payment.map((curData, index) => (
            <tr key={index} className="border-1">
              <td>{curData.amount}</td>
              <td>{curData.month}</td>
              <td>{curData.month && curData.month.split("-")[0]}</td>
              <td>
                <span
                  className={`payment-cell ${
                    curData.status === "notpaid" ? "pending" : "completed"
                  }`}
                >
                  {curData.status === "notpaid" ? "Pending" : "Completed"}
                </span>
              </td>
              <td className="icon_main_div">
                {curData.status === "notpaid" ? (
                  <Link
                    href="#"
                    onClick={() => setdata(curData)}
                    data-bs-toggle="modal"
                    data-bs-target="#webaprincipalpaymentmodal"
                  >
                    <Button text="Pay Now" />
                  </Link>
                ) : (
                  <Link href="#">
                    <Button text="Paid" />
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="application_pagination_div mt-5">
        <ResponsivePagination
          current={currentPage}
          total={totalpages}
          onPageChange={handlepagechange}
        />
      </div>
    </>
  );
};

export default PaymentsAndBillingTable;
