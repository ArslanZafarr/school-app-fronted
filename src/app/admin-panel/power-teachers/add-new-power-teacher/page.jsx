"use client";
import Button from "@/app/components/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import { addTutor } from "@/services/admin/powerclass";
import { useSelector } from "react-redux";
import { FaEyeSlash } from "react-icons/fa6";
const Page = () => {
  const initialFormData = {
    full_name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: "",
    subject: "",
  };
  const [typepassword, settypepassword] = useState(true);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isloading, setloading] = useState(false);
  const { apiToken } = useSelector((state) => state.storeAuth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.full_name) tempErrors.full_name = "Full Name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.password) tempErrors.password = "Password is required";
    if (!formData.gender) tempErrors.gender = "Gender is required";
    if (!formData.phone) tempErrors.phone = "Phone is required";
    if (!formData.age) tempErrors.age = "Age is required";
    if (!formData.subject) tempErrors.subject = "Subject Name is required";

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
        const response = await addTutor(formPayload, apiToken);
        console.log("73", response);
        toast.success(response.data.message);
        setFormData(initialFormData);
        setErrors({});
        setloading(false);
        //   refetch(); // Refetch the data after successful creation
        //   router.push('/admin-panel/school-management');
      } catch (error) {
        setloading(false);
        const message = error.data?.message || "Invalid data";
        toast.error(message);
      }
    } else {
      console.log("Validation failed");
    }
  };
  if (isloading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <p>Loading...</p>
      </div>
    );
  return (
    <div className="add_new_teacher_main_div padding">
      <h3 className="medium_font font_size_24 my-3">Add New Power Teacher</h3>
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
              />
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
              htmlFor="phone"
              className="form-label medium_font font_size_16"
            >
              Phone Number
            </label>
            <input
              type="number"
              name="phone"
              onWheel={(event) => event.currentTarget.blur()}
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
              id="phone"
              placeholder="Phone Number"
            />
            {errors.phone && <div className="text-danger">{errors.phone}</div>}
          </div>
          <div className="mb-3">
            <label
              htmlFor="phone"
              className="form-label medium_font font_size_16"
            >
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.phosubjectne}
              onChange={handleChange}
              className="form-control"
              id="subject"
              placeholder="Subject Name"
            />
            {errors.subject && (
              <div className="text-danger">{errors.subject}</div>
            )}
          </div>

          <div className="mb-3">
            <label
              htmlFor="age"
              className="form-label medium_font font_size_16"
            >
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              onWheel={(event) => event.currentTarget.blur()}
              className="form-control"
              id="age"
              placeholder="Age"
            />
            {errors.age && <div className="text-danger">{errors.age}</div>}
          </div>
          <div className="mb-3">
            <label
              htmlFor="gender"
              className="form-label medium_font font_size_16"
            >
              Gender
            </label>
            <select
              class="orange-select form-select form-select-lg mb-3 font_size_16"
              aria-label=".form-select-lg example"
              value={formData.gender}
              onChange={handleChange}
              name="gender"
            >
              <option selected>Select Gender</option>
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
            </select>
            {errors.gender && (
              <div className="text-danger">{errors.gender}</div>
            )}
          </div>
          <div className="btn_div mt-5 mb-3" style={{ width: "200px" }}>
            <Button text={"Add Power Teacher"} type={"submit"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
