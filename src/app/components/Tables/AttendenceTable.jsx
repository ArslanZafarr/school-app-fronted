import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const AttendenceTable = ({ students, updateStatus }) => {
  const [data, setdata] = useState({});
  const [status, setstatus] = useState("");
  const handlestatus = () => {
    console.log("9", status, data);
    let body = {
      attendance_status: status,
      class_id: data.class?.id,
      subject_id: data.subject?.id,
      student_id: data.student_id,
    };
    updateStatus(body);
  };
  return (
    <div>
      <table className="table my-5 table_1 medium_font font_size_14 table-responsive">
        <thead className="table-light">
          <tr className="border-1 rounded-top-3">
            <th>Student Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>class</th>
            <th className="payment-header">status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((curData, index) => (
            <tr key={index} className="border-1">
              <td>
                <span> {curData.student?.name} </span>
              </td>
              <td>{curData.student?.email}</td>
              <td>{curData.student?.parent_contact_number}</td>
              <td>Class {curData.class?.grade}</td>
              <td>
                <span
                // className={`payment-cell ${curData.status === "Completed" ? "completed" : "pending"
                //     }`}
                >
                  {curData.attendance_status}
                </span>
              </td>
              <td className="icon_main_div">
                <Link
                  className="text-decoration-none"
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#editattendancemodal"
                  onClick={() => {
                    setstatus(curData.attendance_status);
                    setdata(curData);
                  }}
                >
                  <p className="medium_font font_size_12"> Change Status</p>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal */}
      <div
        className="modal fade"
        id="editattendancemodal"
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
                <select
                  class="orange-select form-select form-select-lg mb-3 font_size_16"
                  aria-label=".form-select-lg example"
                  value={status}
                  onChange={(e) => {
                    setstatus(e.target.value);
                  }}
                  name="class_id"
                >
                  <option selected>Select Status</option>
                  <option value={"present"}>Present</option>
                  <option value={"absent"}>Absent</option>
                </select>
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
                onClick={handlestatus}
                data-bs-dismiss="modal"
                type="button"
                className="btn"
                style={{ backgroundColor: "#FA7800", color: "white" }}
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
    </div>
  );
};

export default AttendenceTable;
