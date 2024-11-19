import Button from "@/app/components/Button";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import AttendenceTable from "../../Tables/AttendenceTable";
import MobileSceenAttendenceTable from "../../Tables/MobileScreensTables/AttendenceTable";

const Time_2_Tab = () => {
  const tableData = [
    { image: '/assets/images/dashboard/image.png', name: 'Bilal', email: 'abcd@gmail.com', number: '0323-23542322', class: 'class 2', status: "Completed", actions: 'send notification' },
    { image: '/assets/images/dashboard/image.png', name: 'Bilal', email: 'abcd@gmail.com', number: '0323-23542322', class: 'class 2', status: "Pending", actions: 'send notification' },
    { image: '/assets/images/dashboard/image.png', name: 'Bilal', email: 'abcd@gmail.com', number: '0323-23542322', class: 'class 2', status: "Completed", actions: 'send notification' },
    { image: '/assets/images/dashboard/image.png', name: 'Bilal', email: 'abcd@gmail.com', number: '0323-23542322', class: 'class 2', status: "Pending", actions: 'send notification' },
    { image: '/assets/images/dashboard/image.png', name: 'Bilal', email: 'abcd@gmail.com', number: '0323-23542322', class: 'class 2', status: "Completed", actions: 'send notification' },
    { image: '/assets/images/dashboard/image.png', name: 'Bilal', email: 'abcd@gmail.com', number: '0323-23542322', class: 'class 2', status: "Pending", actions: 'send notification' },

  ];
  return (
    <div>
      <div className="attendence_Table_div">
      <div className="mobile_screen_table d-block d-xxl-none d-xl-none d-lg-none d-md-none">
        <MobileSceenAttendenceTable />
        </div>
        <div className="d-none d-xxl-block d-xl-block d-lg-block d-md-block">
        <AttendenceTable />
        </div>
        <div className="payment_pagination_div d-none d-xxl-block d-xl-block d-lg-block d-md-block">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-around">
              <li className="page-item">
                <Link href="#" className="page-link rounded text-dark" aria-disabled="true">
                  <FaArrowLeft className="me-2" />
                  Previous
                </Link>
              </li>
              <ul className="pagination">
                <li className="page-item">
                  <Link href="#" className="page-links">
                    1
                  </Link>
                </li>
                <li className="page-item">
                  <Link href="#" className="page-links">
                    2
                  </Link>
                </li>
                <li className="page-item">
                  <Link href="#" className="page-links">
                    3
                  </Link>
                </li>
              </ul>
              <li className="page-item ">
                <Link href="#" className="page-link rounded text-dark">
                  Next
                  <FaArrowRight className="ms-2" />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

    </div>
  );
};

export default Time_2_Tab;
