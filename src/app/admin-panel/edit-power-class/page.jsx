"use client";
import Button from "@/app/components/Button";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createPowerClass,
  fetchPowerSubjectbyGrade,
  updatePowerClass,
} from "@/services/admin/powerclass";
import { useRouter, useSearchParams } from "next/navigation";
import moment from "moment";
import axios from "axios";
import { base_url } from "@/bootapi";

const MyComponent = () => {
  const searchParams = useSearchParams();
  const initialFormData = {
    class_name: "",
    class_grade: "",
    subject_id: "",
    duration: "",
    description: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    image: "",
  };
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [subject, setsubject] = useState([]);
  const { apiToken } = useSelector((state) => state.storeAuth);
  useEffect(() => {
    if (searchParams.get("id")) {
      getpowerclass();
    }
  }, []);
  const getpowerclass = async () => {
    setisLoading(true);
    try {
      let res = await axios.get(
        `${base_url}/admin/power-classes/classes/${searchParams.get("id")}`,
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        }
      );
      console.log("47", res.data);
      if (res.data.success) {
        let data = res.data.data;
        let obj = {
          class_name: data["class_name"],
          class_grade: data["class_grade"],
          subject_id: data["subject"]["id"],
          duration: data["duration"],
          description: data["description"],
          start_date: data["start_date"],
          end_date: data["end_date"],
          start_time: data["start_time"],
          end_time: data["end_time"],
          id: data["id"],
        };
        getPowerSubject(data["class_grade"]);
        setFormData(obj);
      }
      setisLoading(false);
    } catch (e) {
      console.log("50", e);
      setisLoading(false);
      toast.error("Error fetching Detail");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "class_grade") {
      getPowerSubject(value);
    }
  };

  const getPowerSubject = async (value) => {
    try {
      let res = await fetchPowerSubjectbyGrade(value, apiToken);
      console.log("37", res.data);
      if (res.data.success) {
        setsubject(res.data.data);
      } else {
        setsubject([]);
      }
    } catch (e) {
      setsubject([]);
    }
  };
  const handleFiles = (e, name) => {
    console.log("30", name, e.target.files[0]);
    setFormData({
      ...formData,
      [name]: e.target.files[0],
    });
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
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.class_name) tempErrors.class_name = "Class Name is required";
    if (!formData.class_grade)
      tempErrors.class_grade = "Class Grade is required";
    if (!formData.subject_id) tempErrors.subject_id = "Subject ID is required";
    if (!formData.duration) tempErrors.duration = "Duration is required";
    if (!formData.description)
      tempErrors.description = "Description is required";
    if (!formData.start_date) tempErrors.start_date = "Start Date is required";
    if (!formData.end_date) tempErrors.end_date = "End Date is required";
    if (!formData.start_time) tempErrors.start_time = "Start Time is required";
    if (!formData.end_time) tempErrors.end_time = "End Time is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setisLoading(true);
      const formPayload = new FormData();
      for (const key in formData) {
        if (key === "start_date" || key === "end_date") {
          formPayload.append(key, moment(formData[key]).format("YYYY-MM-DD"));
        } else {
          formPayload.append(key, formData[key]);
        }
      }
      try {
        const response = await updatePowerClass(
          formPayload,
          formData["id"],
          apiToken
        );
        console.log("73", response);
        toast.success("Data submitted successfully.");
        setFormData(initialFormData);
        setErrors({});
        setisLoading(false);
        //   refetch(); // Refetch the data after successful creation
        router.push("/admin-panel/all-power-classes");
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
  return (
    <>
      <div className="time_table_div">
        <div className="time_table_heading">
          <h2 className="medium_font font_size_24 mb-5">
            {" "}
            Edit Power Classes{" "}
          </h2>
        </div>
        <div className="Form_d card_border rounded p-0 p-xxl-4 p-xl-4 p-lg-4 p-md-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label medium_font font_size_16"
              >
                Class Name
              </label>
              <input
                type="text"
                placeholder="Enter a name"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={formData.class_name}
                onChange={handleChange}
                name="class_name"
              />
              {errors.class_name && (
                <span className="text-danger">{errors.class_name}</span>
              )}
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
            <div className="mb-3">
              <label
                htmlFor="exampleInputEmail1"
                className="form-label medium_font font_size_16"
              >
                Subject Id
              </label>
              <select
                class="orange-select form-select mb-3"
                aria-label=".form-select-lg example"
                value={formData.subject_id}
                onChange={handleChange}
                name="subject_id"
              >
                <option selected>Select Subject</option>
                {subject.map((item, index) => (
                  <option value={item.id} key={index}>
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
                htmlFor="exampleInputEmail1"
                className="form-label medium_font font_size_16"
              >
                Duration
              </label>
              <input
                type="text"
                placeholder="e.g 60 mins"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={formData.duration}
                onChange={handleChange}
                name="duration"
              />
              {errors.duration && (
                <span className="text-danger">{errors.duration}</span>
              )}
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">
                Description
              </label>
              <textarea
                placeholder="Enter a description"
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                name="description"
              ></textarea>
              {errors.description && (
                <span className="text-danger">{errors.description}</span>
              )}
            </div>

            <div className="schedule_div">
              <h3 className="medium_font font_size_20 my-4">Schedule</h3>
              <div className="row">
                <div className="col-6">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label medium_font font_size_16"
                    >
                      Start Date
                    </label>
                    <input
                      type="date"
                      placeholder="Select a date"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      style={{ height: "56px" }}
                      value={formData.start_date}
                      onChange={handleChange}
                      name="start_date"
                    />
                    {errors.start_date && (
                      <span className="text-danger">{errors.start_date}</span>
                    )}
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label medium_font font_size_16"
                    >
                      End Date
                    </label>
                    <input
                      type="date"
                      placeholder="Select a date"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      style={{ height: "56px" }}
                      value={formData.end_date}
                      onChange={handleChange}
                      name="end_date"
                    />
                    {errors.end_date && (
                      <span className="text-danger">{errors.end_date}</span>
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label medium_font font_size_16"
                    >
                      Start Time
                    </label>
                    <input
                      type="time"
                      placeholder="Select a time"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={formData.start_time}
                      onChange={handleChange}
                      name="start_time"
                    />
                    {errors.start_time && (
                      <span className="text-danger">{errors.start_time}</span>
                    )}
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label medium_font font_size_16"
                    >
                      End Time
                    </label>
                    <input
                      type="time"
                      placeholder="Select a time"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={formData.end_time}
                      onChange={handleChange}
                      name="end_time"
                    />
                    {errors.end_time && (
                      <span className="text-danger">{errors.end_time}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="content_upload_card mb-3">
              <div className="upload_file_div ">
                <h3 className="medium_font font_size_18 mb-4">
                  {" "}
                  Upload Media{" "}
                </h3>
                <div className="upload_file_area">
                  <div className="upload_file_content_area">
                    <input
                      onChange={(e) => handleFiles(e, "image")}
                      name="image"
                      type="file"
                      id="fileUpload"
                      className="file-upload-input"
                    />
                    <label
                      htmlFor="fileUpload"
                      className="d-flex flex-column justify-content-center align-items-center"
                      style={{ height: "200px" }}
                    >
                      <Image
                        className="mb-3 cursor_image"
                        src="/assets/images/dashboard/content-upload/Upload-icon.png"
                        alt="image"
                        width={50}
                        height={50}
                      />
                      <p className="medium_font font_size_16 mb-1">
                        {" "}
                        Drag & drop files or Browse{" "}
                      </p>
                      <p className="font_size_14 text_muted">
                        {" "}
                        Supported formats: JPEG, PNG{" "}
                      </p>
                    </label>
                  </div>
                  {errors.image && (
                    <span className="text-danger">{errors.image}</span>
                  )}
                </div>
              </div>
            </div>
            {formData.image && (
              <div className="uploaded_file_card border border-success rounded p-2 d-flex justify-content-between align-itmes-center">
                <div className="text_div position-relative">
                  <p className="font_size_14 mb-0"> {formData.image?.name} </p>
                  <div className="border_div"></div>
                </div>
                {/* <div className="uploaded_file_icon_div">
                        <Link href="#" className="text-decoration-none text-dark">
                          <RiDeleteBin6Line className="text-danger" />
                        </Link>
                      </div> */}
              </div>
            )}

            <div className="Button_div btn_div mt-5" style={{ width: "150px" }}>
              <Button text="Edit Class" type={"submit"} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
}
