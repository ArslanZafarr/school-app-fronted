import Button from "@/app/components/Button";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import AttendenceTable from "../../Tables/AttendenceTable";
import MobileSceenAttendenceTable from "../../Tables/MobileScreensTables/AttendenceTable";

const Time_1_Tab = ({ students, updateStatus }) => {
  return (
    <div>
      <div className="attendence_Table_div">
        <div className="mobile_screen_table d-block d-xxl-none d-xl-none d-lg-none d-md-none">
          <MobileSceenAttendenceTable
            students={students}
            updateStatus={updateStatus}
          />
        </div>
        <div className="d-none d-xxl-block d-xl-block d-lg-block d-md-block">
          <AttendenceTable students={students} updateStatus={updateStatus} />
        </div>
      </div>
    </div>
  );
};

export default Time_1_Tab;
