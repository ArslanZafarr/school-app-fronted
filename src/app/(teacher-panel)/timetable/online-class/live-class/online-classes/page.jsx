import Button from "@/app/components/Button";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import MobileScreenOnlineClassesTable from '@/app/components/Tables/MobileScreensTables/OnlineClasses';

const page = () => {

    const tableData = [
        { class: 'class 1', subject: 'abcd', start_time: '34', end_time: '2', duration: "1 hour", details: 'veiw' },
        { class: 'class 1', subject: 'abcd', start_time: '34', end_time: '2', duration: "1 hour", details: 'veiw' },
        { class: 'class 1', subject: 'abcd', start_time: '34', end_time: '2', duration: "1 hour", details: 'veiw' },
        { class: 'class 1', subject: 'abcd', start_time: '34', end_time: '2', duration: "1 hour", details: 'veiw' },
        { class: 'class 1', subject: 'abcd', start_time: '34', end_time: '2', duration: "1 hour", details: 'veiw' },
        { class: 'class 1', subject: 'abcd', start_time: '34', end_time: '2', duration: "1 hour", details: 'veiw' },

    ];

    return (
        <div className="tablet_padding">
            <h3 className="medium_font font_size_24"> Online Classes </h3>

            <div className="attendence_Table_div">
                <div className="d-block d-xxl-none d-xl-none d-lg-none d-md-none">
                  <MobileScreenOnlineClassesTable />
                </div>
                <div className="d-none d-xxl-block d-xl-block d-lg-block d-md-block">
                    <table className="table my-5 table_1 medium_font font_size_14 table-responsive">
                        <thead className="table-light border-1 rounded-top-3">
                            <tr>
                                <th>Class</th>
                                <th>Subject</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th className="payment-header">Duration</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((curData, index) => (
                                <tr key={index} className="border-1">
                                    <td><span> {curData.class} </span></td>
                                    <td>{curData.subject}</td>
                                    <td>{curData.start_time}</td>
                                    <td>{curData.end_time}</td>
                                    <td>
                                        <span>{curData.duration}</span>
                                    </td>
                                    <td className="icon_main_div">
                                        <Link className="text-decoration-none" href="#">
                                            <p className="medium_font font_size_12"> {curData.details} </p>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="payment_pagination_div">
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

        </div>
    )
}

export default page
