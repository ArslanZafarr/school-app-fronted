"use client";
import Button from "@/app/components/Button";
import { CiCirclePlus } from "react-icons/ci";
import SchoolManagementTable from "@/app/components/Tables/schoolManagementTable";
import MobileScreenSchoolMangementTable from "@/app/components/Tables/MobileScreensTables/schoolManagementTable";
import Link from "next/link";

const page = () => {
  return (
    <>
      <div className="school_management_container">
        <div className="school_management_heading d-flex justify-content-between align-items-center">
          <h2 className="medium_font font_size_24"> Manage Schools </h2>
          <Link href="/admin-panel/school-management/add-school-details">
            <Button
              icon={
                <CiCirclePlus
                  className="me-2 text_color"
                  style={{ fontSize: "25px" }}
                />
              }
              text="Add New"
              className=""
            />
          </Link>
        </div>
        <div className="School_management_table mt-xxl-5 mt-xl-5 mt-lg-5 mt-md-5">
          <div className="mobile_screen_div d-block d-xxl-none d-xl-none d-lg-none d-md-none">
            <MobileScreenSchoolMangementTable />
          </div>
          <div className="d-none d-xxl-block d-xl-block d-lg-block d-md-block">
            <SchoolManagementTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
