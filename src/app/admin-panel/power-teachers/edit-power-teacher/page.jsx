"use client";
import Button from "@/app/components/Button";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import axios from "axios";
import { useSelector } from "react-redux";
import { base_url } from "@/bootapi";
import { updateTutor } from "@/services/admin/powerclass";

const MyComponent = () => {
  const initialFormData = {
    full_name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: "",
    subject: "",
  };
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isloading, setloading] = useState(false);
  const { apiToken } = useSelector((state) => state.storeAuth);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    console.log("31", searchParams.get("id"));
    if (searchParams.get("id")) {
      console.log("33");
      setloading(true);
      axios
        .get(
          `${base_url}/admin/power-classes/tutors/${searchParams.get("id")}`,
          {
            headers: {
              Authorization: `Bearer ${apiToken}`,
            },
          }
        )
        .then((res) => {
          setloading(false);
          console.log("46", res.data);
          if (res.data.success) {
            let data = res.data.data;
            let obj = {
              full_name: data.profile.full_name,
              email: data.profile.user.email,
              password: data.profile.user.password,
              phone: data.profile.phone,
              age: data.age,
              gender: data.gender,
              subject: data.subject,
            };
            console.log("52", obj);
            setFormData(obj);
          } else {
            setFormData(initialFormData);
          }
        })
        .catch((err) => {
          console.log("62", err);
          setloading(false);
          setFormData(initialFormData);
        });
    }
  }, []);

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
        const response = await updateTutor(
          searchParams.get("id"),
          formPayload,
          apiToken
        );
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
      <h3 className="medium_font font_size_24 my-3">Edit Power Teacher</h3>
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
          {/* <div className="mb-3">
            <label
              htmlFor="password"
              className="form-label medium_font font_size_16"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              id="password"
              placeholder="Password"
            />
            {errors.password && (
              <div className="text-danger">{errors.password}</div>
            )}
          </div> */}
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
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
              onWheel={(event) => event.currentTarget.blur()}
              id="phone"
              placeholder="Phone Number"
            />
            {errors.phone && <div className="text-danger">{errors.phone}</div>}
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
              className="form-control"
              onWheel={(event) => event.currentTarget.blur()}
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
            <Button text={"Edit Power Teacher"} type={"submit"} />
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
