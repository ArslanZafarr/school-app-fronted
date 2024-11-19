"use client";
import Button from "@/app/components/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import { addPowerSubject } from "@/services/admin/powerclass";
import { useSelector } from "react-redux";

const Page = () => {
  const initialFormData = {
    name: "",
    class_grade: "",
  };

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
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.class_grade) tempErrors.class_grade = "Class is required";

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
        const response = await addPowerSubject(formPayload, apiToken);
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
      <h3 className="medium_font font_size_24 my-3">Add New Power Subject</h3>
      <div className="inputs_div card_border rounded p-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="name"
              className="form-label medium_font font_size_16"
            >
              Subject
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              id="name"
              placeholder="Enter a subject name"
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </div>



          <div className="mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label medium_font font_size_16"
              >
                Class Grade
              </label>
              <select
                class="orange-select form-select mb-3"
                aria-label=".form-select-lg example"
                value={formData.class_grade}
                onChange={handleChange}
                name="class_grade"
              >
                <option selected>Select Class Grade</option>
                <option value={9}>Class 9</option>
                <option value={10}>Class 10</option>
                <option value={11}>Class 11</option>
                <option value={12}>Class 12</option>
              </select>
              {errors.class_grade && (
                <span className="text-danger">{errors.class_grade}</span>
              )}
            </div>


          <div className="btn_div mt-5 mb-3" style={{ width: "200px" }}>
            <Button text={"Add Power Subject"} type={"submit"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
