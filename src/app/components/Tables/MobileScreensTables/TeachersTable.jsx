import Link from "next/link";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const TeachersTable = ({ teachers, setdeleteid, handleDelete, deleteid }) => {
  return (
    <>
      <div className="mobile_screen_table d-flex justify-content-center">
        <table className="my-5 medium_font font_size_14 ">
          <div className="border rounded">
            {teachers.map((curData, index) => (
              <div key={index} className="main_div border-bottom p-3">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone No</th>
                    <th>Subject</th>
                    <th>Experience</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={index} className="">
                    <td>
                      {" "}
                      <span> {curData.profile?.full_name} </span>{" "}
                    </td>
                    <td>
                      {" "}
                      <span
                        style={{
                          backgroundColor: "#eeeeee",
                          padding: "7px",
                          borderRadius: "7px",
                        }}
                      >
                        {curData.profile?.user?.email}
                      </span>
                    </td>
                    <td>
                      <span>{curData.profile?.phone}</span>
                    </td>
                    <td>{curData.subject}</td>
                    <td>{curData.experience}</td>
                    <td className="icon">
                      <div className="rounded-3 icon_div d-flex align-items-center justify-content-around">
                        <Link
                          href={`/principal-panel/teachers/edit-teacher?id=${curData.id}`}
                        >
                          <FaRegEdit className="table_icon text-dark" />
                        </Link>
                        <Link
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#confirmteacherBackdrop"
                          onClick={() => setdeleteid(curData.id)}
                        >
                          <RiDeleteBin6Line
                            className="table_icon"
                            style={{ color: "#ef3826" }}
                          />
                        </Link>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </div>
            ))}
          </div>
        </table>
        {/* Modal */}
        <div
          className="modal fade"
          id="confirmteacherBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content p-3">
              <div className="modal-header border-0">
                <h1
                  className="medium_font font_size_22"
                  id="staticBackdropLabel"
                >
                  Confirmation
                </h1>
              </div>
              <div className="modal-body">
                <p className="font_size_18">
                  You are about to delete this teacher. Are you sure?
                </p>
              </div>
              <div
                className="border-0"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <div style={{ flex: 0.32 }}></div>
                <button
                  style={{ flex: 0.32 }}
                  className="btn modal_btn_2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  data-bs-dismiss="modal"
                  style={{ flex: 0.32 }}
                  className="btn modal_btn rounded-3 ms-2"
                  onClick={() => handleDelete(deleteid)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeachersTable;
