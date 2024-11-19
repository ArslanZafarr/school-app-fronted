import "./schoolManagementTable.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import moment from "moment";

const ContentMaterialDataTable = ({ content, handledelete }) => {
  const handleEdit = (id) => {
    router.push(`/admin-panel/school-management/add-school-details/${id}`, {
      refetch,
    });
  };

  return (
    <>
      <table className="table table_1 medium_font font_size_14 table-responsive">
        <thead className="table-light border-1 rounded-top-3">
          <tr>
            <th>Title</th>
            <th>Subject</th>
            <th>Class</th>
            <th>Last updated</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-1">
            <td>{content.title} </td>
            <td> {content.subject}</td>
            <td>Class {content.class} </td>
            <td>
              {content.updated_at && moment(content.updated_at).format("ll")}
            </td>
            <td className="icon_main_div">
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
      </table>
    </>
  );
};

export default ContentMaterialDataTable;
