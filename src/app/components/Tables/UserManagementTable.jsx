import './user-management-table.css';
import { FaRegEdit } from "react-icons/fa";
import Link from 'next/link';
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { RiDeleteBin6Line } from 'react-icons/ri';
import Image from 'next/image';

const tableData = [
    {image: '/assets/images/dashboard/user-management/Avatar.png', name: "Kashif", email: "student@gmail.com", role: "Principal", principal: "No", status: "active" },
    {image: '/assets/images/dashboard/user-management/Avatar.png', name: "Kashif", email: "student@gmail.com", role: "Principal", principal: "No", status: "active" },
    {image: '/assets/images/dashboard/user-management/Avatar.png', name: "Kashif", email: "student@gmail.com", role: "Principal", principal: "No", status: "active" },
    {image: '/assets/images/dashboard/user-management/Avatar.png', name: "Kashif", email: "student@gmail.com", role: "Principal", principal: "No", status: "inactive" },
    {image: '/assets/images/dashboard/user-management/Avatar.png', name: "Kashif", email: "student@gmail.com", role: "Principal", principal: "No", status: "active" },
    {image: '/assets/images/dashboard/user-management/Avatar.png', name: "Kashif", email: "student@gmail.com", role: "Principal", principal: "No", status: "active" },

];

const UserManagementTable = () => {
    return (
        <>
            <table className="table mt-5 table_1 medium_font font_size_14 table-responsive">
                <thead className="table-light border-1 rounded-top-3">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Principle</th>
                        <th className="status-header">Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((curData, index) => (
                        <tr key={index} className="border-1">
                            <td>
                                <Image className='user_management_table_Image' alt='image' src={curData.image} width={50} height={50} />
                                {curData.name}
                                </td>
                            <td>{curData.email}</td>
                            <td>

                                {curData.role}
                            </td>
                            <td>{curData.principal}</td>
                            <td>
                                <span
                                    className={`status-cell ${curData.status === "active" ? "active" : "inactive"
                                        }`}
                                >
                                    {curData.status}
                                </span>
                            </td>
                            <td className="icon_main_div">
                                <div className="rounded-3 icon_div d-flex align-items-center justify-content-around">
                                    <Link href="#">
                                        <FaRegEdit className="table_icon text-dark" />
                                    </Link>
                                    <Link href="#">
                                        <RiDeleteBin6Line className="table_icon" style={{ color: "#ef3826" }} />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table >
            <div className="user_management_pagination_div mt-5">
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
        </>
    )
}

export default UserManagementTable
