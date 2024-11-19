import './content-material-table.css';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import Link from 'next/link';
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

const ContentMaterialTable = () => {

    const tableData = [
        { material: "Lecture 1: Intro to Biology", type: "Lecture", course: "Completed", created_by: "Dr Jame", last_updated: "3 days ago" },
        { material: "Lecture 1: Intro to Biology", type: "Lab", course: "Pending", created_by: "Dr Jame", last_updated: "3 days ago" },
        { material: "Lecture 1: Intro to Biology", type: "Quiz", course: "Completed", created_by: "Dr Jame", last_updated: "3 days ago" },
        { material: "Lecture 1: Intro to Biology", type: "Answer Key", course: "Pending", created_by: "Dr Jame", last_updated: "3 days ago" },
        { material: "Lecture 1: Intro to Biology", type: "Reading", course: "Completed", created_by: "Dr Jame", last_updated: "3 days ago" },
        { material: "Lecture 1: Intro to Biology", type: "Note", course: "Pending", created_by: "Dr Jame", last_updated: "3 days ago" },
    ];

    const colorMapping = {
        Lecture: { backgroundColor: "#f5eeff", color: "#8565ec" },
        Lab: { backgroundColor: "#edfbf5", color: "#77ba9e" },
        Quiz: { backgroundColor: "#eafeff", color: "#7eced3" },
        "Answer Key": { backgroundColor: "#fff6ed", color: "#fa7800" },
        Reading: { backgroundColor: "#ffeefa", color: "#fb861f" },
        Note: { backgroundColor: "#ffedec", color: "#f79289" },
    };

    return (
        <div>
            <h3 className='medium_font font_size_24 mb-5'> Content Materials Data </h3>
            <table className="table table_1 medium_font font_size_14 table-responsive">
                <thead className="table-light border-1 rounded-top-3">
                    <tr>
                        <th>Material</th>
                        <th>Type</th>
                        <th className="payment-header">Course</th>
                        <th>Created by</th>
                        <th>Last updated</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((curData, index) => (
                        <tr key={index} className="border-1">
                            <td>{curData.material}</td>
                            <td>
                                <span className='py-2 px-5 rounded-4' style={colorMapping[curData.type]}>
                                    {curData.type}
                                </span>
                            </td>
                            <td>
                                <span>
                                    {curData.course}
                                </span>
                            </td>
                            <td>{curData.created_by}</td>
                            <td>{curData.last_updated}</td>
                            <td> <Link className='text-decoration-none' href="#">Edit</Link> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ContentMaterialTable;
