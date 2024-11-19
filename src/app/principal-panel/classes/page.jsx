// "use client";
// import "./students.css";
// import Button from "@/app/components/Button";
// import { CiCirclePlus } from "react-icons/ci";
// import { FaArrowLeft, FaArrowRight, FaRegEdit } from "react-icons/fa";
// import MobileScreenStudentsTable from "@/app/components/Tables/MobileScreensTables/StudentsTable";
// import Link from "next/link";
// import {
//   useDeleteClassMutation,
//   useGetClassesQuery,
// } from "@/redux/features/principal-panel/classes/ClassesApi";
// import { useState, useEffect } from "react";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { toast } from "react-toastify";

// const Page = () => {
//   const [schoolId, setSchoolId] = useState(null);
//   const [deleteClass] = useDeleteClassMutation();

//   useEffect(() => {
//     const storedSchoolId = localStorage.getItem("school_Id");
//     if (storedSchoolId) {
//       setSchoolId(storedSchoolId);
//     }
//   }, []);

//   const { data, isLoading, isError, refetch } = useGetClassesQuery(schoolId, {
//     skip: !schoolId, // This will skip the query until schoolId is available
//   });

//   useEffect(() => {
//     if (schoolId) {
//       refetch();
//     }
//   }, [schoolId, refetch]);

//   const handleDelete = async (id) => {
//     try {
//       await deleteClass(id).unwrap();
//       refetch(); // Refresh the data after deletion
//       toast.success("Class deleted successfully.");
//     } catch (error) {
//       console.error("Failed to delete the class:", error);
//       toast.error("Error deleting class.");
//     }
//   };

//   if (isLoading)
//     return (
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ height: "70vh" }}
//       >
//         <h1>Loading Classes...</h1>
//       </div>
//     );
//   if (isError)
//     return (
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ height: "70vh" }}
//       >
//         <h1>Error Loading Classes...</h1>
//       </div>
//     );

//   return (
//     <div className="padding tablet_padding">
//       <div className="teachers_div">
//         <div className="teachers_heading d-flex justify-content-between align-items-center">
//           <h2 className="medium_font font_size_24"> Classes </h2>
//           <Link href="/principal-panel/classes/add-new-class">
//             <Button
//               icon={
//                 <CiCirclePlus
//                   className="me-2 text_color"
//                   style={{ fontSize: "25px" }}
//                 />
//               }
//               text="Add New Class"
//               className=""
//             />
//           </Link>
//         </div>
//       </div>
//       <div className="teachers_table_main_div mt-1 mt-md-4">
//         <div className="mobile_screen_table_div d-block d-xxl-none d-xl-none d-lg-none d-md-none">
//           <MobileScreenStudentsTable />
//         </div>
//         <div className="d-none d-xxl-block d-xl-block d-lg-block d-md-block">
//           <table className="table table_1 medium_font font_size_14 table-responsive">
//             <thead className="table-light border-1 rounded-top-3">
//               <tr>
//                 <th>Grade</th>
//                 <th>School ID</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data?.classes?.map((curData, index) => (
//                 <tr key={index} className="border-1">
//                   <td>{curData.grade}</td>
//                   <td>{curData.school.id}</td>
//                   <td className="icon_main_div">
//                     <div className="rounded-3 icon_div d-flex align-items-center justify-content-around">
//                       <Link
//                         href={`/principal-panel/teachers/add-new-teacher/${curData.id}`}
//                       >
//                         <FaRegEdit className="table_icon text-dark" />
//                       </Link>
//                       <Link href={"#"} onClick={() => handleDelete(curData.id)}>
//                         <RiDeleteBin6Line className="table_icon text-danger" />
//                       </Link>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="pagination_div pt-3 d-none d-xxl-block d-xl-block d-lg-block d-md-block">
//           <nav aria-label="Page navigation example">
//             <ul className="pagination justify-content-around">
//               <li className="page-item">
//                 <Link
//                   href="#"
//                   className="page-link rounded text-dark"
//                   aria-disabled="true"
//                 >
//                   <FaArrowLeft className="me-2" />
//                   Previous
//                 </Link>
//               </li>
//               <ul className="pagination">
//                 <li className="page-item">
//                   <Link href="#" className="page-links">
//                     1
//                   </Link>
//                 </li>
//                 <li className="page-item">
//                   <Link href="#" className="page-links">
//                     2
//                   </Link>
//                 </li>
//                 <li className="page-item">
//                   <Link href="#" className="page-links">
//                     3
//                   </Link>
//                 </li>
//               </ul>
//               <li className="page-item ">
//                 <Link href="#" className="page-link rounded text-dark">
//                   Next
//                   <FaArrowRight className="ms-2" />
//                 </Link>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;

const Page = () => {
  return (
    <div>
      <h1>Testing</h1>
    </div>
  );
};
export default Page;
