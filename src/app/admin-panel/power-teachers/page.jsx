"use client";
import Link from "next/link";
// import "./teachers.css";
import Button from "@/app/components/Button";
import { CiCirclePlus } from "react-icons/ci";
import { FaArrowLeft, FaArrowRight, FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from "next/image";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import PowerClassTeachersTable from "@/app/components/Tables/MobileScreensTables/PowerClassTeachersTable";
import { deleteTutor, fetchAllPowerTutor } from "@/services/admin/powerclass";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const Page = () => {
  const [totalpages, settotalpages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [tutors, settutors] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const { apiToken } = useSelector((state) => state.storeAuth);
  useEffect(() => {
    getTutor(currentPage);
  }, []);
  const getTutor = (page) => {
    setCurrentPage(page);
    setisLoading(true);
    fetchAllPowerTutor(page, apiToken)
      .then((res) => {
        setisLoading(false);
        if (res.data.success) {
          settutors(res.data.data.items);
          settotalpages(res.data.data.meta?.total_pages ?? 1);
          if (res.data.data.items.length === 0) {
            toast.error("No Data Available");
          }
        } else {
          toast.error("No Data Available");
          settutors([]);
        }
      })
      .catch((err) => {
        toast.error("No Data Available");
        settutors([]);
        setisLoading(false);
      });
  };
  const handledelete = async (id) => {
    setisLoading(true);
    try {
      const response = await deleteTutor(id, apiToken);
      console.log("73", response);
      toast.success(response.data.message);
      setisLoading(false);
      getTutor(1);
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
    getTutor(val);
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
          <h2 className="medium_font font_size_24">Power Teachers</h2>
          <Link href="/admin-panel/power-teachers/add-new-power-teacher">
            <Button
              icon={
                <CiCirclePlus
                  className="me-2 text_color"
                  style={{ fontSize: "25px" }}
                />
              }
              text="Add New Power Teacher"
              className=""
            />
          </Link>
        </div>
      </div>
      <div className="teachers_table_main_div mt-1 mt-md-4">
        <div className="mobile_screen_table_div d-block d-xxl-none d-xl-none d-lg-none d-md-none">
          <PowerClassTeachersTable
            tutors={tutors}
            handledelete={handledelete}
          />
        </div>
        <div className="d-none d-xxl-block d-xl-block d-lg-block d-md-block">
          <table className="table table_1 medium_font font_size_14 table-responsive">
            <thead className="table-light border-1 rounded-top-3">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone No</th>
                <th>Subject</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tutors.map((item, index) => (
                <tr key={index} className="border-1">
                  <td>
                    <span>
                      {/* <Image
                        className="border rounded-circle me-2"
                        src={""}
                        alt="image"
                        width={50}
                        height={50}
                      /> */}
                      {item["profile"]?.full_name}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        backgroundColor: "#eeeeee",
                        padding: "7px",
                        borderRadius: "7px",
                      }}
                    >
                      {item["profile"]?.user?.email}
                    </span>
                  </td>
                  <td>
                    <span>{item["profile"]?.phone}</span>
                  </td>

                  <td>{item.subject}</td>

                  <td className="icon_main_div">
                    <div className="rounded-3 icon_div d-flex align-items-center justify-content-around">
                      <Link
                        href={`/admin-panel/power-teachers/edit-power-teacher?id=${item.id}`}
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
