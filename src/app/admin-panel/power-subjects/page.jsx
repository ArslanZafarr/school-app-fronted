"use client";
import Link from "next/link";
import Button from "@/app/components/Button";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import PowerClassSubjectsTable from "@/app/components/Tables/MobileScreensTables/PowerClassSubjectsTable";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  deletePowerSubject,
  fetchAllPowerSubject,
} from "@/services/admin/powerclass";
import { toast } from "react-toastify";
const Page = () => {
  const [totalpages, settotalpages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [subjects, setsubjects] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const { apiToken } = useSelector((state) => state.storeAuth);
  useEffect(() => {
    getSubjects(currentPage);
  }, []);
  const getSubjects = (page) => {
    setCurrentPage(page);
    setisLoading(true);
    fetchAllPowerSubject(page, apiToken)
      .then((res) => {
        setisLoading(false);
        if (res.data.success) {
          setsubjects(res.data.data.items);
          settotalpages(res.data.data.meta?.total_pages ?? 1);
          if (res.data.data.items.length === 0) {
            toast.error("No Data Available");
          }
        } else {
          toast.error("No Data Available");
          setsubjects([]);
        }
      })
      .catch((err) => {
        toast.error("No Data Available");
        setsubjects([]);
        setisLoading(false);
      });
  };
  const handledelete = async (id) => {
    setisLoading(true);
    try {
      const response = await deletePowerSubject(id, apiToken);
      console.log("73", response);
      toast.success(response.data.message);
      setisLoading(false);
      getSubjects(1);
      //   refetch(); // Refetch the data after successful creation
      //   router.push('/admin-panel/school-management');
    } catch (error) {
      setisLoading(false);
      const message = error.data?.message || "Invalid data";
      toast.error(message);
    }
  };
  const handlepagechange = (val) => {
    if (currentPage === val) return;
    setCurrentPage(val);
    getSubjects(val);
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
          <h2 className="medium_font font_size_24">Power Subjects</h2>
          <Link href="/admin-panel/power-subjects/add-new-power-subject">
            <Button
              icon={
                <CiCirclePlus
                  className="me-2 text_color"
                  style={{ fontSize: "25px" }}
                />
              }
              text="Add New Power Subject"
              className=""
            />
          </Link>
        </div>
      </div>
      <div className="teachers_table_main_div mt-1 mt-md-4">
        <div className="mobile_screen_table_div d-block d-xxl-none d-xl-none d-lg-none d-md-none">
          <PowerClassSubjectsTable
            subjects={subjects}
            handledelete={handledelete}
          />
        </div>
        <div className="d-none d-xxl-block d-xl-block d-lg-block d-md-block">
          <table className="table table_1 medium_font font_size_14 table-responsive">
            <thead className="table-light border-1 rounded-top-3">
              <tr>
                <th>Subject</th>
                <th>Class</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((item, index) => (
                <tr key={index} className="border-1">
                  <td>{item.name}</td>
                  <td>{item.class_grade}</td>

                  <td className="icon_main_div">
                    <div className="rounded-3 icon_div d-flex align-items-center justify-content-around">
                      <Link
                        href={`/admin-panel/power-subjects/edit-power-subject?id=${item.id}`}
                      >
                        <FaRegEdit className="table_icon text-dark" />
                      </Link>
                      <Link href={"#"}>
                        <RiDeleteBin6Line
                          className="table_icon text-danger"
                          onClick={() => handledelete(item.id)}
                        />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
