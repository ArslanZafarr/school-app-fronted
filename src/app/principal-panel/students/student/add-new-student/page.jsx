"use client";
import Button from "@/app/components/Button";
import "./add-new-student.css";
import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addStudent, fetchClasses } from "@/services/principal/student";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaEyeSlash } from "react-icons/fa6";
const Page = () => {
  const initialFormData = {
    full_name: "",
    email: "",
    password: "",
    gender: "",
    date_of_birth: "",
    parent_contact_number: "",
    class_id: "",
  };
  const [typepassword, settypepassword] = useState(true);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [classes, setclasses] = useState([]);
  const { apiToken, userData } = useSelector((state) => state.storeAuth);
  const router = useRouter();
  useEffect(() => {
    console.log("22", userData);
    getClasses();
  }, []);
  const getClasses = async (page) => {
    if (apiToken) {
      try {
        let res = await fetchClasses(
          userData?.["profile"]?.["role_profile"]?.["id"],
          apiToken
        );
        if (res.data.success) {
          setclasses(res.data.classes);
        } else {
          setclasses([]);
        }
        console.log("25", res.data);
      } catch (e) {
        setclasses([]);
        console.log("30", e);
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.full_name) tempErrors.full_name = "Name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.password) tempErrors.password = "Password is required";
    if (!formData.gender) tempErrors.gender = "Gender is required";
    if (!formData.date_of_birth)
      tempErrors.date_of_birth = "Date of Birth is required";
    if (!formData.parent_contact_number)
      tempErrors.parent_contact_number = "Contact Number is required";
    if (!formData.class_id) tempErrors.class_id = "Class is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setisLoading(true);
      const formPayload = new FormData();
      for (const key in formData) {
        formPayload.append(key, formData[key]);
      }
      try {
        const response = await addStudent(formPayload, apiToken);
        console.log("73", response);
        toast.success("Data submitted successfully.");
        setFormData(initialFormData);
        setErrors({});
        setisLoading(false);
        //   refetch(); // Refetch the data after successful creation
        // router.push("/principal-panel/students/student");
      } catch (error) {
        setisLoading(false);
        const message = error.data?.message || "Invalid data";
        toast.error(message);
        console.log(error);
      }
    } else {
      console.log("Validation failed");
    }
  };
  if (isLoading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <p>Loading...</p>
      </div>
    );
  return (
    <div className="add_new_teacher_main_div padding tablet_padding">
      <div className="teachers_div">
        <div className="teachers_heading d-flex justify-content-between align-items-center mb-3">
          <h2 className="medium_font font_size_24"> Add New Students </h2>
          {/* <Link href="/principal-panel/students/add-new-student">
            <Button
              icon={
                <CiCirclePlus
                  className="me-2 text_color"
                  style={{ fontSize: "25px" }}
                />
              }
              text="Upload Using Excel"
              className=""
            />
          </Link> */}
        </div>
      </div>

      <div className="inputs_div card_border rounded p-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label medium_font font_size_16"
            >
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter a name"
              value={formData.full_name}
              onChange={handleChange}
              name="full_name"
            />
            {errors.full_name && (
              <span className="text-danger">{errors.full_name}</span>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label medium_font font_size_16"
            >
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              name="email"
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label medium_font font_size_16"
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={typepassword ? "password" : "text"}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                name="password"
              />{" "}
              <div
                className="passwordshow"
                onClick={() => settypepassword(!typepassword)}
              >
                <FaEyeSlash />
              </div>
            </div>
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>

          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label medium_font font_size_16"
            >
              Gender
            </label>
            <div
              className="my-4 d-flex justify-content-between align-items-center"
              style={{ width: "300px" }}
            >
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input radio_btn"
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  defaultValue="option1"
                  checked={formData.gender === "male"}
                  onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor="male">
                  Male
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input radio_btn"
                  type="radio"
                  name="gender"
                  id="female"
                  defaultValue="female"
                  checked={formData.gender === "female"}
                  onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor="female">
                  Female
                </label>
              </div>
            </div>
            {errors.gender && (
              <span className="text-danger">{errors.gender}</span>
            )}
          </div>

          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label medium_font font_size_16"
            >
              Date of Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Date of Birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              name="date_of_birth"
            />
            {errors.date_of_birth && (
              <span className="text-danger">{errors.date_of_birth}</span>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label medium_font font_size_16"
            >
              Parent’s Contact Number
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleInputEmail1"
              onWheel={(event) => event.currentTarget.blur()}
              aria-describedby="emailHelp"
              placeholder="Contact number"
              value={formData.parent_contact_number}
              onChange={handleChange}
              name="parent_contact_number"
            />
            {errors.parent_contact_number && (
              <span className="text-danger">
                {errors.parent_contact_number}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label medium_font font_size_16"
            >
              Class
            </label>
            <select
              class="orange-select form-select form-select-lg mb-3 font_size_16"
              aria-label=".form-select-lg example"
              value={formData.class_id}
              onChange={handleChange}
              name="class_id"
            >
              <option selected>Select Class</option>
              {classes.map((item, index) => (
                <option key={index} value={item.id}>
                  Class {item.grade}
                </option>
              ))}
            </select>
            {errors.class_id && (
              <span className="text-danger">{errors.class_id}</span>
            )}
          </div>
          <div className="btn_div mt-5 mb-3" style={{ width: "200px" }}>
            <Button text="Add Student" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
