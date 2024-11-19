import Button from "@/app/components/Button"
import Link from "next/link"
import { CiCirclePlus } from "react-icons/ci";
import TimeZoneTable from "@/app/components/Tables/ZoomIntegrationTable";

const page = () => {
  return (
    <>
      <div className="time_zone_div">
        <div className="time_zone_heading d-flex justify-content-between align-items-center">
          <h2 className="medium_font font_size_24"> Zoom Integration For Power Classes </h2>
          <Link href="/admin-panel/add-school-details">
            <Button icon={<CiCirclePlus className="me-2 text_color" style={{ fontSize: '25px' }} />
            } text="Add New Class"
              className="" />
          </Link>
        </div>
        <div className="time_zone_table mt-5">
                    <TimeZoneTable />
                </div>
      </div>
    </>
  )
}

export default page
