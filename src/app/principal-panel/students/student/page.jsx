"use client";
import "./students.css";
import Button from "@/app/components/Button";
import { CiCirclePlus } from "react-icons/ci";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight, FaRegEdit } from "react-icons/fa";
import MobileScreenStudentsTable from "@/app/components/Tables/MobileScreensTables/StudentsTable";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchAllStudentsByClass } from "@/services/principal/student";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { useSearchParams } from "next/navigation";

const MyComponent = () => {
  const searchParams = useSearchParams();
  const [students, setstudents] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalpages, settotalpages] = useState(2);
  const { apiToken, userData } = useSelector((state) => state.storeAuth);

  useEffect(() => {
    console.log("22", searchParams.get("id"));
    if (searchParams.get("id")) {
      getStudents(currentPage);
    }
  }, []);
  const getStudents = async (page) => {
    if (apiToken) {
      setisLoading(true);
      try {
        let res = await fetchAllStudentsByClass(
          searchParams.get("id"),
          apiToken,
          page
        );
        if (res.data.success) {
          setstudents(res.data.students);
          settotalpages(res.data.meta?.total_pages ?? 1);
        } else {
          setstudents([]);
        }
        setisLoading(false);
      } catch (e) {
        setisLoading(false);
        setstudents([]);
      }
    }
  };
  const handlepagechange = (val) => {
    if (currentPage === val) return;
    setCurrentPage(val);
    getStudents(val);
  };
  if (isLoading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <p>Loading...</p>
      </div>
    );
  return (
    <div className="padding tablet_padding">
      <div className="teachers_div">
        <div className="teachers_heading d-flex justify-content-between align-items-center">
          <h2 className="medium_font font_size_24"> Students </h2>
        </div>
      </div>
      <div className="teachers_table_main_div mt-1 mt-md-4">
        <div className="mobile_screen_table_div d-block d-xxl-none d-xl-none d-lg-none d-md-none">
          <MobileScreenStudentsTable students={students} />
        </div>
        <div className="d-none d-xxl-block d-xl-block d-lg-block d-md-block">
          <table className="table table_1 medium_font font_size_14 table-responsive">
            <thead className="table-light border-1 rounded-top-3">
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Parents Contact</th>
                <th>class</th>
                <th>Roll No</th>
              </tr>
            </thead>
            <tbody>
              {students.map((curData, index) => (
                <tr key={index} className="border-1">
                  <td>
                    {" "}
                    <span>
                      {" "}
                      {curData.profile?.image && (
                        <Image
                          className="border rounded-circle me-2"
                          src={"/assets/images/dashboard/profile-image.png"}
                          alt="image"
                          width={50}
                          height={50}
                        />
                      )}
                      {curData.profile?.full_name}{" "}
                    </span>{" "}
                  </td>
                  <td>
                    {" "}
                    <span>{curData.gender}</span>
                  </td>
                  <td>
                    <span>{curData.date_of_birth}</span>
                  </td>
                  <td>{curData.parent_contact_number}</td>
                  <td>{curData.class?.grade}</td>
                  <td className="icon_main_div">{curData.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination_div pt-3">
          <div className="faqs_pagination_div mt-5">
            <ResponsivePagination
              current={currentPage}
              total={totalpages}
              onPageChange={handlepagechange}
            />
            {/* <PowerClassesPagePagination /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
}
