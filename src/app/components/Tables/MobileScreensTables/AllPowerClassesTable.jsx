import moment from "moment";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const AllPowerClassesTable = ({ handledeletePowerClass, classes }) => {
  return (
    <>
      <div className="mobile_screen_table d-flex justify-content-center">
        <table className="my-5 medium_font font_size_14 ">
          <div className="border rounded">
            {classes.map((curData, index) => (
              <div key={index} className="main_div border-bottom p-3">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Date</th>
                    <th>Subject</th>
                    <th>Teacher</th>
                    <th className="pt-3">Online Class</th>
                    <th className="pt-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={index}>
                    <td>
                      <span>
                        {" "}
                        {curData.start_time &&
                          moment(curData.start_time, "HH:mm").format(
                            "hh:mm A"
                          )}{" "}
                      </span>
                    </td>
                    <td>
                      {curData.start_date &&
                        moment(curData.start_date).format("D MMM YYYY")}
                    </td>
                    <td>{curData.subject?.["name"]}</td>
                    <td>
                      {curData.status === "not_assigned"
                        ? "Not Assigned"
                        : "Assigned"}
                    </td>
                    <td>
                      <Link
                        href={"#"}
                        className="btn text-white"
                        style={{ backgroundColor: "#1c91f2", fontSize: "10px" }}
                      >
                        Copy Link
                      </Link>
                    </td>
                    <td>
                      <div className="rounded-3 icon_div d-flex align-items-center justify-content-around">
                        <Link
                          href={`/admin-panel/edit-power-class?id=${curData.id}`}
                        >
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
                </tbody>
              </div>
            ))}
          </div>
        </table>
      </div>
    </>
  );
};

export default AllPowerClassesTable;
