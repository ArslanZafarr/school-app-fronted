import Link from "next/link";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const PowerClassTeachersTable = ({ tutors, handledelete }) => {
  return (
    <>
      <div className="mobile_screen_table d-flex justify-content-center">
        <table className="my-5 medium_font font_size_14 ">
          <div className="border rounded">
            {tutors.map((curData, index) => (
              <div key={index} className="main_div border-bottom p-3">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone No</th>
                    <th>Subject</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={index} className="">
                    <td>
                      {" "}
                      <span> {curData["profile"]?.full_name} </span>{" "}
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
                        {curData["profile"]?.user?.email}
                      </span>
                    </td>
                    <td>
                      <span>{curData["profile"]?.phone}</span>
                    </td>
                    <td>{curData.subject}</td>
                    <td className="icon">
                      <div className="rounded-3 icon_div d-flex align-items-center justify-content-around">
                        <Link
                          href={`/admin-panel/power-teachers/edit-power-teacher?id=${curData.id}`}
                        >
                          <FaRegEdit className="table_icon text-dark" />
                        </Link>
                        <Link href="#">
                          <RiDeleteBin6Line
                            className="table_icon"
                            style={{ color: "#ef3826" }}
                            onClick={() => handledelete(curData.id)}
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
      </div>
    </>
  );
};

export default PowerClassTeachersTable;
