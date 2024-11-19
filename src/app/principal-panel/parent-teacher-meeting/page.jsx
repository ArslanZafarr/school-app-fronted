"use client";
import Button from "@/app/components/Button";
import {
  createPM,
  createPTM,
  fetchClasses,
  fetchStudent,
  fetchTeachers,
} from "@/services/principal/dashboard";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const Page = () => {
  const initialFormData = {
    date: "",
    start_time: "",
    end_time: "",
    notify_teachers: "",
    notify_parents: "",
    notify_students: "",
  };
  const initialFormData2 = {
    teacher_ids: "",
    student_ids: "",
    date: "",
    start_time: "",
    end_time: "",
    notify_teachers: "",
    notify_parents: "",
    notify_students: "",
  };
  const [teachers, setteachers] = useState([]);
  const [students, setstudents] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [formData2, setFormData2] = useState(initialFormData2);
  const [isLoading, setisLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [errors2, setErrors2] = useState({});
  const { apiToken, userData } = useSelector((state) => state.storeAuth);
  useEffect(() => {
    getTeachers();
    getStudents();
  }, []);
  const getTeachers = async () => {
    try {
      let res = await fetchTeachers(
        userData?.["profile"]?.["role_profile"]?.["id"],
        apiToken
      );
      console.log("36", res.data);
      if (res.data.success) {
        setteachers(res.data.teachers);
      } else {
        setteachers([]);
      }
    } catch (e) {
      setteachers([]);
      console.log("37", e);
    }
  };
  const getStudents = async () => {
    try {
      let res = await fetchStudent(
        userData?.["profile"]?.["role_profile"]?.["id"],
        apiToken
      );
      console.log("36", res.data);
      if (res.data.success) {
        setstudents(res.data.students);
      } else {
        setstudents([]);
      }
    } catch (e) {
      setstudents([]);
      console.log("37", e);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    console.log("30", checked);
    if (name === "notify_teachers") {
      setFormData({
        ...formData,
        [name]: checked,
        notify_parents: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: checked,
      });
    }
  };
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData2({
      ...formData2,
      [name]: value,
    });
  };
  const handleCheckboxChange2 = (e) => {
    const { name, checked } = e.target;
    console.log("30", checked);
    if (name === "notify_teachers") {
      setFormData2({
        ...formData2,
        [name]: checked,
        notify_parents: checked,
      });
    } else {
      setFormData2({
        ...formData2,
        [name]: checked,
      });
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
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.date) tempErrors.date = "Date is required";
    if (!formData.start_time) tempErrors.start_time = "Start Time is required";
    if (!formData.end_time) tempErrors.end_time = "End Time is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const validateForm2 = () => {
    let tempErrors = {};
    if (!formData2.teacher_ids) tempErrors.teacher_ids = "Teacher is required";
    if (!formData2.student_ids) tempErrors.student_ids = "Student is required";
    if (!formData2.date) tempErrors.date = "Date is required";
    if (!formData2.start_time) tempErrors.start_time = "Start Time is required";
    if (!formData2.end_time) tempErrors.end_time = "End Time is required";

    setErrors2(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handlePTMSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setisLoading(true);
      const formPayload = new FormData();
      for (const key in formData) {
        if (key === "date") {
          formPayload.append(key, moment(formData[key]).format("YYYY-MM-DD"));
        } else if (
          key === "notify_teachers" ||
          key === "notify_parents" ||
          key === "notify_students"
        ) {
          formPayload.append(key, formData[key] ? 1 : 0);
        } else {
          formPayload.append(key, formData[key]);
        }
      }
      formPayload.append(
        "school_id",
        userData?.["profile"]?.["role_profile"]?.["id"]
      );
      console.log("66", formData);
      try {
        const response = await createPTM(formPayload, apiToken);
        console.log("73", response);
        toast.success("Data submitted successfully.");
        setFormData(initialFormData);
        setErrors({});
        setisLoading(false);
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
  const handlePMSubmit = async (e) => {
    e.preventDefault();

    if (validateForm2()) {
      setisLoading(true);
      const formPayload = new FormData();
      for (const key in formData2) {
        if (key === "date") {
          formPayload.append(key, moment(formData2[key]).format("YYYY-MM-DD"));
        } else if (
          key === "notify_teachers" ||
          key === "notify_parents" ||
          key === "notify_students"
        ) {
          formPayload.append(key, 1);
        } else if (key === "teacher_ids" || key === "student_ids") {
          console.log("211", key);
          let arr = [formData2[key]];
          formPayload.append(key, arr);
        } else {
          formPayload.append(key, formData2[key]);
        }
      }
      formPayload.append(
        "school_id",
        userData?.["profile"]?.["role_profile"]?.["id"]
      );
      try {
        const response = await createPM(formPayload, apiToken);
        console.log("73", response);
        toast.success("Data submitted successfully.");
        setFormData2(initialFormData2);
        setErrors2({});
        setisLoading(false);
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
      <div className="padding tablet_padding">
        <h3 className="medium_font font_size_24">Parent-Teacher Meeting</h3>
        <form onSubmit={handlePTMSubmit}>
          <div className="date_and_time_form_div card_border rounded py-3 px-3 px-xxl-5 px-xl-5 px-lg-5 px-md-5 mt-3">
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    placeholder="Select a date"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    style={{ height: "56px" }}
                    value={formData.date}
                    onChange={handleChange}
                    name="date"
                  />
                  {errors.date && (
                    <span className="text-danger">{errors.date}</span>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
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
              <div className="col-6">
                {/* <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
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
              </div> */}
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
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
              </div>
            </div>
            <div className="form-check mb-3 mt-4">
              <input
                className="form-check-input check_div"
                type="checkbox"
                defaultValue=""
                id="flexCheckDefault"
                value={formData.notify_teachers}
                onChange={handleCheckboxChange}
                name="notify_teachers"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Notify Teachers and Parents
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input check_div"
                type="checkbox"
                defaultValue=""
                id="flexCheckDefaultStudent"
                value={formData.notify_students}
                onChange={handleCheckboxChange}
                name="notify_students"
              />
              <label
                className="form-check-label"
                htmlFor="flexCheckDefaultStudent"
              >
                Notify Students
              </label>
            </div>

            <div className="btn_div mt-5 mb-2">
              <Button text="Schedule Meeting" />
            </div>
          </div>
        </form>
      </div>
      <form onSubmit={handlePMSubmit}>
        <div className="padding tablet_padding">
          <h3 className="medium_font font_size_24 mt-5">
            Create Personal Meeting
          </h3>
          <div className="date_and_time_form_div card_border rounded py-3 px-3 px-xxl-5 px-xl-5 px-lg-5 px-md-5 mt-3">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Teacher
              </label>
              <select
                className="form-select form-select-lg mb-3"
                aria-label="Large select example"
                value={formData2.teacher_ids}
                onChange={handleChange2}
                name="teacher_ids"
              >
                <option value=""> Select Teacher </option>
                {teachers.map((item, index) => (
                  <option key={index} value={item["id"]}>
                    {" "}
                    {item?.profile?.full_name}{" "}
                  </option>
                ))}
              </select>
              {errors2.teacher_ids && (
                <span className="text-danger">{errors2.teacher_ids}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Student
              </label>
              <select
                className="form-select form-select-lg mb-3"
                aria-label="Large select example"
                value={formData2.student_ids}
                onChange={handleChange2}
                name="student_ids"
              >
                <option value=""> Select Student </option>
                {students.map((item, index) => (
                  <option key={index} value={item["id"]}>
                    {" "}
                    {item?.profile?.id} - {item?.profile?.full_name}
                  </option>
                ))}
              </select>
              {errors2.student_ids && (
                <span className="text-danger">{errors2.student_ids}</span>
              )}
            </div>
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    placeholder="Select a date"
                    className="form-control"
                    aria-describedby="emailHelp"
                    style={{ height: "56px" }}
                    value={formData2.date}
                    onChange={handleChange2}
                    name="date"
                  />
                  {errors2.date && (
                    <span className="text-danger">{errors2.date}</span>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">End Time</label>
                  <input
                    type="time"
                    placeholder="Select a time"
                    className="form-control"
                    aria-describedby="emailHelp"
                    value={formData2.end_time}
                    onChange={handleChange2}
                    name="end_time"
                  />
                  {errors2.end_time && (
                    <span className="text-danger">{errors2.end_time}</span>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">Start Time</label>
                  <input
                    type="time"
                    placeholder="Select a time"
                    className="form-control"
                    aria-describedby="emailHelp"
                    value={formData2.start_time}
                    onChange={handleChange2}
                    name="start_time"
                  />
                  {errors2.start_time && (
                    <span className="text-danger">{errors2.start_time}</span>
                  )}
                </div>
                <div className="mb-3"></div>
              </div>
            </div>
            {/* <div className="form-check mb-3 mt-4">
              <input
                className="form-check-input check_div"
                type="checkbox"
                defaultValue=""
                id="flexCheckDefault"
                value={formData2.notify_teachers}
                onChange={handleCheckboxChange2}
                name="notify_teachers"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Notify Teachers and Parents
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input check_div"
                type="checkbox"
                defaultValue=""
                id="flexCheckDefaultStudent"
                value={formData2.notify_students}
                onChange={handleCheckboxChange2}
                name="notify_students"
              />
              <label
                className="form-check-label"
                htmlFor="flexCheckDefaultStudent"
              >
                Notify Students
              </label>
            </div> */}

            <div className="btn_div mt-5 mb-2">
              <Button text="Schedule Meeting" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Page;
