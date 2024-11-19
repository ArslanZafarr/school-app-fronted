import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import {
  deleteSchoolUser,
  fetchSchoolManagement,
} from "@/services/admin/contentupload";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const SchoolManagementTable = () => {
  const [isLoading, setisLoading] = useState(false);
  const [schools, setschools] = useState([]);
  const [deleteid, setdeleteid] = useState(null);
  const [totalpages, settotalpages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { apiToken } = useSelector((state) => state.storeAuth);
  useEffect(() => {
    getSchools(currentPage);
  }, []);
  const getSchools = async (page) => {
    setCurrentPage(page);
    setisLoading(true);
    try {
      let res = await fetchSchoolManagement(page, apiToken);
      if (res.data.success) {
        setschools(res.data.schools);
        settotalpages(res.data.meta.total_pages);
      } else {
        setschools([]);
      }
      setisLoading(false);
    } catch (e) {
      toast.error("No Schools Found");
      setisLoading(false);
      setschools([]);
    }
  };
  const handleDelete = async (id) => {
    setisLoading(true);
    try {
      await deleteSchoolUser(id, apiToken);
      setdeleteid(null);
      getSchools(1); // Refetch the data after successful deletion
      toast.success("School deleted successfully.");
    } catch (error) {
      setisLoading(false);
      toast.error("Failed to delete school.");
    }
  };
  const handlepagechange = (val) => {
    if (currentPage === val) return;
    setCurrentPage(val);
    getSchools(val);
  };
  if (isLoading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <h1>Loading...</h1>
      </div>
    );
  // if (isError)
  //   return (
  //     <div
  //       className="d-flex justify-content-center align-items-center"
  //       style={{ height: "70vh" }}
  //     >
  //       <h1>Error loading data.</h1>
  //     </div>
  //   );
  return (
    <>
    <div className="mobile_screen_table d-flex flex-column justify-content-center">

      {/* <div className="mobile_screen_table d-flex justify-content-center"> */}
        <table className="my-5 medium_font font_size_14 ">
          <div className="border rounded">
            {schools.map((curData, index) => (
              <div key={index} className="main_div border-bottom p-3">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th className="payment-header">Payment</th>
                    <th>Principle</th>
                    <th>Principle Email</th>
                    <th>Teacher</th>
                    <th>Student</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={index}>
                    <td>{curData.school_name}</td>
                    <td>{curData.school_type}</td>
                    <td>
                      <span
                        className={`payment_status ${
                          curData.payment_status === "completed"
                            ? "completed"
                            : "pending"
                        }`}
                      >
                        {curData.payment_status}
                      </span>
                    </td>
                    <td>{curData.principal_name}</td>
                    <td>{curData.principal_email}</td>
                    <td>{curData.teachers}</td>
                    <td>{curData.students}</td>
                    <td>
                      <div className="rounded-3 icon_div d-flex align-items-center justify-content-around">
                        <Link
                          href={`/admin-panel/school-management/add-school-details/${curData.id}`}
                        >
                          <FaRegEdit className="table_icon text-dark" />
                        </Link>
                        <Link
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#confirmschoolmobBackdrop"
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
          id="confirmschoolmobBackdrop"
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
                  You are about to delete this school. Are you sure?
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
        <div className="application_pagination_div mt-5">
          <ResponsivePagination
            current={currentPage}
            total={totalpages}
            onPageChange={handlepagechange}
          />
        </div>
      </div>
      {/* <div className="mt-4 mb-3 text-center">
        <Link href={"#"} class="btn load_more_btn">
          Load More
        </Link>
      </div> */}
    </>
  );
};

export default SchoolManagementTable;
