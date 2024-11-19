"use client";
import Button from "@/app/components/Button";
import {
  editTeachers,
  fetchTeacherDetail,
} from "@/services/principal/dashboard";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const MyComponent = () => {
  const searchParams = useSearchParams();
  const initialFormData = {
    full_name: "",
    email: "",
    phone_number: "",
    subject: "",
    experience: "",
    school_id: "",
    image: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const router = useRouter(); // Initialize useRouter
  const [errors, setErrors] = useState({});
  const [loading, setloading] = useState(false);
  const { apiToken } = useSelector((state) => state.storeAuth);
  useEffect(() => {
    getTeacherDetail();
  }, []);
  const getTeacherDetail = async () => {
    setloading(true);
    try {
      let res = await fetchTeacherDetail(searchParams.get("id"), apiToken);
      if (res.data.success) {
        console.log("30", res.data);
        let response = res.data.teacher;
        const storedUserData = localStorage.getItem("userData");
        const parsedUserData = JSON.parse(storedUserData);
        let data = {
          full_name: response.profile?.full_name,
          email: response.profile?.user?.email,
          phone_number: response.profile?.phone,
          subject: response.subject,
          experience: response.experience,
          school_id: parsedUserData["profile"]?.["role_profile"]?.["id"],
        };
        setFormData(data);
      }
      setloading(false);
    } catch (e) {
      setloading(false);
    }
  };
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
    if (!formData.phone_number)
      tempErrors.phone_number = "Phone number is required";
    // if (!formData.excel_file) tempErrors.excel_file = 'Excel file is required';
    if (!formData.subject) tempErrors.subject = "Subject is required";
    if (!formData.experience) tempErrors.experience = "Experience is required";
    if (!formData.school_id) tempErrors.school_id = "School ID is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setloading(true);
      const formPayload = new FormData();
      for (const key in formData) {
        formPayload.append(key, formData[key]);
      }

      try {
        const response = await editTeachers(
          searchParams.get("id"),
          formPayload,
          apiToken
        );
        toast.success("Data submitted successfully.");
        setFormData(initialFormData);
        setErrors({});
        router.push("/principal-panel/teachers");
        setloading(false);
      } catch (error) {
        const message = error.data?.message || "Invalid data";
        toast.error(message);
        setloading(false);
      }
    } else {
      console.log("Validation failed");
    }
  };
  if (loading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div className="add_new_teacher_main_div padding">
      <h3 className="medium_font font_size_24 my-3">Edit Teacher</h3>
      <div className="inputs_div card_border rounded p-3">
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
              readOnly
              type="email"
              name="email"
              value={formData.email}
              //   onChange={handleChange}
              className="form-control"
              id="email"
              placeholder="Email Address"
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
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
            <Button text={"Edit Teacher"} type={"submit"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
}
