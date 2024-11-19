"use client";
import Button from "@/app/components/Button";
import "./add-new-teacher.css";
import { useState, useEffect } from "react";
import {
  useCreateTeacherMutation,
  useGetTeachersQuery,
} from "@/redux/features/principal-panel/teachers/TeachersApi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { teacherBulkUpload } from "@/services/principal/dashboard";
import { useSelector } from "react-redux";
import Image from "next/image";
import { FaEyeSlash } from "react-icons/fa6";
const Page = () => {
  const initialFormData = {
    full_name: "",
    email: "",
    password: "",
    phone_number: "",
    excel_file: "",
    subject: "",
    experience: "",
    school_id: "",
    image: "",
  };
  const [typepassword, settypepassword] = useState(true);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [loading, setloading] = useState(false);
  const [excelsheet, setexcelsheet] = useState();
  const [createTeacher, { isLoading: isCreating, isError: isCreateError }] =
    useCreateTeacherMutation();
  const { apiToken } = useSelector((state) => state.storeAuth);
  const {
    data: GetTeachersData,
    isLoading: isFetching,
    isError: isFetchError,
    refetch,
  } = useGetTeachersQuery();
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      console.log("47", parsedUserData);
      setFormData((prevFormData) => ({
        ...prevFormData,
        school_id: parsedUserData["profile"]?.["role_profile"]?.["id"], // Set school_id from userData
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFiles = (e, name) => {
    setFormData({
      ...formData,
      [name]: e.target.files[0],
    });
  };
  const validateForm = () => {
    const tempErrors = {};

    if (!formData.full_name) tempErrors.full_name = "Full name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.password) tempErrors.password = "Password is required";
    if (formData.password && formData.password.length < 8)
      tempErrors.password = "Password must be at least 8 characters";
    if (!formData.phone_number)
      tempErrors.phone_number = "Phone number is required";
    // if (!formData.excel_file) tempErrors.excel_file = 'Excel file is required';
    if (!formData.subject) tempErrors.subject = "Subject is required";
    if (!formData.experience) tempErrors.experience = "Experience is required";
    if (!formData.school_id) tempErrors.school_id = "School ID is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  if (isCreating || isFetching || loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <h1>Loading...</h1>
      </div>
    );
  if (isCreateError || isFetchError)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <h1>Error occurred...</h1>
      </div>
    );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formPayload = new FormData();
      for (const key in formData) {
        formPayload.append(key, formData[key]);
      }

      try {
        const response = await createTeacher(formPayload).unwrap();
        toast.success("Data submitted successfully.");
        setFormData(initialFormData);
        setErrors({});
        refetch(); // Refresh the data
        router.push("/principal-panel/teachers"); // Redirect after successful submission
      } catch (error) {
        const message = error.data?.message || "Invalid data";
        toast.error(message);
        console.log(error);
      }
    } else {
      console.log("Validation failed");
    }
  };
  const submitusingexcelsheet = async () => {
    if (excelsheet) {
      const formPayload = new FormData();
      formPayload.append("school_id", formData["school_id"]);
      formPayload.append("excel_file", excelsheet);
      setloading(true);
      try {
        const response = await teacherBulkUpload(formPayload, apiToken);
        toast.success("Data submitted successfully.");
        setloading(false);
        setexcelsheet(null);
        router.push("/principal-panel/teachers"); // Redirect after successful submission
      } catch (error) {
        setloading(false);
        const message = error.data?.message || "Invalid data";
        toast.error(message);
        console.log(error);
      }
    } else {
      console.log("Validation failed");
    }
  };

  return (
    <div className="add_new_teacher_main_div padding">
      <h3 className="medium_font font_size_24 my-3">Add New Teacher</h3>
      <div className="inputs_div card_border rounded p-3">
        <div>
          <div className="mb-3">
            <label
              htmlFor="excel_file"
              className="form-label medium_font font_size_16"
            >
              Excel File
            </label>
            <input
              type="file"
              // value={excelsheet}
              onChange={(e) => setexcelsheet(e.target.files[0])}
              className="form-control"
              placeholder="Excel File"
              accept=".xlsx,.xls"
            />
          </div>
          <div
            onClick={submitusingexcelsheet}
            className="btn_div mt-2 mb-3"
            style={{ width: "200px" }}
          >
            <Button text={"Add Teacher using Excel Sheet"} />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="full_name"
              className="form-label medium_font font_size_16"
            >
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="form-control"
              id="full_name"
              placeholder="Enter a name"
            />
            {errors.full_name && (
              <div className="text-danger">{errors.full_name}</div>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label medium_font font_size_16"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              id="email"
              placeholder="Email Address"
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="form-label medium_font font_size_16"
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={typepassword ? "password" : "text"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                id="password"
                placeholder="Password"
              />{" "}
              <div
                className="passwordshow"
                onClick={() => settypepassword(!typepassword)}
              >
                <FaEyeSlash />
              </div>
            </div>
            {errors.password && (
              <div className="text-danger">{errors.password}</div>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="phone_number"
              className="form-label medium_font font_size_16"
            >
              Phone Number
            </label>
            <input
              type="number"
              name="phone_number"
              onWheel={(event) => event.currentTarget.blur()}
              value={formData.phone_number}
              onChange={handleChange}
              className="form-control"
              id="phone_number"
              placeholder="Phone Number"
            />
            {errors.phone_number && (
              <div className="text-danger">{errors.phone_number}</div>
            )}
          </div>

          <div className="mb-3">
            <label
              htmlFor="subject"
              className="form-label medium_font font_size_16"
            >
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="form-control"
              id="subject"
              placeholder="Subject"
            />
            {errors.subject && (
              <div className="text-danger">{errors.subject}</div>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="experience"
              className="form-label medium_font font_size_16"
            >
              Experience
            </label>
            <input
              type="number"
              name="experience"
              onWheel={(event) => event.currentTarget.blur()}
              value={formData.experience}
              onChange={handleChange}
              className="form-control"
              id="experience"
              placeholder="Experience"
            />
            {errors.experience && (
              <div className="text-danger">{errors.experience}</div>
            )}
          </div>
          <div className="mb-3">
            {/* <label htmlFor="school_id" className="form-label medium_font font_size_16">
                            School ID
                        </label>
                        <input
                            type="number"
                            name='school_id'
                            value={formData.school_id}
                            onChange={handleChange}
                            className="form-control"
                            id="school_id"
                            placeholder='School ID'
                        /> */}
            {errors.school_id && (
              <div className="text-danger">{errors.school_id}</div>
            )}
          </div>
          <div className="upload_file_div mt-3">
            <h3 className="medium_font font_size_18"> Photo </h3>
            <div className="upload_file_area">
              <div className="upload_file_content_area">
                <input
                  type="file"
                  id="fileUploadcover"
                  className="file-upload-input"
                  onChange={(e) => handleFiles(e, "image")}
                  name="cover_image"
                />
                <label
                  htmlFor="fileUploadcover"
                  className="d-flex flex-column justify-content-center align-items-center"
                  style={{ height: "200px" }}
                >
                  <Image
                    className="mb-3 cursor_image"
                    src="/assets/images/dashboard/content-upload/Upload-icon.png"
                    alt="fileUploadcover"
                    width={50}
                    height={50}
                  />
                  <p className="medium_font font_size_16 mb-1">
                    {" "}
                    Drag & drop files or Browse{" "}
                  </p>
                  <p className="font_size_14 text_muted">
                    {" "}
                    Supported formates: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word,
                    PPT{" "}
                  </p>
                </label>
              </div>
            </div>
          </div>
          <div className="btn_div mt-5 mb-3" style={{ width: "200px" }}>
            <Button
              text={isCreating ? "Loading.." : "Add Teacher"}
              type={"submit"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
