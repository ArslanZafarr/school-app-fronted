import Link from 'next/link';
import './zoom-integration-table.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const tableData = [
    { time: "9:00 AM", date: "2 Jun 2024", subject: "Maths", teacher: "Sarah Jain", zoomLink: "https://zoom.com/12345", API: "View" },
    { time: "9:00 AM", date: "2 Jun 2024", subject: "Maths", teacher: "Sarah Jain", zoomLink: "https://zoom.com/12345", API: "View" },
    { time: "9:00 AM", date: "2 Jun 2024", subject: "Maths", teacher: "Sarah Jain", zoomLink: "https://zoom.com/12345", API: "View" },
    { time: "9:00 AM", date: "2 Jun 2024", subject: "Maths", teacher: "Sarah Jain", zoomLink: "https://zoom.com/12345", API: "View" },
    { time: "9:00 AM", date: "2 Jun 2024", subject: "Maths", teacher: "Sarah Jain", zoomLink: "https://zoom.com/12345", API: "View" },
];

const timeZoneTable = () => {
    return (
        <>
            <div>
                <table className="table table_1 medium_font font_size_14 table-responsive">
                    <thead className="table-light border-1 rounded-top-3">
                        <tr>
                            <th>Time</th>
                            <th>Date</th>
                            <th className="payment-header">Subject</th>
                            <th>Teacher</th>
                            <th>Zoom Link</th>
                            <th>API</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((curData, index) => (
                            <tr key={index} className="border-1">
                                <td>{curData.time}</td>
                                <td>{curData.date}</td>
                                <td>
                                    {curData.subject}
                                </td>
                                <td>{curData.teacher}</td>
                                <td style={{ color: "#5088ff" }}>{curData.zoomLink}</td>
                                <td>
                                    <Link href="#" className='medium_font' style={{ color: "#f15046", textDecoration: 'none' }}>{curData.API}</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="time_zone_pagination_div">
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
        </>
    )
}

export default timeZoneTable
