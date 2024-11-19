// 'use client'
// import './students.css';
// import Button from '@/app/components/Button';
// import { CiCirclePlus } from 'react-icons/ci';
// import Image from 'next/image';
// import { FaArrowLeft, FaArrowRight, FaRegEdit } from 'react-icons/fa';
// import MobileScreenStudentsTable from '@/app/components/Tables/MobileScreensTables/StudentsTable';
// import Link from 'next/link';
// import { useGetStudentsQuery } from '@/redux/features/principal-panel/students/StudentsApi';

// const Page = () => {

//     const {data, isLoading, isError}=useGetStudentsQuery();
//     console.log("🚀 ~ page ~ data:", data)

//     return (
//         <div className='padding tablet_padding'>
//             <div className='teachers_div'>
//                 <div className="teachers_heading d-flex justify-content-between align-items-center">
//                     <h2 className="medium_font font_size_24"> Students </h2>
//                     <Link href="/principal-panel/students/add-new-student">
//                         <Button icon={<CiCirclePlus className="me-2 text_color" style={{ fontSize: '25px' }} />
//                         } text="Add New Student"
//                             className="" />
//                     </Link>
//                 </div>
//             </div>
//             <div className='teachers_table_main_div mt-1 mt-md-4'>
//                 <div className='mobile_screen_table_div d-block d-xxl-none d-xl-none d-lg-none d-md-none'>
//                     <MobileScreenStudentsTable />
//                 </div>
//                 <div className='d-none d-xxl-block d-xl-block d-lg-block d-md-block'>
//                     <table className="table table_1 medium_font font_size_14 table-responsive">
//                         <thead className="table-light border-1 rounded-top-3">
//                             <tr>
//                                 <th>Name</th>
//                                 <th>Gender</th>
//                                 <th>Date of Birth</th>
//                                 <th>Parents Contact</th>
//                                 <th>class</th>
//                                 <th>Roll No</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {/* {tableData.map((curData, index) => (
//                                 <tr key={index} className="border-1">
//                                     <td> <span> <Image className='border rounded-circle me-2' src={curData.image} alt='image' width={50} height={50} /> {curData.name} </span> </td>
//                                     <td > <span>{curData.gender}</span></td>
//                                     <td>
//                                         <span>
//                                             {curData.date_of_birth}
//                                         </span>
//                                     </td>
//                                     <td>{curData.contact}</td>
//                                     <td>{curData.class}</td>
//                                     <td className="icon_main_div">
//                                         {curData.roll_no}
//                                     </td>
//                                 </tr>
//                             ))} */}
//                         </tbody>
//                     </table>
//                 </div>
//                 <div className="pagination_div pt-3 d-none d-xxl-block d-xl-block d-lg-block d-md-block">
//                     <nav aria-label="Page navigation example">
//                         <ul className="pagination justify-content-around">
//                             <li className="page-item">
//                                 <Link href="#" className="page-link rounded text-dark" aria-disabled="true">
//                                     <FaArrowLeft className="me-2" />
//                                     Previous
//                                 </Link>
//                             </li>
//                             <ul className="pagination">
//                                 <li className="page-item">
//                                     <Link href="#" className="page-links">
//                                         1
//                                     </Link>
//                                 </li>
//                                 <li className="page-item">
//                                     <Link href="#" className="page-links">
//                                         2
//                                     </Link>
//                                 </li>
//                                 <li className="page-item">
//                                     <Link href="#" className="page-links">
//                                         3
//                                     </Link>
//                                 </li>
//                             </ul>
//                             <li className="page-item ">
//                                 <Link href="#" className="page-link rounded text-dark">
//                                     Next
//                                     <FaArrowRight className="ms-2" />
//                                 </Link>
//                             </li>
//                         </ul>
//                     </nav>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Page

const Page = () => {
  return (
    <div>
      <h1>Testing</h1>
    </div>
  );
};
export default Page;
