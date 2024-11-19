// import { useDispatch } from "react-redux";
// import { useRouter } from "next/navigation"; // Import the useRouter hook
// import { logout } from "@/redux/features/auth/authSlice";
// import Image from "next/image";
// import "./Modals/Logout/logout.css";
// import { toast } from "react-toastify";
// import Link from "next/link";

// const LogoutButton = ({ className }) => {
//   const dispatch = useDispatch();
//   const router = useRouter(); // Initialize the useRouter hook

//   const handleLogout = () => {
//     // Show toast notification before logout
//     toast.success("User logged out successfully!");

//     // Perform logout action
//     dispatch(logout());
//     router.push("/");
//   };

//   return (
//     <button
//       data-bs-toggle="modal"
//       data-bs-target="#staticBackdrop"
//       className={`btn hover_color d-flex text-dark logout_btn ${className}`}
//     >
//       <span>
//         <Image
//           className="me-3"
//           src="/assets/images/dashboard/logout.png"
//           width={20}
//           height={20}
//           alt="Logout icon"
//         />
//         Log out
//       </span>
//       {/* Modal */}
//       <div
//         className="modal fade"
//         id="staticBackdrop"
//         data-bs-backdrop="static"
//         data-bs-keyboard="false"
//         tabIndex={-1}
//         aria-labelledby="staticBackdropLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
//           <div className="modal-content p-3">
//             <div className="modal-header border-0">
//               <h1 className="medium_font font_size_22" id="staticBackdropLabel">
//                 Log out
//               </h1>
//             </div>
//             <div className="modal-body">
//               <p className="font_size_18" style={{ textAlign: "start" }}>
//                 You are about to log out of Siksha Matic. Are you sure?
//               </p>
//             </div>
//             <div
//               className="border-0"
//               style={{ display: "flex", justifyContent: "flex-end" }}
//             >
//               <div style={{ flex: 0.32 }}></div>
//               <button
//                 style={{ flex: 0.32 }}
//                 type="button"
//                 className="btn modal_btn_2"
//                 data-bs-dismiss="modal"
//               >
//                 Cancel
//               </button>
//               <button
//                 style={{ flex: 0.32 }}
//                 href={"#"}
//                 type="button"
//                 className="btn modal_btn rounded-3 ms-2"
//                 onClick={handleLogout}
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </button>
//   );
// };

// export default LogoutButton;









// import { useDispatch } from "react-redux";
// import { useRouter } from "next/navigation"; // Import the useRouter hook
// import { logout } from "@/redux/features/auth/authSlice";
// import Image from "next/image";
// import "./Modals/Logout/logout.css";
// import { toast } from "react-toastify";
// import Link from "next/link";
// import { useEffect, useState } from "react"; // Import useState and useEffect

// const LogoutButton = ({ className }) => {
//   const dispatch = useDispatch();
//   const router = useRouter(); // Initialize the useRouter hook
//   const [showModal, setShowModal] = useState(false); // Modal state

//   const handleLogout = () => {
//     alert("hi")
//     // Show toast notification before logout
//     toast.success("User logged out successfully!");

//     // Perform logout action
//     dispatch(logout());
//     router.push("/");
//   };

//   const handleButtonClick = () => {
//     setShowModal(true); // Show the modal on button click
//   };

//   const handleCloseModal = () => {
//     setShowModal(false); // Hide the modal
//   };

//   return (
//     <>
//       <button
//         onClick={handleButtonClick}
//         className={`btn hover_color d-flex text-dark logout_btn ${className}`}
//       >
//         <span>
//           <Image
//             className="me-3"
//             src="/assets/images/dashboard/logout.png"
//             width={20}
//             height={20}
//             alt="Logout icon"
//           />
//           Log out
//         </span>
//       </button>

//       {/* Modal */}
//       {showModal && (
//         <div
//           className="modal fade show"
//           id="staticBackdrop"
//           style={{ display: "block" }}
//           tabIndex={-1}
//           aria-labelledby="staticBackdropLabel"
//           aria-hidden="true"
//         >
//           <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
//             <div className="modal-content p-3">
//               <div className="modal-header border-0">
//                 <h1 className="medium_font font_size_22" id="staticBackdropLabel">
//                   Log out
//                 </h1>
//               </div>
//               <div className="modal-body">
//                 <p className="font_size_18" style={{ textAlign: "start" }}>
//                   You are about to log out of Siksha Matic. Are you sure?
//                 </p>
//               </div>
//               <div
//                 className="border-0"
//                 style={{ display: "flex", justifyContent: "flex-end" }}
//               >
//                 <div style={{ flex: 0.32 }}></div>
//                 <button
//                   style={{ flex: 0.32 }}
//                   type="button"
//                   className="btn modal_btn_2"
//                   onClick={handleCloseModal}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   style={{ flex: 0.32 }}
//                   type="button"
//                   className="btn modal_btn rounded-3 ms-2"
//                   onClick={() => {
//                     handleLogout();
//                     handleCloseModal();
//                   }}
//                 >
//                   Confirm
//                 </button>
//               </div>
//             </div>
//           </div>
         
//         </div>
//       )}
//     </>
//   );
// };

// export default LogoutButton;


 {/* <div className="modal-backdrop fade show" onClick={handleCloseModal}></div> */}





 import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import { logout } from "@/redux/features/auth/authSlice";
import Image from "next/image";
import "./Modals/Logout/logout.css";
import { toast } from "react-toastify";
import { useState } from "react"; // Import useState

const LogoutButton = ({ className }) => {
  const dispatch = useDispatch();
  const router = useRouter(); // Initialize the useRouter hook
  const [showModal, setShowModal] = useState(false); // Modal state

  const handleLogout = () => {
    // Show toast notification before logout
    toast.success("User logged out successfully!");

    // Perform logout action
    dispatch(logout());
    router.push("/");
  };

  const handleButtonClick = () => {
    setShowModal(true); // Show the modal on button click
  };

  const handleCloseModal = () => {
    setShowModal(false); // Hide the modal
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        className={`btn hover_color d-flex text-dark logout_btn ${className}`}
      >
        <span>
          <Image
            className="me-3"
            src="/assets/images/dashboard/logout.png"
            width={20}
            height={20}
            alt="Logout icon"
          />
          Log out
        </span>
      </button>

      {/* Modal */}
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none", opacity: showModal ? 1 : 0 }}
        id="staticBackdrop"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden={!showModal}
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content p-3">
            <div className="modal-header border-0">
              <h1 className="medium_font font_size_22" id="staticBackdropLabel">
                Log out
              </h1>
            </div>
            <div className="modal-body">
              <p className="font_size_18" style={{ textAlign: "start" }}>
                You are about to log out of Siksha Matic. Are you sure?
              </p>
            </div>
            <div
              className="border-0"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <div style={{ flex: 0.32 }}></div>
              <button
                style={{ flex: 0.32 }}
                type="button"
                className="btn modal_btn_2"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                style={{ flex: 0.32 }}
                type="button"
                className="btn modal_btn rounded-3 ms-2"
                onClick={() => {
                  handleLogout();
                  handleCloseModal();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoutButton;
