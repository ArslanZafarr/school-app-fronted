import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const AllPowerClassesTable = ({ classes, handledeletePowerClass }) => {
  return (
    <div>
      <table className="table my-5 table_1 medium_font font_size_14 table-responsive">
        <thead className="table-light">
          <tr className="border-1 rounded-top-3">
            <th>Time</th>
            <th>Date</th>
            <th>Subject</th>
            <th>Teacher</th>
            <th>Online Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((curData, index) => (
            <tr key={index} className="border-1">
              <td>
                <span>
                  {" "}
                  {curData.start_time &&
                    moment(curData.start_time, "HH:mm").format("hh:mm A")}{" "}
                </span>
              </td>
              <td>
                {curData.start_date &&
                  moment(curData.start_date).format("D MMM YYYY")}
              </td>
              <td>{curData.subject?.["name"]}</td>
              <td>
                <Link
                  className="text-decoration-none"
                  style={{ color: "orange" }}
                  href={"#"}
                >
                  {curData.status === "not_assigned"
                    ? "Not Assigned"
                    : "Assigned"}
                </Link>
              </td>
              <td>
                <Link
                  href={"#"}
                  className="btn text-white font_size_14"
                  style={{ backgroundColor: "#1c91f2" }}
                >
                  Copy Link
                </Link>
              </td>
              <td className="icon_main_div">
                <div className="rounded-3 icon_div d-flex align-items-center justify-content-around">
                  <Link href={`/admin-panel/edit-power-class?id=${curData.id}`}>
                    <FaRegEdit className="table_icon text-dark" />
                  </Link>
                  <Link href="#">
                    <RiDeleteBin6Line
                      onClick={() => handledeletePowerClass(curData.id)}
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
    </div>
  );
};

export default AllPowerClassesTable;
