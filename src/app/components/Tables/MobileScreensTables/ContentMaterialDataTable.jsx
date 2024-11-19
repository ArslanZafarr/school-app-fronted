import moment from "moment";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const tableData = [
  {
    name: "Kashif",
    type: "Student",
    payment: "Completed",
    principal: "No",
    teacher: "No",
    student: "Yes",
  },
  {
    name: "Kashif",
    type: "Student",
    payment: "Pending",
    principal: "No",
    teacher: "No",
    student: "Yes",
  },
];

const MobileContentMaterialDataTable = ({ content, handledelete }) => {
  return (
    <>
      <div className="mobile_screen_table d-flex justify-content-center">
        <table className="my-5 medium_font font_size_14 ">
          <div className="border rounded">
            <div className="main_div border-bottom p-3">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Subject</th>
                  <th>Class</th>
                  <th>Last updated</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{content.title}</td>
                  <td>{content.subject}</td>
                  <td>Class {content.class}</td>
                  <td>
                    {content.updated_at &&
                      moment(content.updated_at).format("ll")}
                  </td>

                  <td>
                    <div className="rounded-3 icon_div d-flex align-items-center justify-content-around">
                      <Link
                        href={`/admin-panel/content-material/edit-content-material?id=${content.id}`}
                      >
                        <FaRegEdit className="table_icon text-dark" />
                      </Link>
                      <Link href="#">
                        <RiDeleteBin6Line
                          className="table_icon"
                          style={{ color: "#ef3826" }}
                          onClick={() => handledelete(content.id)}
                        />
                      </Link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </div>
          </div>
        </table>
      </div>
    </>
  );
};

export default MobileContentMaterialDataTable;
