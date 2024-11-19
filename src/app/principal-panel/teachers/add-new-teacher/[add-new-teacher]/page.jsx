"use client";
import Button from "@/app/components/Button";
import "./add-new-teacher.css";
import { useState, useEffect } from "react";
import {
  useGetTeacherQuery,
  useGetTeachersQuery,
  useUpdateTeacherMutation,
} from "@/redux/features/principal-panel/teachers/TeachersApi";
import { useParams, useRouter } from "next/navigation"; // Import useRouter for redirection
import { toast } from "react-toastify"; // Import toast for notifications
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
  };
  const [typepassword, settypepassword] = useState(true);
  const id = useParams()["add-new-teacher"]; // Get the ID from the route parameters
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const { data, isLoading, isError } = useGetTeacherQuery(id); // Fetch teacher data
  const [updateTeacher, { isLoading: isUpdating, isError: isUpdateError }] =
    useUpdateTeacherMutation();
  const { refetch } = useGetTeachersQuery();
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    document.querySelectorAll("input[type=number]").forEach(function (input) {
      input.addEventListener("wheel", function (e) {
        e.preventDefault();
      });
    });
  }, []);
  useEffect(() => {
    if (data) {
      setFormData({
        full_name: data?.teacher?.profile?.full_name || "",
        email: data?.teacher?.profile?.user?.email || "",
        password: data?.teacher?.profile?.user?.password || "",
        phone_number: data?.teacher?.profile?.phone || "",
        excel_file: data?.teacher?.excel_file || "",
        subject: data?.teacher?.subject || "",
        experience: data?.teacher?.experience || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const tempErrors = {};

    if (!formData.full_name) tempErrors.full_name = "Full name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.password && id)
      tempErrors.password = "Password is required for new entries";
    if (formData.password && formData.password.length < 8)
      tempErrors.password = "Password must be at least 8 characters";
    if (!formData.phone_number)
      tempErrors.phone_number = "Phone number is required";
    if (!formData.excel_file) tempErrors.excel_file = "Excel file is required";
    if (!formData.subject) tempErrors.subject = "Subject is required";
    if (!formData.experience) tempErrors.experience = "Experience is required";
    // if (!formData.school_id) tempErrors.school_id = 'School ID is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  if (isLoading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <h1>Loading...</h1>
      </div>
    );
  if (isError)
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
        if (id) {
          // Update existing teacher
          await updateTeacher({ id: id, userData: formPayload }).unwrap();
          toast.success("Data submitted successfully.");
          setFormData(initialFormData);
          setErrors({});
          refetch();
          router.push("/principal-panel/teachers"); // Redirect after successful submission
        }
      } catch (error) {
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
      <h3 className="medium_font font_size_24 my-3">
        {id ? "Edit Teacher" : "Add New Teacher"}
      </h3>
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
              value={formData.phone_number}
              onChange={handleChange}
              className="form-control"
              onWheel={(event) => event.currentTarget.blur()}
              id="phone_number"
              placeholder="Phone Number"
            />
            {errors.phone_number && (
              <div className="text-danger">{errors.phone_number}</div>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="excel_file"
              className="form-label medium_font font_size_16"
            >
              Excel File
            </label>
            <input
              type="text"
              name="excel_file"
              value={formData.excel_file}
              onChange={handleChange}
              className="form-control"
              id="excel_file"
              placeholder="Excel File"
            />
            {errors.excel_file && (
              <div className="text-danger">{errors.excel_file}</div>
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
              value={formData.experience}
              onWheel={(event) => event.currentTarget.blur()}
              onChange={handleChange}
              className="form-control"
              id="experience"
              placeholder="Experience"
            />
            {errors.experience && (
              <div className="text-danger">{errors.experience}</div>
            )}
          </div>
          {/* <div className="mb-3">
                        <label htmlFor="school_id" className="form-label medium_font font_size_16">
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
                        />
                        {errors.school_id && <div className="text-danger">{errors.school_id}</div>}
                    </div> */}
          <div className="btn_div mt-5 mb-3" style={{ width: "200px" }}>
            <Button
              text={id ? "Update Teacher" : "Add Teacher"}
              type={"submit"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
``;
