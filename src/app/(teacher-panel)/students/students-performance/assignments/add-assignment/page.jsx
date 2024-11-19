"use client";
import { useSearchParams } from "next/navigation";
import Button from "../../../../../components/Button";
import { Suspense, useEffect, useState } from "react";
import {
  createAssignment,
  getSubjectClassId,
} from "@/services/teacher/teacherApiService";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const MyComponent = () => {
  const searchParams = useSearchParams();
  const initialFormData = {
    subject_id: "",
    topic: "",
    due_date: "",
    upload_files: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [subjects, setsubjects] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const { apiToken, teacherProfile } = useSelector((state) => state.storeAuth);
  useEffect(() => {
    getSubjects();
  }, []);
  const getSubjects = async () => {
    setisLoading(true);
    try {
      let res = await getSubjectClassId(
        teacherProfile?.["teacher_profile"]?.["id"],
        searchParams.get("class_id"),
        apiToken
      );
      setisLoading(false);
      if (res.data.success) {
        setsubjects(res.data.subjects);
      } else {
        setsubjects([]);
      }
    } catch (e) {
      setisLoading(false);
      setsubjects([]);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.subject_id) tempErrors.subject_id = "Subject is required";
    if (!formData.topic) tempErrors.topic = "Topic is required";
    if (!formData.due_date) tempErrors.due_date = "Due Date is required";

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
      formPayload.append("class_id", searchParams.get("class_id"));
      formPayload.append(
        "teacher_id",
        teacherProfile?.["teacher_profile"]["id"]
      );
      try {
        const response = await createAssignment(formPayload, apiToken);
        toast.success(response.data.message);
        setFormData(initialFormData);
        setErrors({});
        setisLoading(false);
        //   refetch(); // Refetch the data after successful creation
        //   router.push('/admin-panel/school-management');
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
    <div className="padding tablet_padding">
      <h3 className="medium_font font_size_24 mb-4">Add Assignment</h3>
      <form onSubmit={handleSubmit}>
        <div className="card_border rounded p-xxl-4 p-xl-4 p-lg-4 p-md-4">
          <div className="mb-3">
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label medium_font font_size_16"
            >
              Subject
            </label>
            <select
              class="orange-select form-select form-select-lg mb-3 font_size_16"
              aria-label=".form-select-lg example"
              value={formData.subject_id}
              onChange={handleChange}
              name="subject_id"
            >
              <option selected>Select Subject</option>
              {subjects.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.subject_id && (
              <span className="text-danger">{errors.subject_id}</span>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label medium_font font_size_16"
            >
              Topic
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Topic"
              value={formData.topic}
              onChange={handleChange}
              name="topic"
            />
            {errors.topic && (
              <span className="text-danger">{errors.topic}</span>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleFormControlInput1"
              className="form-label medium_font font_size_16"
            >
              Due Date
            </label>
            <input
              type="date"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter a name"
              value={formData.due_date}
              onChange={handleChange}
              name="due_date"
            />
            {errors.due_date && (
              <span className="text-danger">{errors.due_date}</span>
            )}
          </div>
          <div className="btn_div my-5" style={{ width: "180px" }}>
            <Button text="Add Assignment" />
          </div>
        </div>
      </form>
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
