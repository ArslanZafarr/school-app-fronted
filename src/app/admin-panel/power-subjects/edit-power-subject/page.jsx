"use client";
import Button from "@/app/components/Button";
import { base_url } from "@/bootapi";
import { updatePowerSubject } from "@/services/admin/powerclass";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const MyComponent = () => {
  const initialFormData = {
    name: "",
    class_grade: "",
  };
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isloading, setloading] = useState(false);
  const { apiToken } = useSelector((state) => state.storeAuth);

  useEffect(() => {
    if (searchParams.get("id")) {
      setloading(true);
      axios
        .get(
          `${base_url}/admin/power-classes/subjects/details/${searchParams.get(
            "id"
          )}`,
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
              name: data.name,
              class_grade: data.class_grade,
            };
            console.log("52", obj);
            setFormData(obj);
          } else {
            setFormData(initialFormData);
          }
        })
        .catch((err) => {
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
        const response = await updatePowerSubject(
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
      <h3 className="medium_font font_size_24 my-3">Edit Power Subject</h3>
      <div className="inputs_div card_border rounded p-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="full_name"
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
              htmlFor="email"
              className="form-label medium_font font_size_16"
            >
              Class Grade
            </label>
            <input
              type="number"
              onWheel={(event) => event.currentTarget.blur()}
              name="class_grade"
              value={formData.class_grade}
              onChange={handleChange}
              className="form-control"
              id="class_grade"
              placeholder="Class Grade"
            />
            {errors.class_grade && (
              <div className="text-danger">{errors.class_grade}</div>
            )}
          </div>

          <div className="btn_div mt-5 mb-3" style={{ width: "200px" }}>
            <Button text={"Edit Power Subject"} type={"submit"} />
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
