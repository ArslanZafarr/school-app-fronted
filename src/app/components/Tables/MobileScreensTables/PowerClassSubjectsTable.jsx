import Link from "next/link";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const PowerClassSubjectsTable = ({ subjects, handledelete }) => {
  return (
    <>
      <div className="mobile_screen_table d-flex justify-content-center">
        <table className="my-5 medium_font font_size_14 ">
          <div className="border rounded">
            {subjects.map((curData, index) => (
              <div key={index} className="main_div border-bottom p-3">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Class</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={index} className="">
                    <td> {curData.name} </td>
                    <td> {curData.class_grade} </td>

                    <td className="icon">
                      <div className="rounded-3 icon_div d-flex align-items-center justify-content-around">
                        <Link
                          href={`/admin-panel/power-subjects/edit-power-subject?id=${curData.id}`}
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
      {/* <div className="mt-4 mb-3 text-center">
        <Link href={"#"} class="btn load_more_btn">
          Load More
        </Link>
      </div> */}
    </>
  );
};

export default PowerClassSubjectsTable;
