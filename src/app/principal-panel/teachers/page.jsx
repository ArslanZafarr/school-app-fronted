"use client";
import Link from "next/link";
import "./teachers.css";
import Button from "@/app/components/Button";
import { CiCirclePlus } from "react-icons/ci";
import { FaArrowLeft, FaArrowRight, FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from "next/image";
import MobileScreenTeachersTable from "@/app/components/Tables/MobileScreensTables/TeachersTable";
import {
  useGetTeachersQuery,
  useDeleteTeacherMutation,
} from "@/redux/features/principal-panel/teachers/TeachersApi";
import { toast } from "react-toastify";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { fetchTeachers } from "@/services/principal/dashboard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
const Page = () => {
  const [teachers, setteachers] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [totalpages, settotalpages] = useState(0);
  const [deleteid, setdeleteid] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { apiToken, userData } = useSelector((state) => state.storeAuth);

  useEffect(() => {
    getTeachers();
  }, []);
  const getTeachers = async (page) => {
    setCurrentPage(page);
    setisLoading(true);
    try {
      let res = await fetchTeachers(
        userData?.["profile"]?.["role_profile"]?.["id"],
        apiToken,
        page
      );
      setisLoading(false);
      if (res.data.success) {
        setteachers(res.data.teachers);
        settotalpages(res.data.totalPages ?? 1);
      } else {
        setteachers([]);
      }
    } catch (e) {
      setisLoading(false);
      setteachers([]);
    }
  };
  const [deleteTeacher, { isLoading: isDeleting, isError: deleteError }] =
    useDeleteTeacherMutation();

  const handleDelete = async (id) => {
    try {
      await deleteTeacher(id).unwrap();
      setdeleteid(null);
      getTeachers(currentPage); // Refetch the data after deletion
      toast.success("Deleted Teacher Data Successfully!");
    } catch (error) {
      toast.error(error);
    }
  };
  const handlepagechange = (val) => {
    if (currentPage === val) return;
    setCurrentPage(val);
    getTeachers(val);
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
    <div className="padding tablet_padding">
      <div className="teachers_div">
        <div className="teachers_heading d-flex justify-content-between align-items-center">
          <h2 className="medium_font font_size_24"> Teachers </h2>
          <Link href="/principal-panel/teachers/add-new-teacher">
            <Button
              icon={
                <CiCirclePlus
                  className="me-2 text_color"
                  style={{ fontSize: "25px" }}
                />
              }
              text="Add New Teacher"
              className=""
            />
          </Link>
        </div>
      </div>
      <div className="teachers_table_main_div mt-1 mt-md-4">
        <div className="mobile_screen_table_div d-block d-xxl-none d-xl-none d-lg-none d-md-none">
          <MobileScreenTeachersTable
            teachers={teachers}
            deleteid={deleteid}
            handleDelete={handleDelete}
            setdeleteid={setdeleteid}
          />
        </div>
        <div className="d-none d-xxl-block d-xl-block d-lg-block d-md-block">
          <table className="table table_1 medium_font font_size_14 table-responsive">
            <thead className="table-light border-1 rounded-top-3">
              <tr>
                <th className="text-start">Name</th>
                <th className="text-start">Email</th>
                <th className="text-start">Phone No</th>
                <th className="text-start">Subject</th>
                <th className="text-start">Experience</th>
                <th className="text-start">Action</th>
              </tr>
            </thead>
            <tbody>
              {teachers?.map((curData, index) => (
                <tr key={index} className="border-1">
                  <td className="text-start">
                    <span>
                      <Image
                        className="border rounded-circle me-2"
                        src={`/assets/images/dashboard/profile-image.png`}
                        // src={`/${curData?.profile?.image}`}
                        alt="image"
                        width={50}
                        height={50}
                      />
                      {curData?.profile?.full_name}
                    </span>
                  </td>
                  <td className="text-start">
                    <span
                      style={{
                        backgroundColor: "#eeeeee",
                        padding: "7px",
                        borderRadius: "7px",
                      }}
                    >
                      {curData?.profile?.user?.email}
                    </span>
                  </td>
                  <td className="text-start">
                    <span>{curData?.profile?.phone}</span>
                  </td>
                  <td className="text-start">{curData.subject}</td>
                  <td className="text-start">{curData.experience}</td>
                  <td className="icon_main_div justify-start">
                    <div className="rounded-3 icon_div d-flex align-items-center justify-content-around">
                      <Link
                        href={`/principal-panel/teachers/edit-teacher?id=${curData.id}`}
                      >
                        <FaRegEdit className="table_icon text-dark" />
                      </Link>
                      <Link
                        href={"#"}
                        data-bs-toggle="modal"
                        data-bs-target="#confirmteachermobBackdrop"
                        onClick={() => setdeleteid(curData.id)}
                      >
                        <RiDeleteBin6Line className="table_icon text-danger" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Modal */}
        <div
          className="modal fade"
          id="confirmteachermobBackdrop"
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
        <div className="application_pagination_div mt-5">
          <ResponsivePagination
            current={currentPage}
            total={totalpages}
            onPageChange={handlepagechange}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
